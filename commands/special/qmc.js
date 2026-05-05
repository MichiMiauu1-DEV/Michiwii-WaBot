export default {
    command: ['qmc', 'rmc'],
    category: 'fun',
    run: async (client, m) => {
        const triviaData = [
            { d: "FÁCIL", q: "¿Qué objeto necesitas para dormir y pasar la noche?", o: ["Mesa", "Cama", "Silla"], a: "Cama" },
            { d: "FÁCIL", q: "¿Qué animal puedes atraer con semillas?", o: ["Lobo", "Pollo", "Vaca"], a: "Pollo" },
            { d: "FÁCIL", q: "¿Cómo se llama la versión de Minecraft en el navegador?", o: ["Minecraft Classic", "Minecraft Online", "Minecraft Browser"], a: "Minecraft Classic" },
            { d: "FÁCIL", q: "¿De qué color es la esmeralda?", o: ["Azul", "Rojo", "Verde"], a: "Verde" },
            { d: "FÁCIL", q: "¿Qué bloque se usa para alumbrar una cueva?", o: ["Antorcha", "Piedra", "Tierra"], a: "Antorcha" },
            { d: "FÁCIL", q: "¿Qué animal da chuletas de cerdo al morir?", o: ["Cerdo", "Vaca", "Pollo"], a: "Cerdo" },
            { d: "FÁCIL", q: "¿Qué herramienta sirve para cavar tierra rápido?", o: ["Pala", "Pico", "Hacha"], a: "Pala" },
            { d: "FÁCIL", q: "¿Con qué material se hacen las herramientas de piedra?", o: ["Adoquín", "Madera", "Hierro"], a: "Adoquín" },
            { d: "FÁCIL", q: "¿Qué pasa si te quedas mucho tiempo bajo el agua?", o: ["Te ahogas", "Vuelas", "Te quemas"], a: "Te ahogas" },
            { d: "FÁCIL", q: "¿Qué mineral se usa como combustible?", o: ["Carbón", "Diamante", "Esmeralda"], a: "Carbón" },
            { d: "FÁCIL", q: "¿Qué mob es un muerto viviente?", o: ["Zombie", "Creeper", "Enderman"], a: "Zombie" },
            { d: "FÁCIL", q: "¿Cómo se llama el mineral de color amarillo?", o: ["Oro", "Hierro", "Redstone"], a: "Oro" },
            { d: "FÁCIL", q: "¿Qué animal puedes usar para conseguir huevos?", o: ["Gallina", "Vaca", "Lobo"], a: "Gallina" },
            { d: "FÁCIL", q: "¿Qué herramienta sirve para cortar hojas?", o: ["Tijeras", "Pico", "Pala"], a: "Tijeras" },
            { d: "FÁCIL", q: "¿De qué color es el bloque de Redstone?", o: ["Rojo", "Verde", "Azul"], a: "Rojo" },
            { d: "FÁCIL", q: "¿Qué mob tiene huesos y dispara flechas?", o: ["Esqueleto", "Zombie", "Creeper"], a: "Esqueleto" },
            { d: "FÁCIL", q: "¿Cómo se llama la madera de color oscuro?", o: ["Abeto", "Roble", "Abedul"], a: "Abeto" },
            { d: "FÁCIL", q: "¿Qué necesitas para pescar?", o: ["Caña de pescar", "Espada", "Pico"], a: "Caña de pescar" },
            { d: "FÁCIL", q: "¿Qué bloque obtienes al fundir arena?", o: ["Cristal", "Ladrillo", "Piedra"], a: "Cristal" },
            { d: "FÁCIL", q: "¿Qué animal te da cuero?", o: ["Vaca", "Pollo", "Oveja"], a: "Vaca" },
            { d: "MEDIA", q: "¿Qué bloque se usa para atraer a los rayos?", o: ["Barra de hierro", "Pararrayos", "Bloque de cobre"], a: "Pararrayos" },
            { d: "MEDIA", q: "¿Qué objeto necesitas para ver la fortaleza del End?", o: ["Perla de Ender", "Ojo de Ender", "Brújula"], a: "Ojo de Ender" },
            { d: "MEDIA", q: "¿Cuántos ojos de ender máximo pueden venir ya puestos?", o: ["3", "12", "0"], a: "12" },
            { d: "MEDIA", q: "¿Poción hecha con verruga y crema de magma?", o: ["Resistencia al fuego", "Rapidez", "Veneno"], a: "Resistencia al fuego" },
            { d: "MEDIA", q: "¿Mineral que solo se pica con diamante o netherite?", o: ["Oro", "Obsidiana", "Esmeralda"], a: "Obsidiana" },
            { d: "MEDIA", q: "¿Qué bloque impide que los Endermans se teletransporten?", o: ["Hielo", "Agua", "Obsidiana"], a: "Agua" },
            { d: "MEDIA", q: "¿Estructura oceánica guardada por Guardianes?", o: ["Templo del Desierto", "Monumento Oceánico", "Ruinas de Barco"], a: "Monumento Oceánico" },
            { d: "MEDIA", q: "¿Cuántos lingotes de oro necesitas para una Manzana Dorada?", o: ["4", "8", "9"], a: "8" },
            { d: "MEDIA", q: "¿Qué material se usa para domesticar a un lobo?", o: ["Carne podrida", "Hueso", "Pescado"], a: "Hueso" },
            { d: "MEDIA", q: "¿Jefe que se invoca con 3 cabezas de esqueleto wither?", o: ["Ender Dragon", "Wither", "Warden"], a: "Wither" },
            { d: "MEDIA", q: "¿Cuál es el nivel máximo de encantamiento para Filo?", o: ["IV", "V", "VI"], a: "V" },
            { d: "MEDIA", q: "¿Qué mob aparece si no has dormido en 3 días?", o: ["Murciélago", "Phantom", "Vex"], a: "Phantom" },
            { d: "MEDIA", q: "¿Con qué se craftea un telescopio?", o: ["Vidrio y Cobre", "Cristal amatista y Cobre", "Hierro y Oro"], a: "Cristal amatista y Cobre" },
            { d: "MEDIA", q: "¿Qué objeto permite a los aldeanos reproducirse?", o: ["Camas", "Mesas", "Puertas"], a: "Camas" },
            { d: "MEDIA", q: "¿Qué combustible dura más en el horno?", o: ["Bloque de carbón", "Cubo de lava", "Vara de Blaze"], a: "Cubo de lava" },
            { d: "MEDIA", q: "¿Qué mob neutral te ataca si le miras a los ojos?", o: ["Llama", "Enderman", "Panda"], a: "Enderman" },
            { d: "MEDIA", q: "¿Cómo se llama el mineral que reduce el daño de caída en botas?", o: ["Plumas", "Caída de pluma", "Amatista"], a: "Caída de pluma" },
            { d: "MEDIA", q: "¿Qué comida te teletransporta al azar?", o: ["Fruta coral", "Manzana dorada", "Sopa extraña"], a: "Fruta coral" },
            { d: "MEDIA", q: "¿Con qué material se comercia con los aldeanos?", o: ["Diamante", "Esmeralda", "Pepitas de oro"], a: "Esmeralda" },
            { d: "MEDIA", q: "¿Qué bloque se usa para crear un portal al Nether?", o: ["Piedra base", "Obsidiana", "Llorosa"], a: "Obsidiana" },
            { d: "MEDIA", q: "¿Qué mob es una versión hostil de un aldeano?", o: ["Zombie", "Illager", "Bruja"], a: "Illager" },
            { d: "MEDIA", q: "¿Cuántas varas de blaze necesitas para un soporte de pociones?", o: ["1", "2", "3"], a: "1" },
            { d: "MEDIA", q: "¿Qué animal se puede montar pero necesita silla?", o: ["Cerdo", "Caballo", "Ambos"], a: "Ambos" },
            { d: "MEDIA", q: "¿Qué encantamiento repara herramientas con experiencia?", o: ["Irrompibilidad", "Remiendo", "Fortuna"], a: "Remiendo" },
            { d: "MEDIA", q: "¿Qué bloque se obtiene al juntar lava y agua corriente?", o: ["Obsidiana", "Piedra", "Adoquín"], a: "Adoquín" },
            { d: "MEDIA", q: "¿Qué estructura tiene cofres protegidos por TNT?", o: ["Mansión", "Templo del desierto", "Fortaleza"], a: "Templo del desierto" },
            { d: "MEDIA", q: "¿Cómo se llama el guardián de las ciudades subterráneas?", o: ["Gritón", "Warden", "Caminante"], a: "Warden" },
            { d: "MEDIA", q: "¿Qué objeto permite planear desde lugares altos?", o: ["Capas", "Élitros", "Paracaídas"], a: "Élitros" },
            { d: "MEDIA", q: "¿Qué mob flota y dispara bolas de fuego en el Nether?", o: ["Blaze", "Ghast", "Wither"], a: "Ghast" },
            { d: "MEDIA", q: "¿Qué bloque se pone debajo de un bloque de notas para piano?", o: ["Madera", "Piedra", "Arena"], a: "Madera" },
            { d: "MEDIA", q: "¿Qué animal te ayuda a encontrar tesoros enterrados?", o: ["Loro", "Delfín", "Tortuga"], a: "Delfín" },
            { d: "MEDIA", q: "¿Cuántos bloques de hierro se usan para un Golem?", o: ["3", "4", "5"], a: "4" },
            { d: "MEDIA", q: "¿Qué material se usa para mejorar diamante a netherite?", o: ["Lingote", "Plantilla de herrería", "Ambos"], a: "Ambos" },
            { d: "MEDIA", q: "¿Qué planta se usa para crear pociones de visión nocturna?", o: ["Zanahoria dorada", "Manzana dorada", "Verruga del Nether"], a: "Zanahoria dorada" },
            { d: "MEDIA", q: "¿Cuántos lingotes necesitas para una pechera de hierro?", o: ["6", "8", "9"], a: "8" },
            { d: "MEDIA", q: "¿Con qué material se fabrican las riendas?", o: ["Hilo y Bola de slime", "Cuero y Hilo", "Lana y Hierro"], a: "Hilo y Bola de slime" },
            { d: "MEDIA", q: "¿Qué mob te da el efecto de Mal Presagio?", o: ["Bruja", "Capitán Illager", "Vex"], a: "Capitán Illager" },
            { d: "MEDIA", q: "¿Cómo se llama el mineral azul que sirve para encantar?", o: ["Amatista", "Lapislázuli", "Zafiro"], a: "Lapislázuli" },
            { d: "MEDIA", q: "¿Qué bloque evita que los mobs aparezcan?", o: ["Antorcha", "Bloque de comandos", "Piedra lisa"], a: "Antorcha" },
            { d: "MEDIA", q: "¿Qué animal suelta cuero al morir?", o: ["Vaca", "Oveja", "Cerdo"], a: "Vaca" },
            { d: "MEDIA", q: "¿Qué objeto necesitas para esquilar una oveja sin matarla?", o: ["Cuchillo", "Tijeras", "Hacha"], a: "Tijeras" },
            { d: "MEDIA", q: "¿Con qué material se hacen las herramientas de piedra?", o: ["Adoquín", "Piedra lisa", "Andesita"], a: "Adoquín" },
            { d: "MEDIA", q: "¿Qué mob explota si es golpeado por un rayo?", o: ["Creeper cargado", "Zombie", "Enderman"], a: "Creeper cargado" },
            { d: "MEDIA", q: "¿Cómo se llama el mineral rojo que transporta energía?", o: ["Netherite", "Redstone", "Rubí"], a: "Redstone" },
            { d: "MEDIA", q: "¿Qué mob te da el efecto de levitación?", o: ["Shulker", "Ghast", "Vex"], a: "Shulker" },
            { d: "MEDIA", q: "¿Qué bloque se usa para cocinar comida más rápido que el horno?", o: ["Ahumador", "Alto horno", "Hoguera"], a: "Ahumador" },
            { d: "MEDIA", q: "¿Qué objeto se usa para teñir armaduras de cuero?", o: ["Tintes", "Pociones", "Flores"], a: "Tintes" },
            { d: "MEDIA", q: "¿Qué mob te da el efecto de Fatiga Minera?", o: ["Guardián Anciano", "Shulker", "Wither"], a: "Guardián Anciano" },
            { d: "MEDIA", q: "¿Cómo se llama el bioma donde crecen setas gigantes?", o: ["Pantano", "Isla de setas", "Bosque oscuro"], a: "Isla de setas" },
            { d: "MEDIA", q: "¿Qué bloque se necesita para activar una baliza o faro?", o: ["Bloques de mineral", "Obsidiana", "Vidrio"], a: "Bloques de mineral" },
            { d: "MEDIA", q: "¿Qué mob neutral suelta bolas de nieve al morir?", o: ["Golem de nieve", "Cubo de magma", "Vex"], a: "Golem de nieve" },
            { d: "MEDIA", q: "¿Qué encantamiento te permite respirar más tiempo bajo el agua?", o: ["Afinidad acuática", "Respiración", "Agilidad"], a: "Respiración" },
            { d: "MEDIA", q: "¿Cuál es el límite de aldeanos en una aldea?", o: ["Depende de las camas", "20", "Sin límite"], a: "Depende de las camas" },
            { d: "MEDIA", q: "¿Qué herramienta se usa para quitar el óxido del cobre?", o: ["Pico", "Hacha", "Pala"], a: "Hacha" },
            { d: "MEDIA", q: "¿Qué mob puede spawnear en una balsa en el pantano?", o: ["Bruja", "Zombie", "Rana"], a: "Bruja" },
            { d: "MEDIA", q: "¿Qué material se usa para fabricar un pistón?", o: ["Hierro, madera, piedra y redstone", "Oro y piedra", "Diamante"], a: "Hierro, madera, piedra y redstone" },
            { d: "MEDIA", q: "¿Qué mob huye de los lobos domésticos?", o: ["Esqueleto", "Creeper", "Araña"], a: "Esqueleto" },
            { d: "MEDIA", q: "¿Qué objeto necesitas para recolectar panales de abejas?", o: ["Tijeras", "Cuchillo", "Hacha"], a: "Tijeras" },
            { d: "MEDIA", q: "¿Qué mineral se encuentra solo en el bioma de montaña?", o: ["Esmeralda", "Oro", "Cobre"], a: "Esmeralda" },
            { d: "MEDIA", q: "¿Qué mob puede ver a través de las paredes?", o: ["Esqueleto", "Warden", "Araña"], a: "Araña" },
            { d: "DIFÍCIL", q: "¿Cuál es el nombre del disco de música roto?", o: ["11", "13", "Chirp"], a: "11" },
            { d: "DIFÍCIL", q: "¿Qué comando se usa para localizar una estructura?", o: ["/find", "/locate", "/search"], a: "/locate" },
            { d: "DIFÍCIL", q: "¿Bloques en Overworld por cada 1 en el Nether?", o: ["4", "8", "16"], a: "8" },
            { d: "DIFÍCIL", q: "¿Qué item sueltan los Shulkers?", o: ["Caparazón de Shulker", "Caja de Shulker", "Perla de Shulker"], a: "Caparazón de Shulker" },
            { d: "DIFÍCIL", q: "¿Encantamiento para que el tridente vuelva?", o: ["Canalización", "Lealtad", "Empuje"], a: "Lealtad" },
            { d: "DIFÍCIL", q: "¿Qué flor se usa para hacer tinte gris claro?", o: ["Margarita", "Tulipán blanco", "Orquídea azul"], a: "Margarita" },
            { d: "DIFÍCIL", q: "¿Cuánta durabilidad tiene una pechera de Netherite?", o: ["528", "592", "600"], a: "592" },
            { d: "DIFÍCIL", q: "¿Encantamiento que permite caminar sobre el agua congelándola?", o: ["Agilidad acuática", "Paso helado", "Caminante de hielo"], a: "Caminante de hielo" },
            { d: "DIFÍCIL", q: "¿Qué objeto hace que un aldeano sea bibliotecario?", o: ["Atril", "Compostador", "Mesa de flechado"], a: "Atril" },
            { d: "DIFÍCIL", q: "¿Mob capaz de romper puertas de madera en difícil?", o: ["Esqueleto", "Zombie", "Creeper"], a: "Zombie" },
            { d: "DIFÍCIL", q: "¿Cuál es el efecto de estado que te da el Warden?", o: ["Ceguera", "Oscuridad", "Debilidad"], a: "Oscuridad" },
            { d: "DIFÍCIL", q: "¿Qué pasa si le cae un rayo a un cerdo?", o: ["Muere", "Se vuelve un Hombrecerdo Zombie", "Desaparece"], a: "Se vuelve un Hombrecerdo Zombie" },
            { d: "DIFÍCIL", q: "¿Cuántos estofados sospechosos diferentes existen?", o: ["5", "9", "11"], a: "11" },
            { d: "DIFÍCIL", q: "¿Qué mob no recibe daño por caída?", o: ["Gato", "Golems de hierro", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué bloque tiene la mayor resistencia a explosiones (sin contar bedrock)?", o: ["Obsidiana", "Bloque de Netherite", "Ancla de reaparición"], a: "Obsidiana" },
            { d: "DIFÍCIL", q: "¿En qué eje se mide la profundidad (Y)?", o: ["X", "Y", "Z"], a: "Y" },
            { d: "DIFÍCIL", q: "¿Qué mob neutral suelta una perla de ender al morir?", o: ["Endermite", "Enderman", "Shulker"], a: "Enderman" },
            { d: "DIFÍCIL", q: "¿Cuántos bloques de altura tiene el modelo de Steve?", o: ["1.8", "1.9", "2.0"], a: "1.8" },
            { d: "DIFÍCIL", q: "¿Qué comida da el efecto de Hambre al consumirla?", o: ["Carne podrida", "Ojo de araña", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Cómo se llama el encantamiento que aumenta el drop de objetos?", o: ["Fortuna", "Saqueo", "Suerte"], a: "Saqueo" },
            { d: "DIFÍCIL", q: "¿Qué objeto necesitas para ver la vida de los caballos?", o: ["Silla de montar", "Armadura", "Nada"], a: "Nada" },
            { d: "DIFÍCIL", q: "¿Cuántos niveles de experiencia cuesta un nombre en el yunque?", o: ["1", "5", "10"], a: "1" },
            { d: "DIFÍCIL", q: "¿Qué mob huye si le prendes fuego cerca?", o: ["Creeper", "Hoglin", "Enderman"], a: "Hoglin" },
            { d: "DIFÍCIL", q: "¿Qué animal te da el efecto de 'Gracia del Delfín'?", o: ["Delfín", "Tortuga", "Axolote"], a: "Delfín" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para detectar cambios en los bloques adyacentes?", o: ["Observador", "Comparador", "Repetidor"], a: "Observador" },
            { d: "DIFÍCIL", q: "¿Qué mob aparece si lanzas una perla de ender?", o: ["Endermite", "Silverfish", "Vex"], a: "Endermite" },
            { d: "DIFÍCIL", q: "¿Cuál es el color natural de la madera de manglar?", o: ["Rojo", "Marrón", "Verde"], a: "Rojo" },
            { d: "DIFÍCIL", q: "¿Cuántos lingotes de hierro se necesitan para un yunque?", o: ["31", "34", "36"], a: "31" },
            { d: "DIFÍCIL", q: "¿Qué objeto permite recuperar el inventario al morir?", o: ["Tótem", "Fragmento de recuperación", "Brújula de recuperación"], a: "Brújula de recuperación" },
            { d: "DIFÍCIL", q: "¿Qué mob puede 'oler' al jugador?", o: ["Warden", "Sniffer", "Oso Polar"], a: "Warden" },
            { d: "DIFÍCIL", q: "¿En qué versión se añadió el bioma de Cherry Grove?", o: ["1.19", "1.20", "1.21"], a: "1.20" },
            { d: "DIFÍCIL", q: "¿Qué objeto se usa para resetear el punto de spawn en el Nether?", o: ["Cama", "Ancla de reaparición", "Magnetita"], a: "Ancla de reaparición" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta membranas para reparar élitros?", o: ["Murciélago", "Phantom", "Loro"], a: "Phantom" },
            { d: "DIFÍCIL", q: "¿Cuántas fases tiene el crecimiento de un cultivo de trigo?", o: ["6", "7", "8"], a: "8" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta incienso de Illager?", o: ["Evocador", "Vindicador", "Capitán de patrulla"], a: "Capitán de patrulla" },
            { d: "DIFÍCIL", q: "¿Qué bloque reduce el sonido de las vibraciones?", o: ["Lana", "Alfombra", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Cuál es la probabilidad de que un conejo sea el 'Conejo Asesino'?", o: ["1/2500", "1/1000", "Solo comandos"], a: "Solo comandos" },
            { d: "DIFÍCIL", q: "¿Qué mob ataca a los esqueletos?", o: ["Lobo", "Golem de nieve", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué bloque atrae a los Piglins?", o: ["Bloque de oro", "Oro en bruto", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué animal puede llevar cofres?", o: ["Caballo", "Burro", "Vaca"], a: "Burro" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta caparazones de tortuga?", o: ["Tortuga bebé al crecer", "Tortuga adulta", "Ahogado"], a: "Tortuga bebé al crecer" },
            { d: "DIFÍCIL", q: "¿Qué encantamiento es incompatible con Infinitud?", o: ["Mending (Remiendo)", "Poder", "Llama"], a: "Mending (Remiendo)" },
            { d: "DIFÍCIL", q: "¿Qué material se usa para craftear una brújula?", o: ["Hierro y Redstone", "Oro y Redstone", "Cobre y Redstone"], a: "Hierro y Redstone" },
            { d: "DIFÍCIL", q: "¿Qué mob se transforma en un Vex?", o: ["Nada", "Allay al morir", "Invocado por Evocador"], a: "Invocado por Evocador" },
            { d: "DIFÍCIL", q: "¿Qué objeto se usa para guiar a un cerdo?", o: ["Zanahoria en un palo", "Trigo", "Manzana"], a: "Zanahoria en un palo" },
            { d: "DIFÍCIL", q: "¿Qué mob tiene miedo de las cajas de música?", o: ["Creeper", "Loro", "Allay"], a: "Loro" },
            { d: "DIFÍCIL", q: "¿Qué encantamiento hace que las arañas reciban más daño?", o: ["Filo", "Perdición de los artrópodos", "Golpeo"], a: "Perdición de los artrópodos" },
            { d: "DIFÍCIL", q: "¿Cuántos corazones de vida tiene un Iron Golem?", o: ["50", "100", "150"], a: "100" },
            { d: "DIFÍCIL", q: "¿Qué bloque se genera al mezclar agua y lava estática?", o: ["Obsidiana", "Piedra", "Adoquín"], a: "Obsidiana" },
            { d: "DIFÍCIL", q: "¿Cuál es el nivel máximo de potencia de un faro?", o: ["III", "IV", "V"], a: "IV" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta veneno al atacarte?", o: ["Araña de cueva", "Abeja", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué objeto necesitas para cambiar el patrón de un estandarte?", o: ["Telar", "Mesa de crafteo", "Yunque"], a: "Telar" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta bolas de slime?", o: ["Slime", "Panda (al estornudar)", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para crear un mapa?", o: ["Papel", "Papel y Brújula", "Cuero"], a: "Papel y Brújula" },
            { d: "DIFÍCIL", q: "¿Qué mob es atraído por las bayas luminosas?", o: ["Zorro", "Murciélago", "Axolote"], a: "Zorro" },
            { d: "DIFÍCIL", q: "¿En qué capa suele aparecer el diamante en la 1.20?", o: ["-58", "12", "0"], a: "-58" },
            { d: "DIFÍCIL", q: "¿Qué encantamiento reduce el retroceso?", o: ["Empuje", "Resistencia", "Netherite (es atributo)"], a: "Netherite (es atributo)" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta tinte negro?", o: ["Calamar", "Calamar brillante", "Ambos"], a: "Calamar" },
            { d: "DIFÍCIL", q: "¿Qué objeto se usa para encontrar una Mansión?", o: ["Mapa explorador", "Ojo de ender", "Brújula"], a: "Mapa explorador" },
            { d: "DIFÍCIL", q: "¿Qué mob es inmune al fuego?", o: ["Zombified Piglin", "Strider", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Cuántos objetos caben en un Slot?", o: ["16", "64", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para teletransportarse a la ciudad del End?", o: ["Portal del End", "Portal de salida", "Portal de enlace"], a: "Portal de enlace" },
            { d: "DIFÍCIL", q: "¿Qué animal puede cambiar de color según el nombre?", o: ["Oveja", "Conejo", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta un disco de música si lo mata un esqueleto?", o: ["Zombie", "Creeper", "Enderman"], a: "Creeper" },
            { d: "DIFÍCIL", q: "¿Cuál es el tiempo de carga de una ballesta?", o: ["1.25s", "1.5s", "2.0s"], a: "1.25s" },
            { d: "DIFÍCIL", q: "¿Qué objeto se usa para domesticar un loro?", o: ["Semillas", "Galletas", "Manzanas"], a: "Semillas" },
            { d: "DIFÍCIL", q: "¿Qué mob se vuelve agresivo si robas su tesoro?", o: ["Piglin", "Delfín", "Golem"], a: "Piglin" },
            { d: "DIFÍCIL", q: "¿Qué encantamiento permite picar bajo el agua rápido?", o: ["Afinidad acuática", "Eficacia", "Agilidad"], a: "Afinidad acuática" },
            { d: "DIFÍCIL", q: "¿Qué mob puede spawnear con armadura de diamante?", o: ["Zombie", "Esqueleto", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para crear un estofado sospechoso?", o: ["Cuenco, champiñón y flor", "Cuenco y carne", "Solo champiñones"], a: "Cuenco, champiñón y flor" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta lágrimas de Ghast?", o: ["Ghast", "Wither", "Bruja"], a: "Ghast" },
            { d: "DIFÍCIL", q: "¿Cuál es el límite de encantamientos de protección en una pieza?", o: ["1", "2", "3"], a: "1" },
            { d: "DIFÍCIL", q: "¿Qué mob es una versión de desierto del zombie?", o: ["Ahogado", "Husky", "Caminante"], a: "Husky" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para duplicar diamantes en la herrería?", o: ["Plantilla", "Mesa", "Yunque"], a: "Plantilla" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta hilo al morir?", o: ["Araña", "Gato", "Ambos"], a: "Ambos" },
            { d: "DIFÍCIL", q: "¿Cuántos bloques avanza el agua en el Overworld?", o: ["7", "8", "9"], a: "8" },
            { d: "DIFÍCIL", q: "¿Qué mob suelta fragmentos de eco?", o: ["Warden", "Cofres de Ancient City", "Allay"], a: "Cofres de Ancient City" },
            { d: "DIFÍCIL", q: "¿Qué encantamiento permite lanzar rayos con el tridente?", o: ["Canalización", "Conductividad", "Trueno"], a: "Canalización" },
            { d: "DIFÍCIL", q: "¿Qué bloque se usa para craftear un repetidor?", o: ["Antorcha, Redstone y Piedra", "Oro y Piedra", "Palos y Redstone"], a: "Antorcha, Redstone y Piedra" },
            { d: "DIFÍCIL", q: "¿Qué mob se transforma al estar en el agua?", o: ["Zombie (a Ahogado)", "Esqueleto", "Panda"], a: "Zombie (a Ahogado)" },
            { d: "DIFÍCIL", q: "¿Cuál es el rango de explosión de un Creeper?", o: ["3 bloques", "4 bloques", "5 bloques"], a: "3 bloques" },
            { d: "DIFÍCIL", q: "¿Tiempo de cocción en horno normal?", o: ["8s", "10s", "12s"], a: "10s" },
            { d: "DIFÍCIL", q: "¿Qué bloque hace que el humo de hoguera suba más?", o: ["Heno", "Lana", "Alfombra"], a: "Heno" },
            { d: "DIFÍCIL", q: "¿Rango de detección del sensor Skulk?", o: ["8 bloques", "12 bloques", "16 bloques"], a: "8 bloques" },
            { d: "DIFÍCIL", q: "¿Qué reduce el crecimiento del caballo bebé?", o: ["Manzanas y Azúcar", "Zanahorias", "Trigo"], a: "Manzanas y Azúcar" },
            { d: "DIFÍCIL", q: "¿Qué suelta disco si muere por esqueleto?", o: ["Creeper", "Zombie", "Araña"], a: "Creeper" },
            { d: "DIFÍCIL", q: "¿Saturación del estofado de diente de león?", o: ["Saturación II", "Saturación", "Nada"], a: "Saturación" },
            { d: "DIFÍCIL", q: "¿Experiencia del Ender Dragon (1ra vez)?", o: ["10,000", "12,000", "20,000"], a: "12,000" },
            { d: "DIFÍCIL", q: "¿Encantamiento exclusivo de casco además de Respiración?", o: ["Afinidad acuática", "Espinas", "Paso helado"], a: "Afinidad acuática" },
            { d: "DIFÍCIL", q: "¿Para qué sirve el Huevo de NPC?", o: ["PNJ con diálogo", "Decoración", "No existe"], a: "PNJ con diálogo" },
            { d: "DIFÍCIL", q: "¿Cómo se repara la malla en yunque?", o: ["Hierro", "Malla", "Cobre"], a: "Hierro" },
            { d: "IMPOSIBLE", q: "¿Nombre técnico del idioma de la mesa?", o: ["Alfabeto Galáctico Estándar", "Rúnico de Notch", "Código de Jeb"], a: "Alfabeto Galáctico Estándar" },
            { d: "IMPOSIBLE", q: "¿Versión donde se añadió el bloque de comando?", o: ["1.4.2", "1.2.5", "1.7.2"], a: "1.4.2" },
            { d: "IMPOSIBLE", q: "¿Cómo se llamaba Minecraft originalmente?", o: ["Block Craft", "Cave Game", "Mine Game"], a: "Cave Game" },
            { d: "IMPOSIBLE", q: "¿Probabilidad de portal con 12 ojos puestos?", o: ["1 entre 1 millón", "1 entre un billón", "1 entre 100 mil"], a: "1 entre un billón" },
            { d: "IMPOSIBLE", q: "¿Primer mob añadido además de Steve?", o: ["Zombie", "Creeper", "Rana"], a: "Zombie" },
            { d: "IMPOSIBLE", q: "¿Cuántos años duró la fase Alpha de Minecraft?", o: ["1 año", "6 meses", "2 años"], a: "1 año" },
            { d: "IMPOSIBLE", q: "¿Probabilidad de que una oveja sea rosa naturalmente?", o: ["0.164%", "0.5%", "1.0%"], a: "0.164%" },
            { d: "IMPOSIBLE", q: "¿Mob resultado de un error al intentar crear un cerdo?", o: ["Enderman", "Creeper", "Ghast"], a: "Creeper" },
            { d: "IMPOSIBLE", q: "¿Fecha exacta de la versión completa (1.0)?", o: ["18 de nov 2011", "10 de oct 2010", "1 de ene 2012"], a: "18 de nov 2011" },
            { d: "IMPOSIBLE", q: "¿Personaje oculto que Notch confirmó que no existe?", o: ["Entity 303", "Herobrine", "Lick"], a: "Herobrine" },
            { d: "IMPOSIBLE", q: "¿Qué bloque tiene el ID numérico 1 en versiones antiguas?", o: ["Aire", "Piedra", "Tierra"], a: "Piedra" },
            { d: "IMPOSIBLE", q: "¿Cuántas variantes de colores tienen los Ajolotes?", o: ["4", "5", "6"], a: "5" },
            { d: "IMPOSIBLE", q: "¿En qué año se lanzó la Indev 0.31?", o: ["2009", "2010", "2011"], a: "2010" },
            { d: "IMPOSIBLE", q: "¿Cuál es el límite real de coordenadas (Far Lands)?", o: ["12,550,821", "30,000,000", "2,147,483,647"], a: "12,550,821" },
            { d: "IMPOSIBLE", q: "¿Qué mob fue eliminado en la versión 0.30 (Creative)?", o: ["Beast Boy", "Rana", "Steve (Mob)"], a: "Rana" },
            { d: "IMPOSIBLE", q: "¿Probabilidad de que un Slime spawnee como el más pequeño?", o: ["50%", "33.3%", "25%"], a: "33.3%" },
            { d: "IMPOSIBLE", q: "¿Cuántas texturas de cuadros existen en el archivo original?", o: ["25", "26", "32"], a: "26" },
            { d: "IMPOSIBLE", q: "¿Qué mob tenía el nombre interno 'Mob'?", o: ["Zombie", "Creeper", "Steve"], a: "Steve" },
            { d: "IMPOSIBLE", q: "¿Cuál es el valor máximo de dureza de la Bedrock?", o: ["-1", "0", "9999"], a: "-1" },
            { d: "IMPOSIBLE", q: "¿En qué versión se añadió el hambre?", o: ["Beta 1.7", "Beta 1.8", "1.0.0"], a: "Beta 1.8" },
            { d: "IMPOSIBLE", q: "¿Cuántos ticks de juego equivalen a un segundo real?", o: ["10", "20", "40"], a: "20" },
            { d: "IMPOSIBLE", q: "¿Qué planta solo se podía obtener con /give en la 1.7?", o: ["Arbusto muerto", "Helecho", "Rosa de las sombras"], a: "Arbusto muerto" },
            { d: "IMPOSIBLE", q: "¿Cuál es la ID decimal de la manzana de oro encantada?", o: ["322:1", "466", "280"], a: "322:1" },
            { d: "IMPOSIBLE", q: "¿Qué mob fue diseñado por un usuario llamado M_S_T?", o: ["Enderman", "Creeper", "Iron Golem"], a: "Iron Golem" },
            { d: "IMPOSIBLE", q: "¿Probabilidad de que un portal al Nether se encienda solo por fuego cercano?", o: ["0.1%", "1%", "No es probabilístico"], a: "No es probabilístico" },
            { d: "IMPOSIBLE", q: "¿Cuántos sub-biomas existían en la versión 1.12?", o: ["40", "65", "79"], a: "79" },
            { d: "IMPOSIBLE", q: "¿Qué objeto tenía la textura de una cara de Notch?", o: ["Manzana", "Cuadro", "Capa"], a: "Manzana" },
            { d: "IMPOSIBLE", q: "¿Cuál es el peso máximo que puede soportar un sensor de presión de oro?", o: ["1 entidad", "10 entidades", "64 entidades"], a: "1 entidad" },
            { d: "IMPOSIBLE", q: "¿En qué lenguaje se escribió Minecraft originalmente?", o: ["Java", "C++", "Python"], a: "Java" },
            { d: "IMPOSIBLE", q: "¿Qué sonido hace el Ghast al disparar?", o: ["Un gato enojado", "C418 gritando", "Un bebé"], a: "Un gato enojado" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de pescar un arco encantado con Suerte del Mar III?", o: ["0.8%", "1.9%", "2.5%"], a: "1.9%" },
            { d: "IMPOSIBLE", q: "¿Cómo se llamaba la moneda planificada para el juego antes de las esmeraldas?", o: ["Rubí", "Moneda de oro", "Zafiro"], a: "Rubí" },
            { d: "IMPOSIBLE", q: "¿Cuál es el alcance máximo de un rayo disparado por Canalización?", o: ["16 bloques", "32 bloques", "Sin límite"], a: "32 bloques" },
            { d: "IMPOSIBLE", q: "¿Qué mob se llama internamente 'grumm'?", o: ["Llama", "Oveja", "Cualquiera"], a: "Cualquiera" },
            { d: "IMPOSIBLE", q: "¿Cuántos niveles de luz emite un bloque de lava?", o: ["10", "14", "15"], a: "15" },
            { d: "IMPOSIBLE", q: "¿Qué versión introdujo los mundos infinitos en Pocket Edition?", o: ["0.8.0", "0.9.0", "0.11.0"], a: "0.9.0" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un zombie suelte su armadura equipada?", o: ["8.5%", "11.5%", "5%"], a: "8.5%" },
            { d: "IMPOSIBLE", q: "¿Qué mob inspiró el sonido de la respiración del Warden?", o: ["Un perro", "Una aspiradora", "Un sintetizador"], a: "Una aspiradora" },
            { d: "IMPOSIBLE", q: "¿Cuántas capas de nieve caben en un bloque?", o: ["4", "8", "12"], a: "8" },
            { d: "IMPOSIBLE", q: "¿Cuál fue el primer nombre de usuario en registrarse?", o: ["Notch", "Jeb", "Zezima"], a: "Notch" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió las texturas de 64x64 para capas?", o: ["1.7.2", "1.8", "1.14"], a: "1.8" },
            { d: "IMPOSIBLE", q: "¿Cuántas variantes de cuadros existen en total?", o: ["25", "26", "30"], a: "26" },
            { d: "IMPOSIBLE", q: "¿Qué mob suelta un fragmento de amatista al morir?", o: ["Vex", "Nada", "Golem de amatista"], a: "Nada" },
            { d: "IMPOSIBLE", q: "¿Cuál es la velocidad de vuelo de un Ghast?", o: ["1 m/s", "4 m/s", "10 m/s"], a: "1 m/s" },
            { d: "IMPOSIBLE", q: "¿Qué objeto era 'id 36' en versiones antiguas?", o: ["Bloque técnico de pistón", "Portal del end", "Bedrock"], a: "Bloque técnico de pistón" },
            { d: "IMPOSIBLE", q: "¿Cuántas capas de píxeles tiene la skin de un jugador?", o: ["1", "2", "3"], a: "2" },
            { d: "IMPOSIBLE", q: "¿Qué mob se añadió en la 1.10?", o: ["Oso Polar", "Llama", "Loro"], a: "Oso Polar" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un rayo caiga en un chunk específico por tick?", o: ["1/100,000", "1/50,000", "1/200,000"], a: "1/100,000" },
            { d: "IMPOSIBLE", q: "¿Qué mob fue el primero en tener animaciones faciales?", o: ["Panda", "Murciélago", "Aldeano"], a: "Panda" },
            { d: "IMPOSIBLE", q: "¿Cuál es la altura máxima de construcción en la versión 1.1?", o: ["128", "256", "320"], a: "128" },
            { d: "IMPOSIBLE", q: "¿Qué mob se llama internamente 'Pony'?", o: ["Caballo", "Steve", "Nada"], a: "Steve" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que aparezca un esqueleto montado en araña?", o: ["1%", "5%", "10%"], a: "1%" },
            { d: "IMPOSIBLE", q: "¿Qué bloque se usaba para simular engranajes en la Indev?", o: ["Redstone", "Engranaje (Bloque)", "Hierro"], a: "Engranaje (Bloque)" },
            { d: "IMPOSIBLE", q: "¿Cuál es la ID de la poción de suerte?", o: ["26", "30", "32"], a: "26" },
            { d: "IMPOSIBLE", q: "¿Cuántos estofados sospechosos se pueden encontrar en cofres de naufragios?", o: ["0", "1", "2"], a: "0" },
            { d: "IMPOSIBLE", q: "¿Qué mob se llama 'Dinnerbone'?", o: ["Cualquier mob al que le pongas la etiqueta", "Un caballo especial", "El Wither"], a: "Cualquier mob al que le pongas la etiqueta" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que una gallina ponga un huevo con 4 pollitos?", o: ["1/32", "1/128", "1/256"], a: "1/256" },
            { d: "IMPOSIBLE", q: "¿Qué versión de Java requiere la versión 1.20.1?", o: ["Java 8", "Java 11", "Java 17"], a: "Java 17" },
            { d: "IMPOSIBLE", q: "¿Cuántos bloques de distancia recorre una flecha cargada al máximo?", o: ["24", "50", "120"], a: "120" },
            { d: "IMPOSIBLE", q: "¿Qué mob se inspiró en un usuario de Reddit?", o: ["Phantom", "Vex", "Enderman"], a: "Phantom" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un aldeano sea un 'Nitwit' (tonto)?", o: ["5%", "10%", "20%"], a: "10%" },
            { d: "IMPOSIBLE", q: "¿En qué versión se añadió el bloque de carbón?", o: ["1.5", "1.6", "1.7"], a: "1.6" },
            { d: "IMPOSIBLE", q: "¿Qué objeto se usaba para fabricar mallas antes de ser eliminadas?", o: ["Hierro", "Fuego (item)", "Cadena"], a: "Fuego (item)" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un Iron Golem spawnee en un chunk por segundo?", o: ["1/7000", "1/1000", "Solo spawnea en aldeas"], a: "Solo spawnea en aldeas" },
            { d: "IMPOSIBLE", q: "¿Qué mob suelta 'Cuero de conejo'?", o: ["Conejo", "Zorro", "Nada"], a: "Conejo" },
            { d: "IMPOSIBLE", q: "¿Cuántos segundos dura el efecto de una manzana de oro normal?", o: ["5s", "10s", "30s"], a: "5s" },
            { d: "IMPOSIBLE", q: "¿Cuál es la ID técnica del bloque de aire?", o: ["0", "1", "99"], a: "0" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió la 'Zanahoria dorada'?", o: ["1.4.2", "1.5", "1.6.1"], a: "1.4.2" },
            { d: "IMPOSIBLE", q: "¿Cuál es el límite de entidades que puede procesar un portal de una vez?", o: ["1", "5", "Sin límite"], a: "Sin límite" },
            { d: "IMPOSIBLE", q: "¿Qué mob fue diseñado basándose en un boceto de un niño de 10 años?", o: ["Sniffer", "Allay", "Ghast"], a: "Sniffer" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un calamar sea brillante en un chunk de océano profundo?", o: ["1/20", "1/50", "5%"], a: "5%" },
            { d: "IMPOSIBLE", q: "¿Qué objeto permite ver a través de la lava en modo espectador?", o: ["Poción de visión nocturna", "Poción de resistencia al fuego", "Nada"], a: "Poción de visión nocturna" },
            { d: "IMPOSIBLE", q: "¿Cuántas variantes de 'peces tropicales' existen?", o: ["2,700", "3,584", "4,102"], a: "3,584" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió el bioma de 'Deep Dark'?", o: ["1.17", "1.18", "1.19"], a: "1.19" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de encontrar un fósil en el desierto?", o: ["1/32", "1/64", "1/128"], a: "1/64" },
            { d: "IMPOSIBLE", q: "¿Qué mob suelta un 'Ojo de araña fermentado'?", o: ["Bruja", "Nada", "Araña de cueva"], a: "Nada" },
            { d: "IMPOSIBLE", q: "¿Cuál es la durabilidad de una herramienta de madera?", o: ["59", "60", "32"], a: "59" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió el comando /execute?", o: ["1.7.2", "1.8", "1.13"], a: "1.8" },
            { d: "IMPOSIBLE", q: "¿Cuál es el rango de detección del Warden por vibración?", o: ["8 bloques", "16 bloques", "24 bloques"], a: "16 bloques" },
            { d: "IMPOSIBLE", q: "¿Qué mob tiene 100 puntos de vida (50 corazones)?", o: ["Iron Golem", "Warden", "Ravager"], a: "Iron Golem" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un Blaze suelte una vara?", o: ["25%", "50%", "10%"], a: "50%" },
            { d: "IMPOSIBLE", q: "¿Qué objeto se usaba para domesticar gatos antes de la 1.14?", o: ["Pescado crudo", "Bacalao crudo", "Salmón crudo"], a: "Pescado crudo" },
            { d: "IMPOSIBLE", q: "¿En qué año se lanzó la versión de Xbox 360?", o: ["2011", "2012", "2013"], a: "2012" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un Creeper sea eléctrico por un rayo natural?", o: ["Muy baja", "100% si le da", "0.5%"], a: "100% si le da" },
            { d: "IMPOSIBLE", q: "¿Qué versión eliminó los mundos 'Far Lands'?", o: ["Beta 1.8", "1.0", "1.8"], a: "Beta 1.8" },
            { d: "IMPOSIBLE", q: "¿Qué mob se llama internamente 'EnderCrystal'?", o: ["Cristal del End", "Ender Dragon", "Enderman"], a: "Cristal del End" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de encontrar una manzana en hojas de roble?", o: ["0.5%", "1%", "2%"], a: "0.5%" },
            { d: "IMPOSIBLE", q: "¿Qué objeto era el 'id 95'?", o: ["Cristal tintado", "Portal del nether", "Piedra invisible"], a: "Cristal tintado" },
            { d: "IMPOSIBLE", q: "¿Cuántos bloques de altura tiene un Enderman?", o: ["2.9", "3.0", "3.1"], a: "2.9" },
            { d: "IMPOSIBLE", q: "¿Qué mob es inmune a las pociones de veneno?", o: ["Zombie", "Esqueleto", "Ambos"], a: "Ambos" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un aldeano sea infectado en dificultad Normal?", o: ["0%", "50%", "100%"], a: "50%" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió los 'Escudos'?", o: ["1.8", "1.9", "1.10"], a: "1.9" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un huevo de gallina no suelte nada?", o: ["1/8", "31/32", "255/256"], a: "31/32" },
            { d: "IMPOSIBLE", q: "¿Qué mob fue inspirado por el Slenderman?", o: ["Enderman", "Warden", "Vex"], a: "Enderman" },
            { d: "IMPOSIBLE", q: "¿Cuál es el límite de entidades en un solo bloque antes de que mueran?", o: ["24", "32", "64"], a: "24" },
            { d: "IMPOSIBLE", q: "¿En qué versión se añadió el bloque de 'Hueso'?", o: ["1.10", "1.11", "1.12"], a: "1.10" },
            { d: "IMPOSIBLE", q: "¿Qué objeto se usaba para domesticar caballos antes de la 1.6?", o: ["Manzanas", "Trigo", "No se podía"], a: "No se podía" },
            { d: "IMPOSIBLE", q: "¿Cuál es la probabilidad de que un esqueleto suelte su arco?", o: ["2.5%", "8.5%", "10%"], a: "8.5%" },
            { d: "IMPOSIBLE", q: "¿Qué versión añadió las 'Elytras'?", o: ["1.8", "1.9", "1.10"], a: "1.9" },
            { d: "IMPOSIBLE", q: "¿Qué animal es el único que puede saltar vallas?", o: ["Caballo", "Cabra", "Conejo"], a: "Caballo" },
            { d: "IMPOSIBLE", q: "¿Cuál es la durabilidad de un caparazón de tortuga?", o: ["275", "280", "300"], a: "275" },
            { d: "IMPOSIBLE", q: "¿Qué mob se llama internamente 'WitherBoss'?", o: ["Wither", "Ender Dragon", "Warden"], a: "Wither" },
            { d: "IMPOSIBLE", q: "¿Cuál es el nombre del creador de la música de Minecraft?", o: ["C418", "Lena Raine", "Ambos"], a: "Ambos" }
        ];

        if (!global.db) global.db = {};
        if (!global.db.mc_trivia) global.db.mc_trivia = {};
        if (!global.db.mc_cooldown) global.db.mc_cooldown = {};

        const cmd = m.command ? m.command.toLowerCase() : '';
        const texto = m.text || '';
        const user = m.sender;

        if (cmd === 'qmc') {
            const now = Date.now();
            if (global.db.mc_cooldown[user] && now < global.db.mc_cooldown[user]) {
                const restante = Math.ceil((global.db.mc_cooldown[user] - now) / 1000);
                return client.sendMessage(m.chat, { text: `⚠️ Espera ${restante} segundos para otra quest.` }, { quoted: m });
            }

            if (global.db.mc_trivia[user]) {
                return client.sendMessage(m.chat, { text: "❌ Ya tienes una quest activa. ¡Respóndela primero!" }, { quoted: m });
            }

            const item = triviaData[Math.floor(Math.random() * triviaData.length)];
            let options = [...item.o];
            for (let i = options.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [options[i], options[j]] = [options[j], options[i]];
            }

            const correctIndex = options.indexOf(item.a) + 1;

            global.db.mc_trivia[user] = {
                a: correctIndex.toString(),
                timer: setTimeout(() => {
                    if (global.db.mc_trivia[user]) {
                        delete global.db.mc_trivia[user];
                        global.db.mc_cooldown[user] = Date.now() + 10000;
                        client.sendMessage(m.chat, { text: `⏰ *TIEMPO AGOTADO*\n@${user.split('@')[0]} tardaste demasiado. Perdiste la oportunidad.`, mentions: [user] });
                    }
                }, 60000)
            };

            const questionText = `⚔️ *MINECRAFT QUEST* ⚔️\n👤 *JUGADOR:* @${user.split('@')[0]}\n📊 *DIFICULTAD:* ${item.d}\n\n${item.q}\n\n` + 
                options.map((opt, i) => `${i + 1}. ${opt}`).join('\n') + 
                `\n\n*Responde con:* ™rmc [número]\n⏱️ Tienes 1 minuto.\n⚠️ Solo 1 oportunidad.`;

            return client.sendMessage(m.chat, { text: questionText, mentions: [user] }, { quoted: m });
        }

        if (cmd === 'rmc') {
            if (!global.db.mc_trivia[user]) {
                return client.sendMessage(m.chat, { text: "❌ No tienes ninguna quest activa. Usa *™qmc* primero." }, { quoted: m });
            }
            
            const quest = global.db.mc_trivia[user];
            const input = texto.replace(/[^0-9]/g, '').trim();

            if (!input) return client.sendMessage(m.chat, { text: "⚠️ Pon el número de tu respuesta." }, { quoted: m });

            clearTimeout(quest.timer);
            delete global.db.mc_trivia[user];
            global.db.mc_cooldown[user] = Date.now() + 10000;

            if (input === quest.a) {
                await client.sendMessage(m.chat, { text: "🎉 ¡CORRECTO! Has superado la prueba." }, { quoted: m });
            } else {
                await client.sendMessage(m.chat, { text: "❌ ¡INCORRECTO!\n💀 *GAME OVER*. Perdiste tu oportunidad." }, { quoted: m });
            }
        }
    }
}