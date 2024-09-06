import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { findCardsSummoned } from '../../../../services/cards';
import { trefoil } from 'ldrs';
import './Summoning.css';
import { useTranslation } from 'react-i18next';

export const Summoning = () => {
  const {i18n, t} = useTranslation();
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
  const [videoRarity, setVideoRarity] = useState("");

  const handleClear = () => {
    navigate('/home/summon');
    setRarityCards([]);
    setVideoPlayed(false);
  };

  const handleSkip = () => {
    setCountCardsShowed(cardSummoned.length);
    
    const newArray = [];
    for (let i = 0; i < cardSummoned.length; i++) {
      newArray.push(true);
    }
    setShow(newArray);
  };

  const obtenerRarezas = async () => {
    let random = Math.random();
    let shots = 0;
    setRarityCards([]);

    if (prop3 === 1) {
      if ((throws + 1) === 80) {
        setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
        return;
      }

      if ((throws + 1) % 10 === 0) {
        if (random > 0.2) {
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
      return;
    }

    if ((throws + 10) >= 80) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
      shots += 1;
    }
    if (random > 0.2) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "A"]);
    } else if (random < 0.2 && random > 0.005) {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S"]);
    } else {
      setRarityCards((prevRarityCards) => [...prevRarityCards, "S+"]);
    }
    shots += 1;

    for (let i = 0; i < 10 - shots; i++) { 
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
    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      await obtenerRarezas();
    };
    fetchData();
  }, []);

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
            } else if (card.rarity === "S") {
              clr = "pink";
            } else if (card.rarity === "A" && clr === "gray") {
              clr = "blue";
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
    setCountCardsShowed(countCardsShowed + 1);
    setShow((prevShowCard) => {
      const updatedShowCard = [...prevShowCard];
      updatedShowCard[index] = !updatedShowCard[index];
      return updatedShowCard;
    });
  };

  useEffect(() => {
    if (!cardSummoned || cardSummoned.length <= 1) {
      setVideoPlayed(true);
    } else {
      setVideoPlayed(false);
    }
  }, [cardSummoned]);

  useEffect(() => {
    let rarity = "b";
    if (cardSummoned) {
      for (const card of cardSummoned) {
        if (card.rarity === "S+") {
          rarity = "ss";
          break;
        } else if (card.rarity === "S" && rarity !== "ss") {
          rarity = "s";
        } else if (card.rarity === "A" && rarity !== "ss" && rarity !== "s") {
          rarity = "a";
        }
      }
    }
    setVideoRarity(rarity);
  }, [cardSummoned]);

  const getBackgroundColor = (rarity: any) => {
    switch (rarity) {
      case "S+":
        return "s-plus";
      case "A":
        return "s";
      case "S":
        return "a";
      default:
        return "b";
    }
  };

  const getBorderColor = (rarity: any) => {
    switch (rarity) {
      case "S+":
        return "#FF3939";
      case "A":
        return "#00a4ff";
      case "S":
        return "#c74cdf";
      default:
        return "gray";
    }
  };

  return (
    <div className='Summoning'>
      <div className='container-summons'>
        <div className={`container-buttons-summon ${cardSummoned && cardSummoned.length > 1 ? 'justifyE' : 'justifyC'}`}>
          {cardSummoned && cardSummoned.length > 0 ? (
            cardSummoned.length === countCardsShowed ? (
              <span 
                className='btn-skip' 
                onClick={handleClear}>
                {t('summon.exit')}
              </span>
            ) : (
              <span 
                className='btn-skip' 
                onClick={handleSkip}>
                SKIP
              </span>
            )
          ) : null}
        </div>

        <div className={`container-cards-summon ${cardSummoned && cardSummoned.length > 1 ? 'justifyS' : 'justifyC'}`}>
          {cardSummoned && cardSummoned.length > 0 && videoRarity ? (
            <div className={`anima ${videoRarity + '-anima'}`}>
              <img 
                src='/home/summon-w.png' 
                alt="Logo Summon" 
                className='logo-anima' 
              />
            </div>
          ) : null}

          {cardSummoned && cardSummoned.length > 0 && videoRarity ? (
            cardSummoned.map((card: any, index: any) => {
              const backgroundColor = getBackgroundColor(card.rarity);
              const borderColor = getBorderColor(card.rarity);

              return (
                <div 
                  className={`back-front ${!show[index] ? 'inactive-back-front' : ''}`} 
                  key={index + '-back-front'}
                >
                  <div
                    className={`container-card-summon ${!show[index] ? 'inactive-card' : 'active-card'}`}
                    key={index + 'show-card'}
                    onClick={() => showCard(index)}
                    style={{ transition: 'transform 1s ease' }}
                  >
                    <div
                      key={index + 'img'}
                      className={`card-not-showed card-not-showed-${backgroundColor}`}
                    >
                      <div className={`border border-${backgroundColor}`}></div>
                      <img 
                        src='/home/summon-w.png' 
                        alt="Logo Summon" 
                        className='logo-summon-card'
                      />
                    </div>
                  </div>

                  <div
                    className={`background-border border-rarity-${getBackgroundColor(card.rarity)} container-card-summon ${show[index] ? 'inactive-card' : 'active-card'}`}
                    style={{ transition: 'transform 1s ease' }}
                    key={index + 'card'}
                  >
                    <div className={`border border-${backgroundColor}`}></div>
                    <img 
                      key={index + 'img'} 
                      src={card.base64_image} 
                      alt={`Imagen ${index + 1}`} 
                      className={'card-img'} 
                    />
                    <span
                      style={{ background: borderColor }}
                      className={'rarity-card'}
                      key={index + 'rarity-span'}
                    >
                      {card.rarity}
                    </span>
                    <span
                      style={{ background: borderColor }}
                      className={'power-card'}
                      key={index + 'power-span'}
                    >
                      {card.power} P
                    </span>
                    <div
                      style={{ background: borderColor }}
                      className='container-name-card'
                    >
                      <span
                        style={{ background: borderColor }}
                        key={index + 'name-span'}
                        className='name-card'
                      >
                        {card.name}
                      </span>
                      <span 
                        key={index + 'anime-span'} 
                        className='anime-name-card'
                      >
                        {card.anime_name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='loading-container'>
              <l-trefoil size="400" stroke="33" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
