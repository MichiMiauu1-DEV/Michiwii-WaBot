if (!global.db) global.db = {};
if (!global.db.countMsg) global.db.countMsg = {};

export default {
  command: ['setcounton'],
  category: 'game',
  run: async (client, m) => {

    const body = m.body?.slice(m.body.indexOf(' ') + 1)?.trim();
    if (!body) return m.reply("❌ Usa: ™setcounton mensaje/tiempo");

    // Dividir el mensaje y el tiempo por la barra "/"
    const [message, timeRaw] = body.split('/');
    if (!message || !timeRaw) return m.reply("❌ Formato incorrecto. Usa: ™setcounton mensaje/tiempo");

    let ms = 0;
    const timeArr = timeRaw.split(' ');  // Separar todas las partes del tiempo
    let valid = false;

    // Recorrer el array de tiempos y convertir cada uno
    timeArr.forEach(time => {
      const match = time.match(/^(\d+)(s|m|h)$/i);  // Validar formato (número + unidad de tiempo)
      if (match) {
        valid = true;
        const num = Number(match[1]);
        const type = match[2];

        // Convierte el tiempo a milisegundos
        if (type === 's') ms += num * 1000;  // Segundos
        if (type === 'm') ms += num * 60000; // Minutos
        if (type === 'h') ms += num * 3600000; // Horas
      }
    });

    if (!valid) return m.reply("❌ Usa 10s, 5m, 1h (Ejemplo: 1m 10s)");

    const chatId = m.chat;

    // Inicializa la estructura en la base de datos si no existe
    if (!Array.isArray(global.db.countMsg[chatId])) {
      global.db.countMsg[chatId] = [];
    }

    const id = Date.now(); // ID único para cada mensaje

    // Establece el intervalo que enviará el mensaje repetidamente
    const interval = setInterval(() => {
      client.sendMessage(chatId, { text: message });
    }, ms);

    // Guardamos la configuración del mensaje y el intervalo en la base de datos
    global.db.countMsg[chatId].push({
      id,
      message,
      interval
    });

    // Confirmación de activación
    m.reply(`✅ Activado\n📩 El mensaje será enviado cada ${timeRaw}\n🆔 ID: ${id}`);
  }
};