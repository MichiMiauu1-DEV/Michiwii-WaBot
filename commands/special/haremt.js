if (!global.db) global.db = {};
if (!global.db.harem) global.db.harem = {};

export default {
  command: ['haremt'],
  category: 'game',
  run: async (client, m) => {
    // Detectar usuario: mención, respuesta a mensaje, o propio sender
    let who = m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.quoted && m.quoted.sender
        ? m.quoted.sender
        : m.sender;

    // Normalizar ID  
    let userId = who.includes('@')   
      ? who   
      : who + '@s.whatsapp.net';  

    const harem = global.db.harem[userId] || [];  

    if (harem.length === 0) {  
      return m.reply(  
        who === m.sender   
          ? `❌ No tienes ninguna mascota en tu harem.`   
          : `❌ Este usuario no tiene mascotas en su harem.`  
      );  
    }  

    let title = who === m.sender ? 'TU HAREM' : `HAREM DE @${userId.split('@')[0]}`;  
    
    let msg = `╭━━━〔 🎒 *${title}* 〕━━━┈\n\n`;  
    
    harem.forEach((pet, index) => {  
      const nivel = pet.nivel || 1;  
      const expActual = pet.exp || 0;  
      const expNecesaria = nivel * 100;  
      const porcentaje = Math.floor((expActual / expNecesaria) * 100);  
      const barra = '█'.repeat(Math.floor(porcentaje / 10)) + '░'.repeat(10 - Math.floor(porcentaje / 10));  

      // CORRECCIÓN AQUÍ: Usando backticks y quitando barras extra  
      msg += `*(${index + 1})* ✨ *${pet.nombre}*\n`;  
      msg += `🏷️ *Rango:* ${pet.rango || 'Común'}\n`;  
      msg += `🆙 *Nivel:* ${nivel}\n`;  
      msg += `✨ *Exp:* [ ${expActual} / ${expNecesaria} ]\n`;  
      msg += `📊 ${barra} ${porcentaje}%\n`;  
      msg += `━━━━━━━━━━━━━━━━━━\n\n`;  
    });  

    msg += `💡 Usa ™aliment Nombre para dar EXP a tus mascotas.`;  

    return client.sendMessage(m.chat, {   
      text: msg,   
      mentions: [userId]   
    });
  }
};