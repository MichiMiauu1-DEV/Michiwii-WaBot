const msToTime = (duration) => {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  const days = Math.floor(duration / (1000 * 60 * 60 * 24))

  const s = seconds.toString().padStart(2, '0')
  const m = minutes.toString().padStart(2, '0')
  const h = hours.toString().padStart(2, '0')
  const d = days.toString()

  const parts = []
  if (days > 0) parts.push(`${d} día${d > 1? 's' : ''}`)
  if (hours > 0) parts.push(`${h} hora${h > 1? 's' : ''}`)
  if (minutes > 0) parts.push(`${m} minuto${m > 1? 's' : ''}`)
  parts.push(`${s} segundo${s > 1? 's' : ''}`)

  return parts.join(', ')
}

export default {
  command: ['report', 'reporte', 'sug', 'suggest'],
  category: 'info',
  info: {
    desc: 'Envía un reporte o sugerencia al staff',
    usage: '.report <texto>'
  },
  isOwner: false,
  isAdmin: false,
  botAdmin: false,
  run: async (client, m, args, usedPrefix, command, text) => {

    m.react('✔️')

    const texto = text.trim()
    const now = Date.now()
    const userData = global.db.data.users[m.sender] || {}

    let cooldown = userData.sugCooldown || 0

    if (cooldown - now > 10000) {
      cooldown = 0
      global.db.data.users[m.sender].sugCooldown = 0
    }

    const restante = cooldown - now

    if (restante > 0) {
      return m.reply(`ꕥ Espera *${msToTime(restante)}* para volver a usar este comando.`)
    }

    if (!texto) {
      return m.reply(`《✧》 Debes escribir el reporte o sugerencia.\n\nEjemplo: *${usedPrefix + command} El comando play no funciona*`)
    }

    if (texto.length < 10) {
      return m.reply('《✧》 Tu mensaje es demasiado corto. Mínimo 10 caracteres.')
    }

    const esReporte = ['report', 'reporte'].includes(command)

    m.reply(`《✧》 Gracias por tu *${esReporte? 'reporte' : 'sugerencia'}*

> Tu mensaje fue enviado correctamente a los moderadores y dueños.`)

    global.db.data.users[m.sender].sugCooldown = now + 2000

    // Envío en segundo plano para no trabar el bot
    setTimeout(async () => {
      const fecha = new Date()
      const fechaLocal = fecha.toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      const tipo = esReporte? '🆁ҽ𝕡σɾƚҽ' : '🆂մց𝕖ɾҽ𝚗cíᥲ'
      const tipo2 = esReporte? 'ꕥ Reporte' : 'ꕥ Sugerencia'

      const user = m.pushName || 'Usuario desconocido'
      const numero = m.sender.split('@')[0]

      const pp = await client.profilePictureUrl(m.sender, 'image')
     .catch(() => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')

      const reportMsg = `🫗۫᷒ᰰ⃘ׅ᷒ ۟ \`${tipo}\`

𖹭 ❖ *Nombre*
> ${user}

𖹭 ❖ *Número*
> wa.me/${numero}

𖹭 ❖ *Fecha*
> ${fechaLocal}

𖹭 ❖ *Mensaje*
> ${texto}
`

      const destinatarios = [
    ...global.owner.map(num => `${num}@s.whatsapp.net`),
        '120363407722554675@g.us' // Grupo de staff
      ]

      await Promise.all(
        destinatarios.map(jid =>
          client.sendMessage(jid, {
            text: reportMsg,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363409104008533@newsletter',
                serverMessageId: 1,
                newsletterName: '𓆩╚𓊈⃟⃞⇱Michiwii Oficial Channel⇲,⃟⃞𓊉╝𓆪'
              },
              externalAdReply: {
                title: tipo2,
                body: '✧ Atento Staff, revisen esto.',
                thumbnailUrl: pp,
                mediaType: 1,
                renderLargerThumbnail: true,
                showAdAttribution: false
              }
            }
          }).catch(() => {})
        )
      )
    }, 100)
  },
}