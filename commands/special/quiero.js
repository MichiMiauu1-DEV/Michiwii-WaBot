export default {
  command: ['quiero'],
  category: 'fun',
  run: async (client, m) => {
    const partes = m.text.split(':');
    if (partes.length < 2) {
      return client.sendMessage(m.chat, { text: 'Por favor, escribe algo después de ":".' }, { quoted: m });
    }
    const texto = partes[1].trim();
    const respuestas = [
      `¿Quieres hablar sobre *${texto}*? Suena buena idea`,
      `Una buena idea es *${texto}* con amigos`,
      `Una buena idea es *${texto}* con ayuda de amigos`,
      `Deberias pensar menos en *${texto}*`,
    ];
    const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];
    await client.sendMessage(m.chat, { text: respuestaAleatoria }, { quoted: m });
  }
}