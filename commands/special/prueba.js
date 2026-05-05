export default {
  command: ['xd'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: 'ㅤㅤㅤㅤㅤㅤ' }, { quoted: m })
  },
}