import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// const userLang = navigator.language || 'en';
// const defaultLang = (userLang.startsWith('es') ? 'es' : 'en'); 

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: {
                'links': {
                    games: 'GAMES',
                    quests: 'QUESTS',
                    summon: 'SUMMON',
                    collection: 'COLLECTION',
                    home: 'HOME',
                    settings: "SETTINGS",
                    market: "MARKET",
                    logOut: "Log out"
                },
                'user-card': {
                    level: 'LEVEL',
                    power: 'TOTAL POWER'
                },
                'survey': {
                    infoTitle: 'The community chooses the next GACHANIME card collection',
                    infoChoose: 'Choose one of the two animes',
                    btnVote: 'Vote',
                    msgThanks: 'Thank you for voting!',
                    nextSurvey: 'A new poll to decide the next card collection will be available soon',
                    titleCommunity: 'JOIN THE COMMUNITY',
                    subTitleCommunity: 'We would love to hear your opinion!',
                    infoCommunity: "Found any bugs or have suggestions? Let us know! We value your feedback. Join the GACHANIME community and share your achievements with everyone!",
                    nextCommunity: 'Coming soon:',
                    titleRoadMap: 'COMING SOON TO GACHANIME',
                    nextRoadMap: [
                        "- Card trading market between players",
                        "- Banners for special summons",
                        "- New daily game",
                        "- New section and game with your obtained cards",
                        "- Discord for the community!"
                    ],
                    finishedPoll: "Poll finished!"
                },
                'games': {
                    titleImage: 'Which anime is the image from?',
                    titleSilueta: 'Which character is the silhouette from?',
                    titleWordle: 'Guess the character of the day!',
                    titleOpening: 'Which anime is this song from?',
                    titleEye: 'Whose eyes belong to this character?',
                    titlePixel: 'What anime is the cover from?',

                    infoSpanWinImage: 'Congratulations! Collect your reward and come back tomorrow for a new image.',
                    infoSpanImage: 'Each mistake moves the image away. Lose 5 gachas per error. Minimum reward: 25 gachas.',
                    
                    infoSpanSilueta: 'After 3 errors, the anime is revealed. Lose 5 gachas per error. Minimum reward: 25 gachas.',
                    infoSpanWinSilueta: 'Congratulations! Collect your reward and come back tomorrow for a new silhouette.',
                    
                    infoSpanEye: 'After 3 errors, the anime is revealed. Lose 5 gachas per error. Minimum reward: 25 gachas.',
                    infoSpanWinEye: 'Congratulations! Collect your reward and come back tomorrow for a new image.',
                    span3Errors: 'Character from ',
                    
                    inputAnime: 'Enter the name of the anime...',
                    inputCharacter: 'Enter the name of the character...',
                    inputErrorAnime: "There are no animes with that name...",
                    inputErrorCharacter: "There are no characters with that name...",
                    triesFailed: "Failed attempts: ",
                    claimReward: "Claim reward: ",
                    rewardClaimed: "Reward claimed",

                    wordleInfoIncorrect: "Does not contain the letter",
                    wordleInfoCorrect: "Correct position",
                    wordleInfoOrange: "Incorrect position",

                    infoSpanWordle: "After 3 mistakes, the anime of the character will be revealed. Earn 50 gachas for a correct guess.",
                    infoSpanWordleCorrect: "Congratulations! Collect your reward and come back tomorrow for a new word.",
                    
                    infoSpanOpening: "Lose 5 gachas per error. Minimum reward: 25 gachas.",
                    infoSpanOpeningCorrect: "Congratulations! Collect your reward and come back tomorrow for a new opening.",

                    infoSpanPixel: "Each error reduces pixelation. Lose 5 gachas per error. Minimum reward: 25 gachas.",
                    infoSpanPixelCorrect: "Congratulations! Collect your reward and come back tomorrow for a new cover.",

                    infoBlockedInput: "Unlock the difficulty to be able to play",

                    titleUnlockMode: "Reach ",
                    titleUnlockHard: "Collect ",
                    titleUnlockModeMedium: " power to unlock normal difficulty",
                    titleUnlockModeHard: " unique cards without repeats to unlock hard difficulty",
                    powerOf: "Power of",
                    cardsOf: "Cards of",
                    mediumButton: "UNLOCK NORMAL DIFFICULTY",
                    hardButton: "UNLOCK HARD DIFFICULTY"
                },
                "quest": {
                    progress: "Progress",
                    claimed: "Claimed",
                    claimReward: "Claim reward",
                    goToGame: "Go to game 🢂",
                    goToAllGames: "Go to games 🢂",
                    goToSummon: "Go to summon 🢂",
                    notCompleted: "Not completed",
                    dayQuest: "DAILY",
                    weekQuest: "WEEKLY",
                    imageQuest: "Guess the anime image",
                    wordleQuest: "Complete the daily wordle",
                    siluetaQuest: "Guess the character silhouette",
                    openingQuest: "Guess which anime the opening is from",
                    allGamesQuest: "Complete six daily games",
                    summonQuest: "Make 10 summons of 10 cards",
                    connectionQuest: "Connect to GACHANIME for 7 days in a row",
                    level5Quest: "Reach account level 5",
                    level20Quest: "Reach account level 20",
                    power1Quest: "Reach 150,000 total power",
                    power2Quest: "Reach 500,000 total power",
                    special: "SPECIAL"
                },
                "summon": {
                    loadingBanner: "Loading banner...",
                    infoSummon80: "Every 80 pulls guarantees an S+ card",
                    need10: "You need x10 gachas to pull!",
                    need100: "You need x100 gachas to pull!",
                    confirm: "Okay",
                    confirm2: "Confirm",
                    cancel: "Cancel",
                    confirm10: "Are you sure you want to spend x10 gachas?",
                    info10: "Spending 10 gachas will get you a card of any rarity.",
                    confirm100: "Are you sure you want to spend x100 gachas?",
                    info100: "Spending 100 gachas will get you 10 cards and one card of rarity A or higher.",
                    exit: "RETURN"
                },
                "collection": {
                    notOwned: "No cards available.",
                    allAnimes: "All animes",
                    allCards: "All cards",
                    obtainedCards: "Obtained cards",
                    notObtained: "Not obtained cards",
                    allRares: "All rarities",
                    nameOfCard: "Name of the card...",
                    sellCardMsg: "Place the card for sale in the marketplace:",
                    confirmSellMsg: "Confirm"
                },
                "settings": {
                    editPicture: "Edit profile picture",
                    apply: "Apply",
                    cancel: "Cancel",
                    infoPicture: "Must be JPEG, PNG, or GIF and cannot exceed 10 MB",
                    errorName: "Username already exists",
                    nameUser: "Username",
                    configUser: "User settings",
                    spanEnglish: "English",
                    spanSpanish: "Spanish",
                    profilePicture: "Profile picture",
                    languages: "Languages"
                },
                "login": {
                    errorUsername: "Incorrect username",
                    errorPassword: "Incorrect password",
                    username: "Username",
                    password: "Password",
                    login: "Log in",
                    register: "Sign up",
                    accNew: "Don't have an account?",
                    or: "or",
                    repeatedPassword: "Repeated password is incorrect",
                    errorMail: "Invalid email address",
                    repeatedUsername: "Username already in use",
                    wrongPass: "Incorrect password",
                    repeatedMail: "Email address already in use",
                    mail: "Email address",
                    repeatPass: "Repeat password",
                    registerButton: "Register",
                    alReadyAcc: "Already have an account?",
                    titleLogin: "Welcome to",
                    eslogan: "Play, collect, and grow your anime world"
                },
                "market": {
                    notAvailable: "No cards available",
                    confirm: "Confirm",
                    firstPartMes: "Are you sure you want to buy the card for ",
                    secondPartMes: " GACHAS?",
                    sellCardMes: "Are you sure you want to remove the card from sale?",
                    myCards: "My cards for sale",
                    buyButton: "Buy",
                    owner: "Owner: ",
                    exitMess: "You don't have enough GACHAS to buy the card",
                    confirmSellCard: "Are you sure to sell the card for ",
                    placeHolderSellCard: "Price in GACHAS..."
                  },
                  "ranking": {
                      level:"Level",
                      power:"Power",
                      cards:"Cards"
                  }
                         
            },
        },


        es: {
            translation: {
                'links': {
                    games: 'JUEGOS',
                    quests: 'MISIONES',
                    summon: 'INVOCAR',
                    collection: 'COLECCIÓN',
                    home: 'INICIO',
                    settings: "AJUSTES",
                    market: "MERCADO",
                    logOut: "Cerrar sesión"
                },
                'user-card': {
                    level: 'NIVEL',
                    power: 'PODER TOTAL'
                },
                'survey': {
                    infoTitle: 'La comunidad elige la próxima colección de cartas de GACHANIME',
                    infoChoose: 'Elige uno de los dos animes',
                    btnVote: 'Votar',
                    msgThanks: '¡Gracias por votar!',
                    nextSurvey: 'Próximamente habrá una nueva encuesta para decidir la siguiente colección de cartas',
                    titleCommunity: 'UNETE A LA COMUNIDAD',
                    subTitleCommunity: "¡Nos encantaría saber tu opinión!",
                    infoCommunity: "¿Encontraste errores o tienes sugerencias? ¡Cuéntanos! Valoramos mucho tu opinión. Únete a la comunidad de GACHANIME y comparte tus logros con todos.",
                    nextCommunity: "Próximamente estarán disponibles:",
                    titleRoadMap: "PRÓXIMAMENTE EN GACHANIME",
                    nextRoadMap: [
                        '- Mercado de intercambio de cartas entre jugadores',
                        '- Banners para invocaciones especiales',
                        '- Nuevo juego diario',
                        '- Nueva sección y juego con tus cartas obtenidas',
                        '- Discord para la comunidad!'
                    ],
                    finishedPoll: "¡Votación finalizada!"
                },
                'games': {
                    titleImage: '¿De que anime es la imagen?',
                    titleSilueta: '¿De que personaje es la silueta?',
                    titleWordle: '¡Adivina el personaje del día!',
                    titleOpening: '¿De que anime es la canción?',
                    titleEye: '¿De que personaje son los ojos?',
                    titlePixel: '¿De que anime es la portada?',

                    infoSpanWinImage: '¡Enhorabuena! Recoge tu recompensa y vuelve mañana para una nueva imagen.',
                    infoSpanImage: 'Cada error aleja la imagen. Pierdes 5 gachas por fallo. Recompensa mínima: 25 gachas.',
                    
                    infoSpanSilueta: "A los 3 fallos se revela el anime. Pierdes 5 gachas por error. Recompensa mínima: 25 gachas.",
                    infoSpanWinSilueta: "¡Enhorabuena! Recoge tu recompensa y vuelve mañana para una nueva silueta.",

                    infoSpanEye: "A los 3 errores, se revela el anime. Pierdes 5 gachas por error. Recompensa mínima: 25 gachas.",
                    infoSpanWinEye: "¡Enhorabuena! Recoge tu recompensa y vuelve mañana para una imagen nueva.",
                    span3Errors: 'Personaje de ',

                    inputAnime: 'Escribe el nombre del anime...',
                    inputCharacter: "Escribe el nombre del personaje...",
                    inputErrorAnime: "No hay animes con este nombre...",
                    inputErrorCharacter: "No hay personajes con este nombre...",
                    triesFailed: "Intentos fallidos: ",
                    claimReward: "Reclamar recompensa: ",
                    rewardClaimed: "Recompensa reclamada",

                    wordleInfoIncorrect: "No contiene la letra",
                    wordleInfoCorrect: "Posición correcta",
                    wordleInfoOrange: "Posición incorrecta",

                    infoSpanWordle: "A los 3 fallos se muestra el anime del personaje. Recibe 50 gachas al acertar.",
                    infoSpanWordleCorrect: "¡Enhorabuena! Recoge tu recompensa y vuelve mañana para una nueva palabra.",

                    infoSpanOpening: "Pierdes 5 gachas por error. Recompensa mínima: 25 gachas.",
                    infoSpanOpeningCorrect: "¡Enhorabuena! Recoge tu recompensa y vuelve mañana para un nuevo opening.",

                    infoSpanPixel: "Cada error reduce la pixelación. Pierdes 5 gachas por error. Recompensa mínima: 25 gachas.",
                    infoSpanPixelCorrect: "¡Enhorabuena! Recoge tu recompensa y vuelve mañana para una nueva portada.",

                    infoBlockedInput: "Desbloquea la dificultad para poder jugar",

                    titleUnlockMode: "Alcanza ",
                    titleUnlockHard: "Consigue ",
                    titleUnlockModeMedium: " de poder para desbloquear la dificultad normal",
                    titleUnlockModeHard: " cartas únicas sin repetir para desbloquear la dificultad difícil",
                    powerOf: "Poder de",
                    cardsOf: "Cartas únicas de",
                    mediumButton: "DESBLOQUEAR LA DIFICULTAD NORMAL",
                    hardButton: "DESBLOQUEAR LA DIFICULTAD DIFÍCIL"
                },
                "quest": {
                    progress: "Progreso",
                    claimed: "Reclamado",
                    claimReward: "Reclamar recompensa",
                    goToGame: "Ir al juego 🢂",
                    goToAllGames: "Ir a los juegos 🢂",
                    goToSummon: "Ir a invocar 🢂",
                    notCompleted: "No completada",
                    dayQuest: "DIARIAS",
                    weekQuest: "SEMANALES",
                    imageQuest: "Adivina la imagen del anime",
                    wordleQuest: "Adivina la silueta del personaje",
                    siluetaQuest: "Completa el wordle diario",
                    openingQuest: "Adivina de que anime es el opening",
                    allGamesQuest: "¡Completa seis juegos diarios!",
                    summonQuest: "Haz 10 invocaciones de 10 cartas",
                    connectionQuest: "Conéctate a GACHANIME durante 7 días seguidos",
                    level5Quest: "Alcanza el nivel 5 de cuenta",
                    level20Quest: "Alcanza el nivel 20 de cuenta",
                    power1Quest: "Alcanza 150.000 de poder total",
                    power2Quest: "Alcanza 500.000 de poder total",
                    special: "ESPECIALES"
                },
                "summon": {
                    loadingBanner: "Cargando banner...",
                    infoSummon80: "Cada 80 tiradas te aseguras una carta S+",
                    need10: "Necesitas x10 gachas para poder tirar!",
                    need100: "Necesitas x100 gachas para poder tirar!",
                    confirm: "De acuerdo",
                    confirm2: "Confirmar",
                    cancel: "Cancelar",
                    confirm10: "¿Estás seguro en gastar x10 gachas?",
                    info10: "Al gastar 10 gachas recibirás una carta de cualquier rareza.",
                    confirm100: "¿Estás seguro en gastar x100 gachas?",
                    info100: "Al gastar 100 gachas recibirás 10 cartas y una carta de rareza A o superior.",
                    exit: "SALIR"
                },
                "collection": {
                    notOwned: "Ninguna carta disponible.",
                    allAnimes: "Todos los animes",
                    allCards: "Todas las cartas",
                    obtainedCards: "Cartas obtenidas",
                    notObtained: "Cartas no obtenidas",
                    allRares: "Todas las rarezas",
                    nameOfCard: "Nombre de la carta...",
                    sellCardMsg: "Colocar la carta a la venta en el mercado:",
                    confirmSellMsg: "Confirmar"
                },
                "settings": {
                    editPicture: "Editar foto de perfil",
                    apply: "Aplicar",
                    cancel: "Cancelar",
                    infoPicture:"Debe ser JPEG, PNG o GIF y no puede exceder los 10 MB",
                    errorName: "Nombre de usuario existente",
                    nameUser: "Nombre de usuario ",
                    configUser: "Configuración de usuario",
                    spanEnglish: "Inglés",
                    spanSpanish: "Español",
                    profilePicture: "Foto de perfil",
                    languages: "Idiomas"
                },
                "login": {
                    errorUsername:"Nombre de usuario incorrecto",
                    errorPassword: "Contraseña incorrecta",
                    username: "Nombre de usuario",
                    password: "Contraseña",
                    login: "Iniciar sesión",
                    register: "Regístrate",
                    accNew: "¿No tienes cuenta?",
                    or: "o",
                    repeatedPassword: "Contraseña repetida incorrecta",
                    errorMail: "Correo electronico invalido",
                    repeatedUsername: "Nombre de usuario en uso",
                    wrongPass: "Contraseña incorrecta",
                    repeatedMail: "Correo electrónico en uso",
                    mail: "Correo electrónico",
                    repeatPass: "Repite la contraseña",
                    registerButton: "Registrarse",
                    alReadyAcc: "¿Ya tienes una cuenta?",
                    titleLogin: "¡Bienvenido a",
                    eslogan: "Juega, colecciona y haz crecer tu mundo anime"
                },
                "market": {
                    notAvailable: "No hay cartas disponibles",
                    confirm: "Confirmar",
                    firstPartMes: "¿Estás seguro de comprar la carta por ",
                    secondPartMes: " GACHAS?",
                    sellCardMes: "¿Estás seguro de quitar la carta en venta?",
                    myCards: "Mis cartas en venta",
                    buyButton: "Comprar",
                    owner: "Dueño: ",
                    exitMess: "No tienes GACHAS suficientes para comprar la carta",
                    confirmSellCard: "¿Estás seguro de poner la carta en venta por ",
                    placeHolderSellCard: "Precio en GACHAS..."
                },
                "ranking": {
                    level:"Nivel",
                    power:"Poder",
                    cards:"Cartas"
                }
            },
        }
    },
});

export default i18n;
