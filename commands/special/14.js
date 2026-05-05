export default {
  command: ['14'],
  category: 'fun',
  isOwner: false,
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      const audioPath = './commands/14.opus'; // Asegúrate de que la ruta sea correcta
      await client.sendMessage(m.chat, { audio: { url: audioPath }, mimetype: 'audio/mp4' });
      m.reply('TIENES 14 ACTIVA CAM🗣️🔥 TIENES 14 ACTIVA🗣️🔥 TIENES 14 ACTIVA CAM🗣️🔥 TIENES 14 ACTIVA🗣️🔥 TIENES QUE ACTIVARLA ACTIVALA🗣️🔥 ACTIVALA🗣️🔥 ACTIVALA🗣️🔥TIENES QUE ACTIVARLA ACTIVAS🗣️🔥 ACTIVALA🗣️🔥 ACTIVALA🗣️🔥');
    } catch (e) {
      m.reply(`😕 Error: ${e.message}`);
    }
  },
};