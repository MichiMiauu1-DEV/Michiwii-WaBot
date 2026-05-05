if (!global.db) global.db = {};
if (!global.db.haremPokemon) global.db.haremPokemon = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['pa'],
  category: 'game',
  run: async (client, m, { text }) => {
    const userId = m.sender;

    let fullText = (m.message?.conversation || m.message?.extendedTextMessage?.text || '').trim();
    fullText = fullText.replace(/™pa/gi, '').trim();
    const nombreInput = fullText;

    if (!nombreInput) {
      return m.reply(`❓ Usa: *™pa NombreDelPokémon*`);
    }

    const harem = global.db.haremPokemon[userId] || [];
    if (harem.length === 0) {
      return m.reply(`❌ No tienes ningún Pokémon.`);
    }

    const normalizar = (str) => (str || '').toLowerCase().trim();
    const buscado = normalizar(nombreInput);

    const pokeIndex = harem.findIndex(p => normalizar(p.nombre) === buscado);

    if (pokeIndex === -1) {
      let debug = `❌ No tienes a *${nombreInput}* en tu Pokédex.\n\nTus Pokémon:\n`;
      harem.forEach(p => debug += `• ${p.nombre}\n`);
      return m.reply(debug);
    }

    const poke = harem[pokeIndex];
    const nivelActual = poke.nivel || 1;
    const expAntes = poke.exp || 0;

    // Verificar cooldown (40 minutos)
    const tiempoEspera = 40 * 60 * 1000; // 40 minutos en milisegundos
    const ahora = Date.now();
    const lastPa = global.db.users[userId].lastPa || 0;

    if (ahora - lastPa < tiempoEspera) {
      const restante = Math.ceil((tiempoEspera - (ahora - lastPa)) / 60000);
      return m.reply(`⏳ ¡Espera *${restante} minutos* para alimentar a tus Pokémon nuevamente!`);
    }

    // EXP variable según nivel (como en Pokémon: a veces más, a veces menos)
    const baseExp = 25 + (nivelActual * 8);
    const variacion = Math.floor(Math.random() * 15) - 7; // -7 a +7
    let expGanada = Math.max(15, baseExp + variacion); // mínimo 15

    poke.exp = expAntes + expGanada;

    // EXP necesaria para subir nivel (aumenta con el nivel)
    const expNecesaria = Math.floor(80 + (nivelActual * 45));
    let subioNivel = false;

    if (poke.exp >= expNecesaria) {
      poke.nivel = nivelActual + 1;
      poke.exp = 0;
      subioNivel = true;
    }

    // Guardar cambios y actualizar el tiempo del último comando
    global.db.users[userId].lastPa = ahora;
    if (global.db.write) await global.db.write();

    let respuesta = `⚡ *¡POKÉMON ALIMENTADO!* ⚡\n\n`;
    respuesta += `🐾 *Pokémon:* ${poke.nombre}\n`;
    respuesta += `🧪 *EXP ganada:* +${expGanada}\n`;
    respuesta += `📊 *Progreso:* [ ${poke.exp} / ${expNecesaria} ]\n`;

    if (subioNivel) {
      respuesta += `\n🆙 *¡${poke.nombre} subió a Nivel ${poke.nivel}!*\n🎉`;
    } else {
      const falta = expNecesaria - poke.exp;
      respuesta += `\n📈 Faltan *${falta} EXP* para el siguiente nivel.`;
    }

    return m.reply(respuesta);
  }
};