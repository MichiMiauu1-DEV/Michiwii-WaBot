export default {
  command: ['listactivos'],
  category: 'game',
  run: async (client, m) => {

    const chatId = m.chat;
    const activos = global.db?.countMsg?.[chatId];

    if (!activos || activos.length === 0) {
      return m.reply("❌ No hay mensajes activos en este chat.");
    }

    // Función para formatear tiempo restante
    const formatTime = (ms) => {
      if (ms <= 0) return "🔴 Enviando ahora";

      const segundos = Math.floor(ms / 1000);
      const horas = Math.floor(segundos / 3600);
      const minutos = Math.floor((segundos % 3600) / 60);
      const seg = segundos % 60;

      let texto = '';
      if (horas > 0) texto += `${horas}h `;
      if (minutos > 0) texto += `${minutos}m `;
      if (seg > 0 || texto === '') texto += `${seg}s`;

      return texto.trim();
    };

    let txt = `📜 *MENSAJES ACTIVOS EN ESTE CHAT*\n\n`;
    txt += `━━━━━━━━━━━━━━━━━━\n\n`;

    activos.forEach((msg, i) => {
      // Calculamos el tiempo restante real (ms - tiempo transcurrido)
      const tiempoOriginal = msg.interval?._repeat || msg.interval?._idleTimeout || 0;
      const tiempoTranscurrido = Date.now() - (msg.lastSent || Date.now() - tiempoOriginal);
      const tiempoRestante = Math.max(0, tiempoOriginal - tiempoTranscurrido);

      txt += `*${i + 1}.* 📩 ${msg.message}\n`;
      txt += `⏳ *Próximo envío:* ${formatTime(tiempoRestante)}\n`;
      txt += `🆔 *ID:* ${msg.id}\n`;
      txt += `━━━━━━━━━━━━━━━━━━\n\n`;
    });

    txt += `💡 Usa *™setcountoff ID* para detener uno.`;

    return m.reply(txt);
  }
};