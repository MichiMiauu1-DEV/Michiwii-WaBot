export default {
  command: ['wapf'],
  category: 'owner',
  isOwner: true,
  run: async (client, m, args, usedPrefix, command, text) => {

    const sub = args[0]?.toLowerCase()
    const value = args.slice(1).join(' ')

    if (!sub) {
      return m.reply(`《✧》 Uso:

wapf name Nuevo nombre
wapf bio Nueva info
wapf photo (responde imagen)

wapf viewname
wapf viewbio
wapf viewphoto`)
    }

    try {

      // 📝 CAMBIAR NOMBRE
      if (sub === 'name') {
        if (!value) return m.reply('❌ Escribe el nombre')
        await client.updateProfileName(value)
        return m.reply('✅ Nombre actualizado')
      }

      // 📝 CAMBIAR BIO
      if (sub === 'bio') {
        if (!value) return m.reply('❌ Escribe la info')
        await client.updateProfileStatus(value)
        return m.reply('✅ Info actualizada')
      }

      // 🖼️ CAMBIAR FOTO
      if (sub === 'photo') {
        if (!m.quoted) return m.reply('❌ Responde a una imagen')

        let media = await m.quoted.download()
        await client.updateProfilePicture(client.user.id, media)

        return m.reply('✅ Foto actualizada')
      }

      // 👀 VER NOMBRE
      if (sub === 'viewname') {
        return m.reply(`📛 Nombre: ${client.user.name}`)
      }

      // 👀 VER BIO
      if (sub === 'viewbio') {
        let bio = await client.fetchStatus(client.user.id)
        return m.reply(`📝 Info:\n${bio.status || 'Sin info'}`)
      }

      // 👀 VER FOTO
      if (sub === 'viewphoto') {
        let pp = await client.profilePictureUrl(client.user.id, 'image')
          .catch(() => null)

        if (!pp) return m.reply('❌ No tienes foto')

        return client.sendMessage(m.chat, {
          image: { url: pp },
          caption: '🖼️ Tu foto de perfil'
        })
      }

      m.reply('❌ Subcomando no válido')

    } catch (e) {
      m.reply('Error:\n' + e)
    }
  }
}