export interface GameData {
    userid: string;
    nameid: string;
    imageid: string;
    openingid: string;
    siluetaid: string;
    triesname: number;
    triesimage: number;
    triesopening: number;
    triessilueta: number;
    finishedImage: boolean;
    finishedName: boolean;
    finishedSilueta: boolean;
    finishedOpening: boolean;
    resets: number;
    statusRewardImage: number;
    statusRewardName: number;
    statusRewardSilueta: number;
    statusRewardOpening: number;
    imageSelected: number;
    siluetaSelected: number;
    nameSelected: number;
    openingSelected: number;
}

export interface Game {
    names_game: Array<string>;
    anime_name: string;
    image_game: Array<string>;
    silueta_game: Array<string>;
    silueta_solution: Array<string>;
    opening: Array<string>;
}

export interface UserQuests {
    userid: string;
    statusQuestImage: number;
    statusQuestSilueta: number;
    statusQuestName: number;
    statusQuestOpening: number;
    statusQuestAllGames: number;
    statusWeek: number;
    statusSummonsWeek: number;
    statusLogInWeek: number;
}

export interface QuestsData {
    name: string;
    reward: number;
    type: string;
}