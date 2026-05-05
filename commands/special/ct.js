if (!global.db) global.db = {};
if (!global.db.harem) global.db.harem = {};
if (!global.db.chats) global.db.chats = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['ct'],
  category: 'game',
  run: async (client, m) => {
    const userId = m.sender;
    const chatId = m.chat;

    // === COOLDOWN 20 MINUTOS ===
    if (!global.db.users[userId]) global.db.users[userId] = {};
    const tiempoEspera = 20 * 60 * 1000;
    const ahora = Date.now();
    const lastCt = global.db.users[userId].lastCt || 0;

    if (ahora - lastCt < tiempoEspera) {
      const restante = Math.ceil((tiempoEspera - (ahora - lastCt)) / 60000);
      return m.reply(`⏳ *¡Aguanta, mano!* Ya reclamaste una mascota hace poco.\nDebes esperar *${restante} minutos* para volver a usar ™ct.`);
    }

    // Buscar la mascota suelta
    const mascotaChat = global.db.chats[chatId]?.mascotaSuelta;

    if (!mascotaChat) {
      return m.reply("⚠️ No hay ninguna mascota suelta en este chat.\n¡Usa ™tw o ™ew para invocar una!");
    }

    // Reclamar y guardar en el harem
    if (!global.db.harem[userId]) global.db.harem[userId] = [];

    const nuevaMascota = {
      id: global.db.harem[userId].length + 1,
      nombre: mascotaChat.nombre,
      rango: mascotaChat.rango,
      nivel: 1,
      exp: 0,
      lastF: 0
    };

    global.db.harem[userId].push(nuevaMascota);

    // Limpiar la mascota del chat y actualizar cooldown
    global.db.chats[chatId].mascotaSuelta = null;
    global.db.users[userId].lastCt = ahora;

    if (global.db.write) await global.db.write();

    // Mensaje final
    let msg = `✅ *¡MASCOTA RECLAMADA CON ÉXITO!* ✨\n\n`;
    
    msg += `👤 *Reclamado por:* @${userId.split('@')[0]}\n`;
    msg += `👾 *Mascota:* ${nuevaMascota.nombre}\n`;
    msg += `🏷️ *Rango:* ${nuevaMascota.rango}\n\n`;
    
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `💡 Usa *™haremt* para ver tu harem.`;

    return m.reply(msg, null, { mentions: [userId] });
  }
};