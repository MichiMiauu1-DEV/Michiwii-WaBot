import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 🔥 función para recargar comandos
async function reloadCommands(dir = path.join(__dirname, '..')) {
  const commandsMap = new Map()

  async function readCommands(folder) {
    const files = fs.readdirSync(folder)

    for (const file of files) {
      const fullPath = path.join(folder, file)

      if (fs.lstatSync(fullPath).isDirectory()) {
        await readCommands(fullPath)
      } else if (file.endsWith('.js')) {
        try {
          const { default: cmd } = await import(fullPath + '?update=' + Date.now())

          if (cmd?.command) {
            cmd.command.forEach(c => {
              commandsMap.set(c.toLowerCase(), cmd)
            })
          }
        } catch (err) {
          console.error(`Error recargando ${file}:`, err)
        }
      }
    }
  }

  await readCommands(dir)
  global.comandos = commandsMap
}

export default {
  command: ['delcmd', 'deletecmd', 'rmcmd'],
  category: 'owner',
  isOwner: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    if (!text) {
      return m.reply(`《✧》 Uso:\n${usedPrefix}${command} carpeta archivo.js`)
    }

    try {
      const argsDel = text.trim().split(/\s+/)

      // 📂 Leer dinámicamente las carpetas dentro de ./commands
      const baseDir = path.resolve('./commands')
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true })
      }
      const folders = fs.readdirSync(baseDir).filter(f => fs.lstatSync(path.join(baseDir, f)).isDirectory())

      const inputFolder = argsDel[0]?.toLowerCase()
      const folderIndex = folders.findIndex(f => f.toLowerCase() === inputFolder)

      // 🚫 Si la carpeta no es válida o se le olvidó ponerla
      if (folderIndex === -1) {
        const folderList = folders.map(f => `> • *${f}*`).join('\n')
        return m.reply(`《✧》 No encontré esa carpeta. Debes especificar dónde buscar.\n\n📂 *Carpetas disponibles:*\n${folderList || '> (No se encontraron carpetas)'}\n\n*Uso correcto:* ${usedPrefix}${command} owner test.js`)
      }

      const folderName = folders[folderIndex]
      const filename = argsDel[1]?.trim()

      if (!filename || !filename.endsWith('.js')) {
        return m.reply(`《✧》 Debes poner un archivo válido (.js). Ejemplo: ${usedPrefix}${command} ${folderName} test.js`)
      }

      // 🚫 seguridad básica
      if (filename.includes('..') || folderName.includes('..')) {
        return m.reply('Acceso no permitido 🚫')
      }

      const filePath = path.join(baseDir, folderName, filename)

      if (!fs.existsSync(filePath)) {
        return m.reply(`《✧》 El archivo *${filename}* no existe dentro de la carpeta *${folderName}*.`)
      }

      // 🗑️ eliminar archivo
      fs.unlinkSync(filePath)

      // 🔄 recargar comandos
      await reloadCommands(path.join(__dirname, '..'))

      await m.react('✔️')

      m.reply(`《✧》 Archivo *${filename}* eliminado correctamente de la carpeta *${folderName}*.\n\n⚡ Comandos actualizados automáticamente.`)

      // 📝 ENVIAR LOG AL GRUPO DE LOGS
      setTimeout(async () => {
        const fecha = new Date()
        const fechaLocal = fecha.toLocaleDateString('es-MX', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })

        const user = m.pushName || 'Desconocido'
        const numero = m.sender.split('@')[0]

        const pp = await client.profilePictureUrl(m.sender, 'image').catch(() => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')

        const logMsg = `🗑️ \`LOGS DELCMD\`\n\n𖹭 ❖ *Usuario*\n> ${user}\n\n𖹭 ❖ *Número*\n> wa.me/${numero}\n\n𖹭 ❖ *Archivo*\n> ${filename} - Eliminado\n\n𖹭 ❖ *Fecha y hora*\n> ${fechaLocal}\n\n𖹭 ❖ *Ubicación*\n> ./commands/${folderName}/${filename}`

        await client.sendMessage('120363427969628244@g.us', {
          text: logMsg,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363409104008533@newsletter',
              serverMessageId: 1,
              newsletterName: '𓆩╚𓊈⃟⃞⇱Michiwii Oficial Channel⇲,⃟⃞𓊉╝𓆪'
            },
            externalAdReply: {
              title: 'ꕥ Comando Eliminado',
              body: `✧ Borrado de ${folderName}: ${filename}`,
              thumbnailUrl: pp,
              mediaType: 1,
              renderLargerThumbnail: true,
              showAdAttribution: false
            }
          }
        }).catch(e => console.log('Error enviando log:', e))
      }, 500)

    } catch (e) {
      await m.react('✖️')
      m.reply('Error:\n' + e)
    }
  }
}
