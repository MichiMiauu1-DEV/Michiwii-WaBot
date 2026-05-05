export default {
  command: ['etiquetame'],
  category: 'owner',
  isOwner: true,
  run: async (client, m) => {
    // m.sender es tu ID completo (ej: 123456789@s.whatsapp.net)
    let jid = m.sender 
    
    // Extraemos solo los números para el texto visual
    let numero = jid.split('@')[0]
    
    return client.sendMessage(m.chat, { 
      text: `@${numero}`, 
      mentions: [jid] // Esto es lo que activa el color y la notificación
    }, { quoted: m })
  }
}