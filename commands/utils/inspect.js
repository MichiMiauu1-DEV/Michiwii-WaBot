import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

export default {
  command: ["inspect", "inspeccionar"],
  category: "tools",
  run: async (client, m, args, usedPrefix, command, text) => {
    if (!text) return client.sendMessage(m.chat, { text: `《✧》 Por favor, ingrese el enlace de grupo o canal.` }, { quoted: m });
    
    const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
    const botId = client.user.id.split(':')[0] + '@s.whatsapp.net';
    const settings = global.db.data.settings[botId] || {};
    let thumb = settings.icon || null;
    let pp;

    const MetadataGroupInfo = async (res) => {
      pp = await client.profilePictureUrl(res.id, 'image').catch(() => null);
      let caption = `🆔 *ID:* ${res.id}\n🏷️ *Nombre:* ${res.subject}\n👑 *Dueño:* ${res.owner ? "@" + res.owner.split("@")[0] : "N/A"}\n🔰 *Miembros:* ${res.size}\n📢 *Anuncios:* ${res.announce ? "✅" : "❌"}`;
      return caption;
    };

    const inviteGroupInfo = async (groupData) => {
      pp = await client.profilePictureUrl(groupData.id, 'image').catch(() => null);
      return `🆔 *ID:* ${groupData.id}\n🏷️ *Nombre:* ${groupData.subject}\n🔰 *Miembros:* ${groupData.size}\n📢 *Anuncios:* ${groupData.announce ? "✅" : "❌"}`;
    };

    let info;
    try {
      const res = text ? null : await client.groupMetadata(m.chat);
      info = res ? await MetadataGroupInfo(res) : null;
      if (!info && text.includes("whatsapp.com/")) {
        const inviteUrl = text.match(/([0-9A-Za-z]{22,24})/i)?.[1];
        const inviteInfo = await client.groupGetInviteInfo(inviteUrl);
        info = await inviteGroupInfo(inviteInfo);
      }
    } catch (e) {
      return client.sendMessage(m.chat, { text: '《✧》 No se pudo obtener información.' }, { quoted: m });
    }

    if (info) {
      await client.sendMessage(m.chat, { text: info, contextInfo: { externalAdReply: { title: "❀ Inspector", body: "✧ ¡Super Inspectador!", thumbnailUrl: pp || thumb, mediaType: 1 }}}, { quoted: m });
    } else if (channelUrl) {
      const newsletterInfo = await client.newsletterMetadata("invite", channelUrl).catch(() => null);
      if (!newsletterInfo) return client.sendMessage(m.chat, { text: "《✧》 Canal no encontrado." }, { quoted: m });
      let caption = "*Inspector de Canales*\n\n" + processObject(newsletterInfo);
      await client.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: "❀ Canales", body: "✧ Inspectador", thumbnailUrl: newsletterInfo.preview ? getUrlFromDirectPath(newsletterInfo.preview) : thumb, mediaType: 1 }}}, { quoted: m });
    }
  }
}

function newsletterKey(key) {
  return _.startCase(key.replace(/_/g, " ")).replace("Id", "🆔 ID").replace("Name", "🏷️ Nombre");
}

function formatValue(key, value) {
  return value !== null && value !== undefined ? value.toString() : "N/A";
}

function processObject(obj, prefix = "") {
  let caption = "";
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === "object" && value !== null) {
      if (Object.keys(value).length > 0) caption += `\n*\`${newsletterKey(prefix + key)}\`*\n` + processObject(value, `${prefix}${key}_`);
    } else {
      caption += `- *${newsletterKey(key)}:*\n${formatValue(key, value)}\n`;
    }
  });
  return caption;
}
