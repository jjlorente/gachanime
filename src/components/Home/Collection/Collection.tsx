import './Collection.css'
import {useEffect, useState} from 'react'
import CollectionSelect from './CollectionSelect'

export const Collection = () => {
  const [imgs, setImgs] = useState<any>([]);
  const [imgsSelected, setImgsSelected] = useState<any>([]);
  const [userCards, setUserCards] = useState<any>([]);

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
        return "#00a4ff 3px solid";
      case "A":
        return "#c74cdf 3px solid";
      case "S+":
        return "#ff3939 3px solid";
      default:
        return "gray 3px solid";
    }
  };

  const userContainCard = (_id: string) => {
    return userCards.some((card: any) => card === _id);
  };

  return (
    <div className="Collection">
      <div className='section-collection'>
        <CollectionSelect imgsSelected={imgsSelected} setImgsSelected={setImgsSelected} imgs={imgs} userCards={userCards}/>
        <div className="cards">
          {imgsSelected.length > 0 ? (
            imgsSelected.map((img:any, index:any) => {
              const borderColor = getBorderColor(img.rarity);
              const userCard = userContainCard(img._id);
              
              const cardClassName = userCard
                ? "card-user"
                : "card-not-user";

              return (
                <div key={index+"container-card"} className={'container-card '+ cardClassName}>
                  <img 
                    key={index} 
                    src={img.base64_image} 
                    alt={`Imagen ${index + 1}`} 
                    style={{ border: borderColor }}
                    className={"card-collection "}
                  />
                  <span 
                    style={{
                      backgroundColor: 
                        img.rarity === "S+" ? "#ff3939" :
                        img.rarity === "S" ? "#00a4ff" :
                        img.rarity === "A" ? "#c74cdf" :
                        "gray"
                    }}
                    className={'rarity-card'}
                    key={index+"rarity-span"}
                  >
                    {img.rarity}
                  </span>

                  <span 
                    style={{
                      backgroundColor: 
                        img.rarity === "S+" ? "#ff3939" :
                        img.rarity === "S" ? "#00a4ff" :
                        img.rarity === "A" ? "#c74cdf" :
                        "gray"
                    }}
                    key={index+"name-span"} 
                    className='name-card'
                    >
                      {img.name}
                  </span>
                </div>
              );
            })
          ) : (
            <p>No hay cartas...</p>
          )}
        </div>
      </div>
    </div>
  )
}
