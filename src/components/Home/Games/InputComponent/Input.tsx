import React from 'react'
import { useState, useEffect } from 'react';
import { useUserGames } from '../Games';
import { updateGameUser, findCharacters } from '../../../../services/userGames';
import { useUserGachas } from "../../Home";
import { updateLevel } from '../../../../services/user';
import { useTranslation } from 'react-i18next';

export const Input = (props: any) => {
    const { i18n, t } = useTranslation();

    const animeArray = [
        "Frieren: Beyond Journeys End",
        "One Piece",
        "Kaiju No. 8",
        "Demon Slayer: Kimetsu No Yaiba",
        "My Hero Academia",
        "Jujutsu Kaisen",
        "Chainsaw Man",
        "Blue Lock",
        "Hell's Paradise",
        "Spy x Family",
        "Attack on Titan: The Final Season",
        "Vinland Saga",
        "Re:Zero - Starting Life in Another World",
        "Mob Psycho 100",
        "Tokyo Revengers",
        "The Rising of the Shield Hero",
        "Dr. Stone",
        "Horimiya",
        "Kubo Won't Let Me Be Invisible",
        "Oshi no Ko",
        "Grand Blue",
        "Mushoku Tensei: Jobless Reincarnation",
        "Made in Abyss",
        "The Eminence in Shadow",
        "Welcome to Demon School! Iruma-kun",
        "Bocchi the Rock!",
        "Arknights: Reimei Zensou",
        "The Devil is a Part-Timer! Season 2",
        "Sk8 the Infinity",
        "Cyborg 009: Call of Justice",
        "The World’s Finest Assassin Gets Reincarnated in Another World as an Aristocrat",
        "Tomo-chan Is a Girl!",
        "KonoSuba: An Explosion on This Wonderful World!",
        "Akiba Maid War",
        "The Ancient Magus' Bride",
        "Sabikui Bisco",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath",
        "The Legend of Heroes: Sen no Kiseki Northern War",
        "Kage no Jitsuryokusha ni Naritakute!",
        "The Yakuza’s Guide to Babysitting",
        "Bastard!! - Ankoku no Hakaishin",
        "Coppelion",
        "To Your Eternity",
        "So I'm a Spider, So What?",
        "Komi Can’t Communicate",
        "Mairimashita, Iruma-kun",
        "The Great Jahy Will Not Be Defeated!",
        "Yofukashi no Uta",
        "Tsukimichi -Moonlit Fantasy-",
        "Joran: The Princess of Snow and Blood",
        "Koi wa Sekai Seifuku no Ato de",
        "Shaman King (2021)",
        "Shoujo Kageki Revue Starlight",
        "Fate/Grand Order: Camelot",
        "The Quintessential Quintuplets",
        "Vinland Saga",
        "Mushoku Tensei: Jobless Reincarnation",
        "Beastars",
        "Keep Your Hands Off Eizouken!",
        "Wonder Egg Priority",
        "Great Pretender",
        "Aggretsuko",
        "Dorohedoro",
        "Promare",
        "Kengan Ashura",
        "Higehiro: After Being Rejected, I Shaved and Took in a High School Runaway",
        "Maou Gakuin no Futekigousha",
        "Astra Lost in Space",
        "Ousama Ranking",
        "Kakegurui",
        "InuYasha",
        "Made in Abyss",
        "Koi to Yobu ni wa Kimochi Warui",
        "The Rising of the Shield Hero",
        "Fate/Grand Order: Camelot",
        "Kaguya-sama: Love is War",
        "Citrus",
        "Kuroko's Basketball",
        "Nodame Cantabile",
        "A Place Further than the Universe",
        "Gintama",
        "My Senpai is Annoying",
        "Akame ga Kill!",
        "A Silent Voice",
        "Blue Exorcist",
        "JoJo's Bizarre Adventure",
        "Attack on Titan",
        "Sword Art Online",
        "Black Clover",
        "The Promised Neverland",
        "No Game No Life",
        "Noragami",
        "KonoSuba: God's Blessing on This Wonderful World!",
        "Re:Creators",
        "Tengen Toppa Gurren Lagann",
        "Cowboy Bebop",
        "Samurai Champloo",
        "Steins;Gate",
        "Psycho-Pass",
        "Death Parade",
        "Parasyte: The Maxim",
        "Durarara!!",
        "Hellsing Ultimate",
        "Baccano!",
        "Elfen Lied",
        "Toradora!",
        "Anohana: The Flower We Saw That Day",
        "Angel Beats!",
        "Clannad",
        "Little Busters!",
        "March Comes in Like a Lion",
        "K-On!",
        "Spice and Wolf",
        "Nana",
        "March Comes in Like a Lion",
        "Vinland Saga",
        "Golden Kamuy",
        "Mob Psycho 100",
        "Fruits Basket",
        "March Comes in Like a Lion",
        "Natsume's Book of Friends",
        "Anohana: The Flower We Saw That Day",
        "Made in Abyss",
        "The Rising of the Shield Hero",
        "Re:Zero",
        "Hinamatsuri",
        "Fate/Stay Night: Unlimited Blade Works",
        "The Tatami Galaxy",
        "Houseki no Kuni",
        "Mononoke",
        "Princess Tutu",
        "Little Witch Academia",
        "Mushishi",
        "Wolf's Rain",
        "Yuri on Ice",
        "The Ancient Magus' Bride",
        "Hellsing",
        "D.Gray-man",
        "Blue Exorcist",
        "Kekkaishi",
        "Bungou Stray Dogs",
        "The Devil is a Part-Timer!",
        "March Comes in Like a Lion",
        "The Promised Neverland",
        "Black Clover",
        "Attack on Titan",
        "Noragami",
        "JoJo's Bizarre Adventure",
        "Made in Abyss",
        "KonoSuba",
        "Steins;Gate",
        "Psycho-Pass",
        "Death Parade",
        "Gintama",
        "Space Dandy",
        "Cyborg 009",
        "Kiznaiver",
        "Sakamoto Desu Ga?",
        "D.Gray-man",
        "Wotakoi: Love is Hard for Otaku",
        "The Rising of the Shield Hero",
        "The Devil is a Part-Timer!",
        "Yuri!!! on ICE",
        "Little Witch Academia",
        "Kakegurui",
        "Inuyasha",
        "Nodame Cantabile",
        "Great Pretender",
        "Aggretsuko",
        "Coppelion",
        "Kage no Jitsuryokusha ni Naritakute!",
        "The Legend of Heroes: Sen no Kiseki Northern War",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath",
        "Tomo-chan Is a Girl!",
        "KonoSuba: An Explosion on This Wonderful World!",
        "Akiba Maid War",
        "Sabikui Bisco",
        "A Couple of Cuckoos",
        "The Orbital Children",
        "Rebirth",
        "Hoshikuzu Telepath"
    ];

    const [valueInput, setValueInput] = useState<string>("");
    const [animesSuggested, setAnimesSuggested] = useState<Array<string>>([]);
    const [arrayCharacters, setArrayCharacters] = useState<Array<string>>([]);

    const { setOpeningTries, setImageTries, setSiluetaTries, setEyeTries, userGamesData } = useUserGames();
    const { alerts, setAlerts } = useUserGachas();

    useEffect(() => {
        console.log(props.game)
        if(props.game === "silueta" || props.game === "eye") fetchData();
    }, []);

    const fetchData = async () => {
        const data = await findCharacters();
        console.log("entro")
        if(data) {
            data.map((anime : any) => {
                let names = anime.names_game;
                names.map((element:any) => {
                    setArrayCharacters(prevCharacters => [...prevCharacters, element])
                });
                
            })   
        }     
    };

    const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^[a-zA-Z0-9\s]*$/; 
        if (regex.test(e.target.value)) {
            setValueInput(e.target.value)
            if(e.target.value==="") {
                setAnimesSuggested([]);
                return
            }
            const inputValue = e.target.value.toLowerCase();
            if(props.game === "image" || props.game === "opening") {
                const results = animeArray.filter((anime) =>
                    anime.toLowerCase().includes(inputValue)
                );
                setAnimesSuggested(results);
            } else if (props.game === "silueta" || props.game === "eye") {
                const results = arrayCharacters.filter((anime) =>
                    anime.toLowerCase().includes(inputValue)
                );
                setAnimesSuggested(results);
            }
        }
    };

    const handleClickAnime = async (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.textContent;
        setAnimesSuggested([])
        if(value === props.solution) {
            if(userGamesData) {
                await updateLevel(userGamesData.userid, 40)
                const data = await updateGameUser(userGamesData.userid, true, 0, 0, 1, props.game);
                if (props.game === "image") {
                    props.setFinishedGame(data.finishedImage);
                    props.setStatusReward(data.statusRewardImage);
                    props.setZoomImage("100%");
                } else if (props.game === "silueta") {
                    props.setFinishedGame(data.finishedSilueta);
                    props.setStatusReward(data.statusRewardSilueta);
                } else if (props.game === "opening") {
                    props.setFinishedGame(data.finishedOpening);
                    props.setStatusReward(data.statusRewardOpening);
                } else if (props.game === "eye") {
                    props.setFinishedGame(data.finishedEye);
                    props.setStatusReward(data.statusRewardEye);
                }

                let alertGame = localStorage.getItem("alerts");
                if (alertGame) {
                  let arrayAlerts = JSON.parse(alertGame);
                  arrayAlerts.push("games");
                  arrayAlerts.push("quests");
                  localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
                  setAlerts(arrayAlerts);
                } else {
                  localStorage.setItem("alerts", JSON.stringify(["games","quests"]));
                  setAlerts(["games","quests"]);
                }

            }
        } else {
            if (value) {
                props.setAnimesErrors((prevAnimes:any) => [ ...prevAnimes, value ]);
            }
            if(userGamesData) {
                const data = await updateGameUser(userGamesData.userid, false, 1, 0, 0, props.game);
                if (data) {
                    if (props.game==="image") {
                        setImageTries(data.triesimage);
                        let zoomActual = parseInt(props.zoomImage.split("%")[0]);
                        let zoomRest = data.triesimage * 50;
                        if (zoomRest <= 400) {
                            zoomActual = 500 - zoomRest;
                            props.setZoomImage(zoomActual+"%");
                        } else {
                            props.setZoomImage("100%");
                        }
                        let dataTries = data.triesimage * 5
                        if(dataTries>= 50) {
                            props.setGachasRecompensa(50)
                        } else {
                            props.setGachasRecompensa(50)
                        }
                    } else if (props.game ==="silueta") {
                        setSiluetaTries(data.triessilueta);
                        let dataTries = data.triessilueta * 5
                        if(dataTries>= 50) {
                            props.setGachasRecompensa(50)
                        } else {
                            props.setGachasRecompensa(50)
                        }
                    } else if (props.game ==="eye") {
                        setEyeTries(data.trieseye);
                        let dataTries = data.trieseye * 5
                        if(dataTries>= 50) {
                            props.setGachasRecompensa(50)
                        } else {
                            props.setGachasRecompensa(50)
                        }
                    } else if (props.game==="opening") {
                        setOpeningTries(data.triesopening);
                        let dataTries = data.triesopening * 5
                        if(dataTries>= 50) {
                            props.setGachasRecompensa(50)
                        } else {
                            props.setGachasRecompensa(50)
                        }
                    }
                }
            }
        }
        setValueInput("")
    };

    return (
        <>
            {props.finishedGame !== undefined && (
                props.finishedGame === false ? (
                    <div className='container-input-suggested'>
                        <input
                            type="text"
                            className="input-imagegame jaro-regular"
                            maxLength={50}
                            placeholder={ props.game === "image" || props.game === "opening" ? t('games.inputAnime') : t('games.inputCharacter') }
                            onChange={changeInputName}
                            value={valueInput}
                        />
                        {animesSuggested && animesSuggested.length > 0 ? (
                            <div className="container-suggested">
                                {animesSuggested.map((anime, index) => (
                                    <span
                                        className="anime-suggested anime-name"
                                        key={index}
                                        onClick={handleClickAnime}
                                    >
                                        {anime}
                                    </span>
                                ))}
                            </div>
                        ) : valueInput !== "" ? (
                            <div className="container-suggested">
                                <span className="anime-suggested">
                                    {
                                        props.game === "image" ? t('games.inputErrorAnime') : t('games.inputErrorCharacter')
                                    }
                                </span>
                            </div>
                        ) : null}
                    </div> 
                ) : props.finishedGame === true ? (
                    <span className="anime-correct">{props.solution}</span>
                ) : null
            )}
        </>
    )
}
