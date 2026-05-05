export default {
  command: ['pene', 'nepe'],
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
      nota = "Bro... ¿eso es un miembro o un maní? Mis condolencias. 🥜";
    } else if (medida > 8 && medida <= 15) {
      nota = "Promedio. Ni te emociones ni te deprimas, es lo que hay. 📏";
    } else if (medida > 15 && medida <= 23) {
      nota = "Epa, ahí hay con qué defenderse. ¡Buen equipo! 😎";
    } else {
      nota = "¡CUIDADO! Un paso más y se tropieza con su propia manguera. 🐘🔥";
    }

    let mensaje = `📏 *PITOLÓMETRO 3000* 📏\n\n`;
    mensaje += `👤 *Analizando a:* ${name}\n`;
    mensaje += `📏 *Tamaño:* ${medida} cm\n\n`;
    mensaje += `📝 *Nota:* ${nota}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};