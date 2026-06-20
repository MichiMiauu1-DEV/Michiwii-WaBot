import { getUrlFromDirectPath } from "@whiskeysockets/baileys"
import _ from "lodash"

export default {
  command: ["inspect", "inspeccionar"],
  category: "tools",
  run: async ({ msg, sock, args, usedPrefix, command, text }) => {
    const client = sock; // Alias para compatibilidad interna
    const m = msg;

    if (!text) return sock.sendMessage(m.chat, { text: `《✧》 Por favor, ingrese el enlace de grupo/comunidad o canal.` }, { quoted: m });
    
    const channelUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:channel\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1]
    const botId = sock.user.id.split(':')[0] + '@s.whatsapp.net';
    const settings = global.db.data.settings[botId] || {};
    let thumb = settings.icon;
    let pp;
    let inviteCode;

    const MetadataGroupInfo = async (res) => {
      let nameCommunity = "";
      if (res.linkedParent) {
        let linkedGroupMeta = await sock.groupMetadata(res.linkedParent).catch(() => null);
        nameCommunity = linkedGroupMeta ? "`Nombre:` " + linkedGroupMeta.subject : "";
      }
      pp = await sock.profilePictureUrl(res.id, 'image').catch(() => null);
      inviteCode = await sock.groupInviteCode(m.chat).catch(() => null);
      const formatParticipants = (participants) => participants && participants.length > 0 ? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n") : "No encontrado";
      
      let caption = `🆔 *Identificador del grupo:*\n${res.id || "No encontrado"}\n\n` +
        `👑 *Creado por:*\n${res.owner ? `@${res.owner?.split("@")[0]}` : "No encontrado"} ${res.creation ? `el ${formatDate(res.creation)}` : "(Fecha no encontrada)"}\n\n` +
        `🏷️ *Nombre:*\n${res.subject || "No encontrado"}\n\n` +
        `✏️ *Nombre cambiado por:*\n${res.subjectOwner ? `@${res.subjectOwner?.split("@")[0]}` : "No encontrado"} ${res.subjectTime ? `el ${formatDate(res.subjectTime)}` : "(Fecha no encontrada)"}\n\n` +
        `📄 *Descripción:*\n${res.desc || "No encontrado"}\n\n` +
        `🖼️ *Imagen del grupo:*\n${pp ? pp : "No se pudo obtener"}\n\n` +
        `🎫 *Código de invitación:*\n${res.inviteCode || inviteCode || "No disponible"}\n\n` +
        `🛃 *Admins:*\n${formatParticipants(res.participants)}\n\n` +
        `🔰 *Usuarios en total:*\n${res.size || "Cantidad no encontrada"}\n\n` +
        `✨ *Información avanzada* ✨\n\n🔎 *Comunidad vinculada al grupo:*\n${res.linkedParent ? "`Id:` " + res.linkedParent + (nameCommunity ? "\n" + nameCommunity : "") : res.isCommunity ? "Este grupo es una comunidad" : "No pertenece a ninguna comunidad"}\n\n` +
        `⚠️ *Restricciones:* ${res.restrict ? "✅" : "❌"}\n` +
        `📢 *Anuncios:* ${res.announce ? "✅" : "❌"}\n`;
      return caption.trim();
    };

    const inviteGroupInfo = async (groupData) => {
      const { id, subject, subjectOwner, subjectTime, size, creation, owner, desc, linkedParent, announce, isCommunity } = groupData;
      pp = await sock.profilePictureUrl(id, 'image').catch(() => null);
      const formatParticipants = (participants) => participants && participants.length > 0 ? participants.map((user, i) => `${i + 1}. @${user.id?.split("@")[0]}${user.admin === "superadmin" ? " (superadmin)" : user.admin === "admin" ? " (admin)" : ""}`).join("\n") : "No encontrado";
      
      let caption = `🆔 *Identificador del grupo:*\n${id || "No encontrado"}\n\n` +
        `👑 *Creado por:*\n${owner ? `@${owner?.split("@")[0]}` : "No encontrado"}\n\n` +
        `🏷️ *Nombre:*\n${subject || "No encontrado"}\n\n` +
        `📄 *Descripción:*\n${desc || "No encontrada"}\n\n` +
        `🖼️ *Imagen del grupo:*\n${pp ? pp : "No se pudo obtener"}\n\n` +
        `🏆 *Miembros destacados:*\n${formatParticipants(groupData.participants)}\n\n` +
        `📢 *Anuncios:* ${announce ? "✅ Si" : "❌ No"}\n` +
        `🏘️ *¿Es comunidad?:* ${isCommunity ? "✅ Si" : "❌ No"}\n`;
      return caption.trim();
    };

    let info, res, inviteInfo;
    try {
      res = text ? null : await sock.groupMetadata(m.chat);
      info = await MetadataGroupInfo(res);
    } catch {
      const inviteUrl = text?.match(/(?:https:\/\/)?(?:www\.)?(?:chat\.|wa\.)?whatsapp\.com\/(?:invite\/|joinchat\/)?([0-9A-Za-z]{22,24})/i)?.[1];
      if (inviteUrl) {
        try {
          inviteInfo = await sock.groupGetInviteInfo(inviteUrl);
          info = await inviteGroupInfo(inviteInfo);
        } catch (e) {
          return sock.sendMessage(m.chat, { text: '《✧》 Grupo no encontrado.' }, { quoted: m });
        }
      }
    }

    if (info) {
      const mentions = (res?.participants || inviteInfo?.participants || []).filter(p => p.admin === "admin" || p.admin === "superadmin").map(p => p.id);
      await sock.sendMessage(m.chat, { text: info, contextInfo: { mentionedJid: mentions, externalAdReply: { title: "❀ Inspector de Grupos", body: "✧ ¡Super Inspectador!", thumbnailUrl: pp || thumb, mediaType: 1 }}}, { quoted: m });
    } else if (channelUrl) {
      try {
        const newsletterInfo = await sock.newsletterMetadata("invite", channelUrl).catch(() => null);
        if (!newsletterInfo) return sock.sendMessage(m.chat, { text: "《✧》 No se encontró información del canal." }, { quoted: m });
        let caption = "*Inspector de Canales*\n\n" + processObject(newsletterInfo, "", newsletterInfo?.preview);
        pp = newsletterInfo.preview ? getUrlFromDirectPath(newsletterInfo.preview) : thumb;
        await sock.sendMessage(m.chat, { text: caption, contextInfo: { externalAdReply: { title: "❀ Inspector de Canales", body: "✧ ¡Super Inspectador!", thumbnailUrl: pp, mediaType: 1 }}}, { quoted: m });
      } catch (e) {
        await sock.sendMessage(m.chat, { text: `> Error: *${e.message}*` }, { quoted: m });
      }
    }
  }
}

function formatDate(n, locale = "es") {
  const date = new Date(n > 1e12 ? n : n * 1000);
  return date.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function newsletterKey(key) {
  return _.startCase(key.replace(/_/g, " "))
    .replace("Id", "🆔 Identificador").replace("Name", "🏷️ Nombre").replace("Description", "📜 Descripción");
}

function formatValue(key, value) {
  return value !== null && value !== undefined ? value.toString() : "No disponible";
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
