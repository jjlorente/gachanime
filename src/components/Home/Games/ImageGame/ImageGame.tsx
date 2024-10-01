import './ImageGame.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { findGameById, findUserGames } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGames } from '../Games';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { useTranslation } from 'react-i18next';

export const ImageGame = () => {
    const { userGamesData, setUserGamesData, mode, setImageTries } = useUserGames();
    const { t } = useTranslation();

    library.add(faRotateRight);
    trefoil.register();

    const [srcImage, setSrc] = useState<string>();
    const [finishedImageGame, setFinishedImageGame] = useState<boolean>();
    const [gameImageData, setGameImageData] = useState<Game>();
    const [imgSelected, setImgSelected] = useState<number>();
    const [animeNameImage, setAnimeNameImage] = useState<string>();
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [zoomImage, setZoomImage] = useState<string>("400%");
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>();


    useEffect(()=> {
        let arrayErrors;
        if(mode === 0) {
            arrayErrors = localStorage.getItem("arrayErrorsImage")
        } else if(mode === 1) {
            arrayErrors = localStorage.getItem("arrayErrorsImageMedium")
        } else if(mode === 2) {
            arrayErrors = localStorage.getItem("arrayErrorsImageHard")
        }
        
        if(!arrayErrors) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsImageMedium", JSON.stringify([]));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsImageHard", JSON.stringify([]));
            }
        } else {
            if (finishedImageGame === false || finishedImageGame === undefined) {
                setAnimesErrors(JSON.parse(arrayErrors))
            } else if (finishedImageGame === true) {
                setAnimesErrors([])
            }
        }
    },[ userGamesData ,finishedImageGame, mode ])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 && finishedImageGame === false) {
            if(mode === 0) {
                localStorage.setItem("arrayErrorsImage", JSON.stringify(animesErrors));
            } else if(mode === 1) {
                localStorage.setItem("arrayErrorsImageMedium", JSON.stringify(animesErrors));
            } else if(mode === 2) {
                localStorage.setItem("arrayErrorsImageHard", JSON.stringify(animesErrors));
            }
        }
    }, [animesErrors])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                while(loop===false) {
                    loop = true;
                    await findImageGame(userGamesData.imageid[mode])
                    setImgSelected(userGamesData.imageSelected[mode])
                }
            }
        }
        fetchData();
    },[userGamesData, mode])

    useEffect(()=>{
        const fetchData = async () => {
            if(userGamesData && mode !== null) {
                let loop = false;
                setFinishedImageGame(undefined);
                setImgSelected(undefined);
                const idUser = localStorage.getItem("_id");
                if (idUser) {
                    while(loop===false) {
                        loop = true;
                        const data = await findUserGames(idUser);
                        setUserGamesData(data);
                    }
                }
            }
        }
        fetchData();
    },[mode]);

    const findImageGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            if (data && mode !== null) {
                if(userGamesData) {
                    await getSrcData(mode, data)
                    setFinishedImageGame(userGamesData.finishedImage[mode]);
                    setAnimeNameImage(data.anime_name);
                    setGameImageData(data);

                    if(userGamesData.finishedImage[mode] === true) {
                        setZoomImage("100%")
                    } else {
                        let zoom = userGamesData.triesimage[mode] * 50;
                        if (zoom >= 300) {
                            setZoomImage("100%")
                        } else {
                            zoom = 400 - zoom;
                            setZoomImage(zoom+"%")
                        }
                    }

                    let dataTries = userGamesData.triesimage[mode] * 5;
                    if(dataTries >= 25) {
                        setGachasRecompensa(25)
                    } else {
                        setGachasRecompensa(50 - dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardImage[mode])
                }
                const imageLocal = localStorage.getItem("imgSelected");

                if (userGamesData && userGamesData.imageSelected[mode] && imageLocal) {
                    localStorage.setItem("imgSelected", userGamesData.imageSelected[mode].toString())
                } 
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const getSrcData = async (mode: number, data: any) => {
        if(userGamesData) {
            if(mode === 0) {
                setSrc(data.image_game[userGamesData.imageSelected[0]])
                setImageTries(userGamesData.triesimage[0])
            } else if(mode === 1) {
                setSrc(data.image_game_medium[userGamesData.imageSelected[1]])
                setImageTries(userGamesData.triesimage[1])
            } else if(mode === 2) {
                setSrc(data.image_game_hard[userGamesData.imageSelected[2]])
                setImageTries(userGamesData.triesimage[2])
            }
        }
    }

    return (
        <div className='container-imagegame'>

            {
                finishedImageGame !== undefined ? 
                <Resets setFinished={setFinishedImageGame} setDataSelected={setImgSelected} title={t('games.titleImage')} game={"image"} finishedGame={finishedImageGame} findGame={findImageGame}/>
                :
                <Resets title={t('games.titleImage')} game={"image"} finishedGame={true} findGame={findImageGame}/>
            }

            <div className='container-image-center'>
                <div className='section-image-center image-center-game'>        
                    {imgSelected !== undefined ? 
                        <img className='img-game' width={zoomImage} height={zoomImage === "100%" ? "100%" : "auto"} src={ srcImage ? srcImage: "" } alt="Image for Game image anime" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>
                
                {
                    finishedImageGame === true && finishedImageGame !== undefined ?   
                        <span className='span-info-image'>{t('games.infoSpanWinImage')}</span>
                        :
                        null
                }

                {
                    finishedImageGame !== undefined ?
                        <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedImageGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"image"}/>
                        :
                        null           
                }     

            </div>
            <div className='container-imagegame-input'>
                {
                    finishedImageGame === false ?                
                        <span className='span-info-image'>{t('games.infoSpanImage')}</span>
                        :
                        null
                }
                <Input zoomImage={zoomImage} setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setAnimesErrors} finishedGame={finishedImageGame} solution={animeNameImage} game={"image"} setFinishedGame={setFinishedImageGame} setStatusReward={setStatusReward} setZoomImage={setZoomImage}/>
            </div>
            {animesErrors && finishedImageGame === false ? 
                <div className='errors-imagegame'>
                    {animesErrors.slice().reverse().map((anime, index) => (
                        <span key={index + "error"} className='error-span-image' style={{fontSize:"1.3rem"}}>{anime}</span>
                    ))}
                </div>
                :
                <></>
            }
        </div>
    )
}
