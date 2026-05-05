export default {
  command: ['sss'],
  category: 'owner',
  isOwner: true,
  run: async (client, m) => {
    try {
      const baileys = await import('@whiskeysockets/baileys');
      const { downloadContentFromMessage } = baileys;
      const fs = await import('fs/promises');
      const path = await import('path');
      const zlib = await import('zlib');
      if (!m.quoted) return await client.sendMessage(m.chat, { text: '❌ Responde a un sticker' }, { quoted: m });
      let msg = m.quoted.message || {};
      let type = Object.keys(msg)[0];
      let real = msg[type];
      if (type === 'stickerMessage') {
        if (!real.mediaKey) return await client.sendMessage(m.chat, { text: '❌ Sticker no válido' }, { quoted: m });
        let stream = await downloadContentFromMessage(real, 'sticker');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let gz = zlib.gzipSync(buffer);
        let file = path.join(process.cwd(), 'sticker_' + Date.now() + '.zip');
        await fs.writeFile(file, gz);
        await client.sendMessage(m.chat, { text: `✅ Guardado\n📁 ${file}\n📦 Tamaño: ${gz.length} bytes` }, { quoted: m });
      } else if (type === 'lottieStickerMessage') {
        real = real?.message?.stickerMessage;
        if (!real || !real.mediaKey) return await client.sendMessage(m.chat, { text: '❌ Sticker no válido' }, { quoted: m });
        let stream = await downloadContentFromMessage(real, 'sticker');
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
          buffer = Buffer.concat([buffer, chunk]);
        }
        let gz = zlib.gzipSync(buffer);
        let file = path.join(process.cwd(), 'sticker_' + Date.now() + '.zip');
        await fs.writeFile(file, gz);
        await client.sendMessage(m.chat, { text: `✅ Guardado\n📁 ${file}\n📦 Tamaño: ${gz.length} bytes` }, { quoted: m });
      } else {
        return await client.sendMessage(m.chat, { text: '❌ No es un sticker' }, { quoted: m });
      }
    } catch (e) {
      console.error(e);
      await client.sendMessage(m.chat, { text: `❌ Error: ${e.message}` }, { quoted: m });
    }
  },
}