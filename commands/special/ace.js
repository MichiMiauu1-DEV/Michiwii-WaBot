global.acertijos = global.acertijos || {};
global.cooldownAce = global.cooldownAce || {};

export default {
  command: ['ace', 'resace'],
  category: 'games',

  run: async (client, m, args, usedPrefix, command) => {
    try {

      const id = m.chat;
      const userId = m.sender;

      if (command === 'ace') {

        if (global.cooldownAce[m.sender]) {
          return m.reply('⏳ Espera unos segundos antes de pedir otro acertijo.');
        }

        if (global.acertijos[id]) {
          return m.reply('⚠️ Ya hay un acertijo activo en este chat.');
        }

        const banco = [
          { pregunta: "Vuelo sin alas, lloro sin ojos. ¿Qué soy?", respuesta: "nube" },
          { pregunta: "Cuanto más hay, menos ves. ¿Qué es?", respuesta: "oscuridad" },
          { pregunta: "Tengo ciudades pero no casas, montañas pero no árboles y agua pero no peces.", respuesta: "mapa" },
          { pregunta: "Si me nombras, desaparezco.", respuesta: "silencio" },
          { pregunta: "Siempre estoy en el futuro pero nunca llego.", respuesta: "mañana" },
          { pregunta: "Tengo dientes pero no muerdo, guardo tesoros pero no tengo manos.", respuesta: "llave" },
          { pregunta: "Oro parece, plata no es. El que no lo adivine, bien tonto es.", respuesta: "platano" },
          { pregunta: "Te sigo todo el día, pero cuando el sol se va, yo también.", respuesta: "sombra" },
          { pregunta: "Se rompe sin tocarlo, con solo una palabra.", respuesta: "secreto" },
          { pregunta: "Pobres lo tienen, ricos lo necesitan y si lo comes, mueres.", respuesta: "nada" }
        ];

        const acertijo = banco[Math.floor(Math.random() * banco.length)];

        global.acertijos[id] = {
          pregunta: acertijo.pregunta,
          respuesta: acertijo.respuesta.toLowerCase(),
          vidas: 3
        };

        setTimeout(() => {
          if (global.acertijos[id]) {
            delete global.acertijos[id];
            client.sendMessage(id, { text: '⏰ Se acabó el tiempo para este acertijo.' });
          }
        }, 60000);

        global.cooldownAce[m.sender] = true;
        setTimeout(() => delete global.cooldownAce[m.sender], 7000);

        return m.reply(
          `🧩 *ACERTIJO*\n\n` +
          `❓ ${acertijo.pregunta}\n\n` +
          `❤️ Vidas: 3\n` +
          `⏱️ Tiempo: 60s\n\n` +
          `Responde con: *${usedPrefix}resace respuesta*`
        );
      }

      if (command === 'resace') {

        const data = global.acertijos[id];
        if (!data) return m.reply('❌ No hay ningún acertijo activo en este momento.');

        let respuestaUsuario = (args.join(' ') || '').toLowerCase().trim();

        if (!respuestaUsuario) {
          return m.reply('⚠️ Escribe tu respuesta.');
        }

        respuestaUsuario = respuestaUsuario.replace(/^el |^la |^los |^las |^un |^una |^unos |^unas /, '');

        if (respuestaUsuario === data.respuesta) {

          delete global.acertijos[id];

          if (!global.db) global.db = {};
          if (!global.db.users) global.db.users = {};
          if (!global.db.users[userId]) global.db.users[userId] = {};
          if (!global.db.users[userId].acertijosCorrectos) global.db.users[userId].acertijosCorrectos = 0;
          if (!global.db.users[userId].achievements) global.db.users[userId].achievements = [];

          global.db.users[userId].acertijosCorrectos++;

          const cantidad = global.db.users[userId].acertijosCorrectos;

          await m.reply(
            `✅ *CORRECTO*\n\n🎯 Acertados: *${cantidad}*`
          );

          const tieneLogro = global.db.users[userId].achievements.some(a => a.id === "cazador_respuestas");

          if (cantidad === 20 && !tieneLogro) {
            global.db.users[userId].achievements.push({
              id: "cazador_respuestas",
              name: "Cazador de Respuestas",
              emoji: "🎯",
              description: "Responder correctamente 20 acertijos",
              date: Date.now()
            });

            if (global.db.write) await global.db.write();

            await m.reply(
              `🏆 *LOGRO DESBLOQUEADO*\n\n🎯 Cazador de Respuestas`
            );
          }

          return;
        }

        data.vidas--;

        if (data.vidas <= 0) {
          const correcta = data.respuesta;
          delete global.acertijos[id];

          return m.reply(
            `💀 *SIN VIDAS*\n\n✔️ Respuesta: *${correcta}*`
          );
        }

        return m.reply(
          `❌ Incorrecto\n❤️ Vidas: ${data.vidas}`
        );
      }

    } catch (e) {
      console.error(e);
      m.reply('❌ Error en el sistema.');
    }
  }
};