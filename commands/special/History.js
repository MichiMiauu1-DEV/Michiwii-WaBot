if (!global.db) global.db = {};
if (!global.db.users) global.db.users = {};
if (!global.db.historia) global.db.historia = {};

const CHAPTERS = {
  1: {
    text: `🌧️ CAPÍTULO 1 — NEO SAKURA

La lluvia nunca se detiene en Neo Sakura.
Luces rosas reflejan los charcos del suelo.

Una figura con paraguas rosa te observa desde la distancia...`,
    options: [
      { id: 1, text: "Seguir a la figura", next: 2, item: "🌸 Rosa Negra", achievement: "easy_start" },
      { id: 2, text: "Entrar al callejón oscuro", next: 3, item: "🗝️ Llave oxidada", achievement: "medium_curious" },
      { id: 3, text: "Ignorar y seguir caminando", next: 4, item: null, achievement: null }
    ]
  },

  2: {
    text: `🌸 CAPÍTULO 2 — PARAGUAS ROSA

“¿También escuchas la lluvia…?”`,
    options: [
      { id: 1, text: "Preguntar qué pasa", next: 5, item: null, achievement: null },
      { id: 2, text: "Seguirla", next: 6, item: "🌸 Rosa Negra", achievement: "medium_curious" },
      { id: 3, text: "Salir corriendo", next: 4, item: null, achievement: null }
    ]
  },

  3: {
    text: `🌑 CALLEJÓN

Símbolos brillan en las paredes.`,
    options: [
      { id: 1, text: "Tomar la llave", next: 6, item: "🗝️ Llave oxidada", achievement: "medium_curious" },
      { id: 2, text: "Salir", next: 4, item: null, achievement: null }
    ]
  },

  4: {
    text: `🌧️ CAMINO VACÍO

La ciudad parece infinita.`,
    options: [
      { id: 1, text: "Seguir caminando", next: 7, item: null, achievement: null }
    ]
  },

  5: {
    text: `🎌 RESPUESTA

“Neo Sakura no debería existir…”`,
    options: [
      { id: 1, text: "Buscarla", next: 6, item: null, achievement: null },
      { id: 2, text: "Ignorar", next: 4, item: null, achievement: null }
    ]
  },

  6: {
    text: `🌸 DESPERTAR

La lluvia cambia de color.`,
    options: [
      { id: 1, text: "Continuar", next: 7, item: null, achievement: null }
    ]
  },

  7: {
    text: `🌑 ESTACIÓN

Una estación abandonada te observa.`,
    options: [
      { id: 1, text: "Entrar", next: 8, item: "📼 Cinta misteriosa", achievement: "medium_curious" },
      { id: 2, text: "Esperar", next: 9, item: null, achievement: null }
    ]
  },

  8: {
    text: `📼 CINTA

“NO CONFÍES EN LA LLUVIA”`,
    options: [
      { id: 1, text: "Seguir", next: 10, item: null, achievement: null }
    ]
  },

  9: {
    text: `🌧️ SILENCIO

La estación se apaga.`,
    options: [
      { id: 1, text: "Entrar", next: 8, item: null, achievement: null }
    ]
  },

  10: {
    text: `🔥 FALLA

La ciudad se reinicia.`,
    options: [
      { id: 1, text: "Seguir", next: 11, item: null, achievement: null }
    ]
  },

  11: {
    text: `🌧️ VERDAD

La lluvia deja de sonar.`,
    options: [
      { id: 1, text: "Aceptar la verdad", next: 12, item: null, achievement: "hard_truth" },
      { id: 2, text: "Rechazarla", next: 13, item: null, achievement: "hard_rebel" }
    ]
  },

  12: {
    text: `🌑 FINAL VACÍO`,
    options: []
  },

  13: {
    text: `🌸 FINAL ROSA`,
    options: []
  }
};

function initUser(user) {
  if (!global.db.users[user]) {
    global.db.users[user] = {
      achievements: [],
      historia: { chapter: 1, inventory: [] }
    };
  }

  if (!global.db.historia[user]) {
    global.db.historia[user] = { chapter: 1, inventory: [] };
  }
}

function addItem(user, item) {
  if (!item) return;
  if (!global.db.historia[user].inventory.includes(item)) {
    global.db.historia[user].inventory.push(item);
  }
}

function giveAchievement(user, id, name, emoji, description) {
  const u = global.db.users[user];
  if (!u.achievements) u.achievements = [];

  if (u.achievements.some(a => a.id === id)) return;

  u.achievements.push({
    id,
    name,
    emoji,
    description,
    date: Date.now()
  });
}

export default {
  command: ['historia'],
  category: 'game',

  run: async (client, m, { args }) => {

    const user = m.sender;
    initUser(user);

    const input = args[0];

    if (input === "inventario") {
      return m.reply(`🎒 INVENTARIO:\n\n${global.db.historia[user].inventory.join("\n") || "Vacío"}`);
    }

    if (input === "estado") {
      return m.reply(
`📊 ESTADO

🌧️ Capítulo: ${global.db.historia[user].chapter}
🎒 Ítems: ${global.db.historia[user].inventory.length}`
      );
    }

    if (input === "reiniciar") {
      global.db.historia[user] = { chapter: 1, inventory: [] };
      return m.reply("🔄 Reiniciado");
    }

    if (!input || input === "start") {
      const c = global.db.historia[user].chapter;
      const ch = CHAPTERS[c];

      let txt = ch.text + "\n\n";
      ch.options.forEach(o => txt += `\n${o.id}. ${o.text}`);
      txt += `\n\n™historia elegir [número]`;

      return m.reply(txt);
    }

    if (input === "elegir") {

      const choice = Number(args[1]);
      const c = global.db.historia[user].chapter;
      const ch = CHAPTERS[c];

      const opt = ch.options.find(o => o.id === choice);
      if (!opt) return m.reply("❌ opción inválida");

      addItem(user, opt.item);

      if (opt.achievement) {

        // 🟢 3 LOGROS
        if (opt.achievement === "easy_start") {
          giveAchievement(user, "easy_start", "Primer Paso", "🌧️", "Iniciaste la historia");
          m.reply("🏆 Logro fácil desbloqueado");
        }

        if (opt.achievement === "medium_curious") {
          giveAchievement(user, "medium_curious", "Curioso de Neo Sakura", "🌸", "Exploraste lugares ocultos");
          m.reply("🏆 Logro medio desbloqueado");
        }

        if (opt.achievement === "hard_truth") {
          giveAchievement(user, "hard_truth", "Verdad Prohibida", "🌑", "Aceptaste la realidad de Neo Sakura");
          m.reply("🏆 LOGRO DIFÍCIL DESBLOQUEADO");
        }

        if (opt.achievement === "hard_rebel") {
          giveAchievement(user, "hard_rebel", "Rebelde de la Lluvia", "🔥", "Rechazaste la verdad");
          m.reply("🏆 LOGRO DIFÍCIL DESBLOQUEADO");
        }
      }

      global.db.historia[user].chapter = opt.next;

      return m.reply("✔️ decisión tomada\n\n™historia para continuar");
    }

    return m.reply("™historia / elegir / inventario / estado / reiniciar");
  }
};
