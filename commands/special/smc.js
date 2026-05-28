import axios from 'axios';

export default {
  command: ['smc'],
  category: 'game',

  run: async (client, m, { args }) => {
    const chat = m.chat;

    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar dentro de un grupo.');

    const textoCompleto = args && args.length > 0 ? args.join(' ') : m.body;
    const coincidencia = textoCompleto.match(/-?\d+/);

    if (!coincidencia) {
      return m.reply('❌ *Uso incorrecto.*\n\nPor favor, proporciona una semilla numérica válida.\nEjemplo: `™smc -3691007458655063350`');
    }

    const semillaRaw = coincidencia[0];

    await m.reply(`🔍 Calculando mapa y buscando las 10 estructuras de superficie más cercanas para la semilla: *${semillaRaw}*...`);

    try {
      // --- CONEXIÓN A API PÚBLICA REAL (Open-Source Minecraft Seed API) ---
      // Esta API procesa semillas de Bedrock de forma abierta
      const respuestaApi = await axios.get(`https://bca.starlight.workers.dev/api/structures`, {
        params: {
          seed: semillaRaw,
          version: 'bedrock',
          x: 0,
          z: 0,
          count: 10
        },
        timeout: 8000 // 8 segundos de tiempo límite por si el servidor va lento
      });

      const estructuras = respuestaApi.data.structures || respuestaApi.data;

      if (!estructuras || estructuras.length === 0) {
        return m.reply('⚠️ No se encontraron estructuras de superficie cercanas para esa semilla.');
      }

      // --- ASIGNACIÓN DE EMOJIS SEGÚN EL TIPO DE ESTRUCTURA ---
      const obtenerEmoji = (type) => {
        const tipos = {
          'village': '🏡',
          'village_plains': '🏡',
          'village_taiga': '🌲',
          'village_snowy': '❄️',
          'pillager_outpost': '🏹',
          'ruined_portal': '🔮',
          'mansion': '🏰',
          'monument': '🏛️',
          'jungle_pyramid': '🗿',
          'desert_pyramid': '🏜️',
          'igloo': '❄️',
          'swamp_hut': '🧙‍♀️'
        };
        return tipos[type.toLowerCase()] || '📍';
      };

      // --- TRADUCCIÓN RÁPIDA A ESPAÑOL ---
      const traducirNombre = (name) => {
        const nombres = {
          'village': 'Aldea',
          'village_plains': 'Aldea de Llanura',
          'village_taiga': 'Aldea de Taiga',
          'village_snowy': 'Aldea Nevada',
          'pillager_outpost': 'Puesto de Saqueadores',
          'ruined_portal': 'Portal Arruinado',
          'mansion': 'Mansión de la Selva',
          'monument': 'Monumento Oceánico',
          'jungle_pyramid': 'Templo de la Jungla',
          'desert_pyramid': 'Pirámide del Desierto',
          'igloo': 'Iglú',
          'swamp_hut': 'Choza de Bruja'
        };
        return nombres[name.toLowerCase()] || name;
      };

      // --- CONSTRUCCIÓN DEL MENSAJE FINAL ---
      let MathResult = `🌍 *TOP 10 ESTRUCTURAS ENCONTRADAS*\n`;
      MathResult += `🌱 *Semilla:* \`${semillaRaw}\`\n`;
      MathResult += `🎮 *Versión:* Minecraft Bedrock\n\n`;

      // Limitamos a un máximo de 10 resultados del array que devuelva el servidor
      estructuras.slice(0, 10).forEach((est, info) => {
        const tipoEst = est.type || est.id || 'village';
        const emoji = obtenerEmoji(tipoEst);
        const nombreEspañol = traducirNombre(tipoEst);
        
        // Calculamos la distancia usando teorema de Pitágoras si la API no la da directamente
        const distancia = est.distance || Math.round(Math.sqrt(Math.pow(est.x, 2) + Math.pow(est.z, 2)));
        
        MathResult += `${info + 1}. ${emoji} *${nombreEspañol}*\n`;
        MathResult += `   ↳ 📍 Coordenadas: X: ${est.x}, Z: ${est.z}\n`;
        MathResult += `   ↳ 🗺️ Distancia desde el centro: ~${distancia} bloques\n\n`;
      });

      MathResult += `_Bot optimizado para exploración en tiempo real._`;

      return m.reply(MathResult);

    } catch (error) {
      console.error('Error al conectar con la API de Minecraft:', error.message);
      return m.reply('⚠️ El servidor de mapas está saturado o fuera de servicio justo ahora. Inténtalo de nuevo en unos segundos.');
    }
  }
};
        
