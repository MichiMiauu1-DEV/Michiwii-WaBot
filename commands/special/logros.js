if (!global.db) global.db = {};
if (!global.db.users) global.db.users = {};

export default {
  command: ['logros'],
  category: 'rpg',
  run: async (client, m) => {
    const userId = m.sender;
    let user = global.db.users[userId] || {};

    if (!user.achievements) user.achievements = [];

    const totalLogros = 50;
    const obtenidos = user.achievements.length;
    const porcentaje = Math.floor((obtenidos / totalLogros) * 100);

    const bloques = Math.floor(porcentaje / 10);
    const barra = '█'.repeat(bloques) + '░'.repeat(10 - bloques);

    let msg = `╭━━━〔 🏆 *TUS LOGROS* 🏆 〕━━━┈\n\n`;

    if (obtenidos === 0) {
      msg += `❌ *No tienes logros aún*\n`;
      msg += `✨ Usa el bot y desbloquéalos poco a poco.\n\n`;
    } else {
      msg += `🎯 *Total desbloqueados:* ${obtenidos}/${totalLogros}\n`;
      msg += `━━━━━━━━━━━━━━━━━━\n\n`;

      user.achievements.forEach((ach, i) => {
        msg += `✦ *${i + 1}.* ${ach.emoji} *${ach.name}*\n`;
        msg += `   ${ach.description}\n\n`;
      });
    }

    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `📊 *Progreso total*\n`;
    msg += `${barra} ${porcentaje}%`;

    return m.reply(msg);
  }
};