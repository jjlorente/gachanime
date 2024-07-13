import './Collection.css'
import {useEffect, useState} from 'react'
import CollectionSelect from './CollectionSelect'
import { PaginationComponent } from './PaginationComponent';

export const Collection = () => {
  const [imgs, setImgs] = useState<any>([]);
  const [imgsSelected, setImgsSelected] = useState<any>([]);
  const [userCards, setUserCards] = useState<any>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  const lastPostIndex = currentPage * cardsPerPage;
  const firstPostIndex = lastPostIndex - cardsPerPage;
  const currentCards = imgsSelected.slice(firstPostIndex,lastPostIndex);

  const findCards = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cards/findAll`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Unknown error');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      fetch(`http://localhost:3000/api/userCards/findById?id=${idUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setUserCards(data.cards)
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, []);

  useEffect(()=> {
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
      case "S":
        return "3px solid #00a4ff";
      case "A":
        return "3px solid #c74cdf";
      case "S+":
        return "3px solid #ff3939";
      default:
        return "gray 3px solid";
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
        return "#ff3939";
      case "S":
        return "#00a4ff";
      case "A":
        return "#c74cdf";
      default:
        return "gray";
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
                const userCard = userContainCard(img._id);
                const backgroundColor = getBackgroundColor(img.rarity);
                const cardClassName = userCard
                  ? "card-user"
                  : "card-not-user";

                return (
                  <div key={index+"container-card"} style={{ border: borderColor }} className={'container-card '+ cardClassName}>
                    <img 
                      key={index} 
                      src={img.base64_image} 
                      alt={`Imagen ${index + 1}`} 
                      className={"card-collection "}
                    />
                    <span 
                      style={{ backgroundColor }}
                      className={'rarity-card'}
                      key={index+"rarity-span"}
                    >
                      {img.rarity}
                    </span>

                    <span 
                      style={{ backgroundColor }}
                      className={'power-card'}
                      key={index+"power-span"}
                    >
                      {img.power} P
                    </span>

                    <div 
                      style={{ backgroundColor }}
                      className='container-name-card'
                    >  
                      <span 
                        style={{ backgroundColor }}
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
              <p>No hay cartas...</p>
            )}     
          </div>
          <PaginationComponent 
            totalPosts={imgsSelected.length} 
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
          />
          
        </div>
      </div>
    </div>
  )
}
