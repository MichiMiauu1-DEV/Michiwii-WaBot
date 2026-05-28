import axios from 'axios'; // Asegúrate de tener axios instalado (npm i axios)

export default {
  command: ['smc'],
  category: 'game',

  run: async (client, m, { args }) => {
    const chat = m.chat;

    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar dentro de un grupo.');

    if (!args || !args[0]) {
      return m.reply('❌ *Uso incorrecto.*\n\nPor favor, proporciona una semilla.\nEjemplo: `™smc -3691007458655063350`');
    }

    const semillaRaw = args[0].trim();

    // Validación para asegurar que sea una semilla numérica válida (acepta el menos `-`)
    if (!/^-?\d+$/.test(semillaRaw)) {
      return m.reply('❌ *Error:* La semilla debe ser un número entero válido.');
    }

    await m.reply(`🔍 Calculando el mapa y buscando las 10 estructuras de superficie más cercanas para la semilla: *${semillaRaw}*...`);

    try {
      // --- CONEXIÓN CON LA API DE CHUNKBASE / SEED MAPPER ---
      // Enviamos la semilla y especificamos que queremos la versión de Bedrock ("bedrock")
      const respuestaApi = await axios.get(`https://api.chunkbase.com/v2/minecraft/structures`, {
        params: {
          seed: semillaRaw,
          version: 'bedrock',
          spawnX: -60, // Coordenadas base estimadas de búsqueda
          spawnZ: 420,
          limit: 10,
          surfaceOnly: true // Filtro estricto para que no mande cuevas ni minas
        }
      });

      const estructuras = respuestaApi.data.structures; // Array con las 10 estructuras encontradas

      if (!estructuras || estructuras.length === 0) {
        return m.reply('⚠️ No se encontraron estructuras de superficie cercanas para esa semilla en el rango base.');
      }

      // --- MAPEO DE EMOJIS DINÁMICO ---
      // Esta función le asigna el emoji correcto a cada estructura según lo que devuelva la API
      const obtenerEmoji = (type) => {
        const tipos = {
          'village': '🏡',
          'pillager_outpost': '🏹',
          'ruined_portal': '🔮',
          'mansion': '🏰',
          'jungle_pyramid': '🗿',
          'desert_pyramid': '🏜️',
          'igloo': '❄️',
          'swamp_hut': '🧙‍♀️'
        };
        return tipos[type.toLowerCase()] || '📍';
      };

      // --- CONSTRUCCIÓN DEL MENSAJE ---
      let MathResult = `🌍 *TOP 10 ESTRUCTURAS ENCONTRADAS*\n`;
      MathResult += `🌱 *Semilla:* \`${semillaRaw}\`\n`;
      MathResult += `🎮 *Versión:* Minecraft Bedrock\n\n`;

      estructuras.forEach((est, info) => {
        const emoji = obtenerEmoji(est.type);
        const nombreLimpio = est.name_es || est.name; // Usa nombre en español si la API lo da, si no en inglés
        
        MathResult += `${info + 1}. ${emoji} *${nombreLimpio}*\n`;
        MathResult += `   ↳ 📍 Coordenadas: X: ${est.x}, Z: ${est.z}\n`;
        MathResult += `   ↳ 🗺️ Distancia aprox: ~${est.distance} bloques\n\n`;
      });

      MathResult += `_Bot programado para optimizar rutas de supervivencia._`;

      return m.reply(MathResult);

    } catch (error) {
      console.error('Error al conectar con la API de Minecraft:', error);
      return m.reply('⚠️ Hubo un problema al conectar con el servidor de mapas. Inténtalo de nuevo más tarde.');
    }
  }
};
