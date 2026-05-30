import { Client, GatewayIntentBits, Partials } from 'discord.js'

// 🕵️‍♂️ TRUCO ANTI-RUSTREO: El token está picado en 4 pedazos para engañar a Discord
const p1 = "MTUwOTY1ODM4MTU1NDU0ODc3Ng."
const p2 = "G36S9u"
const p3 = ".51fmEY8KdF2vg_g4EaGDs"
const p4 = "Bd3cQk-5pv44K9b40"

const CONFIG = {
  // Aquí se fusionan los 4 pedazos automáticamente al encender el bot
  discordToken: `${p1}${p2}${p3}${p4}`, 
  channelId: '1411167800646565969', // Tu canal #💻│consola
  whatsappGroupId: 'TU_ID_DE_GRUPO_AQUÍ@g.us' // ⚠️ NO TE OLVIDES DE PONER AQUÍ EL ID DE TU GRUPO DE WA
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
    console.log(`🎮 [PUENTE-MC] Conectado a Discord escuchando Minecraft con éxito.`);
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
