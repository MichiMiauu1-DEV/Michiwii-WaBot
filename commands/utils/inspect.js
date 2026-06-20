import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

export default {
  command: ["inspect", "inspeccionar"],
  category: "tools",
  run: async (client, m, args, usedPrefix, command, text) => {
    
    // 1. Detección de tipos de enlace
    const isChannel = text?.includes("whatsapp.com/channel/");
    const isGroupInvite = text?.includes("whatsapp.com/invite/") || text?.includes("chat.whatsapp.com/");

    // 2. Inspeccionar Canal
    if (isChannel) {
      const channelCode = text.match(/([0-9A-Za-z]{22,24})/i)?.[1];
      if (!channelCode) return m.reply("《✧》 Enlace de canal no válido.");
      
      try {
        const newsletterInfo = await client.newsletterMetadata("invite", channelCode);
        let caption = "*Inspector de Canales*\n\n" + processObject(newsletterInfo);
        const thumb = newsletterInfo.preview ? getUrlFromDirectPath(newsletterInfo.preview) : null;
        await client.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: "❀ Canales", body: "✧ Inspectador", thumbnailUrl: thumb, mediaType: 1 }}}, { quoted: m });
      } catch (e) {
        return m.reply("《✧》 No pude obtener información de este canal: " + e.message);
      }
      return;
    }

    // 3. Inspeccionar Grupo (por enlace o si está dentro)
    try {
      let groupData;
      if (isGroupInvite) {
        const code = text.match(/([0-9A-Za-z]{22,24})/i)?.[1];
        groupData = await client.groupGetInviteInfo(code);
      } else {
        groupData = await client.groupMetadata(m.chat);
      }

      const pp = await client.profilePictureUrl(groupData.id, 'image').catch(() => null);
      let info = `🆔 *ID:* ${groupData.id}\n` +
                 `🏷️ *Nombre:* ${groupData.subject || "N/A"}\n` +
                 `👑 *Dueño:* ${groupData.owner ? "@" + groupData.owner.split("@")[0] : "N/A"}\n` +
                 `🔰 *Miembros:* ${groupData.size || "N/A"}\n` +
                 `📢 *Anuncios:* ${groupData.announce ? "✅" : "❌"}`;

      await client.sendMessage(m.chat, { text: info, contextInfo: { externalAdReply: { title: "❀ Inspector de Grupos", body: "✧ ¡Super Inspectador!", thumbnailUrl: pp, mediaType: 1 }}}, { quoted: m });
    } catch (e) {
      m.reply("《✧》 No se pudo obtener la información. El grupo podría ser privado o el enlace no es válido.\nError: " + e.message);
    }
  }
}

// Funciones auxiliares
function newsletterKey(key) {
  return _.startCase(key.replace(/_/g, " ")).replace("Id", "🆔 ID").replace("Name", "🏷️ Nombre");
}

function formatValue(key, value) {
  return value !== null && value !== undefined ? value.toString() : "N/A";
}

function processObject(obj, prefix = "") {
  let caption = "";
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length > 0) caption += `\n*\`${newsletterKey(prefix + key)}\`*\n` + processObject(value, `${prefix}${key}_`);
    } else {
      caption += `- *${newsletterKey(key)}:*\n${formatValue(key, value)}\n`;
    }
  });
  return caption;
}
