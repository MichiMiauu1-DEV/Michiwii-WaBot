import { startSubBot } from '../../lib/subs.js'

export default {
  command: ['code'],
  category: 'socket',
  run: async (client, m) => {
    try {
      await m.react('🕒')

      if (!global.commandFlags) global.commandFlags = {}

      if (global.commandFlags[m.sender]) {
        return m.reply('⏳ Ya estás generando un código...')
      }

      global.commandFlags[m.sender] = true

      const numero = m.sender.split('@')[0]

      await startSubBot(
        m,
        client,
        '`✤` Vincula tu *cuenta* usando el *codigo.*\n \n> ✥ Sigue las *instrucciones*\n *›* Click en los *3 puntos*\n *›* Toque *dispositivos vinculados*\n *›* Vincular *nuevo dispositivo*\n *›* Selecciona *Vincular con el número de teléfono*\n\nꕤ *`Importante`* \n> ₊·( 🜸 ) ➭ Este *Código* solo funciona en el *número que lo solicito*',
        true,
        numero,
        m.chat,
        global.commandFlags,
        true
      )

      await m.react('✔️')

    } catch (e) {
      console.error(e)
      await m.react('✖️')
      m.reply('Error:\n' + e)

      if (global.commandFlags) {
        delete global.commandFlags[m.sender]
      }
    }
  }
}