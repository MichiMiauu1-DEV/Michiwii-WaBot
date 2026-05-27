// --- CONFIGURACIÓN DE BASE DE DATOS ---
if (!global.db) global.db = {};
if (!global.db.events) {
  global.db.events = {
    active: false,    // Estado global de si la hora del evento está corriendo (Martes 10-11 AM)
    startTime: null,
    endTime: null,
    rounds: 0
  };
}
if (!global.db.items) {
  global.db.items = { chats: {} };
}

// --- FUNCIÓN DE INICIO GLOBAL DEL EVENTO ---
function startEvent() {
  global.db.events.active = true;
  global.db.events.startTime = Date.now();
  global.db.events.endTime = Date.now() + (60 * 60 * 1000); // 1 hora de duración estricta
  global.db.events.rounds = 0; 
  console.log("⏰ [EVENTO] La hora del evento 'Lluvia de Tacos' ha comenzado globalmente.");
}

let botClient = null;

export default {
  command: ['event'],
  category: 'game',

  run: async (client, m, { args }) => {
    if (!botClient) botClient = client;
    const chat = m.chat;
    const sender = m.sender;

    // Restricción: El sistema de juego funciona basados en la estructura de grupos
    if (!m.isGroup) return m.reply('❌ Este comando solo se puede usar dentro de un grupo.');

    // Inicializar la base de datos de este grupo específico si no existe
    if (!global.db.items.chats[chat]) {
      global.db.items.chats[chat] = {};
    }
    
    // Por defecto, los eventos están activados (true) al registrarse el grupo por primera vez
    if (global.db.items.chats[chat].enabled === undefined) {
      global.db.items.chats[chat].enabled = true;
    }

    const action = args && args[0] ? args[0].trim().toLowerCase() : '';

    // --- ACCIÓN: ENCENDER EVENTOS EN ESTE GRUPO ---
    if (action === 'on') {
      const metadata = await client.groupMetadata(chat);
      const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;
      if (!isAdmin) return m.reply('❌ Solo los administradores de este grupo pueden usar esto.');

      global.db.items.chats[chat].enabled = true;
      return m.reply('🟢 Los eventos han sido ACTIVADOS para este grupo.');
    }

    // --- ACCIÓN: APAGAR EVENTOS EN ESTE GRUPO ---
    if (action === 'off') {
      const metadata = await client.groupMetadata(chat);
      const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;
      if (!isAdmin) return m.reply('❌ Solo los administradores de este grupo pueden usar esto.');

      global.db.items.chats[chat].enabled = false;
      return m.reply('🔴 Los eventos han sido DESACTIVADOS para este grupo.');
    }

    // --- ACCIÓN: MOSTRAR INFORMACIÓN (™event sin argumentos) ---
    if (action === '') {
      const now = new Date();
      const isChatEnabled = global.db.items.chats[chat].enabled;

      // Si el evento está activo globalmente justo ahora
      if (global.db.events.active) {
        const timeLeft = global.db.events.endTime - Date.now();
        const minLeft = Math.max(0, Math.floor(timeLeft / 60000));
        return m.reply(
`🌮 EVENT SYSTEM STATUS

🟢 Estado en este grupo: ${isChatEnabled ? "ENCENDIDO" : "APAGADO"}
🔥 Evento Actual: ¡Lluvia de Tacos en curso!

⏳ Progreso: Ronda ${global.db.events.rounds}/6
⏰ El evento termina en: ${minLeft} minutos
${!isChatEnabled ? "\n⚠️ *Nota:* Los eventos están apagados aquí, por lo que este grupo no recibirá tacos en las rondas restantes." : ""}`
        );
      }

      // --- CÁLCULO EXACTO DEL TIEMPO RESTANTE ---
      const targetDay = 2;   // Martes
      const targetHour = 10;  // 10:00 AM

      let nextEventDate = new Date();
      nextEventDate.setHours(targetHour, 0, 0, 0);

      const currentDay = now.getDay();
      let daysRemaining = (targetDay - currentDay + 7) % 7;

      if (daysRemaining === 0 && now.getHours() >= targetHour) {
        daysRemaining = 7;
      }

      nextEventDate.setDate(nextEventDate.getDate() + daysRemaining);
      const diffMs = nextEventDate.getTime() - now.getTime();

      const totalDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
      const totalHours = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const totalMinutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));

      const timeString = totalDays > 0 
        ? `${totalDays}d ${totalHours}h ${totalMinutes}m` 
        : `${totalHours}h ${totalMinutes}m`;

      return m.reply(
`🌮 EVENT SYSTEM STATUS

🟢 Estado en este grupo: ${isChatEnabled ? "ENCENDIDO" : "APAGADO"}
🔥 Próximo Evento: Lluvia de Tacos 🌮
📅 Horario: Martes a las 10:00 AM

⏳ Tiempo restante:
⏰ Faltan: ${timeString}`
      );
    }

    return m.reply("❌ Uso: ™event / ™event on / ™event off");
  }
};

// --- INTERVALOS EN SEGUNDO PLANO (CRONS) ---

// 1. SENSOR DE RECOGNICIÓN HORARIA (Verifica el reloj para iniciar el Martes a las 10:00 AM)
setInterval(() => {
  const d = new Date();
  if (d.getDay() === 2 && d.getHours() === 10 && d.getMinutes() === 0) {
    if (!global.db.events.active) startEvent();
  }
}, 30 * 1000); // Revisa cada 30 segundos para máxima precisión de entrada

// 2. REPARTIDOR DE RECOMPENSAS (6 Rondas / 1 cada 10 minutos)
setInterval(async () => {
  if (!botClient || !global.db.events.active) return;
  
  // Apagado de seguridad si excede el límite temporal o las rondas estipuladas
  if (Date.now() > global.db.events.endTime || global.db.events.rounds >= 6) {
    global.db.events.active = false;
    return;
  }

  global.db.events.rounds++;

  const chats = Object.keys(global.db.items.chats || {});
  
  for (const chat of chats) {
    try {
      // Filtro por grupo: Si los admins lo apagaron de forma local, el bot salta al siguiente chat
      if (global.db.items.chats[chat].enabled === false) continue;

      const metadata = await botClient.groupMetadata(chat);
      const users = metadata.participants || [];
      if (!users.length) continue;

      // Selección aleatoria: Un usuario al azar exclusivamente de la lista de este grupo
      const randomUser = users[Math.floor(Math.random() * users.length)].id;
      const tacos = Math.floor(Math.random() * 21) + 10; // Rango de recompensa: 10 a 30

      // Estructuración interna en DB para el usuario premiado en este chat
      if (!global.db.items.chats[chat][randomUser]) {
        global.db.items.chats[chat][randomUser] = { "tacos 🌮": 0 };
      }
      global.db.items.chats[chat][randomUser]["tacos 🌮"] += tacos;

      // Envío del mensaje al respectivo grupo
      await botClient.sendMessage(chat, {
        text: `🌮 ¡LLUVIA DE TACOS (Ronda ${global.db.events.rounds}/6)! 🌮\n\nUn delicioso taco cayó del cielo en este grupo e impactó a:\n\n👤 @${randomUser.split('@')[0]}\n🎁 Recompensa: +${tacos} tacos 🌮`,
        mentions: [randomUser]
      });
    } catch (e) {
      console.log(`Error enviando lluvia al chat ${chat}: ${e.message}`);
    }
  }
}, 10 * 60 * 1000); // Frecuencia fija de 10 minutos
        
