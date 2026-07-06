export default {
  command: ['k'],
  category: 'fun',
  isOwner: false,
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      const audioPath = './commands/14.opus'; // Asegúrate de que la ruta sea correcta
      await client.sendMessage(m.chat, { audio: { url: audioPath }, mimetype: 'audio/mp4' });
      m.reply('Michi Accedí a tu GitHub te voy a hackear muejeje');
    } catch (e) {
      m.reply(`😕 Error: ${e.message}`);
    }
  },
};
