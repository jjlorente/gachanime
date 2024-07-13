import { useState, useEffect } from 'react';
import './CollectionSelect.css'

const CardFilter = (props:any) => {
  const [selectedAnime, setSelectedAnime] = useState('');
  const [selectedCol, setSelectedCol] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [animeNames, setAnimeNames] = useState(['Frieren: Beyond Journeys End', 'One Piece']);

  const filterImages = (anime:any, collection:any, rarity:any, imgs:any) => {
    let filteredImages = imgs;

    if (anime) {
      filteredImages = filteredImages.filter((img:any) => img.anime_name === anime);
    }
    console.log(rarity)
    if(rarity) {
      filteredImages = filteredImages.filter((img:any) => img.rarity === rarity);
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

    const filteredImages = filterImages(value, selectedCol, selectedRarity, props.imgs);
    props.setImgsSelected(filteredImages);
  };

  const handleCollectionChange = (event:any) => {
    const { value } = event.target;
    setSelectedCol(value);

    const filteredImages = filterImages(selectedAnime, value, selectedRarity, props.imgs);
    props.setImgsSelected(filteredImages);
  };

  const handleRarityChange = (event:any) => {
    const { value } = event.target;
    setSelectedRarity(value);

    const filteredImages = filterImages(value, selectedCol, selectedRarity, props.imgs);
    props.setImgsSelected(filteredImages);
  };

  const clearAllValues = () => {
    setSelectedAnime('');
    setSelectedCol('');
    setSelectedRarity('');
  };

  useEffect(() => {
    const filteredImages = filterImages(selectedAnime, selectedCol, selectedRarity, props.imgs);
    props.setImgsSelected(filteredImages);
  }, [selectedAnime, selectedCol, selectedRarity, props.imgs]);

  return (
    <div className="filter">
      <div className='container-select'>
        <span className='title-select-anime'>Anime:</span>
        <div>
          <select className='select-anime' value={selectedAnime} onChange={handleAnimeChange}>
            <option className='select-option' value="">Todos los animes</option>
            {animeNames.map((anime) => (
              <option className='select-option' key={anime} value={anime}>{anime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container-select'>
        <span className='title-select-anime'>Colección:</span>
        <select className='select-anime' value={selectedCol} onChange={handleCollectionChange}>
          <option className='select-option' value="Todas las cartas">Todas las cartas</option>
          <option className='select-option' value="Cartas obtenidas">Cartas obtenidas</option>
          <option className='select-option' value="Cartas no obtenidas">Cartas no obtenidas</option>
        </select>
      </div>
      <div className='container-select'>
        <span className='title-select-anime'>Rareza:</span>
        <select className='select-anime' value={selectedRarity} onChange={handleRarityChange}>
          <option className='select-option' value="">Todas las rarezas</option>
          <option className='select-option' value="S+">S+</option>
          <option className='select-option' value="S">S</option>
          <option className='select-option' value="A">A</option>
          <option className='select-option' value="B">B</option>
        </select>
      </div>
      <button className='clear-filter' onClick={clearAllValues}>Limpiar filtro</button>
    </div>
  );
};

export default CardFilter;
