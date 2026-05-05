export default {
  command: ['unmute', 'desmutear'],
  category: 'admin',
  isAdmin: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null
    if (!who) return m.reply(`《✧》 Menciona o responde al usuario.\n\nEjemplo: *${usedPrefix + command} @user*`)

    let chat = global.db.data.chats[m.chat] ||= {}
    chat.muted = chat.muted || []

    if (!chat.muted.includes(who)) return m.reply('《✧》 Este usuario no está muteado.')

    chat.muted = chat.muted.filter(u => u!== who)
    // await global.db.write() ← QUITADO PA SIEMPRE

    await m.react('🔊')
    m.reply(`《✧》 Usuario @${who.split('@')[0]} desmuteado.\n\n> Ya puede enviar mensajes normal.`, null, { mentions: [who] })
  }
}