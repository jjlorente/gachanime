export interface GameData {
    userid: string;

    nameid: string;
    openingid: string[];
    imageid: string[];
    siluetaid: string[];
    eyeid: string[];
    pixelid: string[];

    triesname: number;
    trieswords: string[];
    triescolors: string[][];
    
    triesopening: number[];
    triesimage: number[];
    triessilueta: number[];
    trieseye: number[];
    triespixel: number[];

    finishedName: boolean;
    finishedImage: boolean[];
    finishedSilueta: boolean[];
    finishedOpening: boolean[];
    finishedEye: boolean[];
    finishedPixel: boolean[];

    resets: number;

    statusRewardName: number;
    statusRewardImage: number[];
    statusRewardSilueta: number[];
    statusRewardOpening: number[];
    statusRewardEye: number[];
    statusRewardPixel: number[];

    imageSelected: number[];
    siluetaSelected: number[];
    nameSelected: number;
    openingSelected: number[];
    eyeSelected: number[];
    pixelSelected: number[];
}

export interface Game {
    anime_name: string;

    names_game: Array<string>;
    names_game_medium: Array<string>;
    names_game_hard: Array<string>;

    image_game: Array<string>;
    image_game_medium: Array<string>;
    image_game_hard: Array<string>;


    opening: Array<string>;
    opening_medium: Array<string>;
    opening_hard: Array<string>;
    opening_solutions: Array<Array<string>>;

    eye_game: Array<string>;
    eye_solution: Array<string>;
    eye_game_medium: Array<string>;
    eye_solution_medium: Array<string>;
    eye_game_hard: Array<string>;
    eye_solution_hard: Array<string>;

    pixel_game: Array<string>;
    pixel_game_medium: Array<string>;
    pixel_game_hard: Array<string>;

    silueta_game: Array<string>;
    silueta_solution: Array<string>;
    silueta_game_medium: Array<string>;
    silueta_solution_medium: Array<string>;
    silueta_game_hard: Array<string>;
    silueta_solution_hard: Array<string>;
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
    statusLevel5: number,
    statusLevel20: number,
    statusPower1: number,
    statusPower10: number
}

export interface QuestsData {
    name: string;
    reward: number;
    type: string;
}