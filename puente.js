import { Client, GatewayIntentBits, Partials } from 'discord.js'
import { Rcon } from 'rcon-client'

const CONFIG = {
  discordToken: 'TOKENXD', 
  channelId: '1411167709747740783',
  
  // Datos de tu Minecraft RCON
  host: '144.31.46.14',
  port: 13576,
  password: 'TeAmoRBC121UwU',

  // ID de tu grupo de WhatsApp
  whatsappGroupId: '120363410140287111@g.us' 
}

let ultimaConsolaTxt = ""
let rconInstance = null

// 🛠️ TRUCO EXTRACTOR: Convierte las tarjetas de Logros, Conexiones y Muertes de Discord en texto plano
function extraerTextoDeEmbeds(message) {
  if (!message.embeds || message.embeds.length === 0) return '';
  let lineas = [];
  message.embeds.forEach(embed => {
    if (embed.author && embed.author.name) lineas.push(embed.author.name);
    if (embed.title && !lineas.includes(embed.title)) lineas.push(embed.title);
    if (embed.description && !lineas.includes(embed.description)) lineas.push(embed.description);
    if (embed.fields && embed.fields.length > 0) {
      embed.fields.forEach(f => lineas.push(`${f.name}: ${f.value}`));
    }
  });
  return lineas.join(' ').trim();
}

export async function iniciarPuenteMinecraft(sock) {
  
  // 1️⃣ CONECTAR RCON (WhatsApp -> Minecraft)
  try {
    rconInstance = await Rcon.connect({
      host: CONFIG.host,
      port: Number(CONFIG.port),
      password: CONFIG.password
    })
    console.log('✅ [PUENTE-MC] Conexión RCON lista para recibir chats de WhatsApp.')
  } catch (err) {
    console.error('❌ [PUENTE-MC] No se pudo conectar al RCON de Minecraft de inicio:', err.message)
  }

  // 2️⃣ ESCUCHAR WHATSAPP -> ENVIAR A MINECRAFT (Comandos .mc y ™mc)
  sock.ev.on('messages.upsert', async (chatUpdate) => {
    if (chatUpdate.type !== 'notify') return
    const msg = chatUpdate.messages[0]
    if (!msg.message || msg.key.fromMe) return

    const chatId = msg.key.remoteJid
    if (chatId !== CONFIG.whatsappGroupId) return

    const textoMensaje = (msg.message.conversation || msg.message.extendedTextMessage?.text || "").trim()

    // Soporta comandos con prefijo .mc o ™mc dinámicamente
    const matchComando = textoMensaje.match(/^([.™])mc\s+(.+)$/i)

    if (matchComando) {
      const jidRemitente = msg.key.participant || msg.key.remoteJid || ""
      const numeroLimpio = jidRemitente.split('@')[0]

      let nombreRemitente = ""

      // Candado estricto por número telefónico
      if (numeroLimpio.startsWith('51')) {
        nombreRemitente = "RBC121"
      } else if (numeroLimpio.startsWith('503')) {
        nombreRemitente = "MichiMiauOFC"
      } else {
        return // Ignorar por completo si es otra persona en el grupo
      }

      const contenidoLimpio = matchComando[2].replace(/"/g, '\\"')
      const tellrawCmd = `tellraw @a ["",{"text":"WhatsApp","color":"green"}," ",{"text":"${nombreRemitente} » ${contenidoLimpio}","color":"white"}]`

      // Prueba de errores con reacciones visuales
      try {
        if (!rconInstance) {
          rconInstance = await Rcon.connect({ host: CONFIG.host, port: Number(CONFIG.port), password: CONFIG.password })
        }

        await rconInstance.send(tellrawCmd)
        console.log(`💬 [RCON] ${nombreRemitente} envió con éxito: ${contenidoLimpio}`)

        // Reacción de éxito (Check verde)
        await sock.sendMessage(chatId, { 
          react: { text: '✅', key: msg.key } 
        }).catch(() => {})

      } catch (error) {
        console.error("❌ Error crítico en el puente RCON:", error.message)
        rconInstance = null 

        // Reacción de fallo (X roja)
        await sock.sendMessage(chatId, { 
          react: { text: '❌', key: msg.key } 
        }).catch(() => {})
      }
    }
  })

  // 3️⃣ ESCUCHAR DISCORD (MINECRAFT) -> ENVIAR A WHATSAPP (Soporta Logs y Embeds)
  const discordBot = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Message, Partials.Channel]
  })

  discordBot.on('clientReady', () => {
    console.log(` [PUENTE-MC] Conectado a Discord escuchando juego con éxito.`);
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
          }).catch(e => {})
        }
      })
    }
  }

  discordBot.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.partial) { try { await newMessage.fetch() } catch (e) { return } }
    if (newMessage.channelId !== CONFIG.channelId) return
    
    let contenido = newMessage.content
    if (newMessage.embeds.length > 0) {
      contenido = extraerTextoDeEmbeds(newMessage)
    }

    if (contenido && contenido.includes('```')) {
      procesarTextoConsola(contenido)
    } else if (contenido && sock) {
      await sock.sendMessage(CONFIG.whatsappGroupId, { text: `🎮 *[MINECRAFT]* ${contenido.replace(/\*\*/g, '')}` }).catch(e => {})
    }
  })

  discordBot.on('messageCreate', async (message) => {
    if (message.channelId !== CONFIG.channelId || message.author.id === discordBot.user.id) return
    
    let contenido = message.content
    if (message.embeds.length > 0) {
      contenido = extraerTextoDeEmbeds(message)
    }

    if (contenido && !contenido.includes('```') && sock) {
      await sock.sendMessage(CONFIG.whatsappGroupId, { text: `🎮 *[MINECRAFT]* ${contenido.replace(/\*\*/g, '')}` }).catch(e => {})
    } else if (contenido && contenido.includes('```')) {
      procesarTextoConsola(contenido)
    }
  })

  discordBot.login(CONFIG.discordToken).catch(e => console.error('Error Discord Puente:', e.message))
}
