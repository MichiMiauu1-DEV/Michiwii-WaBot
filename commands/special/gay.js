export default {
  command: ['gay'],
  category: 'fun',
  run: async (client, m, { args }) => {
    // Detectar a quién analizar (etiqueta o respuesta a mensaje)
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!target) return m.reply('⚠️ Etiqueta a alguien para ver qué tan sospechoso es.');

    const name = `@${target.split('@')[0]}`;
    const porcentaje = Math.floor(Math.random() * 101); // 0 al 100

    // Frases para el resultado
    const frases = [
      "Se le nota desde que entra al grupo.",
      "El radar está pitando como loco con este usuario.",
      "Es 100% real, no fake.",
      "Ya sal del clóset, bro, ahí hasta hay humedad.",
      "Sospechoso... muy sospechoso.",
      "A este paso vas a ser el protagonista de la próxima novela de Wattpad.",
      "Ni confirmamos ni desmentimos, pero las pruebas hablan solas.",
      "Ese 'hola' que mandaste ayer tenía mucha energía de arcoíris.",
      "Tu historial de búsqueda de Pinterest te delata.",
      "La ciencia no miente, el resultado es definitivo."
    ];

    const frase = frases[Math.floor(Math.random() * frases.length)];

    let mensaje = `🌈 *GAY-CHECKER 3000* 🌈\n\n`;
    mensaje += `👤 *Analizando a:* ${name}\n`;
    mensaje += `📊 *Resultado:* ${porcentaje}% Gay\n\n`;
    mensaje += `📝 *Nota:* ${frase}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};