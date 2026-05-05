export default {
  command: ['boffin'],
  category: 'fun',
  run: async (client, m) => {
    const textos = [
      'Bo Bee Po', // 1
      'Bo Be Paa', // 2
      'A I U a U', // 3
      'A I a A U U e a aI e Iai ei Ijueput', // 4
      'Brr skibdi Top Auiauaiaauuauaua', //  5
      'BO bi bo pe bo', // 6
      'Ba bi puuuu', // 7
      'I a a u u e a ', // 8 JAJAJJA
      'Brr skbdap bup bi',  //9
      'Beep ba doo beeeeep Bap', //10
      'Beep ba doo beeeeep Bap ',
    ];

    const textoAleatorio = textos[Math.floor(Math.random() * textos.length)];
    await client.sendMessage(m.chat, { text: textoAleatorio }, { quoted: m });
  },
}