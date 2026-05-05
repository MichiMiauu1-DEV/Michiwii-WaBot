export default {
  command: ['dox'],
  category: 'fun',
  run: async (client, m, { args, quoted }) => {
    let user
    if (m.mentionedJid.length > 0) {
      user = m.mentionedJid[0]
    } else if (quoted) {
      user = quoted.sender
    } else {
      return client.sendMessage(m.chat, { text: '「✧」 Menciona a alguien para doxear' }, { quoted: m })
    }
    const sent = await client.sendMessage(m.chat, { 
      text: `「🔍」 Buscando información del usuario @${user.split('@')[0]}...`, 
      mentions: [user]
    }, { quoted: m })
    setTimeout(async () => {
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const pass = Math.random().toString(36).substring(2, 10)
      const imei = Math.floor(Math.random() * 1000000000000000).toString()
      const wifiIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      await client.sendMessage(m.chat, { 
        text: `「🔮」 Doxxeo Masivo a: @${user.split('@')[0]}\n` + 
               `*User IP:* ${ip}\n` + 
               `*Wifi Password:* ${pass}\n` + 
               `*IMEI:* ${imei}\n` + 
               `*Router IP:* ${wifiIp}`, 
        edit: sent.key, 
        mentions: [user]
      }, { quoted: m })
    }, 2000)
  },
}