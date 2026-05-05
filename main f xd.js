import ws from 'ws';
import moment from 'moment';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import gradient from 'gradient-string';
import seeCommands from './lib/system/commandLoader.js';
import initDB from './lib/system/initDB.js';
import antilink from './commands/antilink.js';
import level from './commands/level.js';

seeCommands()

export default async (client, m) => {
if (!m.message) return
const sender = m.sender 

// ================= TEXT =================
let body =
m.message.conversation ||
m.message.extendedTextMessage?.text ||
m.message.imageMessage?.caption ||
m.message.videoMessage?.caption ||
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply?.selectedRowId ||
m.message.templateButtonReplyMessage?.selectedId ||
''

// INTERACTIVE FIX
if (m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson) {
  try {
    const parsed = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)
    body = parsed.id || ''
  } catch {}
}

// BOTONES / LISTAS / INTERACTIVE → SOLO NORMALIZAR (NO ejecutar aquí)
try {

if (m.message?.buttonsResponseMessage) {
  const id = m.message.buttonsResponseMessage.selectedButtonId
  console.log('🔘 Botón:', id)
  m.message.conversation = id
  body = id
}

if (m.message?.listResponseMessage) {
  const id = m.message.listResponseMessage.singleSelectReply.selectedRowId
  console.log('📋 Lista:', id)
  m.message.conversation = id
  body = id
}

if (m.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson) {
  try {
    const parsed = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)
    const id = parsed.id || ''
    console.log('🔘 Interactive:', id)
    m.message.conversation = id
    body = id
  } catch {}
}

} catch (e) {
console.log('❌ Error en botones/listas:', e)
}

// 🔥 CLAVE
m.text = body || ''

// ================= FILTROS =================
if ((m.id.startsWith("3EB0") || (m.id.startsWith("BAE5") && m.id.length === 16) || (m.id.startsWith("B24E") && m.id.length === 20))) return

initDB(m, client)
antilink(client, m)

// BEFORE HOOKS
for (let [name, cmd] of global.comandos) {
  if (typeof cmd.before === 'function') {
    try {
      const stop = await cmd.before(client, m)
      if (stop) return
    } catch (e) {
      console.log(`❌ Error en before (${name}):`, e)
    }
  }
}

// ================= DATA =================
const from = m.key.remoteJid
const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net'
const chat = global.db.data.chats[m.chat] || {}
const settings = global.db.data.settings[botJid] || {}  
const user = global.db.data.users[sender] ||= {}
const users = chat.users?.[sender] || {}

const rawBotname = settings.namebot || 'Yuki'
const tipo = settings.type || 'Sub'
const namebot = /^[\w\s]+$/.test(rawBotname) ? rawBotname : 'Yuki'

// ================= PREFIX (NO TOCADO) =================
const shortForms = [
namebot.charAt(0),
namebot.split(" ")[0],
tipo.split(" ")[0],
namebot.split(" ")[0].slice(0, 2),
namebot.split(" ")[0].slice(0, 3)
]

const prefixes = shortForms.map(n => `${n}`)
prefixes.unshift(namebot)

let prefix
if (Array.isArray(settings.prefix) || typeof settings.prefix === 'string') {
const prefixArray = Array.isArray(settings.prefix) ? settings.prefix : [settings.prefix]
prefix = new RegExp('^(' + prefixes.join('|') + ')?(' + prefixArray.map(p => p.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&')).join('|') + ')', 'i')
} else {
prefix = new RegExp('^(' + prefixes.join('|') + ')?', 'i')
}

const strRegex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

let pluginPrefix = client.prefix ? client.prefix : prefix

let matchs = pluginPrefix instanceof RegExp
? [[pluginPrefix.exec(m.text), pluginPrefix]]
: Array.isArray(pluginPrefix)
? pluginPrefix.map(p => {
let regex = p instanceof RegExp ? p : new RegExp(strRegex(p))
return [regex.exec(m.text), regex]})
: typeof pluginPrefix === 'string'
? [[new RegExp(strRegex(pluginPrefix)).exec(m.text), new RegExp(strRegex(pluginPrefix))]]
: [[null, null]]

let match = matchs.find(p => p[0])
if (!match) return

let usedPrefix = match[0][0] || ''
let txt = m.text
let args = txt.slice(usedPrefix.length).trim().split(" ")
let command = (args.shift() || '').toLowerCase()
let text = args.join(' ')

// ================= GROUP =================
let groupAdmins = []
let groupName = ''

if (m.isGroup) {
const metadata = await client.groupMetadata(m.chat).catch(() => null)
groupName = metadata?.subject || ''
groupAdmins = metadata?.participants?.filter(p => p.admin) || []
}

const isBotAdmins = m.isGroup ? groupAdmins.some(p => p.id === botJid) : false
const isAdmins = m.isGroup ? groupAdmins.some(p => p.id === sender) : false

// ================= OWNER =================
const isOwners = [
botJid,
...(settings.owner ? [settings.owner] : []),
...global.owner.map(num => num + '@s.whatsapp.net')
].includes(sender)

// SELF MODE
if (!isOwners && settings.self) return

// ================= VALIDACIONES =================
if (!command) return

const cmdData = global.comandos.get(command)

if (!cmdData) {
await client.readMessages([m.key])
return m.reply(`ꕤ El comando *${command}* no existe.`)
}

if (cmdData.isOwner && !isOwners) return
if (cmdData.isAdmin && !isAdmins) return
if (cmdData.botAdmin && !isBotAdmins) return

// ================= RUN =================
try {
await client.readMessages([m.key])

user.usedcommands = (user.usedcommands || 0) + 1
settings.commandsejecut = (settings.commandsejecut || 0) + 1
users.lastCmd = Date.now()

await cmdData.run(client, m, args, usedPrefix, command, text)

} catch (error) {
console.log('❌ ERROR:', error)
await client.sendMessage(m.chat, { text: `Error:\n${error}` }, { quoted: m })
}

level(m)
}