export default {
  command: ['pou'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: 'Ño 😠' }, { quoted: m })
  },
}