if (!global.db) global.db = {};
if (!global.db.chats) global.db.chats = {};

export default {
  command: ['tw'],
  category: 'game',
  run: async (client, m) => {
    const userId = m.sender.split('@')[0] + '@s.whatsapp.net';
    const chatId = m.chat;

    // 1. COOLDOWN PERSONAL (20 MIN)
    if (!global.db.users) global.db.users = {};
    if (!global.db.users[userId]) global.db.users[userId] = {};
    const tiempoEspera = 20 * 60 * 1000;
    const ahora = Date.now();
    
    if (ahora - (global.db.users[userId].lastTw || 0) < tiempoEspera) {
      const restante = Math.ceil((tiempoEspera - (ahora - global.db.users[userId].lastTw)) / 60000);
      return m.reply(`⏳ Espera *${restante} min* para volver a invocar.`);
    }

    // 2. CATEGORÍAS CON 80 PERSONAJES CADA UNA
    const categorias = {
      comun: ["Gato Blanco", "Perro Labrador", "Hámster Dorado", "Canario Amarillo", "Gato Siamés", "Conejo Blanco", "Tortuga", "Pez Dorado", "Perro Beagle", "Gato Persa", "Loro Verde", "Ratón Blanco", "Cobaya", "Periquito", "Pez Betta", "Gato Negro", "Perro Bulldog", "Hamster Ruso", "Canario Rojo", "Conejo Enano", "Tortuga Marina", "Pez Payaso", "Perro Chihuahua", "Gato Maine Coon", "Loro Amazona", "Ratón Gris", "Cobaya Peruana", "Periquito Australiano", "Pez Ángel", "Gato Bengalí", "Perro Pug", "Hamster Síber", "Canario Blanco", "Conejo Holandés", "Tortuga Terrestre", "Pez Koi", "Perro Pastor Alemán", "Gato Ragdoll", "Loro Gris", "Ratón Marrón", "Cobaya Teddy", "Periquito Inglés", "Pez Tetra", "Gato Sphynx", "Perro Boxer", "Hamster Enano", "Canario Timbrado", "Conejo Mini Lop", "Tortuga Acuática", "Pez Disco", "Perro Husky", "Gato Abisinio", "Loro Eclectus", "Ratón Albino", "Cobaya Sheltie", "Periquito Lutino", "Pez Guppy", "Gato Scottish Fold", "Perro Cocker Spaniel", "Hamster Dorado", "Canario Gloster", "Conejo Rex", "Tortuga Sulcata", "Pez Molino", "Perro Golden Retriever", "Gato Birmano", "Loro Macaw", "Ratón Fancy", "Cobaya Abisinia", "Periquito Celeste", "Pez Neon", "Gato Siamese", "Perro Dachshund", "Hamster Roborovski", "Canario Rojo", "Conejo Angora", "Tortuga Rusa", "Pez Betta Halfmoon", "Perro Shih Tzu", "Gato Exotic Shorthair", "Loro Caique", "Ratón Dumbo", "Cobaya Texel", "Periquito Turquesa", "Pez Molly", "Gato Devon Rex", "Perro Poodle", "Hamster Chino", "Canario Belga", "Conejo Lionhead", "Tortuga Leopardo", "Pez Oscar", "Perro Yorkie", "Gato Munchkin", "Loro Senegal", "Ratón Fancy", "Cobaya Satin", "Periquito English", "Pez Swordtail"],

      pocoComun: ["Lobo Gris", "Águila Real", "Serpiente Coral", "Zorro Rojo", "Panda Rojo", "Koala", "Pingüino Emperador", "Camaleón", "Iguana Verde", "Hurón", "Erizo", "Mapache", "Búho", "Canguro", "Foca", "Nutria", "Armadillo", "Perezoso", "Cebra", "Jirafa", "León Marino", "Tigre Blanco", "Oso Polar", "Lémur", "Suricata", "Alpaca", "Vicuña", "Flamenco", "Pelícano", "Albatros", "Puma", "Jaguar", "Ocelote", "Lince", "Guepardo", "Hiena", "Lobo Ártico", "Oso Panda", "Rinoceronte", "Elefante", "Hipopótamo", "Cocodrilo", "Anaconda", "Tiburón Blanco", "Mantis Religiosa", "Araña Viuda Negra", "Escorpión", "Ciempiés", "Tarántula", "Cangrejo", "Pulpo", "Medusa", "Estrella de Mar", "Caballo Marino", "Raya", "Tortuga Marina", "Delfín", "Ballena", "Orca", "Foca Leopardo", "Pingüino Rey", "Alce", "Ciervo", "Bisonte", "Búfalo", "Caribú", "Morsa", "Narval", "Pez Espada", "Barracuda", "Piraña", "Pez León", "Pez Globo", "Caimán", "Lagarto", "Serpiente Pitón", "Boa", "Cobra", "Víbora", "Rana Venenosa", "Sapo", "Salamandra", "Axolotl", "Tritón", "Mantarraya", "Tiburón Martillo", "Pulpo Gigante", "Medusa Luna", "Estrella de Mar Gigante", "Caballo de Mar", "Raya Eléctrica", "Tortuga Carey", "Delfín Rosado", "Ballena Jorobada", "Orca Asesina"],

      raro: ["Gremlin", "Gill-man", "Yeti", "Bigfoot", "Chupacabra", "Mothman", "Jersey Devil", "Kraken", "Leviatán", "Basilisco", "Gorgona", "Minotauro", "Cíclope", "Hidra", "Cerbero", "Fenrir", "Gárgola", "Troll", "Ogro", "Goblin", "Duende", "Banshee", "Wendigo", "Skinwalker", "Slenderman", "Jeff the Killer", "Siren Head", "Cartoon Cat", "Long Horse", "The Rake", "Squidward's Monster", "The Backrooms Entity", "Smiling Dog", "Momo", "The Man in the Suit", "Gnome", "Leprechaun", "Vampiro", "Hombre Lobo", "Frankenstein", "Momia", "Fantasma", "Poltergeist", "Demonio", "Diablo", "Imp", "Incubo", "Súcubo", "Quimera", "Esfinge", "Harpía", "Grifo", "Pegaso", "Unicornio Oscuro", "Dragón Rojo", "Dragón Negro", "Cockatrice", "Wyvern", "Dracolich", "Beholder", "Mind Flayer", "Aboleth", "Balor", "Pit Fiend", "Ice Devil", "Horned Devil", "Barbed Devil", "Bone Devil", "Chain Devil", "Erinyes", "Vrock", "Hezrou", "Glabrezu", "Nalfeshnee", "Marilith", "Balor", "Demonio de Hielo", "Demonio de Fuego", "Gárgola Viviente", "Troll de Piedra", "Ogro de Pantano", "Goblin Rey", "Duende Oscuro", "Banshee Llorona", "Wendigo Hambriento", "Skinwalker Cambiaformas", "Slenderman Sin Rostro", "Jeff the Killer Sonriente"],

      epico: ["Godzilla", "King Ghidorah", "Mothra", "Rodan", "MechaGodzilla", "Kong", "Venom", "Carnage", "Venom Symbiote", "Alien Queen", "Predator", "Xenomorph Queen", "The Thing", "Cloverfield Monster", "Pacific Rim Jaeger", "Kaiju", "Shin Godzilla", "Destoroyah", "Biollante", "SpaceGodzilla", "Orga", "Hedorah", "Gigan", "Megalon", "Anguirus", "Baragon", "Varan", "Manda", "Kumonga", "Ebirah", "Kamacuras", "Gorosaurus", "Mothra Larva", "Battra", "Titanus", "Scylla", "Methuselah", "Behemoth", "Muto", "Muto Prime", "Showa Godzilla", "Heisei Godzilla", "Millennium Godzilla", "Legendary Godzilla", "Gamera", "Guiron", "Virass", "Barugon", "Gyaos", "Iris", "Legion", "Zilla", "Orga", "Megaguirus", "Battra", "Destoroyah", "SpaceGodzilla", "Biollante", "Hedorah", "Gigan", "Megalon", "Anguirus", "Baragon", "Varan", "Manda", "Kumonga", "Ebirah", "Kamacuras", "Gorosaurus", "Mothra Larva", "Battra", "Manda", "Titanus", "Scylla", "Methuselah", "Behemoth", "Muto", "Muto Prime", "Godzilla Earth", "Shin Godzilla", "Pacific Rim Kaiju", "Cloverfield Parasite", "Venom Carnage", "Alien Xenomorph", "Predator Elder", "The Thing Assimilated", "Kaiju King", "Mecha-King Ghidorah", "Mothra Leo", "Rodan Fire", "Destoroyah Perfect"],

      legendario: ["Pikachu", "Sonic", "Mario", "Luigi", "Yoshi", "Link", "Zelda", "Kirby", "Donkey Kong", "Samus", "Fox", "Falco", "Ness", "Captain Falcon", "Jigglypuff", "Mewtwo", "Charizard", "Squirtle", "Bulbasaur", "Blastoise", "Snorlax", "Gengar", "Mew", "Arceus", "Rayquaza", "Lugia", "Ho-Oh", "Dialga", "Palkia", "Giratina", "Darkrai", "Cresselia", "Deoxys", "Manaphy", "Shaymin", "Sonic", "Tails", "Knuckles", "Shadow", "Amy Rose", "Silver", "Blaze", "Metal Sonic", "Eggman", "Peach", "Bowser", "Wario", "Waluigi", "Rosalina", "Daisy", "Toad", "Koopa", "Goomba", "Pikmin", "Olimar", "Pit", "Palutena", "Dark Pit", "Meta Knight", "King Dedede", "Bandana Waddle Dee", "Ganondorf", "Ridley", "Kraid", "Mother Brain", "Lucas", "Captain Falcon", "Ness", "Lucas", "Jigglypuff", "Mewtwo", "Charizard", "Squirtle", "Bulbasaur", "Blastoise", "Snorlax", "Gengar", "Mew", "Arceus", "Rayquaza", "Lugia", "Ho-Oh", "Dialga", "Palkia", "Giratina", "Darkrai", "Cresselia", "Deoxys", "Manaphy", "Shaymin", "Pikachu Gigamax", "Sonic Classic", "Mario 64", "Link BotW", "Kirby Star Allies", "Donkey Kong Tropical Freeze"],

      mitico: ["Bubble", "Caine", "Jax", "Pomni", "Ragatha", "Gangle", "Kinger", "Zooble", "Abstracto", "Gloink", "Godzilla", "King Ghidorah", "Mothra", "Rodan", "MechaGodzilla", "Kong", "Venom", "Carnage", "The Thing", "Cloverfield", "Shin Godzilla", "Destoroyah", "Biollante", "SpaceGodzilla", "Orga", "Hedorah", "Gigan", "Megalon", "Anguirus", "Baragon", "Varan", "Manda", "Kumonga", "Ebirah", "Kamacuras", "Gorosaurus", "Mothra Larva", "Battra", "Manda", "Titanus", "Scylla", "Methuselah", "Behemoth", "Muto", "Muto Prime", "Showa Godzilla", "Heisei Godzilla", "Millennium Godzilla", "Legendary Godzilla", "Gamera", "Guiron", "Virass", "Barugon", "Gyaos", "Iris", "Legion", "Zilla", "Orga", "Megaguirus", "Battra", "Destoroyah", "SpaceGodzilla", "Biollante", "Hedorah", "Gigan", "Megalon", "Anguirus", "Baragon", "Varan", "Manda", "Kumonga", "Ebirah", "Kamacuras", "Gorosaurus", "Mothra Larva", "Battra", "Manda", "Titanus", "Scylla", "Methuselah", "Behemoth", "Muto", "Muto Prime", "Bubble", "Caine", "Jax", "Pomni", "Ragatha", "Gangle", "Kinger", "Zooble", "God of the Digital Circus", "Abstract Entity", "Gloink Queen", "Caine Ringmaster", "Bubble Bubblegum"]
    };

    const rangos = [
      { id: "comun", nombre: "Común ⚪", prob: 45 },
      { id: "pocoComun", nombre: "Poco Común 🟢", prob: 25 },
      { id: "raro", nombre: "Raro 🔵", prob: 15 },
      { id: "epico", nombre: "Épico 🟣", prob: 9 },
      { id: "legendario", nombre: "LEGENDARIO 🟡", prob: 5 },
      { id: "mitico", nombre: "MÍTICO 🔴", prob: 1 }
    ];

    let azarRango = Math.random() * 100;
    let acumulado = 0;
    let rangoSel = rangos[0];
    for (let r of rangos) {
      acumulado += r.prob;
      if (azarRango <= acumulado) { rangoSel = r; break; }
    }

    const nombreElegido = categorias[rangoSel.id][Math.floor(Math.random() * categorias[rangoSel.id].length)];

    // 3. GUARDADO
    if (!global.db.chats[chatId]) global.db.chats[chatId] = {};
    global.db.chats[chatId].mascotaSuelta = {
        nombre: nombreElegido,
        rango: rangoSel.nombre
    };
    
    global.db.users[userId].lastTw = ahora;
    if (global.db.write) await global.db.write();

    // MENSAJE CON MEJOR DISEÑO
    m.reply(`✨ *¡MASCOTA AVISTADA EN EL CHAT!* ✨\n\n` +
      `👾 *Mascota:* ${nombreElegido}\n` +
      `⭐ *Rango:* ${rangoSel.nombre}\n\n` +
      `⚡ *¡Rápido!* El primero que use *™ct* se la lleva.\n` +
      `⏳ Tienes **90 segundos** antes de que escape...`);

    // 4. TEMPORIZADOR DE ESCAPE (90 SEGUNDOS)
    setTimeout(async () => {
        if (global.db.chats[chatId]?.mascotaSuelta && global.db.chats[chatId].mascotaSuelta.nombre === nombreElegido) {
            global.db.chats[chatId].mascotaSuelta = null;
            await client.sendMessage(chatId, { text: `💨 La mascota *${nombreElegido}* se ha escapado porque nadie la reclamó a tiempo...` });
        }
    }, 90000); 
  }
};