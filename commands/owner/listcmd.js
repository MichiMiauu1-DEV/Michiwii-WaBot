import fs from 'fs'
import path from 'path'

export default {
  command: ['listcmd', 'listcommand', 'cmds'],
  category: 'owner',
  isOwner: true,
  run: async (client, m) => {

    try {
      await m.react('🕒')

      const dir = path.resolve('./commands/special')

      // Crear carpeta si no existe
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      const files = fs.readdirSync(dir)
        .filter(file => file.endsWith('.js'))

      if (files.length === 0) {
        await m.react('✔️')
        return m.reply('《✧》 No hay comandos en /commands/chris')
      }

      let lista = files
        .map((file, i) => `❖ ${i + 1}. ${file}`)
        .join('\n')

      await m.react('✔️')

      m.reply(`📂 *Comandos en /commands/special*\n\n${lista}`)

    } catch (e) {
      await m.react('✖️')
      m.reply('Error:\n' + e)
    }
  }
}