export default {
  command: ['ping', 'p'],
  category: 'info',
  run: async (client, m) => {
    const start = Date.now()
    const sent = await client.sendMessage(m.chat, { text: '`❏ ¡Pong!`' + `\n> *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot}*`}, { quoted: m })
    const latency = Date.now() - start
    const uptime = process.uptime()
    const days = Math.floor(uptime / (60 * 60 * 24))
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((uptime % (60 * 60)) / 60)
    const seconds = Math.floor(uptime % 60)
    await client.sendMessage(m.chat, { 
      text: `*» Speed* : ${latency} _ms_\n` +
             `*» Processor* : Qualcomm® Snapdragon™ 845\n` +
             `*» CPU* : 2800 MHz\n` +
             `*» RAM* : ${(process.memoryUsage().rss / (1024 * 1024)).toFixed(2)} MB / 6 GB\n` +
             `*» Active time* : ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`, 
      edit: sent.key 
    }, { quoted: m })
  },
}