import os from 'os'

export default {
  command: ['ping', 'p'],
  category: 'info',
  run: async (client, m) => {
    const start = Date.now()
    const sent = await client.sendMessage(m.chat, { text: '`❏ ¡Pong!`' + `\n> *${global.db.data.settings[client.user.id.split(':')[0] + "@s.whatsapp.net"].namebot}*`}, { quoted: m })
    const latency = Date.now() - start
    
    // Obtener información real del procesador
    const cpus = os.cpus()
    const cpuModel = cpus.length > 0 ? cpus[0].model.trim() : 'Desconocido'
    const cpuSpeed = cpus.length > 0 ? cpus[0].speed : '0'
    const cpuCores = cpus.length

    // Calcular memoria RAM real (Memoria usada por Node / Memoria total del servidor en GB)
    const totalRamGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1)
    const usedRamMB = (process.memoryUsage().rss / (1024 * 1024)).toFixed(2)

    // Tiempo activo del proceso del bot
    const uptime = process.uptime()
    const days = Math.floor(uptime / (60 * 60 * 24))
    const hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((uptime % (60 * 60)) / 60)
    const seconds = Math.floor(uptime % 60)

    await client.sendMessage(m.chat, { 
      text: `*» Speed* : ${latency} _ms_\n` +
            `*» Processor* : ${cpuModel}\n` +
            `*» CPU* : ${cpuSpeed} MHz (${cpuCores} nucleos)\n` +
            `*» RAM* : ${usedRamMB} MB / ${totalRamGB} GB\n` +
            `*» Active time* : ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`, 
      edit: sent.key 
    }, { quoted: m })
  },
}
