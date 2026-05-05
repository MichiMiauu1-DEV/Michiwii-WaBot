export default {
  command: ['gpe'],
  category: 'group',
  run: async (client, m, args, usedPrefix, command, text) => {

    if (!m.isGroup) return m.reply('❌ Solo en grupos')
    if (!args[0]) {
      return m.reply(`《✧》 Uso:

gpe name nuevo nombre
gpe desc nueva descripción
gpe photo (responde a imagen)
gpe viewname
gpe viewdesc
gpe viewphoto`)
    }

    const sub = args[0].toLowerCase()
    const value = args.slice(1).join(' ')

    try {

      // 📝 CAMBIAR NOMBRE
      if (sub === 'name') {
        if (!value) return m.reply('❌ Escribe el nombre')
        await client.groupUpdateSubject(m.chat, value)
        return m.reply('✅ Nombre actualizado')
      }

      // 📝 CAMBIAR DESC
      if (sub === 'desc') {
        if (!value) return m.reply('❌ Escribe la descripción')
        await client.groupUpdateDescription(m.chat, value)
        return m.reply('✅ Descripción actualizada')
      }

      // 🖼️ FOTO
      if (sub === 'photo') {
        if (!m.quoted) return m.reply('❌ Responde a una imagen')
        let media = await m.quoted.download()
        await client.updateProfilePicture(m.chat, media)
        return m.reply('✅ Foto actualizada')
      }

      // 👀 VER NOMBRE
      if (sub === 'viewname') {
        let meta = await client.groupMetadata(m.chat)
        return m.reply(`📛 Nombre: ${meta.subject}`)
      }

      // 👀 VER DESC
      if (sub === 'viewdesc') {
        let meta = await client.groupMetadata(m.chat)
        return m.reply(`📝 Descripción:\n${meta.desc || 'Sin descripción'}`)
      }

      // 👀 VER FOTO
      if (sub === 'viewphoto') {
        let pp = await client.profilePictureUrl(m.chat, 'image').catch(() => null)
        if (!pp) return m.reply('❌ No tiene foto')

        return client.sendMessage(m.chat, {
          image: { url: pp },
          caption: '🖼️ Foto del grupo'
        })
      }

      m.reply('❌ Subcomando no válido')

    } catch (e) {
      m.reply('Error:\n' + e)
    }
  }
}