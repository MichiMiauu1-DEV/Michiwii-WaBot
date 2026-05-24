if (!global.db) global.db = {};
if (!global.db.data) global.db.data = { chats: {} };

export default {
  command: ['ruletamaldita', 'rm'],
  category: 'fun',

  run: async (client, m) => {

    const chat = m.chat;

    try {

      const metadata = await client.groupMetadata(chat);
      const users = metadata.participants;

      if (!users || users.length === 0) {
        return m.reply('❌ No hay usuarios en el grupo.');
      }

      // 👤 usuario aleatorio
      const randomUser = users[Math.floor(Math.random() * users.length)].id;

      // 🧠 asegurar estructura DB
      if (!global.db.data.chats[chat]) {
        global.db.data.chats[chat] = { users: {} };
      }

      if (!global.db.data.chats[chat].users[randomUser]) {
        global.db.data.chats[chat].users[randomUser] = {
          coins: 0
        };
      }

      // 💀 cantidad absurda
      const minus = BigInt("-99999999999999999999999999999999999999999999999999999999");

      // 💰 coins actuales
      let currentCoins = BigInt(
        global.db.data.chats[chat].users[randomUser].coins || 0
      );

      // 🔥 nuevo balance
      let newCoins = currentCoins + minus;

      // guardar
      global.db.data.chats[chat].users[randomUser].coins = newCoins.toString();

      return client.sendMessage(chat, {
        text:
`💀 *RULETA MALDITA*

🎯 Víctima seleccionada: @${randomUser.split('@')[0]}

💸 Coins destruidas:
-99999999999999999999999999999999999999999999999999999999

🏦 Balance actual:
${newCoins.toString()}`,
        mentions: [randomUser]
      }, { quoted: m });

    } catch (e) {
      console.log(e);
      return m.reply('❌ Error en la ruleta maldita.');
    }
  }
};
