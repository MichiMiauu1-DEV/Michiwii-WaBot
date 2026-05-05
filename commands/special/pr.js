if (!global.db) global.db = {};
if (!global.db.users) global.db.users = {};
if (!global.db.chats) global.db.chats = {};

export default {
  command: ['pr'],
  category: 'game',
  run: async (client, m) => {
    const userId = m.sender;
    const chatId = m.chat;

    // Cooldown 15 minutos
    if (!global.db.users[userId]) global.db.users[userId] = {};
    const cooldown = 15 * 60 * 1000;
    const ahora = Date.now();
    const lastPr = global.db.users[userId].lastPr || 0;

    if (ahora - lastPr < cooldown) {
      const restante = Math.ceil((cooldown - (ahora - lastPr)) / 60000);
      return m.reply(`⏳ Espera *${restante} minutos* para volver a generar un Pokémon.`);
    }

    // Pokémon al azar (1 a 151 para clásicos)
    const pokemonId = Math.floor(Math.random() * 151) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const data = await res.json();
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);

    const imageUrl = data.sprites.front_default;

    // Guardar Pokémon suelto
    if (!global.db.chats[chatId]) global.db.chats[chatId] = {};
    global.db.chats[chatId].pokemonSuelto = {
      nombre: nombre,
      id: pokemonId,
      timestamp: Date.now()
    };

    global.db.users[userId].lastPr = ahora;
    if (global.db.write) await global.db.write();

    let msg = `🎴 *¡POKÉMON AVISTADO!* 🎴\n\n`;
    msg += `🐾 *Pokémon:* ${nombre}\n\n`;
    msg += `⚡ Responde a este mensaje y escribe *pc* para reclamarlo.\n`;
    msg += `⏳ Tienes 90 segundos...`;

    await client.sendMessage(chatId, { 
      image: { url: imageUrl },
      caption: msg 
    });

    // Escape después de 90 segundos
    setTimeout(async () => {
      if (global.db.chats[chatId]?.pokemonSuelto?.nombre === nombre) {
        global.db.chats[chatId].pokemonSuelto = null;
        if (global.db.write) await global.db.write();
        client.sendMessage(chatId, { text: `💨 ${nombre} escapó porque nadie lo reclamó...` });
      }
    }, 90000);
  }
};