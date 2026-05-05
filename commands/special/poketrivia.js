export default {
    command: ['poketrivia'],
    category: 'fun',
    run: async (client, m) => {
        const triviaData = [
            { q: "¿Cuál es el peso exacto de Cosmoem, a pesar de su tamaño diminuto?", o: ["999.9 kg", "0.1 kg", "500.5 kg"], a: "999.9 kg" },
            { q: "¿Qué Pokémon tiene el número #000 en la Pokédex de Teselia (B/W)?", o: ["Victini", "Mew", "Genesect"], a: "Victini" },
            { q: "¿En qué juego aparecieron por primera vez las MT de uso infinito?", o: ["Pokémon Negro/Blanco", "Pokémon X/Y", "Pokémon Platino"], a: "Pokémon Negro/Blanco" },
            { q: "¿Qué Pokémon fue diseñado por James Turner, el primer diseñador occidental?", o: ["Vanillite", "Lucario", "Garchomp"], a: "Vanillite" },
            { q: "¿Cuál es el ratio de captura de Beldum (igual al de muchos legendarios)?", o: ["3", "10", "25"], a: "3" },
            { q: "¿Qué movimiento tiene potencia base de 250 pero debilita al usuario?", o: ["Explosión", "Autodestrucción", "V de Fuego"], a: "Explosión" },
            { q: "¿Qué estadística base de Velocidad tiene Regieleki (la más alta)?", o: ["200", "180", "250"], a: "200" },
            { q: "¿Cuál es el único Pokémon con el tipo Volador puro (sin cambios de forma)?", o: ["Rookidee", "Tornadus", "Noibat"], a: "Tornadus" },
            { q: "¿En qué ciudad de Kanto se encuentra el Club de Fans de Pokémon?", o: ["Ciudad Carmín", "Ciudad Azulona", "Ciudad Fucsia"], a: "Ciudad Carmín" },
            { q: "¿Qué Pokémon tiene la habilidad exclusiva 'Banco'?", o: ["Wishiwashi", "Finneon", "Lumineon"], a: "Wishiwashi" },
            { q: "¿Cuál es el Pokémon más alto registrado en la Pokédex (14.5 m)?", o: ["Eternatus", "Wailord", "Mega Rayquaza"], a: "Eternatus" },
            { q: "¿Cuántas formas diferentes de Unown existen?", o: ["28", "26", "30"], a: "28" },
            { q: "¿Qué Pokémon evoluciona a Primeape al usar 'Puño Furia' 20 veces?", o: ["Annihilape (Evolución)", "Mankey", "Infernape"], a: "Mankey" },
            { q: "¿Qué Pokémon se dice que nació de una máscara humana?", o: ["Yamask", "Cofagrigus", "Spiritomb"], a: "Yamask" },
            { q: "¿Cuál es la probabilidad base de encontrar un Shiny (Gen 6 en adelante)?", o: ["1 entre 4096", "1 entre 8192", "1 entre 2048"], a: "1 entre 4096" },
            { q: "¿Qué Pokémon pesa exactamente 0.1 kg?", o: ["Gastly", "Joltik", "Flabébé"], a: "Gastly" },
            { q: "¿Qué estadística de Shedinja es siempre igual a 1?", o: ["PS", "Defensa", "Velocidad"], a: "PS" },
            { q: "¿En qué región se encuentra el Monte Plateado?", o: ["Johto", "Kanto", "Sinnoh"], a: "Johto" },
            { q: "¿Cuál es el ataque característico de Darkrai?", o: ["Brecha Negra", "Pulso Umbrío", "Pesadilla"], a: "Brecha Negra" },
            { q: "¿Qué tipo de movimiento es 'Maldición' si lo usa un tipo Fantasma?", o: ["Estado", "Físico", "Especial"], a: "Estado" },
            { q: "¿Cuál es el Pokémon más pesado de tipo Planta?", o: ["Celesteela", "Alola Exeggutor", "Torterra"], a: "Celesteela" },
            { q: "¿Qué objeto permite a Cubone duplicar su Ataque?", o: ["Hueso Grueso", "Hueso Raro", "Garra Afilada"], a: "Hueso Grueso" },
            { q: "¿Qué Pokémon es el 'Pokémon Agujero Negro'?", o: ["Guzzlord", "Hoopa", "Dusknoir"], a: "Guzzlord" },
            { q: "¿Qué Pokémon tiene 3 corazones según la Pokédex?", o: ["Tentacruel", "Octillery", "Starmie"], a: "Tentacruel" },
            { q: "¿Qué Pokémon es conocido como el Pokémon 'Victoria'?", o: ["Victini", "Arceus", "Mew"], a: "Victini" },
            { q: "¿Qué Pokémon de 1ra Gen no tiene ninguna evolución ni pre-evolución?", o: ["Pinsir", "Jynx", "Magmar"], a: "Pinsir" },
            { q: "¿Qué Pokémon evoluciona con una Piedra Solar?", o: ["Sunkern", "Gloom", "Ambos"], a: "Ambos" },
            { q: "¿Cuál es el nivel máximo que puede alcanzar un Pokémon?", o: ["100", "99", "50"], a: "100" },
            { q: "¿Qué habilidad permite golpear a Fantasmas con movimientos Normal?", o: ["Intrépido", "Allanamiento", "Adaptable"], a: "Intrépido" },
            { q: "¿Qué baya reduce el daño de un movimiento tipo Hielo súper eficaz?", o: ["Baya Yache", "Baya Caoca", "Baya Pasora"], a: "Baya Yache" },
            { q: "¿Qué Pokémon tiene la habilidad 'Ilusión'?", o: ["Zoroark", "Ditto", "Mew"], a: "Zoroark" },
            { q: "¿Qué movimiento cambia el tipo del usuario al del último golpe recibido?", o: ["Conversión 2", "Conversión", "Camuflaje"], a: "Conversión 2" },
            { q: "¿Qué Poké Ball es más efectiva contra Pokémon capturados anteriormente?", o: ["Repeat Ball", "Timer Ball", "Luxury Ball"], a: "Repeat Ball" },
            { q: "¿Qué Pokémon es conocido como el Pokémon 'Escupofuego'?", o: ["Magmar", "Charizard", "Slugma"], a: "Magmar" },
            { q: "¿Qué Pokémon tiene la habilidad 'Cuerpo Puro'?", o: ["Metagross", "Steelix", "Dragonite"], a: "Metagross" },
            { q: "¿Qué objeto es necesario para que Feebas evolucione a Milotic?", o: ["Escama Bella", "Roca del Rey", "Diente Marino"], a: "Escama Bella" },
            { q: "¿Qué líder de gimnasio es apodado 'El Maestro del tipo Eléctrico'?", o: ["Lt. Surge", "Lem", "Erico"], a: "Lt. Surge" },
            { q: "¿Qué Pokémon puede aprender casi cualquier movimiento por MT?", o: ["Mew", "Arceus", "Ditto"], a: "Mew" },
            { q: "¿Cómo se llama el archipiélago de la región de Alola?", o: ["Melemele, Akala, Ula-Ula y Poni", "Kanto", "Islas Sete"], a: "Melemele, Akala, Ula-Ula y Poni" },
            { q: "¿Qué habilidad duplica la velocidad bajo el sol?", o: ["Clorofila", "Poder Solar", "Cosecha"], a: "Clorofila" },
            { q: "¿Qué Pokémon es el símbolo de la región de Sinnoh?", o: ["Dialga y Palkia", "Darkrai", "Lucario"], a: "Dialga y Palkia" },
            { q: "¿Qué Pokémon tiene la habilidad 'Recogida'?", o: ["Zigzagoon", "Rattata", "Sentret"], a: "Zigzagoon" },
            { q: "¿Qué Pokémon de tipo Lucha evoluciona por felicidad?", o: ["Riolu", "Tyrogue", "Machop"], a: "Riolu" },
            { q: "¿Qué movimiento de tipo Normal nunca falla?", o: ["Rapidez", "Corte", "Golpe Cuerpo"], a: "Rapidez" },
            { q: "¿Qué Pokémon es el #151 en la Pokédex?", o: ["Mew", "Mewtwo", "Dragonite"], a: "Mew" },
            { q: "¿Qué baya cura la confusión?", o: ["Baya Caqui", "Baya Zreza", "Baya Meloc"], a: "Baya Caqui" },
            { q: "¿Qué Pokémon es el resultado de la fusión de Shellder y Slowpoke?", o: ["Slowbro", "Slowking", "Ambos"], a: "Ambos" },
            { q: "¿Cuántos tipos existen actualmente (Gen 9)?", o: ["18", "17", "19"], a: "18" },
            { q: "¿Qué Pokémon es el creador de los mares?", o: ["Kyogre", "Lugia", "Palkia"], a: "Kyogre" },
            { q: "¿Qué Pokémon tiene la habilidad 'Sincronía'?", o: ["Abra", "Umbreon", "Ambos"], a: "Ambos" },
            { q: "¿Qué Pokémon es el 'Pokémon Mutante'?", o: ["Porygon", "Ditto", "Deoxys"], a: "Porygon" },
            { q: "¿Qué objeto evoluciona a Scyther en Scizor?", o: ["Revestimiento Metálico", "Piedra Alba", "Garra Afilada"], a: "Revestimiento Metálico" },
            { q: "¿Qué Pokémon tiene la habilidad 'Ausente'?", o: ["Slaking", "Snorlax", "Slowbro"], a: "Slaking" },
            { q: "¿Cuál es la pre-evolución de Lucario?", o: ["Riolu", "Mime Jr.", "Bonsly"], a: "Riolu" },
            { q: "¿Qué Pokémon es de tipo Acero/Hada?", o: ["Mawile", "Klefki", "Ambos"], a: "Mawile" },
            { q: "¿Qué movimiento de tipo fuego tiene 100% de precisión y 120 de potencia?", o: ["Envite Ígneo", "Llamarada", "Lanzallamas"], a: "Envite Ígneo" },
            { q: "¿En qué nivel evoluciona Magikarp a Gyarados?", o: ["20", "15", "25"], a: "20" },
            { q: "¿Qué Pokémon es el Dios Pokémon?", o: ["Arceus", "Mewtwo", "Giratina"], a: "Arceus" },
            { q: "¿Qué Pokémon tiene el ataque 'Salpicar'?", o: ["Magikarp", "Hoppip", "Ambos"], a: "Ambos" },
            { q: "¿Cómo se llama el rival en Pokémon Rojo/Azul?", o: ["Blue/Azul", "Silver", "Red"], a: "Blue/Azul" }
        ];

        if (!global.db) global.db = {};
        if (!global.db.poketrivia) global.db.poketrivia = {};
        if (!global.db.pokecooldown) global.db.pokecooldown = {};
        if (!global.db.users) global.db.users = {};

        const cmd = m.command ? m.command.toLowerCase() : '';
        const texto = m.text || '';
        const user = m.sender;

        if (!global.db.users[user]) global.db.users[user] = {};
        if (typeof global.db.users[user].triviasGanadas !== 'number') {
            global.db.users[user].triviasGanadas = 0;
        }
        if (!global.db.users[user].achievements) {
            global.db.users[user].achievements = [];
        }

        if (cmd === 'poketrivia') {
            const now = Date.now();
            if (global.db.pokecooldown[user] && now < global.db.pokecooldown[user]) {
                const restante = Math.ceil((global.db.pokecooldown[user] - now) / 1000);
                return client.sendMessage(m.chat, { text: `⚠️ Espera ${restante} segundos para otra trivia.` }, { quoted: m });
            }

            if (global.db.poketrivia[user]) {
                const trivia = global.db.poketrivia[user];
                const input = texto.replace(/[^0-9]/g, '').trim();

                if (!input) return client.sendMessage(m.chat, { text: "⚠️ Pon el número de tu respuesta." }, { quoted: m });

                clearTimeout(trivia.timer);
                delete global.db.poketrivia[user];
                global.db.pokecooldown[user] = Date.now() + 10000;

                if (input === trivia.a) {
                    global.db.users[user].triviasGanadas = (global.db.users[user].triviasGanadas || 0) + 1;
                    const cantidad = global.db.users[user].triviasGanadas;

                    // --- LOGRO ACTUALIZADO A 80 ---
                    if (cantidad === 80 && !global.db.users[user].achievements.some(a => a.id === "enigmapokemon")) {
                        global.db.users[user].achievements.push({
                            id: "enigmapokemon",
                            name: "Enigma Pokémon",
                            emoji: "🧩",
                            description: "Ganar 80 trivias Pokémon",
                            date: Date.now()
                        });
                        if (global.db.write) await global.db.write();
                        await m.reply(`🏆 *¡LOGRO DESBLOQUEADO!* 🏆\n\n🧩 *Enigma Pokémon*\n¡Has respondido correctamente 80 trivias Pokémon! ¡Eres un maestro de verdad!`);
                    }

                    await client.sendMessage(m.chat, {
                        text: `🎉 ¡CORRECTO! Has superado la trivia de nivel experto.\n\n🎯 *Trivias ganadas:* ${cantidad}`,
                    }, { quoted: m });
                } else {
                    await client.sendMessage(m.chat, { text: "❌ ¡INCORRECTO!\n💀 *GAME OVER*. Esa pregunta era nivel maestro." }, { quoted: m });
                }
            } else {
                const item = triviaData[Math.floor(Math.random() * triviaData.length)];
                let options = [...item.o];
                for (let i = options.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [options[i], options[j]] = [options[j], options[i]];
                }

                const correctIndex = options.indexOf(item.a) + 1;

                global.db.poketrivia[user] = {
                    a: correctIndex.toString(),
                    timer: setTimeout(() => {
                        if (global.db.poketrivia[user]) {
                            delete global.db.poketrivia[user];
                            global.db.pokecooldown[user] = Date.now() + 10000;
                            client.sendMessage(m.chat, { text: `⏰ *TIEMPO AGOTADO*\n@${user.split('@')[0]} tardaste demasiado.`, mentions: [user] });
                        }
                    }, 60000)
                };

                const questionText = `⚔️ *POKÉMON TRIVIA EXPERTO* ⚔️\n👤 *JUGADOR:* @${user.split('@')[0]}\n\n${item.q}\n\n` + 
                    options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') + 
                    `\n\n*Responde con:* ™poketrivia [número]\n⏱️ Tienes 1 minuto.`;

                return client.sendMessage(m.chat, { text: questionText, mentions: [user] }, { quoted: m });
            }
        }
    }
}