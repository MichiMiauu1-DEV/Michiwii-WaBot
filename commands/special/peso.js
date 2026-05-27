export default {
  command: ['peso', 'cdp'],
  category: 'fun',
  run: async (client, m, args) => {
    if (!args[0] ||!args[1]) {
      return client.sendMessage(m.chat, {
        text: 'Usa el comando así:\n™cdp 70kg Alejandro\nFormato: ™cdp [peso] [nombre]'
      }, { quoted: m })
    }

    const peso = args[0]
    const nombre = args.slice(1).join(' ')

    await client.sendMessage(m.chat, {
      text: `Hola ${peso} tu peso es ${nombre}`
    }, { quoted: m })
  },
}
