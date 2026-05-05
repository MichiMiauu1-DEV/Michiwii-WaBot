export default {
  command: ['dox2'],
  category: 'fun',
  run: async (client, m, { args, quoted }) => {
    let user
    if (m.mentionedJid.length > 0) {
      user = m.mentionedJid[0]
    } else if (quoted) {
      user = quoted.sender
    } else {
      return client.sendMessage(m.chat, { text: '「✧」 Menciona a alguien para doxear' }, { quoted: m })
    }
    const sent = await client.sendMessage(m.chat, { 
      text: `「🔍」 Buscando información del usuario @${user.split('@')[0]}...`, 
      mentions: [user]
    }, { quoted: m })
    setTimeout(async () => {
      const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const ipv6 = `2001:0db8:${Math.floor(Math.random() * 10000).toString(16)}:${Math.floor(Math.random() * 10000).toString(16)}`
      const mac = `${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 256).toString(16).padStart(2, '0')}`
      const isp = `ISP-${Math.floor(Math.random() * 1000)}`
      const dns = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const altDns = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const dnsSuffix = `suffix-${Math.floor(Math.random() * 1000)}`
      const wanType = `DHCP`
      const gateway = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const subnet = `255.255.255.${Math.floor(Math.random() * 255)}`
      const openPorts = `${Math.floor(Math.random() * 10000)}, ${Math.floor(Math.random() * 10000)}, ${Math.floor(Math.random() * 10000)}`
      const upnp = Math.random() < 0.5 ? 'Enabled' : 'Disabled'
      const dmz = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      const wss = `WSS-${Math.floor(Math.random() * 1000)}`
      const number = `+${Math.floor(Math.random() * 10000000000)}`

      await client.sendMessage(m.chat, { 
        text: `「🔮」 DOXEO MASIVO a: @${user.split('@')[0]}\n(100% real no fake link mediafire)\n` +
               `*IP:* ${ip}\n` +
               `*IPv6:* ${ipv6}\n` +
               `*MAC:* ${mac}\n` +
               `*ISP:* ${isp}\n` +
               `*DNS:* ${dns}\n` +
               `*Alt DNS:* ${altDns}\n` +
               `*DNS Suffix:* ${dnsSuffix}\n` +
               `*WAN Type:* ${wanType}\n` +
               `*Gateway:* ${gateway}\n` +
               `*Subnet Mask:* ${subnet}\n` +
               `*Open Ports:* ${openPorts}\n` +
               `*UPNP:* ${upnp}\n` +
               `*DMZ:* ${dmz}\n` +
               `*WSS Number:* ${wss}\n` +
               `*Number:* ${number}`,
        edit: sent.key, 
        mentions: [user]
      }, { quoted: m })
    }, 2000)
  },
}