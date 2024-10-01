import { useRef, useEffect } from 'react';
import './PixelGame.css';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { findGameById, findUserGames } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGames } from '../Games';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { useTranslation } from 'react-i18next';

export const PixelGame = () => {
  const { userGamesData, setUserGamesData, mode, setPixelTries } = useUserGames();
  const { t } = useTranslation();

  library.add(faRotateRight);
  trefoil.register();

  const [finishedPixelGame, setFinishedPixelGame] = useState<boolean>();
  const [gamePixelData, setGamePixelData] = useState<Game>();
  const [pixelSelected, setPixelSelected] = useState<number>();
  const [animeNamePixel, setAnimeNamePixel] = useState<string>();
  const [animesPixelErrors, setAnimesPixelErrors] = useState<Array<string>>([]);
  const [pixelImage, setPixelImage] = useState<number>(130);
  const [gachasRecompensa, setGachasRecompensa] = useState<number>();
  const [statusReward, setStatusReward] = useState<number>();
  const [srcImage, setSrc] = useState<string>();

  const [showPicture, setShowPicture] = useState<boolean>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelSize = pixelImage;

  useEffect(()=> {
    let arrayErrors;
    if(mode === 0) {
        arrayErrors = localStorage.getItem("arrayErrorsPixel")
    } else if(mode === 1) {
        arrayErrors = localStorage.getItem("arrayErrorsPixelMedium")
    } else if(mode === 2) {
        arrayErrors = localStorage.getItem("arrayErrorsPixelHard")
    }

    if(!arrayErrors) {
        if(mode === 0) {
            localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
        } else if(mode === 1) {
            localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify([]));
        } else if(mode === 2) {
            localStorage.setItem("arrayErrorsPixelHard", JSON.stringify([]));
        }
    } else {
        if (finishedPixelGame === false || finishedPixelGame === undefined) {
            setAnimesPixelErrors(JSON.parse(arrayErrors))
        } else if (finishedPixelGame === true) {
          setAnimesPixelErrors([])
        }
    }
  },[ userGamesData , finishedPixelGame, mode ])

  useEffect(()=>{
    if(animesPixelErrors && animesPixelErrors.length > 0 && finishedPixelGame === false) {
        if(mode === 0) {
            localStorage.setItem("arrayErrorsPixel", JSON.stringify(animesPixelErrors));
        } else if(mode === 1) {
            localStorage.setItem("arrayErrorsPixelMedium", JSON.stringify(animesPixelErrors));
        } else if(mode === 2) {
            localStorage.setItem("arrayErrorsPixelHard", JSON.stringify(animesPixelErrors));
        }
    }
  }, [animesPixelErrors])

  useEffect(()=>{
    const fetchData = async () => {
      if(userGamesData && mode !== null) {
        let loop = false;
        while(loop===false) {
          loop = true;
          await findPixelGame(userGamesData.pixelid[mode])
          setPixelSelected(userGamesData.pixelSelected[mode])
        }
      }
    }
    fetchData();
  },[userGamesData, mode])

  useEffect(()=>{
    const fetchData = async () => {
      if(userGamesData && mode !== null) {
        let loop = false;
        setFinishedPixelGame(undefined);
        setPixelSelected(undefined);
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
  },[mode])

  const findPixelGame = async (id:any) => {
    try {
      const data = await findGameById(id)
      if (data && mode !== null) {
        setAnimeNamePixel(data.anime_name);
        setGamePixelData(data);
        if(userGamesData) {
          await getSrcData(mode, data);
          setFinishedPixelGame(userGamesData.finishedPixel[mode]);
          setAnimeNamePixel(data.anime_name);
          setGamePixelData(data);

          if(userGamesData.finishedPixel[mode] === true) {
            setPixelImage(1)
          } else {
            let zoom = 130 - userGamesData.triespixel[mode] * 20;
            if (zoom <= 1) {
              setPixelImage(1)
            } else {
              setPixelImage(zoom)
            }
          }

          let dataTries = userGamesData.triespixel[mode] * 5;
          if(dataTries >= 25) {
            setGachasRecompensa(25)
          } else {
            setGachasRecompensa(50 - dataTries)
          }
          setStatusReward(userGamesData.statusRewardPixel[mode])
        }

        const imageLocal = localStorage.getItem("pixelSelected");
        if (userGamesData && userGamesData.pixelSelected && imageLocal) {
          localStorage.setItem("pixelSelected", userGamesData.pixelSelected.toString())
        }
      }
    } catch (error: any) {
        console.error('Error:', error);
    }
  };
  const getSrcData = async (mode: number, data: any) => {
    if(userGamesData) {
      if(mode === 0) {
        setSrc(data.pixel_game[userGamesData.pixelSelected[0]])
        setPixelTries(userGamesData.triespixel[0])
      } else if(mode === 1) {
        setSrc(data.pixel_game_medium[userGamesData.pixelSelected[1]])
        setPixelTries(userGamesData.triespixel[1])
      } else if(mode === 2) {
        setSrc(data.pixel_game_hard[userGamesData.pixelSelected[2]])
        setPixelTries(userGamesData.triespixel[2])
      }
    }
  }

  useEffect(() => {

    const canvas = canvasRef.current;

    if (canvas && srcImage && gamePixelData && pixelSelected !== undefined && mode !== null) {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = srcImage;

      image.onload = () => {
        const originalWidth = image.width;
        const originalHeight = image.height;

        canvas.width = originalWidth;
        canvas.height = originalHeight;

        const scaledWidth = originalWidth / pixelSize;
        const scaledHeight = originalHeight / pixelSize;

        ctx?.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        ctx!.imageSmoothingEnabled = false;

        ctx?.drawImage(
          canvas, 0, 0, scaledWidth, scaledHeight,
          0, 0, originalWidth, originalHeight
        );
      };
    }
  }, [pixelSize, pixelImage, gamePixelData, pixelSelected, srcImage]);

  return (
    <div className='container-imagegame'>

      {
        finishedPixelGame !== undefined ? 
        <Resets setFinished={setFinishedPixelGame} setDataSelected={setPixelSelected} title={t('games.titlePixel')} game={"pixel"} finishedGame={finishedPixelGame} findGame={findPixelGame} setPixel={setPixelImage}/>
        :
        <Resets title={t('games.titlePixel')} game={"pixel"} finishedGame={true} findGame={findPixelGame} setPixel={setPixelImage}/>
      }

      <div className='container-image-center'>
        <div className='section-image-center pixel-center-game'>
          {srcImage && pixelSelected !== undefined ?           
            <canvas ref={canvasRef} className='img-pixel'></canvas>
            :                         
            <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
          }
        </div>

        {
          finishedPixelGame === true && finishedPixelGame !== undefined ?    
            <span className='span-info-image'>{t('games.infoSpanPixelCorrect')}</span>
            :
            null
        }

        {
          finishedPixelGame !== undefined ?
            <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedPixelGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"pixel"}/>
            :
            null 
        }
        
        </div>
      <div className='container-imagegame-input'>
        {
          finishedPixelGame === false ?                
              <span className='span-info-image'>{t('games.infoSpanPixel')}</span>
              :
              null
        }
        <Input pixelImage={pixelImage} setGachasRecompensa={setGachasRecompensa} setAnimesErrors={setAnimesPixelErrors} finishedGame={finishedPixelGame} solution={animeNamePixel} game={"pixel"} setFinishedGame={setFinishedPixelGame} setStatusReward={setStatusReward} setPixel={setPixelImage}/>
      </div>

      {animesPixelErrors && finishedPixelGame === false ? 
        <div className='errors-imagegame'>
          {animesPixelErrors.slice().reverse().map((anime, index) => (
              <span key={index + "error"} className='error-span-image' style={{fontSize:"1.3rem"}}>{anime}</span>
          ))}
        </div>
        :
        <></>
      }

    </div>
  );
};
