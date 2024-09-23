import { useRef, useEffect } from 'react';
import './PixelGame.css';
import { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { findGameById, updateSelected } from '../../../../services/userGames';
import { Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGames } from '../Games';
import { Resets } from '../ResetsComponent/Resets';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { Input } from '../InputComponent/Input';
import { useTranslation } from 'react-i18next';

export const PixelGame = () => {
  const { userGamesData, setUserGamesData, findAllGamesUser } = useUserGames();
  const { i18n, t } = useTranslation();

  library.add(faRotateRight);
  trefoil.register();

  const [finishedPixelGame, setFinishedPixelGame] = useState<boolean>();
  const [gamePixelData, setGamePixelData] = useState<Game>();
  const [pixelSelected, setPixelSelected] = useState<number>();
  const [animeNamePixel, setAnimeNamePixel] = useState<string>();
  const [animesPixelErrors, setAnimesPixelErrors] = useState<Array<string>>([]);
  const [pixelImage, setPixelImage] = useState<number>(30);
  const [gachasRecompensa, setGachasRecompensa] = useState<number>();
  const [statusReward, setStatusReward] = useState<number>();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pixelSize = pixelImage;

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      findAllGamesUser(idUser);
    }
  }, []);

  useEffect(()=> {
    let arrayErrors = localStorage.getItem("arrayErrorsPixel");
    if(!arrayErrors) {
      localStorage.setItem("arrayErrorsPixel", JSON.stringify([]));
    } else {
      setAnimesPixelErrors(JSON.parse(arrayErrors))
    }
  },[userGamesData])

  useEffect(()=>{
    if(animesPixelErrors && animesPixelErrors.length > 0 ) {
      localStorage.setItem("arrayErrorsPixel", JSON.stringify(animesPixelErrors));
    }
  }, [animesPixelErrors])

  useEffect(()=>{
    const fetchData = async () => {
      if(userGamesData) {
        let loop = false;
        while(loop===false) {
          loop = true;
          await findPixelGame(userGamesData.pixelid)
          setPixelSelected(userGamesData.pixelSelected)
        }
      }
    }
    fetchData();
  },[userGamesData])

  const findPixelGame = async (id:any) => {
    try {
      const data = await findGameById(id)
      if (data) {
        setAnimeNamePixel(data.anime_name);
        setGamePixelData(data);
        if(userGamesData) {
          setFinishedPixelGame(userGamesData.finishedPixel);
          if(userGamesData.finishedPixel === true) {
            setPixelImage(1)
          } else {
            let zoom = 30 - userGamesData.triespixel * 2.5;
            if (zoom <= 1) {
              setPixelImage(1)
            } else {
              setPixelImage(zoom)
            }
          }

          let dataTries = userGamesData.triespixel * 5;
          if(dataTries >= 25) {
            setGachasRecompensa(25)
          } else {
            setGachasRecompensa(50 - dataTries)
          }
          setStatusReward(userGamesData.statusRewardPixel)
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

  useEffect(() => {

    const canvas = canvasRef.current;

    if (canvas && gamePixelData && pixelSelected !== undefined) {
      const ctx = canvas.getContext('2d');
      const image = new Image();
      image.src = gamePixelData.pixel_game[pixelSelected];

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
  }, [pixelSize, pixelImage, gamePixelData, pixelSelected]);

  return (
    <div className='container-imagegame'>

      <Resets title={t('games.titlePixel')} game={"pixel"} finishedGame={finishedPixelGame} findGame={findPixelGame} setPixel={setPixelImage}/>

      <div className='container-image-center'>
        <div className='section-image-center pixel-center-game'>
          <canvas ref={canvasRef} className='img-pixel'></canvas>
        </div>
        {
          finishedPixelGame === false ?    
            null            
            :
            <span className='span-info-image'>{t('games.infoSpanPixelCorrect')}</span>
        }
        <TriesReward statusReward={statusReward} setStatusReward={setStatusReward} finishedGame={finishedPixelGame} setGachasRecompensa={setGachasRecompensa} gachasRecompensa={gachasRecompensa} game={"pixel"}/>
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
