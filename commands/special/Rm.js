if (!global.db) global.db = {};
if (!global.db.cooldowns) global.db.cooldowns = {};
if (!global.db.data) global.db.data = { chats: {} };

export default {
  command: ['ruletamaldita', 'rm'],
  category: 'fun',

  run: async (client, m) => {

    const chat = m.chat;

    // ⏳ cooldown GLOBAL (para todos)
    const now = Date.now();
    const cd = global.db.cooldowns['ruletamaldita'];

    if (cd && now < cd) {
      const restante = Math.ceil((cd - now) / 1000 / 60);
      return m.reply(`⏳ La ruleta está en cooldown.\nVuelve en ${restante} minutos.`);
    }

    // 🔥 activar cooldown 10 horas global
    global.db.cooldowns['ruletamaldita'] = now + (10 * 60 * 60 * 1000);

    try {

      const metadata = await client.groupMetadata(chat);
      const users = metadata.participants;

      if (!users || users.length === 0) {
        return m.reply('❌ No hay usuarios en el grupo.');
      }

      const randomUser = users[Math.floor(Math.random() * users.length)].id;

      // 🧠 asegurar DB coins
      if (!global.db.data.chats[chat]) {
        global.db.data.chats[chat] = { users: {} };
      }

      if (!global.db.data.chats[chat].users[randomUser]) {
        global.db.data.chats[chat].users[randomUser] = { coins: 0 };
      }

      // 💀 resta absurda usando TU DB coins
      const minus = BigInt("-99999999999999999999999999999999999999999999999999999999");

      let current = BigInt(global.db.data.chats[chat].users[randomUser].coins || 0);

      let newBalance = current + minus;

      global.db.data.chats[chat].users[randomUser].coins = newBalance.toString();

      return client.sendMessage(chat, {
        text:
`💀 *RULETA MALDITA ACTIVADA*

👤 Usuario elegido: @${randomUser.split('@')[0]}

💸 Coins destruidas: -∞

💰 Nuevo balance: ${newBalance.toString()}`,
        mentions: [randomUser]
      }, { quoted: m });

    } catch (e) {
      console.log(e);
      return m.reply('❌ Error en la ruleta maldita.');
    }
  }
};
