if (!global.db) global.db = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['67'],
  category: 'fun',
  run: async (client, m) => {
    const userId = m.sender;
    let user = global.db.users[userId];

    if (!user) user = global.db.users[userId] = {};

    if (!user.achievements) user.achievements = [];

    // Verificar si ya tiene el logro "67"
    const tieneLogro = user.achievements.some(ach => ach.id === "67");

    if (!tieneLogro) {
      user.achievements.push({
        id: "67",
        name: "67",
        emoji: "🔢",
        description: "Usar el comando ™67 por primera vez",
        date: Date.now()
      });

      if (global.db.write) await global.db.write();

      // Notificación del logro
      await m.reply(`🏆 *¡Logro desbloqueado!* 🏆\n\n🔢 *67*\nUsaste el comando ™67 por primera vez.`);
    }

    // Mensaje original del comando
    await client.sendMessage(m.chat, {
      text: 'SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 SIX SEVEN 🗣️🔥 '
    }, { quoted: m })
  }
};