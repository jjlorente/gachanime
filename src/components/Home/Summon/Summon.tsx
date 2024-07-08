import React,{useEffect, useState} from 'react'
import './Summon.css'

export const Summon = () => {
  const [imgs, setImgs] = useState<any>([]);

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

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const data = await findCards();
        setImgs(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[])

  return (
    <div className="Summon">
      <div className='section'>
        {imgs.length > 0 ? (
          imgs.map((img: any, index: any) => (
            <img className='card' key={index} src={img.base64_image} alt={`Imagen ${index + 1}`} />
          ))
        ) : (
          <p>Cargando imágenes...</p>
        )}
      </div>
    </div>
  )
}
