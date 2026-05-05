const cooldowns = new Map();
export default {
  command: ['socrates'],
  category: 'fun',
  run: async (client, m, args) => {
    const userId = m.sender;
    const now = Date.now();
    const cooldownAmount = 20 * 1000;
    if (cooldowns.has(userId)) {
      const expirationTime = cooldowns.get(userId) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = Math.ceil((expirationTime - now) / 1000);
        return m.reply(`⏳ Espera ${timeLeft} segundos para volver a cuestionar tu existencia.`);
      }
    }
    cooldowns.set(userId, now);
    const tema = args.join(' ');
    if (!tema) return m.reply('Debes proporcionar un tema para cuestionar');
    const frase = `Si *${tema}* es tu poder, ¿Qué eres tú sin él?`;
    const mention = `@${userId.split('@')[0]}`;
    let respuesta = `🏛️ *Aparece sócrates, y dice:* \n\n`;
    respuesta += `${mention}, ${frase}`;
    await client.sendMessage(m.chat, { text: respuesta, mentions: [userId] }, { quoted: m });
  }
};