export default {
  command: ['sansbiduria'],
  category: 'fun',

  run: async (client, m) => {

    const variantes = [
      'E e',
      'E e e e',
      'E e e e e e e',
      'E e e e e e e e e e',
      'E e e e e e e e e e e e e e',
      'E e e e e e e e e e e e e e e e e e',
      'E e e e e e e e e e e e e e e e e e e e e e',
      'E e e e e e e e e e e e e e e e e e e e e e e e e e',
      'Esundiahermosoallaafueralasavescantanlasfloresflorecenendiasasiniñoscomotudeberianarderenelinfiernoveteyaniñoquelastimasituvieraqueromperlapromesaquehiceparatiasiquenoavancesmasodeotromodoteiramuymalycomotunosigueslasreglasparaminoesfacilquememientanvamoselcuartooscurescamosvamossuciomatahermanosvenytratadegolpearmesiesquepuedeslaclemenciaesunaopcionquetunotienesveoqueteestascansandodeintentarloperotusolosiguesfallandonuncaacabaraestaremosjuntosjuntoshastaelfinaldelostiemposycuandotederrotereiniciarasyyoteesperareunavezmasestashechodeamoramoramoramoramoramorestoesloquesoysomosloquevessicreesquepuedesmatarmemirapiensatelobiennoimportacuandointentetunodejasdeatacarparecesestardisfrutandotuspecadoscargarvamosintentagolpearmesiesquepuedeslaclemenciaesunaopcionqueyanotienescreesquesoyingenuoporquemeperdonasamihermanotumatastenomejodasamisamigostulesdistefinyyolloreporqueyosigoaquisoysupiedadsoysuvenganzasoydeterminacionestashechodeamoramoramoramoramoramorperosoymasfuertequetu'
    ];

    const random = variantes[Math.floor(Math.random() * variantes.length)];
    const texto = `💀🦴 ${random}`;

    const userId = m.sender;

    if (!global.db) global.db = {};
    if (!global.db.users) global.db.users = {};
    if (!global.db.users[userId]) global.db.users[userId] = {};
    if (!global.db.users[userId].achievements) global.db.users[userId].achievements = [];

    const tieneLogro = global.db.users[userId].achievements.some(a => a.id === "mortadela");

    if (!tieneLogro) {
      global.db.users[userId].achievements.push({
        id: "mortadela",
        name: "Chicos estoy comiendo mortadela",
        emoji: "🥪",
        description: "Usar el comando ™sansbiduria",
        date: Date.now()
      });

      if (global.db.write) await global.db.write();

      await client.sendMessage(m.chat, {
        text: `🏆 *¡LOGRO DESBLOQUEADO!* 🏆\n\n🥪 *Chicos estoy comiendo mortadela*\n¡Has usado la sabiduría de Sans!`
      });
    }

    await client.sendMessage(
      m.chat,
      { text: texto },
      { quoted: m }
    );
  }
};