export default {
  command: ['iq'],
  category: 'fun',
  run: async (client, m, { args }) => {
    // Detectar a quién analizar (etiqueta o respuesta a mensaje)
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!target) return m.reply('⚠️ Etiqueta a alguien para medir su capacidad cerebral.');

    const name = `@${target.split('@')[0]}`;
    // Generar IQ aleatorio entre 10 y 200
    const iq = Math.floor(Math.random() * (200 - 10 + 1)) + 10; 

    // Niveles basados en anime
    let rango = "";
    let nota = "";

    if (iq >= 180) {
      rango = "Nivel Sora (No Game No Life) 👑";
      nota = "¡Los blancos nunca pierden! Tienes un cerebro galáctico, eres un genio absoluto.";
    } else if (iq >= 150 && iq < 180) {
      rango = "Nivel L (Death Note) 🍭";
      nota = "Calculador y analítico. Estás a un paso de resolver cualquier misterio del mundo.";
    } else if (iq >= 110 && iq < 150) {
      rango = "Nivel Norman (The Promised Neverland) 💡";
      nota = "Tu inteligencia es superior al promedio. Siempre tienes un plan bajo la manga.";
    } else if (iq >= 85 && iq < 110) {
      rango = "Humano Promedio 😐";
      nota = "No destacas por tu genio, pero al menos sabes cómo usar un cepillo de dientes.";
    } else {
      rango = "Nivel Bakugo (Enojado) 💥";
      nota = "Primero gritas y luego piensas. Tu IQ está luchando por sobrevivir hoy.";
    }

    let mensaje = `🧠 *ANALIZADOR DE IQ* 🧠\n\n`;
    mensaje += `👤 *Usuario:* ${name}\n`;
    mensaje += `📊 *IQ:* ${iq}\n`;
    mensaje += `🏆 *Rango:* ${rango}\n\n`;
    mensaje += `📝 *Comentario:* ${nota}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};