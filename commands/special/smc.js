import axios from 'axios';

export default {
  command: ['smc'],
  category: 'game',

  run: async (client, m, { args }) => {
    const chat = m.chat;

    // Restricción de grupo (igual que en tu comando de eventos)
    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar dentro de un grupo.');

    // Validar si hay argumentos iniciales
    if (!args || !args[0]) {
      return m.reply('❌ *Uso incorrecto.*\n\nPor favor, proporciona una semilla.\nEjemplo: `™smc -3691007458655063350`');
    }

    const argumento = args[0].trim();

    // Extraemos el número de forma segura ignorando espacios fantasmas o caracteres del split
    const coincidencia = argumento.match(/-?\d+/);

    if (!coincidencia) {
      return m.reply('❌ *Error:* Por favor, introduce una semilla numérica válida.');
    }

    // Semilla totalmente limpia y lista para la API
    const semillaRaw = coincidencia[0];

    await m.reply(`🔍 Calculando mapa y buscando las 10 estructuras de superficie más cercanas para la semilla: *${semillaRaw}*...`);

    try {
      // --- PETICIÓN DINÁMICA A LA API DE MAPAS ---
      const respuestaApi = await axios.get(`https://api.chunkbase.com/v2/minecraft/structures`, {
        params: {
          seed: semillaRaw,
          version: 'bedrock',
          spawnX: 0, // Coordenada central estimada para la búsqueda
          spawnZ: 0,
          limit: 10,
          surfaceOnly: true // Filtro estricto para ignorar estructuras subterráneas
        }
      });

      const estructuras = respuestaApi.data.structures;

      if (!estructuras || estructuras.length === 0) {
        return m.reply('⚠️ No se encontraron estructuras de superficie cercanas para esa semilla.');
      }

      // --- ASIGNACIÓN DE EMOJIS SEGÚN EL TIPO DE ESTRUCTURA ---
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

      // --- CONSTRUCCIÓN DEL MENSAJE FINAL ---
      let MathResult = `🌍 *TOP 10 ESTRUCTURAS ENCONTRADAS*\n`;
      MathResult += `🌱 *Semilla:* \`${semillaRaw}\`\n`;
      MathResult += `🎮 *Versión:* Minecraft Bedrock\n\n`;

      estructuras.forEach((est, info) => {
        const emoji = obtenerEmoji(est.type);
        // Usa el nombre traducido si la API lo da, de lo contrario usa el original
        const nombreLimpio = est.name_es || est.name; 
        
        MathResult += `${info + 1}. ${emoji} *${nombreLimpio}*\n`;
        MathResult += `   ↳ 📍 Coordenadas: X: ${est.x}, Z: ${est.z}\n`;
        MathResult += `   ↳ 🗺️ Distancia: ~${est.distance} bloques\n\n`;
      });

      MathResult += `_Bot optimizado para exploración en tiempo real._`;

      return m.reply(MathResult);

    } catch (error) {
      console.error('Error al conectar con la API de Minecraft:', error);
      return m.reply('⚠️ Hubo un problema al conectar con el servidor de mapas. Inténtalo de nuevo más tarde.');
    }
  }
};
        
