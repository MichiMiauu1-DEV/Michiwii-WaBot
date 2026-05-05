const games = new Map();
const userGames = new Map();
const cooldown = new Map();

export default {
  command: ['ahorcado'],
  category: 'fun',

  run: async (client, m, args) => {

    const chatId = m.chat;
    const userId = m.sender;

    const categorias = {
      juegos: [
        "minecraft","fortnite","roblox","valorant","gta","gta5",
        "pokemon","zelda","mario","sonic","terraria","csgo",
        "callofduty","warzone","apex","overwatch","leagueoflegends",
        "dota2","fifa","nba2k","rocketleague","genshin","pubg",
        "eldenring","skyrim","cyberpunk","halo","doom","battlefield","fallguys"
      ],
      mobs: [
        "chicken","cow","pig","sheep","zombie","skeleton",
        "creeper","spider","enderman","witch","slime","magma_cube",
        "blaze","ghast","endermite","silverfish","pillager","ravager",
        "evoker","vex","vindicator","drowned","phantom","hoglin",
        "piglin","zoglin","strider","guardian","elder_guardian","wither_skeleton"
      ],
      personajes: [
        "mario","luigi","peach","bowser","yoshi","link",
        "zelda","ganondorf","kirby","pikachu","ash","sonic",
        "tails","knuckles","shadow","megaman","ryu","ken",
        "chunli","scorpion","subzero","liukang","kratos","masterchief",
        "steve","alex","geralt","doomguy","sephiroth","cloud"
      ]
    };

    const input = (args.join(" ") || "").toLowerCase().trim();
    let game = games.get(chatId);

    if (!game) {

      if (cooldown.has(chatId) && Date.now() < cooldown.get(chatId)) {
        return m.reply("⏳ Espera un momento antes de iniciar otro ahorcado.");
      }

      if (userGames.has(userId)) {
        return m.reply("⚠️ Ya tienes un ahorcado activo.");
      }

      const categoriasKeys = Object.keys(categorias);
      const categoriaRandom = categoriasKeys[Math.floor(Math.random() * categoriasKeys.length)];
      const lista = categorias[categoriaRandom];

      const word = lista[Math.floor(Math.random() * lista.length)];
      const progress = Array(word.length).fill("_");

      game = {
        word,
        progress,
        used: [],
        tries: 5,
        userId,
        categoria: categoriaRandom
      };

      games.set(chatId, game);
      userGames.set(userId, chatId);
      cooldown.set(chatId, Date.now() + 20000);

      setTimeout(() => {
        if (games.has(chatId)) {
          const g = games.get(chatId);
          games.delete(chatId);
          userGames.delete(g.userId);
          client.sendMessage(chatId, {
            text: `⏰ *TIEMPO AGOTADO*\n\n📌 Palabra: *${g.word}*`
          });
        }
      }, 110000);

      return m.reply(
        `╭━━━〔 🎮 *AHORCADO* 〕━━━┈\n\n` +
        `📂 Categoría: *${categoriaRandom}*\n\n` +
        `🧠 ${progress.join(" ")}\n\n` +
        `❤️ Intentos: *5*\n` +
        `⏱️ Tiempo: *1m 50s*\n` +
        `━━━━━━━━━━━━━━━━━━\n` +
        `✍️ Escribe: *ahorcado + letra*`
      );
    }

    if (!input || input.length !== 1) {
      return m.reply("⚠️ Solo una letra.");
    }

    const letter = input.toLowerCase();

    if (game.used.includes(letter)) {
      return m.reply("⚠️ Ya usaste esa letra.");
    }

    game.used.push(letter);

    if (game.word.includes(letter)) {
      for (let i = 0; i < game.word.length; i++) {
        if (game.word[i] === letter) game.progress[i] = letter;
      }
    } else {
      game.tries--;
    }

    const display = game.progress.join(" ");
    const win = !game.progress.includes("_");

    if (win) {
      games.delete(chatId);
      userGames.delete(userId);

      if (!global.db) global.db = {};
      if (!global.db.users) global.db.users = {};
      if (!global.db.users[userId]) global.db.users[userId] = {};
      if (!global.db.users[userId].achievements) global.db.users[userId].achievements = [];

      if (!global.db.users[userId].winAhorcado) global.db.users[userId].winAhorcado = 0;

      global.db.users[userId].winAhorcado++;

      const tieneLogro = global.db.users[userId].winAhorcado < 20;

      if (!tieneLogro) {
        global.db.users[userId].achievements.push({
          id: "salvador_horca",
          name: "Salvador de la Horca",
          emoji: "🪢",
          description: "Ganar 20 partidas de ahorcado",
          date: Date.now()
        });

        if (global.db.write) await global.db.write();

        await m.reply(`🏆 *¡LOGRO DESBLOQUEADO!* 🏆\n\n🪢 Salvó 20 partidas`);
      }

      return m.reply(`🏆 *VICTORIA* 🎉\n\n🎉 La palabra es: *${game.word.toUpperCase()}*`);
    }

    if (game.tries <= 0) {
      games.delete(chatId);
      userGames.delete(userId);
      return m.reply(`💀 *GAME OVER*\n\n📌 La palabra era: *${game.word.toUpperCase()}*`);
    }

    games.set(chatId, game);

    return m.reply(
      `🎮 *AHORCADO*\n\n` +
      `📂 Categoría: *${game.categoria}*\n` +
      `🧠 ${display}\n` +
      `❤️ Intentos restantes: ${game.tries}\n` +
      `🔤 Letras usadas: ${game.used.join(" · ")}\n` +
      `━━━━━━━━━━━━━━━━━━\n` +
      `Sigue intentándolo, ¡tú puedes! 🔥`
    );
  }
};