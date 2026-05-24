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
  command: ['addcommand', 'addcmd'],
  category: 'owner',
  isOwner: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    if (!text) {
      return m.reply(`《✧》 Uso:\n${usedPrefix}${command} carpeta nombre.js|||código\n\n*Ejemplo:* ${usedPrefix}${command} owner test.js|||console.log("hola")`)
    }

    try {
      const parts = text.split('|||')
      const meta = parts[0].trim()
      const code = parts[1]

      const metaArgs = meta.split(/\s+/)
      
      // 📂 Leer dinámicamente las carpetas dentro de ./commands
      const baseDir = path.resolve('./commands')
      if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, { recursive: true })
      }
      const folders = fs.readdirSync(baseDir).filter(f => fs.lstatSync(path.join(baseDir, f)).isDirectory())

      const inputFolder = metaArgs[0]?.toLowerCase()
      const folderIndex = folders.findIndex(f => f.toLowerCase() === inputFolder)

      // 🚫 Si la carpeta no es válida o se le olvidó ponerla
      if (folderIndex === -1) {
        const folderList = folders.map(f => `> • *${f}*`).join('\n')
        return m.reply(`《✧》 ¡Ahí no es, causa! Debes especificar una carpeta válida de tu bot.\n\n📂 *Carpetas disponibles:*\n${folderList || '> (No se encontraron carpetas)'}\n\n*Uso correcto:* ${usedPrefix}${command} owner hola.js|||código`)
      }

      const folderName = folders[folderIndex]
      const filename = metaArgs[1]?.trim()

      if (!filename || !filename.endsWith('.js')) {
        return m.reply(`《✧》 Debes poner un nombre de archivo válido (.js) después de la carpeta. (Ej: ${folderName} test.js)`)
      }

      if (!code || !code.trim()) {
        return m.reply('《✧》 Debes escribir el código del comando después del `|||`.')
      }

      const targetDir = path.join(baseDir, folderName)
      const filePath = path.join(targetDir, filename)

      // 🚫 seguridad básica
      if (filename.includes('..') || folderName.includes('..')) {
        return m.reply('Acceso no permitido 🚫')
      }

      const existe = fs.existsSync(filePath)

      // 💾 guardar archivo en la carpeta seleccionada
      fs.writeFileSync(filePath, code.trim())

      // 🔄 recargar comandos automáticamente
      await reloadCommands(path.join(__dirname, '..'))

      await m.react('✔️')

      m.reply(`《✧》 Archivo *${filename}* ${existe ? 'actualizado' : 'creado'} correctamente en la carpeta *${folderName}*.\n\n⚡ Comandos recargados automáticamente.`)

      // 📝 ENVIAR LOG AL GRUPO DE LOGS
      setTimeout(async () => {
        const fecha = new Date()
        const fechaLocal = fecha.toLocaleDateString('es-MX', {
          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        })

        const user = m.pushName || 'Desconocido'
        const numero = m.sender.split('@')[0]
        const accion = existe ? 'Actualizado' : 'Creado'

        const pp = await client.profilePictureUrl(m.sender, 'image').catch(() => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')

        const logMsg = `🗂️ \`LOGS ADDCMD\`\n\n𖹭 ❖ *Usuario*\n> ${user}\n\n𖹭 ❖ *Número*\n> wa.me/${numero}\n\n𖹭 ❖ *Archivo*\n> ${filename} - ${accion}\n\n𖹭 ❖ *Fecha y hora*\n> ${fechaLocal}\n\n𖹭 ❖ *Ubicación*\n> ./commands/${folderName}/${filename}`

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
              title: 'ꕥ Nuevo Comando Agregado',
              body: `✧ ${accion} en ${folderName}: ${filename}`,
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
