
import fs from 'fs'
import { exec } from 'child_process'

export default {
  command: ['cc'],
  isOwner: true,
  category: 'tools',
  run: async (client, m) => {
    exec('rm -v tmp-*', (error, stdout, stderr) => {
      if (error) {
        return client.sendMessage(m.chat, { text: '「⚠️」 Error al eliminar archivos temporales.' }, { quoted: m })
      }
      const archivos = stdout.trim().split('\n').filter(line => line.includes('removed'))
      const nombres = archivos.map(line => line.replace('removed ', '').trim())
      const count = nombres.length
      exec('du -sh tmp 2>/dev/null', (error, stdout, stderr) => {
        let size = '0 kb'
        if (!error && stdout) {
          size = stdout.trim().split('\t')[0]
        }
        const mensaje = `「🗑️」 Se han eliminado ${count} archivos temporales.\n` +
                        `(*${size}* Almacenamiento recuperado)\n` +
                        `Archivos eliminados:\n${nombres.join('\n')}`
        client.sendMessage(m.chat, { text: mensaje }, { quoted: m })
      })
    })
  },
}