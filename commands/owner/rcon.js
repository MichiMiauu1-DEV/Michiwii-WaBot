import { Rcon } from 'rcon-client'

// ⚙️ CONFIGURACIÓN REAL DE TU HOST EN MCSERVERHOST
const RCON_CONFIG = {
  host: '144.31.46.14',
  port: 13576,
  password: 'TeAmoRBC121:3'
}

// 📱 SÓLO USTEDES DOS TIENEN EL PODER
const NUMEROS_AUTORIZADOS = ['50376317690', '51972401983']

export default {
  command: ['rcon', 'mccmd', 'console'],
  category: 'owner',
  isOwner: true, 
  run: async (client, m, args, usedPrefix, command, text) => {

    // 🔒 Filtro de seguridad por número
    const numeroSender = m.sender.split('@')[0]
    if (!NUMEROS_AUTORIZADOS.includes(numeroSender)) {
      await m.react('🚫')
      return m.reply('❌ *Acceso denegado.* No estás en la lista de dueños autorizados para usar la consola. 🚫')
    }

    if (!text) {
      return m.reply(`《✧》 Uso correcto:\n${usedPrefix}${command} <comando>\n\n*Ejemplos:*\n${usedPrefix}${command} op mi_usuario\n${usedPrefix}${command} say ¡Hola desde WhatsApp!\n${usedPrefix}${command} list`)
    }

    try {
      await m.react('🕒')

      // Conexión RCON
      const rcon = await Rcon.connect({
        host: RCON_CONFIG.host,
        port: Number(RCON_CONFIG.port),
        password: RCON_CONFIG.password
      })

      // Enviar comando limpiando barras diagonales innecesarias
      const comandoLimpio = text.trim().startsWith('/') ? text.trim().slice(1) : text.trim()
      const response = await rcon.send(comandoLimpio)

      // Cerrar conexión
      await rcon.end()

      // Limpiar formatos de color de Minecraft (§a, §e, etc.)
      const limpiaResponse = response.replace(/§[0-9a-fk-orx]/gi, '').trim()

      await m.react('✔️')
      await m.reply(`💻 *Consola de Minecraft:* \n\n\`\`\`\n${limpiaResponse || 'Comando ejecutado correctamente.'}\n\`\`\``)

    } catch (e) {
      console.error(e)
      await m.react('✖️')
      m.reply(`❌ *Error de conexión RCON:*\n\nNo se pudo conectar al servidor de Minecraft.\n\n_Asegúrate de haber reiniciado tu servidor de Minecraft en el panel después de guardar el server.properties._`)
    }
  }
}
