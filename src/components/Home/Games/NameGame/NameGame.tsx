import { Resets } from '../ResetsComponent/Resets'
import './NameGame.css'
import { findGameById, updateSelected } from '../../../../services/userGames';
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';
import { TriesReward } from '../TriesRewardComponent/TriesReward';
import { useUserGachas } from "../../Home";
import { Game } from '../../../Interfaces/GamesUser';
import { updateGameUser, findCharacters } from '../../../../services/userGames';
import { trefoil } from 'ldrs';
import { updateLevel } from '../../../../services/user';
import { useTranslation } from 'react-i18next';

export const NameGame = () => {
  const { t } = useTranslation();
  const [gameData, setGameData] = useState<Game>();
  const [finishedNameGame, setFinishedNameGame] = useState<boolean>();
  const [gachasRecompensa, setGachasRecompensa] = useState<number>();
  const [statusReward, setStatusReward] = useState<number>(0);
  const [pjName, setPjName] = useState<string>();
  const [nameSelected, setNameSelected] = useState<number>();
  const [inputValue, setInputValue] = useState<Array<string>>([]);
  const [arrayColors, setArrayColors] = useState<string[][]>([]);
  const [errorsArray, setErrorsArray] = useState<Array<string>>([]);
  const [nameTriesComp, setNameTriesComp] = useState<number>(0);

  const { userGamesData, setUserGamesData, findAllGamesUser } = useUserGames();
  const { alerts, setAlerts } = useUserGachas();
  const { nameTries, setNameTries } = useUserGames();

  trefoil.register();

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      findAllGamesUser(idUser);
    }
  }, []);

  const findNameGame = async (id:any) => {
    try {
      const data = await findGameById(id);
      if (data) {
        setGameData(data);
        if(userGamesData) {
          setFinishedNameGame(userGamesData.finishedName);
          setGachasRecompensa(50)
          setStatusReward(userGamesData.statusRewardName)
        }

        const nameLocal = localStorage.getItem("nameSelected");
        if (userGamesData && userGamesData.nameSelected) {
          localStorage.setItem("nameSelected", userGamesData.nameSelected.toString())
        } else if (userGamesData && !nameLocal) {
          const dataNameSelected = await updateSelected(userGamesData.userid, "name");
          setUserGamesData(dataNameSelected);
          localStorage.setItem("nameSelected", dataNameSelected.nameSelected)
        }
      }

    } catch (error: any) {
        console.error('Error:', error);
    }
  };

  useEffect(()=>{
    if(userGamesData) {
      findNameGame(userGamesData.nameid)
      setNameSelected(userGamesData.nameSelected)
      setNameTriesComp(userGamesData.triesname)
      let arrayTries = localStorage.getItem("arrayTriesName")
      if (arrayTries) {
        setErrorsArray(JSON.parse(arrayTries))
      }
      
      let localArrayColors = localStorage.getItem("localArrayColors");
      if (localArrayColors) {
        let parsedArrayColors: string[][] = JSON.parse(localArrayColors);
        setArrayColors(parsedArrayColors)
      }
    }
  },[userGamesData])

  useEffect(()=>{
    if(gameData && userGamesData) {
      let nameSelectedLocal = localStorage.getItem("nameSelected");
      let formattedName: string = ""
      if(nameSelectedLocal) {
        let numero = parseInt(nameSelectedLocal, 10);
        formattedName = gameData.names_game[numero]?.replace(/\s+/g, '');
      } else {
        formattedName = gameData.names_game[userGamesData.nameSelected]?.replace(/\s+/g, '');
      }
      setPjName(formattedName)
    }
  },[gameData])

  useEffect(() => {
    if (pjName) {
      const newInputValues = Array(pjName.length).fill("");
      newInputValues[0] = pjName[0]
      setInputValue(newInputValues);
    }
  }, [pjName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const regex = /^[a-zA-Z]*$/;

    if (regex.test(e.target.value)) {    
      const newInputValues = [...inputValue];
      newInputValues[index] = e.target.value;
      setInputValue(newInputValues); 

      const nextIndex = index + 1;
      if(e.target.value !== "") {
        document.getElementById(`${nextIndex}${nameTriesComp}inputName`)?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const key = e.key;
    const prevIndex = index - 1;
    const nextIndex = index + 1;

    if (key === "Backspace" && index > 0 && inputValue[index] === "") {
      document.getElementById(`${prevIndex}${nameTriesComp}inputName`)?.focus();
    } else if (key === "ArrowRight" && index < inputValue.length - 1 && inputValue[index] !== "") {
      document.getElementById(`${nextIndex}${nameTriesComp}inputName`)?.focus();
    } else if (key === "ArrowLeft" && index > 0) {
      document.getElementById(`${prevIndex}${nameTriesComp}inputName`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let arrayTries = localStorage.getItem("arrayTriesName");

    e.preventDefault();
    let isWordCompleted = true
    if(inputValue) {
      inputValue.map((value) => {
        if(value==="") {
          isWordCompleted = false
        }
      })
    }

    let word = inputValue.join("").toUpperCase();

    if(isWordCompleted && pjName){
      if(word === pjName?.toUpperCase() && userGamesData) {

        const data = await updateGameUser(userGamesData.userid, true, 0, 0, 1, "name");
        await updateLevel(userGamesData.userid, 40)
        setFinishedNameGame(data.finishedName);
        setStatusReward(data.statusRewardName);

        let alertGame = localStorage.getItem("alerts");
        if (alertGame) {
          let arrayAlerts = JSON.parse(alertGame);
          arrayAlerts.push("games");
          arrayAlerts.push("quests");
          localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
          setAlerts(arrayAlerts);
        } else {
          localStorage.setItem("alerts", JSON.stringify(["games", "quests"]));
          setAlerts(["games", "quests"]);
        }

      } else {
        if (userGamesData) {
          await updateGameUser(userGamesData.userid, false, 1, 0, 0, "name");
          setNameTriesComp(nameTriesComp + 1)
          setGachasRecompensa(50)
          setStatusReward(userGamesData.statusRewardName)
        }
        if (arrayTries) {
          let array = JSON.parse(arrayTries)
          array.push(word)
          localStorage.setItem("arrayTriesName" , JSON.stringify(array))
          setErrorsArray([...errorsArray, word])
        } else {
          localStorage.setItem("arrayTriesName" , JSON.stringify([word]))
          setErrorsArray([word])
        }

        
        wordle(word, pjName)

        setNameTries(nameTriesComp + 1)
        const newInputValues = Array(pjName.length).fill("");
        newInputValues[0] = pjName[0]
        setInputValue(newInputValues);
      }
    }
  };

  function wordle(word:string, pjName:string) {
    const wordArr = word.split('');
    const pjNameArr = pjName.toUpperCase().split('');

    const result: string[] = [];

    const pjNameCopy = [...pjNameArr];

    wordArr.forEach((letter, index) => {
        if (letter === pjNameArr[index]) {
          result.push('#1AB616');
          pjNameCopy[index] = "";
        } else {
          result.push("");
        }
    });

    wordArr.forEach((letter, index) => {
        if (result[index] === "") {
          const letterIndex = pjNameCopy.indexOf(letter);
          if (letterIndex !== -1) {
            result[index] = 'orange';
            pjNameCopy[letterIndex] = "";
          } else {
            result[index] = '#ff3636';
          }
        }
    });

    if (arrayColors) {
      setArrayColors([...arrayColors, result]);
    } else {
      setArrayColors([result]);
    }

    let localArrayColors = localStorage.getItem("localArrayColors");
    if (localArrayColors) {
        let parsedArrayColors: string[][] = JSON.parse(localArrayColors);
        parsedArrayColors.push(result);
        localStorage.setItem("localArrayColors", JSON.stringify(parsedArrayColors));
    } else {
        localStorage.setItem("localArrayColors", JSON.stringify([result]));
    }

    return result;
  }

  useEffect(()=> {
    const elementId = 1 + "" + nameTriesComp + "inputName";
    const element = document.getElementById(elementId);

    if (element) {
      element.focus();
    } 

  }, [nameTriesComp])

  return (
    <div className='container-imagegame'>

      <Resets 
        title={t('games.titleWordle')}
        game={"name"}
        setNameTriesComp={setNameTriesComp}
        finishedGame={finishedNameGame}
        findGame={findNameGame}
        setArrayColors={setArrayColors}
      />

      <div className='container-name-game' style={{ display: "flex", flexDirection: "column", gap: ".6rem", width:"100%",justifyContent:"center" }}>
        {Array.from({ length: 6 }, (_, indexArray) => (
          nameTriesComp === indexArray && finishedNameGame === false ? (
            <form onSubmit={handleSubmit} className='name-container-game' key={"form-"+indexArray}>
              {pjName ? 
                pjName.split('').map((char, index) => (
                  index === 0 ? 
                  <div 
                    id={index + "inputName"}
                    key={index}
                    className="name-input-game jaro-regular correct-letter"
                  >
                    {pjName[0]}
                  </div>
                  :
                  <input 
                    type="text"
                    id={index + "" + indexArray + "inputName"}
                    key={index}
                    className="name-input-game active-row-input jaro-regular"
                    maxLength={1}
                    value={inputValue[index] ? inputValue[index].toUpperCase() : ""}
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    autoComplete="off"
                  />
                )) 
                :                         
                <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
              }
              <button key={"button-form-"+indexArray} style={{ display: "none" }} type="submit"></button>
            </form>
          ) : (
            <div className='name-container-game' key={"name-container-"+indexArray}>
              {pjName && errorsArray[indexArray] ? 
                errorsArray[indexArray].split('').map((char, index) => (
                  <div 
                    id={index + "inputName"}
                    key={index}
                    className="name-input-game jaro-regular correct-letter"
                    style={{ backgroundColor: arrayColors.length === errorsArray.length ? arrayColors[indexArray][index] : "" }}
                  >
                    {char}
                  </div>
                )) 
                : pjName?.split('').map((char, index) => (
                  pjName && index === 0 ?
                  <div 
                    id={index + "inputName"}
                    key={index}
                    className="name-input-game jaro-regular correct-letter"
                  >
                    {pjName[0]}
                  </div>
                  :
                  finishedNameGame === true && indexArray === nameTriesComp ?
                  <div 
                    id={index + "inputName"}
                    key={index}
                    className="name-input-game jaro-regular"
                    style={{ backgroundColor: "#1AB616" }}
                  >
                    {char.toUpperCase()}
                  </div>
                  :
                  <div 
                    id={index + "inputName"}
                    key={`${index} close`}
                    className="name-input-game jaro-regular"
                  />
                ))
              }
            </div>
          )
        ))}
      </div>
      
      {nameTriesComp >= 3 && finishedNameGame === false ? 
        <div className='container-imagegame-input'>
          <span className='span-info-clue' style={{backgroundColor:nameTriesComp >= 6 && finishedNameGame === false ? "red" : "#d98c16"}}>
            {nameTriesComp >= 6 && finishedNameGame === false && pjName ? pjName.toUpperCase() + " de " + gameData?.anime_name  :"Personaje de " + gameData?.anime_name}
          </span>
        </div>
        :
        <></>
      }

      {finishedNameGame === true ? 
        <div className='container-imagegame-input'>
          <span className='span-info-clue' style={{backgroundColor:"#1AB616", padding:"5px 20px", borderRadius:"5px", fontSize:"1.5rem",border:"2px solid white"}}>
            {pjName ? pjName.toUpperCase() + ": " + gameData?.anime_name  : gameData?.anime_name}
          </span>
        </div>

        :

        <div className='container-imagegame-colors'>
          <div className='div-info-color'>
            <span className='color-green'></span>
            <span>{t('games.wordleInfoCorrect')}</span>
          </div>
          <div className='div-info-color'>
            <span className='color-orange'></span>
            <span>{t('games.wordleInfoOrange')}</span>
          </div>
          <div className='div-info-color'>
            <span className='color-red'></span>
            <span>{t('games.wordleInfoIncorrect')}</span>    
          </div>
        </div>
      }

      <div className='container-imagegame-input'>
        {
          finishedNameGame === true ? 
          <span className='span-info-image'>
            {t('games.infoSpanWordleCorrect')}
          </span>
          :
          <span className='span-info-image'>
            {t('games.infoSpanWordle')}
          </span>
        }
      </div>

      <TriesReward 
        statusReward={statusReward}
        setStatusReward={setStatusReward}
        finishedGame={finishedNameGame}
        setGachasRecompensa={setGachasRecompensa}
        gachasRecompensa={gachasRecompensa}
        game={"name"}
      />

    </div>
  );
  
}
