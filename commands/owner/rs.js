export default {
  command: ['frestart'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: '✎ Reiniciando el Socket...\n > *Espere un momento...*' }, { quoted: m })
  },
}