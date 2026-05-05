export default {
  command: ['simp', 'simpcheck'],
  category: 'fun',
  run: async (client, m, { args }) => {
    // Detectar a quién analizar (etiqueta o respuesta a mensaje)
    let target = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!target) return m.reply('⚠️ Etiqueta a alguien o responde a su mensaje para analizar su nivel de Simp.');

    const name = `@${target.split('@')[0]}`;
    const porcentaje = Math.floor(Math.random() * 101); // 0 al 100
    
    // Sugerencias brutales
    const sugerencias = [
      "Deja de darle like a sus historias de hace 40 semanas, bro.",
      "Ya ni te contesta y ahí sigues. Ten un poco de dignidad.",
      "Mandarle un 'Buenos días' todos los días no la va a enamorar.",
      "Ese 'te quiero' con sabor a amistad dolió hasta acá.",
      "Soldado caído, repito, ¡soldado caído!",
      "Véndele un riñón, total, ya le diste todo tu orgullo.",
      "Amigo, date cuenta.",
      "¿Ese depósito bancario fue para su suscripción o para su amor? Spoiler: fue para la suscripción.",
      "Escribiste un testamento y te respondió con un 'JAJA qué bien'. Retírate con honor.",
      "Eres el que carga las bolsas en el mall mientras ella ve ropa para su cita con otro."
    ];

    const sugerencia = sugerencias[Math.floor(Math.random() * sugerencias.length)];

    let mensaje = `🕵️‍♂️ *SIMP-CHECK* 🕵️‍♂️\n\n`;
    mensaje += `👤 *Analizando a:* ${name}\n`;
    mensaje += `📊 *Resultado:* Es ${porcentaje}% Simp\n\n`;
    mensaje += `💡 *Sugerencia:* ${sugerencia}`;

    await client.sendMessage(m.chat, { 
      text: mensaje, 
      mentions: [target] 
    }, { quoted: m });
  }
};