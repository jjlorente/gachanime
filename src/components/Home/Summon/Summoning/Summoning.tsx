import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findCardsSummoned } from '../../../../services/cards';
import { trefoil } from 'ldrs';
import './Summoning.css'
import Video from './Video/Video';

export const Summoning = () => {
  trefoil.register();
  const [colorPulsar, setColorPulsar] = useState("gray");
  const navigate = useNavigate();
  const location = useLocation();
  const { prop1, prop2, prop3, throws, gachas } = location.state || {};
  const [rarityCards, setRarityCards] = useState<string[]>([]);
  const [cardSummoned, setCardSummoned] = useState<any>();
  const [show, setShow] = useState<boolean[]>([]);
  const [countCardsShowed, setCountCardsShowed] = useState(0);

  const [videoPlayed, setVideoPlayed] = useState(false);

  const handleClear = () => {
    navigate('/home/summon');
    setRarityCards([]);
    setVideoPlayed(false);
  }

  const handleSkip = () => {
    setCountCardsShowed(cardSummoned.length)
    
    const newArray = []
    for(let i=0; i < cardSummoned.length; i++) {
      newArray.push(true);
    }
    setShow(newArray);
  }

  const obtenerRarezas = async () => {
    let random = Math.random();
    let shots = 0;
    setRarityCards([]);

    if(prop3 === 1) {

      if((throws + 1) === 80) {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
        return
      }

      if((throws + 1) % 10 === 0) {
        if(random > 0.2) {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "A"]);
        } else if (random < 0.2 && random > 0.005) {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "S"]);
        } else {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
        }
      } else {
        if (random <= 0.8) {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "B"]);
        } else if (random <= 0.9) {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "A"]);
        } else if (random <= 0.98) {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "S"]);
        } else {
          setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
        }
      }
      return
    }

    if((throws + 10) >= 80) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
      shots += 1
    }
    if(random > 0.2) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "A"]);
    } else if (random < 0.2 && random > 0.005) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S"]);
    } else {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
    }
    shots += 1

    for (let i = 0; i < 10-shots; i++) { 
      let random = Math.random();
      if (random <= 0.8) {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "B"]);
      } else if (random <= 0.9) {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "A"]);
      } else if (random <= 0.98) {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "S"]);
      } else {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
      }
    }
    return
  }

  useEffect(() => {
    const fetchData = async () => {
      await obtenerRarezas();
    };

    fetchData();
  }, [])

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser && rarityCards.length > 0) {
      const fetchData = async () => {
        const data = await findCardsSummoned(idUser, rarityCards, throws, gachas, prop1);

        if (data) {

          let clr = "gray";
          for (const card of data) {
            if (card.rarity === "S+") {
              clr = "red";
              break;
            } else if(card.rarity === "S") {
              clr = "pink"
            } else if(card.rarity === "A" && clr == "gray") {
              clr = "blue"
            }
          }

          setColorPulsar(clr);
          setCardSummoned(data);
        }
      };
      fetchData();
    }
  }, [rarityCards]);

  const showCard = (index: number) => {
    setCountCardsShowed(countCardsShowed+1)
    setShow((prevShowCard) => {
      const updatedShowCard = [...prevShowCard];
      updatedShowCard[index] = !updatedShowCard[index];
      return updatedShowCard;
    });
  }

  useEffect(() => {
    if (!cardSummoned || cardSummoned.length <= 1) {
      setVideoPlayed(true);
    } else {
      setVideoPlayed(false);
    }
  }, [cardSummoned]);

  return (
    <div className='Summoning' >
      <div className='container-summons'>
        {/* {cardSummoned && cardSummoned.length > 1 ?
          <Video setVideoPlayed={setVideoPlayed} cardSummoned={cardSummoned}/>
            : 
          <></>
        } */}
        <div className={`container-buttons-summon ${cardSummoned && cardSummoned.length > 1 ? 'justifyE' : 'justifyC'}`}> 
          {cardSummoned && cardSummoned.length > 0 ?
            cardSummoned.length === countCardsShowed ?
            <span className='btn-skip' onClick={handleClear}>SALIR</span>
            :
            <span className='btn-skip' onClick={handleSkip}>SKIP</span>
            :
            <></>
          }
        </div>
        <div className={`container-cards-summon ${cardSummoned && cardSummoned.length > 1 ? 'justifyS' : 'justifyC'}`}>
        {cardSummoned && cardSummoned.length > 0 ? <div className='anima' ></div> : <></>}

          {cardSummoned && cardSummoned.length > 0 ? cardSummoned.map((card:any, index:any) => ( 
            <div className={`back-front ${!show[index] ? 'inactive-back-front' : ''}`} key={index+"-back-front"} >
              <div 
                className={`container-card-summon ${!show[index] ? 'inactive-card' : 'active-card'}`}
                key={index+"show-card"} 
                onClick={() => showCard(index)}
                style={{
                  transition: card.rarity === "S+" ? "transform 1s ease" :
                  card.rarity === "A" ? "transform 1s ease" :
                  card.rarity === "S" ? "transform 1s ease" :
                  card.rarity === "B" ? "transform 1s ease" :
                  ""
                }} 
              >
                <div 
                  key={index+"img"} 
                  className={
                    card.rarity === "S+" ? "card-not-showed card-not-showed-s-plus" :
                    card.rarity === "S" ? "card-not-showed card-not-showed-a" :
                    card.rarity === "A" ? "card-not-showed card-not-showed-s" :
                    card.rarity === "B" ? "box card-not-showed card-not-showed-b" :
                    ""
                  }
                >
                  <div 
                    className={
                      card.rarity === "S+" ? "border border-s-plus" :
                      card.rarity === "S" ? "border border-a" :
                      card.rarity === "A" ? "border border-s" :
                      card.rarity === "B" ? "border border-b" :
                      ""
                  }>
                  </div>
                  <img src='../home/summon-w.png' alt="Logo Summon" className='logo-summon-card'></img>
                </div>
              </div> 
              
              <div className={`container-card-summon ${show[index] ? 'inactive-card' : 'active-card'}`} 
                style={{ border: card.rarity === "S+" ? "3px solid #ff3939" :
                  card.rarity === "S" ? "3px solid #c74cdf" :
                  card.rarity === "A" ? "3px solid #00a4ff" :
                  card.rarity === "B" ? "gray 3px solid" :
                  "",
                  transition: card.rarity === "S+" ? "transform 1s ease" :
                  card.rarity === "A" ? "transform 1s ease" :
                  card.rarity === "S" ? "transform 1s ease" :
                  card.rarity === "B" ? "transform 1s ease" :
                  ""
                }} 
          
                key={index+"card"}
              >
                <div 
                  className={
                    card.rarity === "S+" ? "border border-s-plus" :
                    card.rarity === "S" ? "border border-a" :
                    card.rarity === "A" ? "border border-s" :
                    card.rarity === "B" ? "border border-b" :
                    ""
                }>
                </div>
                <img 
                  key={index+"img"} 
                  src={card.base64_image} 
                  alt={`Imagen ${index + 1}`} 
                  className={"card-collection"}
                />
                <span 
                  style={{ background: card.rarity === "S+" ? "#FF3939" :
                  card.rarity === "S" ? "#c74cdf" :
                  card.rarity === "A" ? "#00a4ff" :
                  card.rarity === "B" ? "gray" :
                  "" }}
                  className={'rarity-card'}
                  key={index+"rarity-span"}
                >
                  {card.rarity}
                </span>

                <span 
                  style={{ background: card.rarity === "S+" ? "#FF3939" :
                  card.rarity === "S" ? "#c74cdf" :
                  card.rarity === "A" ? "#00a4ff" :
                  card.rarity === "B" ? "gray" :
                  "" }}
                  className={'power-card'}
                  key={index+"power-span"}
                >
                  {card.power} P
                </span>

                <div 
                  style={{ background: card.rarity === "S+" ? "#FF3939" :
                  card.rarity === "S" ? "#c74cdf" :
                  card.rarity === "A" ? "#00a4ff" :
                  card.rarity === "B" ? "gray" :
                  "" }}
                  className='container-name-card'
                >  
                  <span 
                    style={{ background: card.rarity === "S+" ? "#FF3939" :
                    card.rarity === "S" ? "#c74cdf" :
                    card.rarity === "A" ? "#00a4ff" :
                    card.rarity === "B" ? "gray" :
                    "" }}
                    key={index+"name-span"} 
                    className='name-card'
                    >
                      {card.name}
                  </span>
                  <span 
                    key={index+"anime-span"} 
                    className='anime-name-card'
                    >
                      {card.anime_name}
                  </span>
                </div>
              </div>
            </div>
          )) 
        :
          <div className='loading-container'>
            <l-trefoil size="400" stroke="33" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
          </div>
      }
      </div>
      </div>
    </div>
  );
}
