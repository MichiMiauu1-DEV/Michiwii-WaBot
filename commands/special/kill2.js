export default {
  command: ['kill2'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: 'Hosito gamer se suicida, vidrio remake' }, { quoted: m })
  },
}