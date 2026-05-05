if (!global.db) global.db = {};
if (!global.db.harem) global.db.harem = {};

export default {
  command: ['delt', 'eliminar'],
  category: 'owner',
  isOwner: true,
  run: async (client, m) => {
    // 1. Identificar de quién vamos a borrar (mención o respuesta)
    let who = m.mentionedJid && m.mentionedJid[0] 
      ? m.mentionedJid[0] 
      : m.quoted 
        ? m.quoted.sender 
        : null;

    if (!who) return m.reply("⚠️ Etiqueta a la persona o responde a su mensaje para eliminarle una mascota.");

    // ID Unificado (El mismo que el nuevo ET)
    let userId = who.split('@')[0] + '@s.whatsapp.net';
    let harem = global.db.harem[userId] || [];

    if (harem.length === 0) return m.reply("❌ Esa persona no tiene mascotas para eliminar.");

    // 2. Obtener qué vamos a borrar (puede ser el número o el nombre)
    let text = m.text.replace(/™delt|™eliminar/gi, '').trim();
    if (m.mentionedJid) {
        m.mentionedJid.forEach(jid => {
            text = text.replace(new RegExp(`@${jid.split('@')[0]}`, 'g'), '');
        });
    }
    let target = text.trim();

    if (!target) return m.reply("⚠️ Indica el nombre o el número de la mascota que quieres borrar.\nEjemplo: *™delt 1 @usuario*");

    // 3. Buscar la mascota en el harem
    let index = parseInt(target) - 1;
    let mascotaEliminada;

    if (index >= 0 && index < harem.length) {
        // Eliminar por número
        mascotaEliminada = harem.splice(index, 1)[0];
    } else {
        // Eliminar por nombre
        let foundIndex = harem.findIndex(p => p.nombre.toLowerCase() === target.toLowerCase());
        if (foundIndex !== -1) {
            mascotaEliminada = harem.splice(foundIndex, 1)[0];
        }
    }

    if (!mascotaEliminada) return m.reply(`❌ No se encontró a "${target}" en el harem de @${userId.split('@')[0]}`, null, { mentions: [userId] });

    // 4. Reorganizar los IDs de las mascotas restantes
    harem.forEach((pet, i) => { pet.id = i + 1; });

    if (global.db.write) await global.db.write();

    return m.reply(`🗑️ *¡MASCOTA ELIMINADA!* ✨\n\n👤 *Ex-Dueño:* @${userId.split('@')[0]}\n👾 *Mascota:* ${mascotaEliminada.nombre}\n✅ *El harem ha sido actualizado.*`, null, { mentions: [userId] });
  }
};