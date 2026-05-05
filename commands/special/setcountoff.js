if (!global.db) global.db = {};
if (!global.db.countMsg) global.db.countMsg = {};

export default {
  command: ['setcountoff'],
  category: 'game',
  run: async (client, m, { args }) => {

    const chatId = m.chat;

    const data = global.db.countMsg[chatId];

    // ❌ si no existe nada
    if (!data) {
      return m.reply("❌ No hay mensajes activos.");
    }

    // 🧨 apagar TODO aunque esté corrupto
    const stopAll = (list) => {
      if (Array.isArray(list)) {
        for (const item of list) {
          if (item?.interval) clearInterval(item.interval);
        }
      }
    };

    // 🔥 caso array (nuevo sistema)
    if (Array.isArray(data)) {
      stopAll(data);
      global.db.countMsg[chatId] = [];
      return m.reply("🛑 Todos los mensajes desactivados.");
    }

    // 🔥 caso antiguo (objeto suelto o basura)
    if (data.interval) {
      clearInterval(data.interval);
    }

    delete global.db.countMsg[chatId];

    return m.reply("🛑 Mensajes apagados completamente.");
  }
};