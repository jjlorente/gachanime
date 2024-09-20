import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { useUserGames } from '../Games';
import { updateGameUser, findCharacters } from '../../../../services/userGames';
import { useUserGachas } from "../../Home";
import { updateLevel } from '../../../../services/user';
import { useTranslation } from 'react-i18next';
import JSONAnimes from './animes.json';
import JSONCharacters from './characters.json';

export const Input = (props: any) => {
    const { i18n, t } = useTranslation();

    const [valueInput, setValueInput] = useState<string>("");
    const [animesSuggested, setAnimesSuggested] = useState<Array<string>>([]);
    const [arrayCharacters, setArrayCharacters] = useState<Array<string>>([]);

    const { setOpeningTries, setImageTries, setSiluetaTries, setEyeTries, setPixelTries, userGamesData, mode} = useUserGames();
    const { alerts, setAlerts } = useUserGachas();

    useEffect(() => {
        if(props.game === "silueta" || props.game === "eye") fetchData();
    }, []);

    const fetchData = async () => {
        const data = await findCharacters();
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
            if(props.game === "image" || props.game === "opening" || props.game === "pixel") {
                const results = JSONAnimes["animes"].filter((anime) =>
                    anime.toLowerCase().includes(inputValue)
                );
                setAnimesSuggested(results);
            } else if (props.game === "silueta" || props.game === "eye") {
                const results = JSONCharacters["characters"].filter((anime) =>
                    anime.toLowerCase().includes(inputValue)
                );
                setAnimesSuggested(results);
            }
        }
    };

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleClickAnime = async (e: React.MouseEvent<HTMLInputElement>) => {
        const valueCon = e.currentTarget.textContent;
        let value = e.currentTarget.textContent;
        if ((props.game === "silueta" || props.game === "eye") && value != null) {
            value = value.split(" ")[0];
        }
        console.log(value)
        setAnimesSuggested([])
        console.log(props.solution, "SOLUTION")

        if(value === props.solution) {
            audioRef.current = new Audio("/correct.mp3");
            audioRef.current.volume = 0.5;
            audioRef.current.play();
            console.log(props.solution, "SOLUTION")
            if(userGamesData && mode!==null) {
                await updateLevel(userGamesData.userid, 40)
                const data = await updateGameUser(userGamesData.userid, true, 0, 0, 1, props.game, mode);
                if (props.game === "image") {
                    props.setFinishedGame(data.finishedImage);
                    props.setStatusReward(data.statusRewardImage);
                    props.setZoomImage("100%");
                } else if (props.game === "silueta") {
                    props.setFinishedGame(data.finishedSilueta[mode]);
                    props.setStatusReward(data.statusRewardSilueta[mode]);
                } else if (props.game === "opening") {
                    props.setFinishedGame(data.finishedOpening);
                    props.setStatusReward(data.statusRewardOpening);
                } else if (props.game === "eye") {
                    props.setFinishedGame(data.finishedEye);
                    props.setStatusReward(data.statusRewardEye);
                } else if (props.game === "pixel") {
                    props.setFinishedGame(data.finishedPixel);
                    props.setStatusReward(data.statusRewardPixel);
                    props.setPixel(1);
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
                props.setAnimesErrors((prevAnimes:any) => [ ...prevAnimes, valueCon ]);
            }
            if(userGamesData && mode !== null) {
                const data = await updateGameUser(userGamesData.userid, false, 1, 0, 0, props.game, mode);
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
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game ==="silueta") {
                        setSiluetaTries(data.triessilueta[mode]);
                        let dataTries = data.triessilueta[mode] * 5
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game ==="eye") {
                        setEyeTries(data.trieseye);
                        let dataTries = data.trieseye * 5
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game==="opening") {
                        setOpeningTries(data.triesopening);
                        let dataTries = data.triesopening * 5
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game==="pixel") {
                        setPixelTries(data.triespixel);
                        let dataTries = data.triespixel * 5;
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }

                        let zoomRest = 20 - data.triespixel * 2.5;
                        if (zoomRest <= 1) {
                            props.setPixel(1);
                        } else {
                            props.setPixel(zoomRest);
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
                            placeholder={ props.game === "image" || props.game === "opening" || props.game === "pixel" ? t('games.inputAnime') : t('games.inputCharacter') }
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
                                        props.game === "image" || props.game === "pixel" || props.game === "opening" ? t('games.inputErrorAnime') : t('games.inputErrorCharacter')
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
