import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserGames } from '../Games';
import { findGameById, resetGame, updateSelected } from '../../../../services/userGames';

export const Resets = (props: any) => {
    const { resets, setResets, userGamesData, setUserGamesData, mode} = useUserGames();
    const { setNameTries, setPixelTries, setEyeTries, setImageTries, setOpeningTries, setSiluetaTries, unlock } = useUserGames();

    const resetGameClick = async () => {
        if(userGamesData && mode !== null) {
            if(props.setDataSelected && props.setFinished) {
                props.setDataSelected(undefined)
                props.setFinished(undefined)
            }
            const data = await resetGame(userGamesData.userid, props.game, mode);
            if(data) {
                setResets(data.resets);
                if (props.game === "image") {
                    const dataImg = await findGameById(data.imageid[mode])
                    if(dataImg) {
                        const dataImage = await updateSelected(userGamesData.userid, props.game, mode);
                        localStorage.setItem("imgSelected", dataImage.imageSelected);
                        if(dataImage) {
                            setUserGamesData(dataImage);
                            setImageTries(0);
                        }
                    }
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
                    } else if (mode === 1) {
                        localStorage.setItem("arrayErrorsImageMedium", JSON.stringify([]));
                    } else if (mode === 2) {
                        localStorage.setItem("arrayErrorsImageHard", JSON.stringify([]));
                    }  
                } else if (props.game === "silueta") {
                    const dataSil = await findGameById(data.siluetaid[mode])
                    if(dataSil) {
                        const randomIndex = Math.floor(Math.random() * dataSil.silueta_game.length);
                        localStorage.setItem("siluetaSelected", randomIndex.toString());
                        const dataSilueta = await updateSelected(userGamesData.userid, props.game, mode);
                        if(dataSilueta) {
                            setUserGamesData(dataSilueta);
                            setSiluetaTries(0);
                        }
                    }
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));  
                    } else if (mode === 1) {
                        localStorage.setItem("arrayErrorsSiluetaMedium", JSON.stringify([]));  
                    } else if (mode === 2) {
                        localStorage.setItem("arrayErrorsSiluetaHard", JSON.stringify([]));  
                    }
                } else if (props.game === "eye") {
                    const dataEye = await findGameById(data.eyeid[mode])
                    if(dataEye) {
                        const randomIndex = Math.floor(Math.random() * dataEye.eye_game.length);
                        localStorage.setItem("eyeSelected", randomIndex.toString());
                        const dataEyes = await updateSelected(userGamesData.userid, props.game, mode);
                        if(dataEyes) {
                            setUserGamesData(dataEyes);
                            setEyeTries(0);
                        }
                    }
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsEye", JSON.stringify([]));
                    } else if (mode === 1) {
                        localStorage.setItem("arrayErrorsEyeMedium", JSON.stringify([]));
                    } else if (mode === 2) {
                        localStorage.setItem("arrayErrorsEyeHard", JSON.stringify([]));
                    }
                } else if (props.game === "opening") {
                    const dataOpening = await findGameById(data.openingid[mode])
                    if(dataOpening) {
                        const randomIndex = Math.floor(Math.random() * dataOpening.opening.length);
                        localStorage.setItem("openingSelected", randomIndex.toString());
                        const dataOp = await updateSelected(userGamesData.userid, props.game, mode);
                        if(dataOp) {
                            setUserGamesData(dataOp);
                            setOpeningTries(0);
                        }
                    }
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));  
                    } else if (mode === 1) {
                        localStorage.setItem("arrayErrorsOpeningMedium", JSON.stringify([]));  
                    } else if (mode === 2) {
                        localStorage.setItem("arrayErrorsOpeningHard", JSON.stringify([]));  
                    }
                } else if (props.game === "name") {
                    const dataName = await findGameById(data.nameid)
                    if(dataName) {
                        localStorage.setItem("arrayTriesName", "[]");
                        localStorage.setItem("localArrayColors", "[]");

                        setNameTries(0);
                        props.setArrayColors([])

                        const randomIndex = Math.floor(Math.random() * dataName.wordle_game.length);
                        localStorage.setItem("nameSelected", randomIndex.toString());
                        const dataNameGame = await updateSelected(userGamesData.userid, props.game,0);
                        if(dataNameGame) {
                            setUserGamesData(dataNameGame);
                        }
                    }
                    localStorage.setItem("arrayErrorsName", JSON.stringify([]));  
                } else if (props.game === "pixel") {
                    const dataPixel = await findGameById(data.pixelid[mode])
                    if(dataPixel) {
                        const randomIndex = Math.floor(Math.random() * dataPixel.pixel_game.length);
                        localStorage.setItem("pixelSelected", randomIndex.toString());
                        const dataPixelGame = await updateSelected(userGamesData.userid, props.game, mode);
                        if(dataPixelGame) {
                            setUserGamesData(dataPixelGame);
                            setPixelTries(0)
                        }
                    }
                    if(mode === 0) {
                        localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));  
                    } else if (mode === 1) {
                        localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify([]));  
                    } else if (mode === 2) {
                        localStorage.setItem("arrayErrorsPixelHard", JSON.stringify([]));  
                    }  
                }

            }
        }
    }

    return (
        <div className='header-imagegame'>

            <h1 className='title-imagegame'>
                {props.title}
            </h1>

            <span 
                className={resets === 0 || props.finishedGame === true || !unlock ? "resets-empty" : "gachas-resets"} 
                onClick={resets === 0 || props.finishedGame ? undefined : resetGameClick}
            >
                <>
                    {resets} / 10
                    <FontAwesomeIcon 
                        icon={faRotateRight} 
                        className={resets === 0 || props.finishedGame === true ? "" : "refresh"} 
                    />  
                </>
            </span> 

        </div>
    )
}
