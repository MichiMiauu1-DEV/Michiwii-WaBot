if (!global.db) global.db = {};
if (!global.db.haremPokemon) global.db.haremPokemon = {};
if (!global.db.chats) global.db.chats = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['pc'],
  category: 'game',
  run: async (client, m) => {
    const userId = m.sender;
    const chatId = m.chat;

    // Cooldown 15 minutos
    if (!global.db.users[userId]) global.db.users[userId] = {};
    const cooldown = 15 * 60 * 1000;
    const ahora = Date.now();
    const lastPc = global.db.users[userId].lastPc || 0;

    if (ahora - lastPc < cooldown) {
      const restante = Math.ceil((cooldown - (ahora - lastPc)) / 60000);
      return m.reply(`⏳ Espera *${restante} minutos* para volver a reclamar un Pokémon.`);
    }

    if (!m.quoted) return m.reply("❌ Debes responder al mensaje del Pokémon para reclamarlo con *pc*.");

    const pokemonSuelto = global.db.chats[chatId]?.pokemonSuelto;
    if (!pokemonSuelto) return m.reply("❌ No hay ningún Pokémon disponible para reclamar.");

    if (!global.db.haremPokemon[userId]) global.db.haremPokemon[userId] = [];

    global.db.haremPokemon[userId].push({
      nombre: pokemonSuelto.nombre,
      nivel: 1,
      exp: 0,
      reclamadoEn: Date.now()
    });

    global.db.chats[chatId].pokemonSuelto = null;
    global.db.users[userId].lastPc = ahora;

    if (global.db.write) await global.db.write();

    let msg = `🎉 *¡POKÉMON RECLAMADO!* 🎉\n\n`;
    msg += `👤 @${userId.split('@')[0]}\n`;
    msg += `🐾 ${pokemonSuelto.nombre}\n\n`;
    msg += `✅ ¡Ya está en tu Pokédex personal!`;

    return m.reply(msg, null, { mentions: [userId] });
  }
};