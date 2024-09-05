import i18n from "i18next";
import { initReactI18next } from "react-i18next";

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
                    collection: 'COLLECTION'
                },
                'user-card': {
                    level: 'LEVEL',
                    power: 'TOTAL POWER'
                },
                'survey': {
                    infoTitle: 'The community chooses the next GACHANIME card collection',
                    infoChoose: 'Choose one of the two animes',
                    btnVote: 'Vote',
                    msgThanks: 'Thanks for voting!',
                    nextSurvey: 'There will soon be a new survey to decide the next collection of cards'
                } 
            },
        },
        es: {
            translation: {
                'links': {
                    games: 'JUEGOS',
                    quests: 'MISIONES',
                    summon: 'INVOCAR',
                    collection: 'COLECCIÓN'
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
                    nextSurvey: 'Próximamente habrá una nueva encuesta para decidir la siguiente colección de cartas'
                }     
            },
        }
    },
});

export default i18n;
