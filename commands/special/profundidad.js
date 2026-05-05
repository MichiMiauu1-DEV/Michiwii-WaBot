export default {
  command: ['profundo'],
  category: 'fun',
  run: async (client, m, { args }) => {
    // Detectar a quién analizar (etiqueta o respuesta a mensaje)
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!target) return m.reply('⚠️ Etiqueta a alguien para medirle el... ya sabes qué.');

    const name = `@${target.split('@')[0]}`;
    // Generar medida aleatoria entre 3cm y 30cm
    const medida = Math.floor(Math.random() * (30 - 3 + 1)) + 3; 

    // Frases según el tamaño
    let nota = "";
    if (medida <= 8) {
      nota = "Bro... Un tubo💀";
    } else if (medida > 8 && medida <= 15) {
      nota = "No jodas we una mano 💀🔥";
    } else if (medida > 15 && medida <= 23) {
      nota = "Epa, te metiste un meteoro💀";
    } else {
      nota = "Le cabe una cabeza💀";
    }

    let mensaje = `📏 *PROFUNDIMETRO 3000* 📏\n\n`;
    mensaje += `👤 *Analizando a:* ${name}\n`;
    mensaje += `📏 *Profundidad:* ${medida} cm\n\n`;
    mensaje += `📝 *Nota:* ${nota}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};