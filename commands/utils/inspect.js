// ... dentro de tu función run ...
      if (channelUrl && newsletterInfo) {
        // CORRECCIÓN: usamos sock.parseMention en lugar de conn.parseMention
        await client.sendMessage(m.chat, { text: caption, contextInfo: {
          mentionedJid: sock.parseMention(caption), // <--- CAMBIO AQUÍ
          externalAdReply: {
            title: "《✧》 Inspector de Canales",
            body: "✧ ¡Super Inspectador!",
            thumbnailUrl: pp,
            sourceUrl: args[0],
            mediaType: 1,
            showAdAttribution: false,
            renderLargerThumbnail: false
          }
        }}, { quoted: m })
      }
// ...
