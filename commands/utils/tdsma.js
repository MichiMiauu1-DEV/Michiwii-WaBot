export default {
  command: ['tdsma'],
  category: 'fun',
  isOwner: false,
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      const audioPath = './commands/tdsma.m4a'; // Asegúrate de que la ruta sea correcta
      await client.sendMessage(m.chat, { audio: { url: audioPath }, mimetype: 'audio/mp4' });
     // m.reply('');
    } catch (e) {
      m.reply(`😕 Error: ${e.message}`);
    }
  },
};