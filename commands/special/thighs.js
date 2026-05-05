export default {
  command: ['thighs'],
  category: 'fun',
  run: async (client, m, { args }) => {
    // Detectar a quién analizar (etiqueta o respuesta a mensaje)
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!target) return m.reply('⚠️ Etiqueta a alguien para medirle esos muslos (thighs).');

    const name = `@${target.split('@')[0]}`;
    // Generar medida aleatoria entre 30cm y 85cm
    const medida = Math.floor(Math.random() * (85 - 30 + 1)) + 30; 

    // Frases según el tamaño
    let nota = "";
    if (medida < 45) {
      nota = "Cuidado, un viento fuerte y se rompen esas piernas de pollo. 🍗";
    } else if (medida >= 45 && medida < 60) {
      nota = "Están en su punto, ni mucho ni poco. Saludable. ✅";
    } else if (medida >= 60 && medida < 75) {
      nota = "Esos muslos detienen balas, ¡qué potencia! ⚡";
    } else {
      nota = "Nivel Chun-Li activado. ¿Eso es un muslo o un tronco de roble? 🌳";
    }

    let mensaje = `🍗 *THIGH-CHECKER 3000* 🍗\n\n`;
    mensaje += `👤 *Analizando a:* ${name}\n`;
    mensaje += `📏 *Tamaño:* ${medida} cm\n\n`;
    mensaje += `📝 *Nota:* ${nota}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};