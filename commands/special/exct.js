import { downloadMediaMessage } from '@whiskeysockets/baileys';
import { writeFile } from 'fs/promises';

export default {
  command: ['extraer'],
  category: 'utilidades',
  run: async (client, m) => {
    try {
      // Validación corregida para detectar el sticker
      const isSticker = m.quoted && (
        m.quoted.mtype === 'stickerMessage' ||
        m.quoted.type === 'stickerMessage' ||
        m.quoted.message?.stickerMessage
      );

      if (!isSticker) {
        await client.sendMessage(m.chat, { text: 'Por favor, responde a un sticker' }, { quoted: m });
        return;
      }

      const buffer = await downloadMediaMessage(m.quoted, 'buffer', {});

      const originalName = m.quoted.fileName ||
                          m.quoted.message?.stickerMessage?.fileName;

      const ext = m.quoted.mimetype?.split('/')[1] || 'webp';
      const fileName = originalName || `sticker.${ext}`;
      const filePath = `./temp/${fileName}`;

      await writeFile(filePath, buffer);

      await client.sendMessage(m.chat, {
        document: { url: filePath },
        fileName: fileName,
        mimetype: m.quoted.mimetype || 'image/webp',
      }, { quoted: m });

    } catch (e) {
      console.error('Error al extraer sticker:', e);
      const errorMsg = e?.message || e?.toString() || 'Error desconocido';
      await client.sendMessage(m.chat, {
        text: `Falló al extraer sticker: ${errorMsg}`
      }, { quoted: m });
    }
  },
};