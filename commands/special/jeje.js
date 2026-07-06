export default {
  command: ['k'],
  category: 'fun',
  isOwner: false,
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      await m.reply('Michi Accedí a tu GitHub te voy a hackear muejeje');
    } catch (e) {
      await m.reply(`😕 Error: ${e.message}`);
    }
  },
};
