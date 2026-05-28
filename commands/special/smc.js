import axios from 'axios';

export default {
  command: ['smc'],
  category: 'game',

  run: async (client, m, { args }) => {
    const chat = m.chat;

    // Restricción de grupo
    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar dentro de un grupo.');

    // 1. Unimos todos los argumentos posibles o usamos el texto completo del mensaje por si acaso
    const textoCompleto = args && args.length > 0 ? args.join(' ') : m.body;

    // 2. Buscamos cualquier número largo (positivo o negativo) en todo el texto del comando
    const coincidencia = textoCompleto.match(/-?\d+/);

    // Si no encuentra ningún número, entonces sí es un uso incorrecto real
    if (!coincidencia) {
      return m.reply('❌ *Uso incorrecto.*\n\nPor favor, proporciona una semilla numérica válida.\nEjemplo: `™smc -3691007458655063350`');
    }

    // Semilla 100% limpia extraída del texto
    const semillaRaw = coincidencia[0];

    await m.reply(`🔍 Calculando mapa y buscando las 10 estructuras de superficie más cercanas para la semilla: *${semillaRaw}*...`);

    try {
      // --- PETICIÓN DINÁMICA A LA API DE MAPAS ---
      const respuestaApi = await axios.get(`https://api.chunkbase.com/v2/minecraft/structures`, {
        params: {
          seed: semillaRaw,
          version: 'bedrock',
          spawnX: 0, 
          spawnZ: 0,
          limit: 10,
          surfaceOnly: true 
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
          
