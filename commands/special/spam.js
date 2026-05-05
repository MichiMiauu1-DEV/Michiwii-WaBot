export default {
  command: ['spam'],
  category: 'utilidades',
  isOwner: true,
  run: async (client, m) => {
    try {
      // Regex para capturar: texto entre comillas + número al final
      const regex = /^["'](.+?)["']\s+(\d+)$/;
      const args = m.text.slice(m.text.indexOf(' ') + 1); // quita el comando
      const match = args.match(regex);

      if (!match) {
        await client.sendMessage(m.chat, { 
          text: 'Uso: *spam "texto" cantidad\nEjemplo: *spam "presten atención" 23' 
        }, { quoted: m });
        return;
      }

      const texto = match[1];
      let cantidad = parseInt(match[2]);

      if (isNaN(cantidad) || cantidad < 1) {
        await client.sendMessage(m.chat, { text: 'La cantidad debe ser un número mayor a 0' }, { quoted: m });
        return;
      }

      // Límite de seguridad para que no tumbe el bot o te baneen
      if (cantidad > 50) {
        await client.sendMessage(m.chat, { text: 'Máximo 50 repeticiones por seguridad' }, { quoted: m });
        cantidad = 50;
      }

      // Manda los mensajes con delay para evitar ban
      for (let i = 0; i < cantidad; i++) {
        await client.sendMessage(m.chat, { text: texto });
        await new Promise(r => setTimeout(r, 800)); // 800ms entre mensajes
      }

    } catch (e) {
      console.error('Error en spam:', e);
      const errorMsg = e?.message || e?.toString() || 'Error desconocido';
      await client.sendMessage(m.chat, {
        text: `Falló el comando spam: ${errorMsg}`
      }, { quoted: m });
    }
  },
};