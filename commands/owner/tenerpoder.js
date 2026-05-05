export default {
  command: ['tenerpoder'],
  category: 'owner',
  isOwner: true,
  botAdmin: true,
  run: async (client, m, args, usedPrefix, command) => {
    try {
      const groupMetadata = await client.groupMetadata(m.chat)
      const participant = groupMetadata.participants.find((p) => p.id === m.sender)
      if (participant?.admin) return client.sendMessage(m.chat, { text: `《✧》 Ya eres administrador del grupo!` }, { quoted: m })
      
      await client.groupParticipantsUpdate(m.chat, [m.sender], 'promote')
      await client.sendMessage(m.chat, { text: `✿ Ahora eres administrador del grupo!` }, { quoted: m })
    } catch (e) {
      await m.reply(`> An unexpected error occurred while executing command *${usedPrefix + command}*. Please try again or contact support if the issue persists.\n> [Error: *${e.message}*]`)
    }
  },
};