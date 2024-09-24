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

    const { unlock, setOpeningTries, setImageTries, setSiluetaTries, setEyeTries, setPixelTries, userGamesData, setUserGamesData, mode} = useUserGames();
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
        setAnimesSuggested([])

        if(value === props.solution) {
            audioRef.current = new Audio("/correct.mp3");
            audioRef.current.volume = 0.5;
            audioRef.current.play();
            if(userGamesData && mode!==null) {
                await updateLevel(userGamesData.userid, 40)
                const data = await updateGameUser(userGamesData.userid, true, 0, 0, 1, props.game, mode);
                if (props.game === "image") {
                    props.setFinishedGame(data.finishedImage[mode]);
                    props.setStatusReward(data.statusRewardImage[mode]);
                    props.setZoomImage("100%");
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
                    } else if(mode === 1) {
                        localStorage.setItem("arrayErrorsImageMedium", JSON.stringify([]));
                    } else if(mode === 2) {
                        localStorage.setItem("arrayErrorsImageHard", JSON.stringify([]));
                    }
                } else if (props.game === "silueta") {
                    props.setFinishedGame(data.finishedSilueta[mode]);
                    props.setStatusReward(data.statusRewardSilueta[mode]);
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));
                    } else if(mode === 1) {
                        localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));
                    } else if(mode === 2) {
                        localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));
                    }
                } else if (props.game === "opening") {
                    props.setFinishedGame(data.finishedOpening[mode]);
                    props.setStatusReward(data.statusRewardOpening[mode]);
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
                    } else if(mode === 1) {
                        localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify([]));
                    } else if(mode === 2) {
                        localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify([]));
                    }
                } else if (props.game === "eye") {
                    props.setFinishedGame(data.finishedEye[mode]);
                    props.setStatusReward(data.statusRewardEye[mode]);
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
                    } else if(mode === 1) {
                        localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify([]));
                    } else if(mode === 2) {
                        localStorage.setItem("arrayErrorsEyeHard", JSON.stringify([]));
                    }
                } else if (props.game === "pixel") {
                    props.setFinishedGame(data.finishedPixel[mode]);
                    props.setStatusReward(data.statusRewardPixel[mode]);
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
                    } else if(mode === 1) {
                        localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify([]));
                    } else if(mode === 2) {
                        localStorage.setItem("arrayErrorsPixelHard", JSON.stringify([]));
                    }
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
                setUserGamesData(data)
                if (data) {
                    if (props.game==="image") {
                        setImageTries(data.triesimage[mode]);
                        let zoomActual = parseInt(props.zoomImage.split("%")[0]);
                        let zoomRest = data.triesimage[mode] * 70;
                        if (zoomRest <= 250) {
                            zoomActual = 350 - zoomRest;
                            props.setZoomImage(zoomActual+"%");
                        } else {
                            props.setZoomImage("100%");
                        }
                        let dataTries = data.triesimage[mode] * 5
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
                        setEyeTries(data.trieseye[mode]);
                        let dataTries = data.trieseye[mode] * 5
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game==="opening") {
                        setOpeningTries(data.triesopening[mode]);
                        let dataTries = data.triesopening[mode] * 5
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }
                    } else if (props.game==="pixel") {
                        setPixelTries(data.triespixel[mode]);
                        let dataTries = data.triespixel[mode] * 5;
                        if(dataTries >= 25) {
                            props.setGachasRecompensa(25)
                        } else {
                            props.setGachasRecompensa(50 - dataTries)
                        }

                        let zoomRest = 130 - data.triespixel[mode] * 20;
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
                props.finishedGame === false && unlock ? (
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
                    <span className="anime-correct">{props.song ? props.solution + " - " + props.song : props.solution}</span>
                ) : <span className="anime-locked">{t('games.infoBlockedInput')}</span>

            )}
        </>
    )
}
