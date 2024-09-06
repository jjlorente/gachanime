import './ImageGame.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { findGameById, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGames } from '../Games';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { useTranslation } from 'react-i18next';

export const ImageGame = () => {
    const { userGamesData, setUserGamesData, findAllGamesUser } = useUserGames();
    const { i18n, t } = useTranslation();

    library.add(faRotateRight);
    trefoil.register();

    const [finishedImageGame, setFinishedImageGame] = useState<boolean>();
    const [gameImageData, setGameImageData] = useState<Game>();
    const [imgSelected, setImgSelected] = useState<number>();
    const [animeNameImage, setAnimeNameImage] = useState<string>();
    const [animesErrors, setAnimesErrors] = useState<Array<string>>([]);
    const [zoomImage, setZoomImage] = useState<string>("500%");
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>();

    useEffect(() => {
        const idUser = localStorage.getItem("_id");
        if (idUser) {
          findAllGamesUser(idUser);
        }
    }, []);

    useEffect(()=> {
        let arrayErrors = localStorage.getItem("arrayErrorsImage");
        if(!arrayErrors) {
            localStorage.setItem("arrayErrorsImage", JSON.stringify([]));
        } else {
            setAnimesErrors(JSON.parse(arrayErrors))
        }
    },[userGamesData])

    useEffect(()=>{
        if(animesErrors && animesErrors.length > 0 ) {
            localStorage.setItem("arrayErrorsImage", JSON.stringify(animesErrors));
        }
    }, [animesErrors])

    useEffect(()=>{
        if(userGamesData) {
            findImageGame(userGamesData.imageid)
            setImgSelected(userGamesData.imageSelected)
        }
    }, [userGamesData])

    const findImageGame = async (id:any) => {
        try {
            const data = await findGameById(id)
            if (data) {
                setAnimeNameImage(data.anime_name);
                setGameImageData(data);
                if(userGamesData) {
                    setFinishedImageGame(userGamesData.finishedImage);
                    if(userGamesData.finishedImage === true) {
                        setZoomImage("100%")
                    } else {
                        let zoom = userGamesData.triesimage * 50;
                        if (zoom >= 400) {
                            setZoomImage("100%")
                        } else {
                            zoom = 500 - zoom;
                            setZoomImage(zoom+"%")
                        }
                    }

                    let dataTries = 50
                    if(dataTries>= 50) {
                        setGachasRecompensa(50)
                    } else {
                        setGachasRecompensa(50)
                    }

                    setStatusReward(userGamesData.statusRewardImage)
                }
                const imageLocal = localStorage.getItem("imgSelected");

                if (userGamesData && userGamesData.imageSelected && imageLocal) {
                    localStorage.setItem("imgSelected", userGamesData.imageSelected.toString())
                } else if (userGamesData && !imageLocal) {
                    const dataImageSelected = await updateSelected(userGamesData.userid, "image");
                    setUserGamesData(dataImageSelected);
                    localStorage.setItem("imgSelected", dataImageSelected.imageSelected)
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-imagegame'>

            <Resets title={t('games.titleImage')} game={"image"} finishedGame={finishedImageGame} findGame={findImageGame}/>

            <div className='container-image-center'>
                <div className='section-image-center image-center-game'>        
                    {imgSelected !== undefined ? 
                        <img className='img-game' width={zoomImage} height={"auto"} src={ gameImageData?.image_game[imgSelected] } alt="" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>
                
                {
                    finishedImageGame === false ?    
                        null            
                        :
                        <span className='span-info-image'>{t('games.infoSpanWinImage')}</span>
                }
                <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedImageGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"image"}/>
            
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
