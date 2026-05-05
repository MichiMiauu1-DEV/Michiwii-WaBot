import { exec } from 'child_process'
import fs from 'fs'
import https from 'https'

export default {
  command: ['speed', 'speedtest'],
  category: 'tools',

  run: async (client, m) => {
    try {
      await m.react('🕒')

      const file = `./tmp/speedtest_${Date.now()}.png`

      exec(`speedtest-cli --share --simple`, (err, stdout) => {
        if (err) {
          m.react('✖️')
          return m.reply('❌ Error ejecutando speedtest')
        }

        const link = stdout.match(/https?:\/\/[^\s]+/)
        if (!link) {
          m.react('✖️')
          return m.reply('❌ No se pudo obtener la imagen')
        }

        const url = link[0] + '.png'

        const fileStream = fs.createWriteStream(file)
        https.get(url, (res) => {
          res.pipe(fileStream)

          fileStream.on('finish', async () => {
            fileStream.close()

            await client.sendMessage(m.chat, {
              image: fs.readFileSync(file),
              caption: '🚀 Speedtest'
            }, { quoted: m })

            fs.unlinkSync(file)
            await m.react('✔️')
          })
        }).on('error', async () => {
          await m.react('✖️')
          m.reply('❌ Error descargando imagen')
        })
      })

    } catch (e) {
      console.error(e)
      await m.react('✖️')
      m.reply('Error:\n' + e)
    }
  }
}