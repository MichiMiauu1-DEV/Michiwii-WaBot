export default {
  command: ["poub", "pou", "poub_si", "poub_no"],

  async run(client, m, args, usedPrefix, command) {
    try {
      // Respuestas directas
      if (command === 'poub_si') return m.reply('😺 Toma tu pou 🧅✨')
      if (command === 'poub_no') return m.reply('🙀 Entonces no hay pou 😔')

      // Enviar lista con interactiveButtons
      await client.sendMessage(m.chat, {
        text: "¿Quieres un pou?",
        footer: "Selecciona una opción",
        interactiveButtons: [
          {
            name: "single_select",
            buttonParamsJson: JSON.stringify({
              title: "🥔 Pou Menu",
              sections: [
                {
                  title: "Opciones",
                  rows: [
                    { title: "🐣 Sí", id: "poub_si" },
                    { title: "❌ No", id: "poub_no" }
                  ]
                }
              ]
            })
          }
        ]
      }, { quoted: m })

    } catch (e) {
      console.log('❌ ERROR POU:', e)
      await m.reply('Error: ' + e.message)
    }
  }
}