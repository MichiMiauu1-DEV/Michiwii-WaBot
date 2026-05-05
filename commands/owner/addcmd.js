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
      return m.reply('《✧》 Uso:\naddcommand nombre.js|||código')
    }

    try {
      await m.react('🕒')

      const [filenameRaw, code] = text.split('|||')
      const filename = filenameRaw?.trim()

      if (!filename || !filename.endsWith('.js')) {
        return m.reply('《✧》 Debes poner un nombre válido (ej: hola.js)')
      }

      if (!code) {
        return m.reply('《✧》 Debes escribir el código del comando.')
      }

      const dir = path.resolve('./commands/special')
      const filePath = path.join(dir, filename)

      // 🚫 seguridad básica
      if (filename.includes('..')) {
        return m.reply('Acceso no permitido 🚫')
      }

      // 📁 crear carpeta si no existe
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const existe = fs.existsSync(filePath)

      // 💾 guardar archivo
      fs.writeFileSync(filePath, code.trim())

      // 🔄 recargar comandos automáticamente
      await reloadCommands(path.join(__dirname, '..'))

      await m.react('✔️')

      m.reply(`《✧》 Archivo *${filename}* ${existe ? 'actualizado' : 'creado'} correctamente.

⚡ Comandos recargados automáticamente.`)

      // 📝 ENVIAR LOG AL GRUPO DE LOGS
      setTimeout(async () => {
        const fecha = new Date()
        const fechaLocal = fecha.toLocaleDateString('es-MX', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })

        const user = m.pushName || 'Desconocido'
        const numero = m.sender.split('@')[0]
        const accion = existe ? 'Actualizado' : 'Creado'

        const pp = await client.profilePictureUrl(m.sender, 'image')
          .catch(() => 'https://cdn.yuki-wabot.my.id/files/nufq.jpeg')

        const logMsg = `🗂️ \`LOGS ADDCMD\`

𖹭 ❖ *Usuario*
> ${user}

𖹭 ❖ *Número*
> wa.me/${numero}

𖹭 ❖ *Archivo*
> ${filename} - ${accion}

𖹭 ❖ *Fecha y hora*
> ${fechaLocal}

𖹭 ❖ *Ubicación*
> ./commands/special/${filename}`

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
              body: `✧ ${accion}: ${filename}`,
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