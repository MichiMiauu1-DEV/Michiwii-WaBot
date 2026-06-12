import fs from 'fs';
import path from 'path';
import ws from 'ws';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Función interna adaptada para leer las conexiones activas en tiempo real desde memoria global
const getActiveBotNumbers = () => {
  const activeJids = new Set();
  if (global.conns && Array.isArray(global.conns)) {
    for (const conn of global.conns) {
      if (conn?.user?.id) {
        const jid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
        activeJids.add(jid.split('@')[0]);
      }
    }
  }
  return activeJids;
};

export default {
  command: ['bots', 'sockets'],
  category: 'socket',
  run: async (client, m, args) => { // Se añade args aquí para admitir el parámetro "all"
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net';
    const bot = global.db.data.settings[botId] || {};
    const botname = bot.botname || '';
    const namebot = bot.namebot || '';
    const banner = bot.icon;
    const from = m.key.remoteJid;
    
    // Lógica para capturar si se pide ver todos con "all"
    const isAll = args?.[0]?.toLowerCase() === 'all';
    
    const groupMetadata = m.isGroup ? await client.groupMetadata(from).catch(() => {}) : '';
    const groupParticipants = groupMetadata?.participants?.map((p) => p.phoneNumber || p.jid || p.lid || p.id) || [];
    const mainBotJid = global.client.user.id.split(':')[0] + '@s.whatsapp.net';
    
    const basePath = path.join(dirname, '../../Sessions');
    const getBotsFromFolder = (folderName) => {
      const folderPath = path.join(basePath, folderName);
      if (!fs.existsSync(folderPath)) return [];
      return fs.readdirSync(folderPath).filter((dir) => {
        const credsPath = path.join(folderPath, dir, 'creds.json');
        return fs.existsSync(credsPath);
      }).map((id) => id.replace(/\D/g, ''));
    };
    
    // Se cruzan las carpetas físicas de "Subs" contra los sockets que están corriendo en memoria real
    const activeBots = getActiveBotNumbers();
    const allSubs = getBotsFromFolder('Subs');
    const subs = allSubs.filter(num => activeBots.has(num));
    
    const categorizedBots = { Owner: [], Sub: [] };
    const mentionedJid = [];
    
    // Funciones de formateo dinámico según el argumento ingresado (grupo vs global network)
    const formatBotInGroup = (number, label) => {
      const jid = number + '@s.whatsapp.net';
      if (!groupParticipants.includes(jid)) return null;
      mentionedJid.push(jid);
      const data = global.db.data.settings[jid];
      const name = data?.namebot || 'Bot';
      return `- [${label} *${name}*] › @${number}`;
    };
    
    const formatBotAll = (number, label) => {
      const jid = number + '@s.whatsapp.net';
      mentionedJid.push(jid);
      const data = global.db.data.settings[jid];
      const name = data?.namebot || 'Bot';
      return `- [${label} *${name}*] › @${number}`;
    };
    
    const formatBot = isAll ? formatBotAll : formatBotInGroup;
    const isMainActive = !!(client?.user?.id);
    
    // Configuración del bot principal
    if (isMainActive && global.db.data.settings[mainBotJid]) {
      const isMainBotInGroup = groupParticipants.includes(mainBotJid);
      if (isAll || isMainBotInGroup) {
        const name = global.db.data.settings[mainBotJid].namebot || 'Bot';
        const number = mainBotJid.split('@')[0];
        mentionedJid.push(mainBotJid);
        categorizedBots.Owner.push(`- [Owner *${name}*] › @${number}`);
      }
    }
    
    // Mapeo e iteración de los sub bots con el nuevo filtro aplicado
    subs.forEach((num) => {
      const line = formatBot(num, 'Sub');
      if (line) categorizedBots.Sub.push(line);
    });
    
    const totalBots = (isMainActive ? 1 : 0) + subs.length;
    const totalShown = categorizedBots.Owner.length + categorizedBots.Sub.length;
    
    // Construcción estética del mensaje con tus variables y textos dinámicos
    let message = `ꕥ Números de Sockets activos *(${totalBots})*\n\n`;
    message += `ੈ❖‧₊˚ Principales › *${isMainActive ? 1 : 0}*\n`;
    message += `ੈ✿‧₊˚ Subs › *${subs.length}*\n\n`;
    
    if (isAll) {
      message += `➭ *Lista completa ›* ${totalShown}\n`;
    } else {
      message += `➭ *Bots en el grupo ›* ${totalShown}\n`;
    }
    
    for (const category of ['Owner', 'Sub']) {
      if (categorizedBots[category].length) {
        message += categorizedBots[category].join('\n') + '\n';
      }
    }
    
    // Envío final usando tu método personalizado sendContextInfoIndex
    await client.sendContextInfoIndex(m.chat, message, { icon: banner }, m, true, mentionedJid);
  },
};
