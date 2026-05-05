export default {
  command: ['girfren'],
  category: 'fun',
  run: async (client, m) => {
    const textos = [
     'Left',
     'Right',
     'Up',
     'Down',
    ];

    const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
    await client.sendMessage(m.chat, { text: textoAleatorio }, { quoted: m });
  },
}