export default {
  command: ['mute', 'mutear', 'silenciar'],
  category: 'admin',
  isAdmin: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null
    if (!who) return m.reply(`《✧》 Menciona o responde al usuario.\n\nEjemplo: *${usedPrefix + command} @user*`)

    if (who === client.user.id.split(':')[0] + '@s.whatsapp.net') return m.reply('No puedo mutearme a mí mismo bro 💀')
    if (global.owner.map(v => v + '@s.whatsapp.net').includes(who)) return m.reply('No puedes mutear a un owner 💀')

    let chat = global.db.data.chats[m.chat] ||= {}
    chat.muted = chat.muted || []

    if (chat.muted.includes(who)) return m.reply('《✧》 Este usuario ya está muteado.')

    chat.muted.push(who)
    // global.db.write() ← QUITADO

    await m.react('🔇')
    m.reply(`《✧》 Usuario @${who.split('@')[0]} muteado.\n\n> Todos sus mensajes serán eliminados automáticamente.`, null, { mentions: [who] })
  },

  before: async (client, m) => {
    if (!m.isGroup ||!m.sender) return

    let chat = global.db.data.chats[m.chat]
    if (!chat?.muted?.length) return

    if (chat.muted.includes(m.sender)) {
      if (global.owner.map(v => v + '@s.whatsapp.net').includes(m.sender)) return

      try {
        await client.sendMessage(m.chat, { delete: m.key })
        return true
      } catch (e) {
        console.log('Error borrando mensaje muteado:', e)
      }
    }
  }
}