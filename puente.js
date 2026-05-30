import { Client, GatewayIntentBits, Partials } from 'discord.js'

const CONFIG = {
  discordToken: 'MTUwOTY1ODM4MTU1NDU0ODc3Ng.Gztabm.C946EcmqUpjBScBwp43OGij_3q4LZYzKfQY_hI',
  channelId: '1411167800646565969', // Tu #💻│consola
  whatsappGroupId: 'TU_ID_DE_GRUPO_AQUÍ@g.us' // Pon el ID de tu grupo
}

let ultimaConsolaTxt = ""

export function iniciarPuenteMinecraft(sock) {
  const discordBot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel]
  })

  discordBot.on('clientReady', () => {
    console.log(`🎮 [PUENTE-MC] Conectado a Discord escuchando Minecraft.`);
  })

  function procesarTextoConsola(nuevoContenido) {
    if (!nuevoContenido) return
    const lineasNuevas = nuevoContenido.replace(/```[a-z]*/g, '').replace(/```/g, '').trim().split('\n')

    if (!ultimaConsolaTxt) {
      ultimaConsolaTxt = nuevoContenido
      return
    }

    const lineasViejas = ultimaConsolaTxt.replace(/```[a-z]*/g, '').replace(/```/g, '').trim().split('\n')
    ultimaConsolaTxt = nuevoContenido

    if (lineasNuevas.length > lineasViejas.length) {
      const agregadas = lineasNuevas.slice(lineasViejas.length)
      agregadas.forEach(async (line) => {
        if (line.trim() && sock) {
          await sock.sendMessage(CONFIG.whatsappGroupId, { 
            text: `🎮 *[MINECRAFT]* ${line.replace(/\*\*/g, '')}` 
          }).catch(e => console.log("Error enviando a WA:", e.message))
        }
      })
    }
  }

  discordBot.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.partial) { try { await newMessage.fetch() } catch (e) { return } }
    if (newMessage.channelId !== CONFIG.channelId) return
    procesarTextoConsola(newMessage.content)
  })

  discordBot.on('messageCreate', async (message) => {
    if (message.channelId !== CONFIG.channelId || message.author.id === discordBot.user.id) return
    let contenido = message.content
    if (message.embeds.length > 0) contenido = message.embeds[0].description || message.embeds[0].title || ''

    if (contenido && !contenido.includes('```') && sock) {
      await sock.sendMessage(CONFIG.whatsappGroupId, { text: `🎮 *[MINECRAFT]* ${contenido.replace(/\*\*/g, '')}` }).catch(e => {})
    } else if (contenido && contenido.includes('```')) {
      procesarTextoConsola(contenido)
    }
  })

  discordBot.login(CONFIG.discordToken).catch(e => console.error('Error Discord Puente:', e.message))
}
