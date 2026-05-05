export default {
  command: ['add'],
  category: 'group',
  run: async (client, m) => {

    if (!m.isGroup) return m.reply('❌ Solo en grupos')
    if (!m.isAdmin) return m.reply('❌ Solo admins')
    if (!m.botAdmin) return m.reply('❌ El bot debe ser admin')

    if (!m.quoted) {
      return m.reply('《✧》 Responde a un contacto')
    }

    try {
      await m.react('🕒')

      let number

      // 📇 si es contacto (vCard)
      if (m.quoted.message?.contactMessage) {
        number = m.quoted.message.contactMessage.vcard
          .match(/TEL;.*:(\+?\d+)/)?.[1]
      }

      if (!number) {
        return m.reply('❌ No se pudo obtener el número')
      }

      // limpiar número
      number = number.replace(/\D/g, '') + '@s.whatsapp.net'

      await client.groupParticipantsUpdate(m.chat, [number], 'add')

      await m.react('✔️')
      m.reply(`✅ Usuario añadido:\nwa.me/${number.split('@')[0]}`)

    } catch (e) {
      await m.react('✖️')
      m.reply('Error:\n' + e)
    }
  }
}