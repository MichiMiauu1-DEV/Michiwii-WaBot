export default {
  command: ['quien'],
  category: 'fun',
  run: async (client, m) => {
    try {
      const text = m.text.split(' ').slice(1).join(' ');

      if (!text || text.trim().length < 2) {
        return m.reply('⚠️ Debes poner una situación. Ej: ™quien es el femboy');
      }

      let groupMetadata = await client.groupMetadata(m.chat);
      let participants = groupMetadata.participants;

      if (!participants || participants.length === 0) {
        return m.reply('❌ No se pudieron obtener los usuarios del grupo.');
      }

      const members = participants.map(p => p.id);
      const randomUser = members[Math.floor(Math.random() * members.length)];
      const mentionText = `@${randomUser.split('@')[0]}`;

      let mensaje = `🚩 *DETECTOR DE PROBABILIDADES* 🚩\n\n`;
      mensaje += `❓ *Pregunta:* ¿Quién ${text}?\n`;
      mensaje += `💀 *Resultado:* definitivamente ${mentionText} ${text}\n\n`;
      mensaje += `📝 *Nota:* El bot ha hablado, no hay reclamos.`;

      await client.sendMessage(m.chat, {
        text: mensaje,
        mentions: [randomUser]
      }, { quoted: m });

    } catch (e) {
      m.reply('❌ Error: ' + e.message);
    }
  }
};