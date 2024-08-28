import { findGameById, updateSelected } from '../../../../services/userGames';
import { useState, useEffect } from 'react';
import './OpeningGame.css'
import { useUserGames } from '../Games';
import { Game } from '../../../Interfaces/GamesUser';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import "@madzadev/audio-player/dist/index.css";
import ReactAudioPlayer from 'react-audio-player';

export const OpeningGame = () => {
  const { userGamesData, setUserGamesData } = useUserGames();

  const [finishedOpeningGame, setFinishedOpeningGame] = useState<boolean>();
  const [gameOpeningData, setGameOpeningData] = useState<Game>();
  const [openingSelected, setOpeningSelected] = useState<number>();
  const [animeNameImage, setAnimeNameImage] = useState<string>();
  const [base64Audio, setBase64Audio] = useState<string>();
  const [openingErrors, setOpeningErrors] = useState<Array<string>>([]);
  const [gachasRecompensa, setGachasRecompensa] = useState<number>();
  const [statusReward, setStatusReward] = useState<number>();

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
                let dataTries = userGamesData.triesopening * 40
                if(dataTries>= 400) {
                    setGachasRecompensa(100)
                } else {
                    setGachasRecompensa(500-dataTries)
                }

                setStatusReward(userGamesData.statusRewardOpening)
            }
            const randomIndex = Math.floor(Math.random() * data.opening.length);
            const openingLocal = localStorage.getItem("openingSelected");

            if (userGamesData && userGamesData.openingSelected) {
                localStorage.setItem("openingSelected", userGamesData.openingSelected.toString());
                await updateSelected(userGamesData.userid, userGamesData.openingSelected, "opening");
            } else if (userGamesData && userGamesData.openingSelected === undefined && !openingLocal) {
                const dataOpeningSelected = await updateSelected(userGamesData.userid, randomIndex, "opening");
                setUserGamesData(dataOpeningSelected);
                localStorage.setItem("openingSelected", randomIndex.toString())
            }
        }
    } catch (error: any) {
        console.error('Error:', error);
    }
  };

  const [isPlaying, setIsPlaying] = useState(false)
  const toggleAudio = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;;
    const playPauseButton = document.getElementById("play-pause-button");

    if (isPlaying && audio && playPauseButton) {
        audio.pause();
        playPauseButton.textContent = "Play";
    } else {
        if (audio && playPauseButton) {
            audio.play();
            playPauseButton.textContent = "Pause";
        }
    }
    setIsPlaying(!isPlaying);
  }

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

        <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedOpeningGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"opening"}/>
      
      <div className='container-imagegame-input'>
        <span className='span-info-image'>Cada intento fallido pierdes 20 gachas de la recompensa final.</span>
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
