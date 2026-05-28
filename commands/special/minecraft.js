export default {
  command: ['server', 'mcserver', 'minecraft'],
  category: 'info',
  run: async (client, m, args, usedPrefix, command, text) => {
    
    // Validar si el usuario puso la IP
    if (!text) {
      return m.reply(`《✧》 Uso correcto:\n${usedPrefix}${command} ip:puerto\n\n*Ejemplo:* ${usedPrefix}${command} rbcraft.mcsh.io`)
    }

    try {
      await m.react('🕒')
      
      const ip = text.trim()
      // Consultamos a la API pública de Minecraft Server Status
      const response = await fetch(`https://api.mcsrvstat.us/2/${encodeURIComponent(ip)}`)
      const data = await response.json()

      // Si el servidor está apagado o la IP no existe
      if (!data.online) {
        await m.react('✖️')
        return m.reply(`❌ *¡Servidor Offline!* \n\nNo pude conectarme a \`${ip}\`. Revisa si la IP está bien escrita o si el servidor está encendido, causa.`)
      }

      // Procesar el MOTD (Mensaje del día) limpiando espacios vacíos
      const motd = data.motd && data.motd.clean 
        ? data.motd.clean.map(line => line.trim()).join('\n') 
        : 'Sin MOTD disponible'

      // Procesar la información de los jugadores
      const totalPlayers = data.players.online
      const maxPlayers = data.players.max
      
      let playerList = ''
      if (data.players.list && data.players.list.length > 0) {
        // Mapeamos la lista de nombres con un puntito cada uno
        playerList = data.players.list.map(name => `>   • ${name}`).join('\n')
      } else if (totalPlayers > 0) {
        playerList = `>   _Los nombres están ocultos en la config del server._`
      } else {
        playerList = `>   _No hay nadie conectado actualmente._`
      }

      // Construir la respuesta final bien bonita
      const statusMsg = `🎮 *SERVIDOR DE MINECRAFT* 🎮

✨ *Estado:* \`Online 🟢\`
📍 *IP:* \`${ip}\`
🏷️ *Versión:* ${data.version || 'Desconocida'}

💬 *MOTD:*
\`\`\`
${motd}
\`\`\`

👥 *Jugadores:* [ ${totalPlayers} / ${maxPlayers} ]
${playerList}`

      await m.react('✔️')
      await m.reply(statusMsg)

    } catch (e) {
      console.error(e)
      await m.react('✖️')
      m.reply(' hubo un problema al consultar el servidor de Minecraft:\n' + e)
    }
  }
}
