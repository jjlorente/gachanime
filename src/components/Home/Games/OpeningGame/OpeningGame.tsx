import { findGameById, updateSelected } from '../../../../services/userGames';
import { useState, useEffect } from 'react';
import './OpeningGame.css'
import { useUserGames } from '../Games';
import { Game } from '../../../Interfaces/GamesUser';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import ReactAudioPlayer from 'react-audio-player';

export const OpeningGame = () => {
    const { userGamesData, setUserGamesData, findAllGamesUser } = useUserGames();

    const [finishedOpeningGame, setFinishedOpeningGame] = useState<boolean>();
    const [gameOpeningData, setGameOpeningData] = useState<Game>();
    const [openingSelected, setOpeningSelected] = useState<number>();
    const [animeNameImage, setAnimeNameImage] = useState<string>();
    const [base64Audio, setBase64Audio] = useState<string>();
    const [openingErrors, setOpeningErrors] = useState<Array<string>>([]);
    const [gachasRecompensa, setGachasRecompensa] = useState<number>();
    const [statusReward, setStatusReward] = useState<number>();

    useEffect(() => {
        const idUser = localStorage.getItem("_id");
        if (idUser) {
          findAllGamesUser(idUser);
        }
      }, []);

    useEffect(()=> {
        let arrayErrors = localStorage.getItem("arrayErrorsOpening");
        if(!arrayErrors) {
            localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));
        } else {
            setOpeningErrors(JSON.parse(arrayErrors))
        }
    },[userGamesData])

    useEffect(()=>{
        if(openingErrors && openingErrors.length > 0 ) {
            localStorage.setItem("arrayErrorsOpening", JSON.stringify(openingErrors));
        }
    }, [openingErrors])

    useEffect(()=>{
        if(userGamesData) {
            findOpeningGame(userGamesData.openingid)
            setOpeningSelected(userGamesData.openingSelected)
        }
    }, [userGamesData])

    const findOpeningGame = async (id:any) => {
        try {
            const data = await findGameById(id);
            if (data) {
                setAnimeNameImage(data.anime_name);
                setGameOpeningData(data);
                setBase64Audio("data:audio/wav;base64,"+data.opening);
                if(userGamesData) {
                    setFinishedOpeningGame(userGamesData.finishedOpening);
                    let dataTries = userGamesData.triesopening * 10
                    if(dataTries>= 100) {
                        setGachasRecompensa(100)
                    } else {
                        setGachasRecompensa(200-dataTries)
                    }

                    setStatusReward(userGamesData.statusRewardOpening)
                }

                const openingLocal = localStorage.getItem("openingSelected");
                if (userGamesData && userGamesData.openingSelected) {
                    localStorage.setItem("openingSelected", userGamesData.openingSelected.toString());
                } else if (userGamesData && !openingLocal) {
                    const dataOpeningSelected = await updateSelected(userGamesData.userid, "opening");
                    setUserGamesData(dataOpeningSelected);
                    localStorage.setItem("openingSelected", dataOpeningSelected.openingSelected)
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-imagegame'>

        <Resets title={"¿De que anime es el opening?"} game={"opening"} finishedGame={finishedOpeningGame} findGame={findOpeningGame}/>
            <div className='container-image-center'>
                {gameOpeningData !== undefined && base64Audio !== undefined ? 
                    <ReactAudioPlayer
                        id="audio"
                        src={base64Audio}
                        className="audio-player"
                        controls
                    />
                    :
                    <></>
                }       
            </div>

            {
                finishedOpeningGame === true ?    
                    <span className='span-info-image'>¡Enhorabuena! Recoge tu recompensa y vuelve mañana para un nuevo opening.</span>
                    :
                    null
            }

            <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedOpeningGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"opening"}/>
        
        <div className='container-imagegame-input'>
            {
                    finishedOpeningGame === true ?  
                        null  
                        :
                        <span className='span-info-image'>Cada intento fallido pierdes 10 gachas de la recompensa final.</span>
            }
            <Input setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setOpeningErrors} finishedGame={finishedOpeningGame} solution={animeNameImage} game={"opening"} setFinishedGame={setFinishedOpeningGame} setStatusReward={setStatusReward} />
        </div>
        {openingErrors && finishedOpeningGame === false ? 
            <div className='errors-imagegame'>
                {openingErrors.slice().reverse().map((anime, index) => (
                    <span key={index + "error"} className='error-span-image' style={{fontSize:"1.3rem"}}>{anime}</span>
                ))}
            </div>
            :
            <></>
        }
        </div>
    )
}
