import fetch from 'node-fetch';

if (!global.db) global.db = {};
if (!global.db.pokedle) global.db.pokedle = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['pokedle'],
  category: 'game',

  run: async (client, m) => {

    const chatId = m.chat;
    const userId = m.sender;

    const mensaje = (m.text || '').split(' ').slice(1).join(' ').toLowerCase().trim();

    if (global.db.pokedle[chatId] && mensaje) {
      const game = global.db.pokedle[chatId];

      if (mensaje === game.name) {

        if (game.timer) clearTimeout(game.timer);
        delete global.db.pokedle[chatId];

        if (!global.db.users[userId]) global.db.users[userId] = {};
        if (!global.db.users[userId].pokedleWins) global.db.users[userId].pokedleWins = 0;
        if (!global.db.users[userId].achievements) global.db.users[userId].achievements = [];

        global.db.users[userId].pokedleWins++;
        const wins = global.db.users[userId].pokedleWins;

        let msg = `🎉 *¡ADIVINASTE!* 🎉\n\nEfectivamente es *${game.name.toUpperCase()}* 👾\n🏆 Victorias: *${wins}*`;

        const tieneLogro = global.db.users[userId].achievements.some(a => a.id === "pokemaniatico");

        if (wins >= 50 && !tieneLogro) {
          global.db.users[userId].achievements.push({
            id: "pokemaniatico",
            name: "Pokemaniatico",
            emoji: "⚡",
            description: "Ganar 50 partidas de pokedle",
            date: Date.now()
          });

          msg += `\n\n🏆 *¡LOGRO DESBLOQUEADO!* 🏆\n⚡ Pokemaniatico`;
        }

        if (global.db.write) await global.db.write();

        return m.reply(msg);
      }

      game.intentos -= 1;

      if (game.intentos > 0) {
        return m.reply(`❌ *Incorrecto!* "${mensaje}" no es.\n❤️ Te quedan *${game.intentos}* intentos.`);
      } else {

        if (game.timer) clearTimeout(game.timer);
        const name = game.name;
        delete global.db.pokedle[chatId];

        return m.reply(`💀 *¡PERDISTE!* Se acabaron los intentos.\n\nEl Pokémon era: *${name.toUpperCase()}*`);
      }
    }

    if (global.db.pokedle[chatId]) return;

    const pokemonId = Math.floor(Math.random() * 1010) + 1;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
      const data = await res.json();

      const nombreCorrecto = data.name.toLowerCase();
      const imagen = data.sprites.other['official-artwork'].front_default;

      global.db.pokedle[chatId] = {
        name: nombreCorrecto,
        intentos: 3,
        timer: setTimeout(async () => {
          if (global.db.pokedle[chatId]) {
            const name = global.db.pokedle[chatId].name;
            delete global.db.pokedle[chatId];

            await client.sendMessage(chatId, {
              text: `⌛ *¡TIEMPO AGOTADO!*\n\nEl Pokémon era: *${name.toUpperCase()}*`
            });
          }
        }, 90000)
      };

      return client.sendMessage(chatId, {
        image: { url: imagen },
        caption:
          `🧩 *POKEDLE*\n\n` +
          `¿Quién es este Pokémon?\n\n` +
          `💡 Responde: *™pokedle nombre*\n` +
          `❤️ Intentos: 3\n` +
          `⏳ Tiempo: 90s`
      }, { quoted: m });

    } catch (e) {
      console.log(e);
      return m.reply("❌ Error al cargar el Pokémon.");
    }
  }
};