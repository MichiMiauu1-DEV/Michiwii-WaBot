if (!global.db) global.db = {};
if (!global.db.haremPokemon) global.db.haremPokemon = {};

export default {
  command: ['rp'],
  category: 'game',
  run: async (client, m) => {
    const senderId = m.sender;

    // Detectar destinatario
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted && m.quoted.sender 
        ? m.quoted.sender 
        : null;

    if (!target) {
      return m.reply("❌ Debes mencionar o responder al usuario.\nEjemplo: *™rp Gengar @grock*");
    }

    // Extraer nombre del Pokémon
    let fullText = (m.message?.conversation || m.message?.extendedTextMessage?.text || '').trim();
    let nombrePokemon = fullText.replace(/™rp/gi, '').trim();

    if (m.mentionedJid && m.mentionedJid[0]) {
      nombrePokemon = nombrePokemon.replace(new RegExp(`@${m.mentionedJid[0].split('@')[0]}`, 'gi'), '').trim();
    }

    if (!nombrePokemon) {
      return m.reply("❌ Escribe el nombre del Pokémon.\nEjemplo: *™rp Pikachu @grock*");
    }

    const miHarem = global.db.haremPokemon[senderId] || [];
    if (miHarem.length === 0) {
      return m.reply("❌ No tienes ningún Pokémon para regalar.");
    }

    const normalizar = (str) => (str || '').toLowerCase().trim();
    const pokeIndex = miHarem.findIndex(p => normalizar(p.nombre) === normalizar(nombrePokemon));

    if (pokeIndex === -1) {
      let lista = `❌ No tienes a *${nombrePokemon}*.\n\nTus Pokémon:\n`;
      miHarem.forEach(p => lista += `• ${p.nombre}\n`);
      return m.reply(lista);
    }

    const pokemonRegalado = miHarem[pokeIndex];
    miHarem.splice(pokeIndex, 1); // Eliminar del remitente

    if (!global.db.haremPokemon[target]) global.db.haremPokemon[target] = [];
    global.db.haremPokemon[target].push(pokemonRegalado);

    if (global.db.write) await global.db.write();

    let msg = `🎁 *POKÉMON REGALADO EXITOSAMENTE* 🎁\n\n`;
    msg += `🐾 *Pokémon:* ${pokemonRegalado.nombre}\n`;
    msg += `🆙 *Nivel:* ${pokemonRegalado.nivel || 1}\n`;
    msg += `✨ *EXP:* ${pokemonRegalado.exp || 0}\n\n`;
    msg += `👤 *De:* @${senderId.split('@')[0]}\n`;
    msg += `👤 *Para:* @${target.split('@')[0]}`;

    return m.reply(msg, null, { mentions: [senderId, target] });
  }
};