export default {
  command: ['logroslist', 'listlogros'],
  category: 'fun',

  run: async (client, m) => {

    const allAchievements = [
      {
        id: "67",
        name: "67",
        emoji: "🔢",
        description: "Usar el comando ™67"
      },
      {
        id: "mortadela",
        name: "Chicos estoy comiendo mortadela",
        emoji: "🥪",
        description: "???"
      },
      {
        id: "salvador_horca",
        name: "Salvador de la Horca",
        emoji: "🪢",
        description: "Ganar 20 partidas de ahorcado"
      },
      {
        id: "cazador_respuestas",
        name: "Cazador de Respuestas",
        emoji: "🎯",
        description: "Responder correctamente 20 acertijos"
      },
      {
        id: "pokemaniatico",
        name: "Pokemaniatico",
        emoji: "⚡",
        description: "Ganar 50 partidas de pokedle"
      },
      {
        id: "enigmapokemon",
        name: "Enigma Pokémon",
        emoji: "🧩",
        description: "Ganar 80 trivias de Pokémon"
      }
    ];

    let texto = `╭━━━〔 🏆 *LOGROS DISPONIBLES* 〕━━━┈\n\n`;

    allAchievements.forEach((logro, index) => {
      texto += `➤ *${index + 1}. ${logro.emoji} ${logro.name}*\n`;
      texto += `   ✦ ${logro.description}\n`;
      texto += `   ───────────────\n`;
    });

    texto += `\n╰━━━━━━━━━━━━━━━━━━━━━━━┈`;

    await client.sendMessage(
      m.chat,
      { text: texto },
      { quoted: m }
    );
  }
};