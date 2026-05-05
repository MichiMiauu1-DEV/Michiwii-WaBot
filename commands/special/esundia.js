export default {
  command: ['esundia'],
  category: 'fun',
  isOwner: false,
  run: async (client, m, args, usedPrefix, command, text) => {
    try {
      const mensaje = `
Esundiahermosoallaafueralasavescantanlasfloresflorecenendiasasiniñoscomotudeberianarderenelinfiernoveteyaniñoquelastimasituvieraqueromperlapromesaquehiceparatiasiquenoavancesmasodeotromodoteiramuymalycomotunosigueslasreglasparaminoesfacilquememientanvamoselcuartooscurescamosvamossuciomatahermanosvenytratadegolpearmesiesquepuedeslaclemenciaesunaopcionquetunotienesveoqueteestascansandodeintentarloperotusolosiguesfallandonuncaacabaraestaremosjuntosjuntoshastaelfinaldelostiemposycuandotederrotereiniciarasyyoteesperareunavezmasestashechodeamoramoramoramoramoramorestoesloquesoysomosloquevessicreesquepuedesmatarmemirapiensatelobiennoimportacuandointentetunodejasdeatacarparecesestardisfrutandotuspecadoscargarvamosintentagolpearmesiesquepuedeslaclemenciaesunaopcionqueyanotienescreesquesoyingenuoporquemeperdonasamihermanotumatastenomejodasamisamigostulesdistefinyyolloreporqueyosigoaquisoysupiedadsoysuvenganzasoydeterminacionestashechodeamoramoramoramoramoramorperosoymasfuertequetu
`;
      m.reply(mensaje);
    } catch (e) {
      m.reply(`😕 Error: ${e.message}`);
    }
  },
};
