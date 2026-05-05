export default {
  command: ['mortadela'],
  category: 'fun',
  run: async (client, m) => {
    await client.sendMessage(m.chat, { text: 'Chicos estoy comiendo mortadela.' }, { quoted: m })
  },
}