import { useState, useEffect } from 'react';

const CardFilter = (props:any) => {
  const [selectedAnime, setSelectedAnime] = useState('');
  const [selectedCol, setSelectedCol] = useState('');
  const [animeNames, setAnimeNames] = useState(['Frieren: Beyond Journeys End', 'One Piece']);

  const filterImages = (anime:any, collection:any, imgs:any) => {
    let filteredImages = imgs;

    if (anime) {
      filteredImages = filteredImages.filter((img:any) => img.anime_name === anime);
    }

    if (collection === 'Cartas obtenidas') {
      filteredImages = filteredImages.filter((img:any) => props.userCards.includes(img._id));
    } else if (collection === 'Cartas no obtenidas') {
      filteredImages = filteredImages.filter((img:any) => !props.userCards.includes(img._id));
    }

    return filteredImages;
  };

  const handleAnimeChange = (event:any) => {
    const { value } = event.target;
    setSelectedAnime(value);

    const filteredImages = filterImages(value, selectedCol, props.imgs);
    props.setImgsSelected(filteredImages);
  };

  const handleCollectionChange = (event:any) => {
    const { value } = event.target;
    setSelectedCol(value);

    const filteredImages = filterImages(selectedAnime, value, props.imgs);
    props.setImgsSelected(filteredImages);
  };

  useEffect(() => {
    const filteredImages = filterImages(selectedAnime, selectedCol, props.imgs);
    props.setImgsSelected(filteredImages);
  }, [selectedAnime, selectedCol, props.imgs]);

  return (
    <div className="filter">
      <div className='container-select'>
        <span>Anime:</span>
        <div>
          <select value={selectedAnime} onChange={handleAnimeChange}>
            <option value="">Todos los animes</option>
            {animeNames.map((anime) => (
              <option key={anime} value={anime}>{anime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container-select'>
        <span>Colección:</span>
        <select value={selectedCol} onChange={handleCollectionChange}>
          <option value="Todas las cartas">Todas las cartas</option>
          <option value="Cartas obtenidas">Cartas obtenidas</option>
          <option value="Cartas no obtenidas">Cartas no obtenidas</option>
        </select>
      </div>
    </div>
  );
};

export default CardFilter;
