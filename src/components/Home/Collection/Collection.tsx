import './Collection.css'
import {useEffect, useState, useRef} from 'react'
import CollectionSelect from './CollectionSelect'
import { PaginationComponent } from './PaginationComponent';
import { findUserCards } from '../../../services/userCards';
import { findCards } from '../../../services/cards';
import { trefoil } from 'ldrs';

export const Collection = (props:any) => {
  trefoil.register();

  const [imgs, setImgs] = useState<any>([]);
  const [imgsSelected, setImgsSelected] = useState<any>([]);
  const [userCards, setUserCards] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  const [copiesCard, setCopiesCard] = useState<{ [key: string]: number } >({});

  const lastPostIndex = currentPage * cardsPerPage;
  const firstPostIndex = lastPostIndex - cardsPerPage;
  const currentCards = imgsSelected.slice(firstPostIndex,lastPostIndex);

  const findAllCardsUser = async (id:any) => {
    try {
      const data = await findUserCards(id)
      if (data) {
        setUserCards(data.cards);
        localStorage.setItem("userData", JSON.stringify(data));
      }

    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  useEffect(()=> {
    const counts: { [key: string]: number } = {};
      userCards.forEach((card: any) => {
        const cardId = card;
        if (counts[cardId]) {
          counts[cardId] += 1;
        } else {
          counts[cardId] = 1;
        }
      });
    if(counts) {
      setCopiesCard(counts);
    }
  },[userCards])

  useEffect(()=> {
    const idUser = localStorage.getItem("_id");

    if (idUser) {
      findAllCardsUser(idUser);
    }

    const fetchData = async () => {
      try {
        const data = await findCards();

        const rarityOrder = ["S+", "S", "A", "B"];
        data.sort((a:any, b:any) => {
          const rarityComparison = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
          
          if (rarityComparison === 0) {
            return b.power - a.power ;
          }
          
          return rarityComparison;
        });

        setImgs(data)
        setImgsSelected(data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])
  
  const getBorderColor = (rarity: string): string => {
    switch (rarity) {
      case "A":
        return "4px solid #00a4ff";
      case "S":
        return "4px solid #c74cdf";
      case "S+":
        return "4px solid #ff3939";
      default:
        return "gray 4px solid";
    }
  };

  const userContainCard = (_id: string) => {
    if(userCards) {
      return userCards.some((card: any) => card === _id);
    }
  };

  const getBackgroundColor = (rarity:any) => {
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

  const getRarityClassName = (rarity:any) => {
    switch (rarity) {
      case "S+":
        return "-s-plus";
      case "A":
        return "-a";
      case "S":
        return "-s";
      default:
        return "-b";
    }
  };

  return (
    <div className="Collection">
      <div className='section-collection'>
        <CollectionSelect imgsSelected={imgsSelected} setImgsSelected={setImgsSelected} imgs={imgs} userCards={userCards} setCurrentPage={setCurrentPage}/>
        <div className="cards-container">
          <div className="cards">
            {currentCards.length > 0 ? (
              currentCards.map((img:any, index:any) => {
                const borderColor = getBorderColor(img.rarity);
                const rarityClass = getRarityClassName(img.rarity);
                const userCard = userContainCard(img._id);
                const backgroundColor = getBackgroundColor(img.rarity);
                const cardClassName = userCard
                  ? "card-user"
                  : "card-not-user";

                return (
                  <div key={index+"container-card"} className={userCard ? 'container-card-obtained container-card '+ cardClassName + ' border-collection'+rarityClass : 'container-card '+ cardClassName + ' border-collection'+rarityClass}>
                    <span className='not-adquired'>a</span>
                    <span className='copies' style={{ border: borderColor }}>x {copiesCard[img._id] ? copiesCard[img._id] : "0"}</span>
                    <img 
                      key={index} 
                      src={img.base64_image} 
                      alt={`Imagen ${index + 1}`} 
                      className={
                        userCard
                          ? "card-collection"
                          : "img-not card-collection"
                        }
                    />
                    <span 
                      style={{ background: backgroundColor }}
                      className={'rarity-card'}
                      key={index+"rarity-span"}
                    >
                      {img.rarity}
                    </span>

                    <span 
                      style={{ background: backgroundColor }}
                      className={'power-card'}
                      key={index+"power-span"}
                    >
                      {img.power} P
                    </span>

                    <div 
                      style={{ background: backgroundColor }}
                      className='container-name-card'
                    >  
                      <span 
                        style={{ background: backgroundColor }}
                        key={index+"name-span"} 
                        className='name-card'
                        >
                          {img.name}
                      </span>
                      <span 
                        key={index+"anime-span"} 
                        className='anime-name-card'
                        >
                          {img.anime_name}
                      </span>
                    </div>
                    
                  </div>
                  
                );
              })
            ) : (
              <div style={{margin:"13rem 0 0 0"}}>
                <l-trefoil size="200" stroke="33" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
              </div>
            )}     
          </div>
          {imgsSelected.length > 0 ? 
            <PaginationComponent 
              totalPosts={imgsSelected.length} 
              cardsPerPage={cardsPerPage}
              setCurrentPage={setCurrentPage}
            /> 
            : 
            <></>
          }

          
        </div>
      </div>
    </div>
  )
}
