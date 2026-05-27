export default {
  command: ['del', 'delete', 'borrar'],
  category: 'admin',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    if (!m.quoted) return m.reply(`《✧》 Responde al mensaje que quieres borrar.`)

    try {
      // Borra el mensaje citado
      await client.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.quoted.id,
          participant: m.quoted.sender
        }
      })

      // Borra el mensaje del comando ™del
      await client.sendMessage(m.chat, {
        delete: {
          remoteJid: m.chat,
          fromMe: false,
          id: m.key.id,
          participant: m.sender
        }
      })

      // Si falla el segundo delete, no importa. No tira error.
    } catch (e) {
      console.log('Error borrando mensaje:', e)
      m.reply('❌ No pude borrar. Puede que tenga más de 1 hora o el bot no sea admin.')
    }
  }
}
