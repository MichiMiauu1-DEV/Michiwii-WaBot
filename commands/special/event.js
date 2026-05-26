if (!global.db) global.db = {};

if (!global.db.events) {
  global.db.events = {
    enabled: true,
    active: false,
    startTime: null,
    endTime: null
  };
}

if (!global.db.items) {
  global.db.items = { chats: {} };
}

function startEvent() {
  global.db.events.active = true;
  global.db.events.startTime = Date.now();
  global.db.events.endTime = Date.now() + (60 * 60 * 1000);
}

export default {
  command: ['event'],
  category: 'game',

  run: async (client, m, { args }) => {

    const chat = m.chat;
    const sender = m.sender;

    const metadata = await client.groupMetadata(chat);
    const isAdmin = metadata.participants.find(p => p.id === sender)?.admin;

    const action = args[0]?.toLowerCase();

    if (action === 'on') {
      if (!isAdmin) return m.reply('❌ Solo admins');
      global.db.events.enabled = true;
      return m.reply('🟢 Eventos ACTIVADOS');
    }

    if (action === 'off') {
      if (!isAdmin) return m.reply('❌ Solo admins');
      global.db.events.enabled = false;
      return m.reply('🔴 Eventos DESACTIVADOS');
    }

    if (!action) {

      const now = new Date();

      const schedule = {
        1: 10,
        2: 14,
        3: 18,
        4: 8,
        5: 22,
        6: 5,
        0: 1
      };

      const days = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

      let nextEvent = null;
      let minDiff = Infinity;

      for (let i = 0; i < 7; i++) {

        const d = new Date();
        d.setDate(d.getDate() + i);

        const dayIndex = d.getDay();
        const hour = schedule[dayIndex];

        if (hour === undefined) continue;

        const eventTime = new Date();
        eventTime.setDate(eventTime.getDate() + i);
        eventTime.setHours(hour, 0, 0, 0);

        const diff = eventTime - now;

        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextEvent = { day: dayIndex, hour };
        }
      }

      const hoursLeft = Math.floor(minDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));

      return m.reply(
`🌮 EVENT SYSTEM STATUS

🟢 Enabled: ${global.db.events.enabled ? "ON" : "OFF"}
🔥 Active: ${global.db.events.active ? "YES" : "NO"}

📅 Próximo evento:
➡️ ${days[nextEvent.day]} a las ${nextEvent.hour}:00

⏳ Falta:
⏰ ${hoursLeft}h ${minutesLeft}m`
      );
    }

    return m.reply("❌ Uso: ™event / ™event on / ™event off");
  }
};

setInterval(() => {

  const d = new Date();

  const day = d.getDay();
  const hour = d.getHours();
  const minute = d.getMinutes();

  if (!global.db.events.enabled) return;
  if (global.db.events.active) return;

  const schedule = {
    1: 10,
    2: 14,
    3: 18,
    4: 8,
    5: 22,
    6: 5,
    0: 1
  };

  if (hour === schedule[day] && minute === 0) {
    startEvent();
  }

}, 60 * 1000);

setInterval(async () => {

  if (!global.db.events.active) return;

  const now = Date.now();

  if (now > global.db.events.endTime) {
    global.db.events.active = false;
    return;
  }

  try {

    const chats = Object.keys(global.db.data?.chats || {});
    if (!chats.length) return;

    const chat = chats[Math.floor(Math.random() * chats.length)];

    const metadata = await global.client.groupMetadata(chat);
    const users = metadata.participants;

    if (!users.length) return;

    const user = users[Math.floor(Math.random() * users.length)].id;

    const tacos = Math.floor(Math.random() * 21) + 10;

    if (!global.db.items.chats[chat]) global.db.items.chats[chat] = {};
    if (!global.db.items.chats[chat][user]) global.db.items.chats[chat][user] = { "tacos 🌮": 0 };

    global.db.items.chats[chat][user]["tacos 🌮"] += tacos;

    await global.client.sendMessage(chat, {
      text: `🌮 LLUVIA DE TACOS 🌮\n\n👤 @${user.split('@')[0]}\n🎁 +${tacos} tacos 🌮`,
      mentions: [user]
    });

  } catch (e) {}

}, 10 * 60 * 1000);
