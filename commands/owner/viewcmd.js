import fs from 'fs'
import path from 'path'

export default {
  command: ['viewcmd', 'vercmd'],
  category: 'owner',
  isOwner: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    if (!text) {
      return m.reply('《✧》 Uso:\nviewcmd archivo.js')
    }

    try {
      await m.react('🕒')

      const filename = text.trim()

      if (!filename.endsWith('.js')) {
        return m.reply('《✧》 Debes poner un archivo válido (.js)')
      }

      const dir = path.resolve('./commands/special')
      const filePath = path.join(dir, filename)

      if (!fs.existsSync(filePath)) {
        return m.reply(`《✧》 El archivo *${filename}* no existe.`)
      }

      const content = fs.readFileSync(filePath, 'utf-8')

      await m.react('✔️')

      m.reply(`📄 *${filename}*\n\n\`\`\`js\n${content}\n\`\`\``)

    } catch (e) {
      await m.react('✖️')
      m.reply('Error:\n' + e)
    }
  }
}