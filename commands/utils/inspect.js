import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

export default {
  command: ["inspect", "inspeccionar"],
  category: "tools",
  run: async ({ msg, sock, args, usedPrefix, command, text }) => {
    const client = sock; // Alias para compatibilidad
    const m = msg;

    if (!text) return client.sendMessage(m.chat, { text: `《✧》 Por favor, ingrese el enlace de grupo/comunidad o canal.` }, { quoted: m });
    
    const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
    const botId = sock.user?.id?.split(':')[0] + '@s.whatsapp.net';
    const settings = global.db?.data?.settings?.[botId] || {};
    let thumb = settings.icon || null;
    let pp;
    let inviteCode;

    const MetadataGroupInfo = async (res) => {
      let nameCommunity = "";
      if (res.linkedParent) {
        let linkedGroupMeta = await client.groupMetadata(res.linkedParent).catch(() => null);
        nameCommunity = linkedGroupMeta ? "`Nombre:` " + linkedGroupMeta.subject : "";
      }
      pp = await client.profilePictureUrl(res.id, 'image').catch(() => null);
      inviteCode = await client.groupInviteCode(m.chat).catch(() => null);
      const formatParticipants = (p) => p && p.length > 0 ? p.map((u, i) => `${i + 1}. @${u.id?.split("@")[0]}${u.admin === "superadmin" ? " (superadmin)" : u.admin === "admin" ? " (admin)" : ""}`).join("\n") : "No encontrado";
      
      let caption = `🆔 *Identificador del grupo:*\n${res.id || "No encontrado"}\n\n` +
        `👑 *Creado por:*\n${res.owner ? `@${res.owner?.split("@")[0]}` : "No encontrado"} ${res.creation ? `el ${formatDate(res.creation)}` : ""}\n\n` +
        `🏷️ *Nombre:*\n${res.subject || "No encontrado"}\n\n` +
        `📄 *Descripción:*\n${res.desc || "No encontrado"}\n\n` +
        `🖼️ *Imagen:* ${pp ? "Sí" : "No"}\n` +
        `🎫 *Código:* ${res.inviteCode || inviteCode || "No disponible"}\n\n` +
        `🛃 *Admins:*\n${formatParticipants(res.participants)}\n\n` +
        `🔰 *Usuarios:* ${res.size || "N/A"}\n` +
        `📢 *Anuncios:* ${res.announce ? "✅" : "❌"}\n`;
      return caption.trim();
    };

    const inviteGroupInfo = async (groupData) => {
      const { id, subject, size, owner, desc, announce, isCommunity } = groupData;
      pp = await client.profilePictureUrl(id, 'image').catch(() => null);
      let caption = `🆔 *Grupo:* ${id}\n🏷️ *Nombre:* ${subject}\n📄 *Desc:* ${desc || "N/A"}\n👥 *Miembros:* ${size}\n📢 *Anuncios:* ${announce ? "✅" : "❌"}\n`;
      return caption.trim();
    };

    let info, res, inviteInfo;
    try {
      res = text ? null : await client.groupMetadata(m.chat);
      info = await MetadataGroupInfo(res);
    } catch {
      const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
      if (inviteUrl) {
        try {
          inviteInfo = await client.groupGetInviteInfo(inviteUrl);
          info = await inviteGroupInfo(inviteInfo);
        } catch (e) {
          return client.sendMessage(m.chat, { text: '《✧》 Grupo no encontrado.' }, { quoted: m });
        }
      }
    }

    if (info) {
      const mentions = (res?.participants || inviteInfo?.participants || []).filter(p => p.admin).map(p => p.id);
      await client.sendMessage(m.chat, { text: info, contextInfo: { mentionedJid: mentions, externalAdReply: { title: "❀ Inspector", body: "✧ ¡Super Inspectador!", thumbnailUrl: pp || thumb, mediaType: 1 }}}, { quoted: m });
    } else if (channelUrl) {
      const newsletterInfo = await client.newsletterMetadata("invite", channelUrl).catch(() => null);
      if (!newsletterInfo) return client.sendMessage(m.chat, { text: "《✧》 No se encontró información del canal." }, { quoted: m });
      let caption = "*Inspector de Canales*\n\n" + processObject(newsletterInfo, "", newsletterInfo?.preview);
      await client.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: "❀ Canales", body: "✧ Inspectador", thumbnailUrl: newsletterInfo.preview ? getUrlFromDirectPath(newsletterInfo.preview) : thumb, mediaType: 1 }}}, { quoted: m });
    }
  }
}

function formatDate(n) {
  const date = new Date(n > 1e12 ? n : n * 1000);
  return date.toLocaleDateString("es", { day: '2-digit', month: '2-digit', year: 'numeric' });
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
