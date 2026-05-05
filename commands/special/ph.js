if (!global.db) global.db = {};
if (!global.db.haremPokemon) global.db.haremPokemon = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['ph'],
  category: 'game',
  run: async (client, m) => {
    const userId = m.sender;

    const harem = global.db.haremPokemon[userId] || [];

    if (harem.length === 0) {
      return m.reply(`❌ No tienes ningún Pokémon aún.\nUsa ™pr para generar uno.`);
    }

    let msg = `🎴 *TU POKEDEX PERSONAL* 🎴\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n\n`;

    harem.forEach((poke, i) => {
      const nivel = poke.nivel || 1;
      const expActual = poke.exp || 0;
      // EXP necesaria aumenta con el nivel (más realista)
      const expNecesaria = Math.floor(80 + (nivel * 45)); 
      const porcentaje = Math.floor((expActual / expNecesaria) * 100);
      const barra = '█'.repeat(Math.floor(porcentaje / 10)) + '░'.repeat(10 - Math.floor(porcentaje / 10));

      msg += `*${i + 1}.* 🐾 ${poke.nombre}\n`;
      msg += `🆙 *Nivel:* ${nivel}\n`;
      msg += `✨ *Exp:* [ ${expActual} / ${expNecesaria} ]\n`;
      msg += `📊 ${barra} ${porcentaje}%\n`;
      msg += `━━━━━━━━━━━━━━━━━━\n\n`;
    });

    msg += `💡 Usa *™pa Nombre* para alimentar a tus Pokémon.`;

    return m.reply(msg);
  }
};