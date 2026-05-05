if (!global.autowIntervals) global.autowIntervals = new Map()

const GRUPO_OBJETIVO = '120363422592724476@g.us'

const TIEMPOS = {
  work: 62 * 1000, // 1 min 2 seg
  slut: 242 * 1000, // 4 min 2 seg
  crime: 242 * 1000, // 4 min 2 seg
  daily: 11760 * 1000 // 3 horas 16 min
}

const COMANDOS = ['work', 'slut', 'crime', 'daily']

function limpiarIntervals(jid) {
  const intervals = global.autowIntervals.get(jid)
  if (intervals) {
    Object.values(intervals).forEach(clearInterval)
    global.autowIntervals.delete(jid)
  }
}

async function mandar(client, comando) {
  try {
    await client.sendMessage(GRUPO_OBJETIVO, { text: `#${comando}` })
    console.log(`[AUTOW] >> #${comando}`)
  } catch (e) {
    console.log(`[AUTOW ERROR] #${comando}:`, e.message)
    limpiarIntervals(GRUPO_OBJETIVO)
  }
}

function iniciarBucles(client) {
  const intervals = {}

  // Agregamos jitter de 0-5s para evitar detección de spam
  const addJitter = (base) => base + Math.floor(Math.random() * 5000)

  intervals.work = setInterval(() => mandar(client, 'work'), addJitter(TIEMPOS.work))
  intervals.slut = setInterval(() => mandar(client, 'slut'), addJitter(TIEMPOS.slut))
  intervals.crime = setInterval(() => mandar(client, 'crime'), addJitter(TIEMPOS.crime))
  intervals.daily = setInterval(() => mandar(client, 'daily'), addJitter(TIEMPOS.daily))

  global.autowIntervals.set(GRUPO_OBJETIVO, intervals)
}

export default {
  command: ['autow'],
  category: 'owner',
  isOwner: true,
  run: async (client, m, extra = {}) => {
    // Fix: leer args directo del texto por si el handler no los pasa
    const body = m.body || m.text || ''
    const args = body.trim().split(/ +/).slice(1)
    const isOff = args[0]?.toLowerCase() === 'off'

    if (isOff) {
      if (!global.autowIntervals.has(GRUPO_OBJETIVO)) {
        return await client.sendMessage(m.chat, { text: '《✧》 AutoWork no está activo.' }, { quoted: m })
      }
      limpiarIntervals(GRUPO_OBJETIVO)
      return await client.sendMessage(m.chat, { text: '《✧》 AutoWork desactivado.' }, { quoted: m })
    }

    if (global.autowIntervals.has(GRUPO_OBJETIVO)) {
      return await client.sendMessage(m.chat, { text: '《✧》 AutoWork ya está activo. Usa `autow off` para detenerlo.' }, { quoted: m })
    }

    await client.sendMessage(m.chat, { text: '《✧》 Iniciando AutoWork...' }, { quoted: m })

    // Secuencia inicial: 0s, 3s, 6s, 9s
    await mandar(client, 'work')
    await new Promise(r => setTimeout(r, 3000))

    await mandar(client, 'slut')
    await new Promise(r => setTimeout(r, 3020))

    await mandar(client, 'crime')
    await new Promise(r => setTimeout(r, 3030))

    await mandar(client, 'daily')
    await new Promise(r => setTimeout(r, 2000))

    await client.sendMessage(GRUPO_OBJETIVO, { text: '《✧》 Secuencia inicial completada. Bucles activos.' })
    iniciarBucles(client)
  },
}