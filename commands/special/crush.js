const cooldown = new Map();

export default {
  command: ['crush'],
  category: 'fun',
  run: async (client, m) => {
    const now = Date.now();
    const userId = m.sender;

    const last = cooldown.get(userId) || 0;

    if (now - last < 10000) {
      const remaining = Math.ceil((10000 - (now - last)) / 1000);
      return m.reply(`⏳ Espera ${remaining}s para volver a usar este comando`);
    }

    let participants = [];

    try {
      const metadata = await client.groupMetadata(m.chat);
      participants = metadata?.participants || [];
    } catch (e) {
      participants = [];
    }

    if (!Array.isArray(participants)) participants = [];

    const members = participants
      .map(v => v?.id)
      .filter(v => v && v !== m.sender);

    if (!members.length) {
      return m.reply('⚠️ No hay suficientes usuarios en el grupo');
    }

    const randomUser = members[Math.floor(Math.random() * members.length)];

    const senderTag = `@${m.sender.split('@')[0]}`;
    const randomTag = `@${randomUser.split('@')[0]}`;

    const mensaje =
`💘 *CRUSH ALEATORIO* 💘

👤 ${senderTag}
💞 + 💞
👤 ${randomTag}

✨ Cupido ha hablado… serían un crush perfecto 😏`;

    cooldown.set(userId, now);

    await client.sendMessage(
      m.chat,
      { text: mensaje, mentions: [m.sender, randomUser] },
      { quoted: m }
    );
  }
};