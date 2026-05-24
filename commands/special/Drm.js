if (!global.db) global.db = {};
if (!global.db.cooldowns) global.db.cooldowns = {};

export default {
  command: ['resetruleta', 'rr'],
  category: 'owner',
  isOwner: true,

  run: async (client, m) => {

    // 🧹 borrar cooldown
    delete global.db.cooldowns['ruletamaldita'];

    return m.reply(
`✅ *Cooldown eliminado*

💀 La ruleta maldita puede volver a usarse ahora mismo.`
    );

  }
};
