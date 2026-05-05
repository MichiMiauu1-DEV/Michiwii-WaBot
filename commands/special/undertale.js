export default {
  command: ['uq', 'ur'],
  category: 'fun',
  run: async (client, m) => {
    const triviaData = [
      { d: "FÁCIL", q: "HUMANO!!!! QUIEN ES EL GUARDIAN MAS GUAPO DE ESTE LUGAR?", o: ["Papyrus", "Sans", "Undyne"], a: "Papyrus" },
      { d: "FÁCIL", q: "¿Cuál es el nombre del protagonista de Undertale?", o: ["Frisk", "Chara", "Papyrus"], a: "Frisk" },
      { d: "MEDIA", q: "¿Cuál es el nombre del hermano de Papyrus?", o: ["Sans", "Undyne", "Alphys"], a: "Sans" },
      { d: "MEDIA", q: "¿Cuál es el nombre del reino donde se desarrolla la historia de Undertale?", o: ["Reino de los Humanos", "Reino de los Monstruos", "Reino de la Tierra"], a: "Reino de los Monstruos" },
      { d: "DIFÍCIL", q: "¿Cuál es el nombre del verdadero villano del juego?", o: ["Flowey", "Sans", "Papyrus"], a: "Flowey" },
      { d: "DIFÍCIL", q: "¿Cuál es el nombre de la científica que creó a los monstruos?", o: ["Dr. Alphys", "Dr. Winky", "Dr. Gerson"], a: "Dr. Alphys" },
      { d: "FÁCIL", q: "HUMANO!!!! ¿Puedes adivinar el nombre de mi hermano?", o: ["Sans", "Papyrus", "Undyne"], a: "Sans" },
      { d: "MEDIA", q: "¿Cuál es el nombre del lugar donde se encuentra la casa de Papyrus?", o: ["Snowdin", "Waterfall", "Hotland"], a: "Snowdin" },
      { d: "MEDIA", q: "¿Cuál es el nombre de la canción que se reproduce en la batalla contra Papyrus?", o: ["Bonetrousle", "Megalovania", "Undertale"], a: "Bonetrousle" },
      { d: "DIFÍCIL", q: "HUMANO!!!! ¿Puedes adivinar el nombre del creador de los monstruos?", o: ["Dr. Alphys", "Dr. Winky", "Dr. Gerson"], a: "Dr. Alphys" },
      { d: "FÁCIL", q: "¿Cuál es el nombre del monstruo que se encuentra en la entrada del subterráneo?", o: ["Flowey", "Sans", "Papyrus"], a: "Flowey" },
      { d: "MEDIA", q: "¿Cuál es el nombre de la ciudad donde se encuentra el castillo de Asriel?", o: ["Snowdin", "Waterfall", "Hotland"], a: "Snowdin" },
      { d: "DIFÍCIL", q: "¿Cuál es el nombre del evento que ocurrió hace 10 años en el juego?", o: ["La Guerra de los Humanos", "La Caída de los Monstruos", "La Gran Limpieza"], a: "La Guerra de los Humanos" },
    ];

    if (!global.db) global.db = {};
    if (!global.db.mc_trivia) global.db.mc_trivia = {};
    if (!global.db.mc_cooldown) global.db.mc_cooldown = {};
    const cmd = m.command ? m.command.toLowerCase() : '';
    const texto = m.text || '';
    const user = m.sender;
    if (cmd === 'uq') {
      const now = Date.now();
      if (global.db.mc_cooldown[user] && now < global.db.mc_cooldown[user]) {
        const restante = Math.ceil((global.db.mc_cooldown[user] - now) / 1000);
        return client.sendMessage(m.chat, { text: `⚠️ Espera ${restante} segundos para otra quest.` }, { quoted: m });
      }
      if (global.db.mc_trivia[user]) {
        return client.sendMessage(m.chat, { text: "❌ Ya tienes una quest activa. ¡Respóndela primero!" }, { quoted: m });
      }
      if (!global.db.triviaIndex) global.db.triviaIndex = 0;
      const item = triviaData[global.db.triviaIndex];
      let options = [...item.o];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      const correctIndex = options.indexOf(item.a) + 1;
      global.db.mc_trivia[user] = {
        a: correctIndex.toString(),
        timer: setTimeout(() => {
          if (global.db.mc_trivia[user]) {
            delete global.db.mc_trivia[user];
            global.db.mc_cooldown[user] = Date.now() + 10000;
            client.sendMessage(m.chat, { text: `⏰ *TIEMPO AGOTADO*\n@${user.split('@')[0]} tardaste demasiado. Perdiste la oportunidad.`, mentions: [user] });
          }
        }, 60000)
      };
      const questionText = `⚔️ *UNDERTALE QUEST* ⚔️\n👤 *JUGADOR:* @${user.split('@')[0]}\n📊 *DIFICULTAD:* ${item.d}\n\n${item.q}\n\n` + options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') + `\n\n*Responde con:* ™ur [número]\n⏱️ Tienes 1 minuto.\n⚠️ Solo 1 oportunidad.`;
      client.sendMessage(m.chat, { text: questionText, mentions: [user] }, { quoted: m });
      global.db.triviaIndex = (global.db.triviaIndex + 1) % triviaData.length;
    }
    if (cmd === 'ur') {
      if (!global.db.mc_trivia[user]) {
        return client.sendMessage(m.chat, { text: "❌ No tienes ninguna quest activa. Usa *™uq* primero." }, { quoted: m });
      }
      const quest = global.db.mc_trivia[user];
      const input = texto.replace(/[^0-9]/g, '').trim();
      if (!input) return client.sendMessage(m.chat, { text: "⚠️ Pon el número de tu respuesta." }, { quoted: m });
      clearTimeout(quest.timer);
      delete global.db.mc_trivia[user];
      global.db.mc_cooldown[user] = Date.now() + 10000;
      if (input === quest.a) {
        await client.sendMessage(m.chat, { text: "🎉 ¡CORRECTO! Has superado la prueba." }, { quoted: m });
      } else {
        await client.sendMessage(m.chat, { text: "❌ ¡INCORRECTO!\n💀 *GAME OVER*. Perdiste tu oportunidad." }, { quoted: m });
      }
    }
  }
}