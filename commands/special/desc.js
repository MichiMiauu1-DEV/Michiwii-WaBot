export default {
  command: ['desc'],
  category: 'admin',
  run: async (client, m) => {
    try {
      const texto = m.text.replace(/\/desc/i, '').trim();
      if (!texto) {
        return client.sendMessage(m.chat, { text: 'Por favor, escribe la nueva descripción.' }, { quoted: m });
      }
      await client.updateProfileStatus(texto);
      await client.sendMessage(m.chat, { text: 'Descripción actualizada con éxito.' }, { quoted: m });
    } catch (error) {
      console.error(error);
      await client.sendMessage(m.chat, { text: 'Error al actualizar la descripción.' }, { quoted: m });
    }
  },
}