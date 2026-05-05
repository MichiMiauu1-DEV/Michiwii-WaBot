export default {
  command: ['pou2'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: 'Ñam😋' }, { quoted: m })
  },
}