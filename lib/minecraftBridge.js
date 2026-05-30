import { Client, GatewayIntentBits, Partials } from 'discord.js'

// ⚙️ CONFIGURACIÓN DEL PUENTE
const CONFIG_PUENTE = {
  // El token del bot de Discord (puedes usar el de la PC o el de DiscordSRV)
  discordToken: 'TU_TOKEN_DE_DISCORD_AQUÍ', 
  
  // El ID de tu canal de chat/consola de Discord
  channelId: '1411167800646565969', 
  
  // El ID de tu grupo de WhatsApp
  whatsappGroupId: '120363427969628244@g.us' 
}

export function iniciarPuente(whatsappClient) {
  const discordBot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel]
  })

  discordBot.on('ready', () => {
    console.log(`🤖 [PUENTE] Conectado a Discord como: ${discordBot.user.tag}`)
  })

  // Escuchar cuando se actualiza la consola (bloque de código que se edita)
  discordBot.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.partial) {
      try { await newMessage.fetch() } catch (err) { return }
    }
    if (newMessage.channelId !== CONFIG_PUENTE.channelId) return

    // Aquí extraemos la última línea que se agregó al bloque negro de Discord
    const lineas = newMessage.content.replace(/```[a-z]*/g, '').replace(/```/g, '').trim().split('\n')
    const ultimaLinea = lineas[lineas.length - 1]

    if (ultimaLinea && whatsappClient) {
      await whatsappClient.sendMessage(CONFIG_PUENTE.whatsappGroupId, { 
        text: `🎮 *[MINECRAFT]* ${ultimaLinea.replace(/\*\*/g, '')}` 
      })
    }
  })

  // Escuchar por si mandan un mensaje nuevo normal de chat
  discordBot.on('messageCreate', async (message) => {
    if (message.channelId !== CONFIG_PUENTE.channelId || message.author.id === discordBot.user.id) return

    let contenido = message.content
    if (message.embeds.length > 0) {
      contenido = message.embeds[0].description || message.embeds[0].title || ''
    }

    if (contenido && whatsappClient) {
      await whatsappClient.sendMessage(CONFIG_PUENTE.whatsappGroupId, { 
        text: `🎮 *[MINECRAFT]* ${contenido.replace(/\*\*/g, '')}` 
      })
    }
  })

  discordBot.login(CONFIG_PUENTE.discordToken).catch(e => console.error('❌ Error en puente:', e))
}
