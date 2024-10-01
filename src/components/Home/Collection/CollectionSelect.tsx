import { useState, useEffect } from 'react';
import './CollectionSelect.css'
import { useTranslation } from 'react-i18next';

const CardFilter = (props:any) => {
  const [selectedAnime, setSelectedAnime] = useState('');
  const [selectedCol, setSelectedCol] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [nameCard, setNameCard] = useState('');
  const { t } = useTranslation();
  const [animeNames, setAnimeNames] = useState<string[]>([]);

  const filterImages = (anime:any, collection:any, rarity:any, imgs:any) => {
    let filteredImages = imgs;
    props.setCurrentPage(1);

    if (anime) {
      filteredImages = filteredImages.filter((img:any) => img.anime_name === anime);
    }

    if(rarity) {
      filteredImages = filteredImages.filter((img:any) => img.rarity === rarity);
    } 

    if (collection === 'Cartas obtenidas') {
      filteredImages = filteredImages.filter((img:any) => props.userCards?.includes(img._id)) ;
    } else if (collection === 'Cartas no obtenidas') {
      filteredImages = filteredImages.filter((img:any) => !props.userCards?.includes(img._id));
    }

    if (nameCard) {
      filteredImages = filteredImages.filter((img:any) => {
        let name = img.name.toLowerCase();
        return name.includes(nameCard.toLowerCase());
      });
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

  const handleChangeCardName = (event:any) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z0-9]/g, '');
    setNameCard(filteredValue);
  };

  const handleClickClearAll = () => {
    setSelectedAnime("")
    setSelectedCol("")
    setSelectedRarity("")
    setNameCard("")
  };

  useEffect(() => {
    const filteredImages = filterImages(selectedAnime, selectedCol, selectedRarity, props.imgs);
    props.setImgsSelected(filteredImages);
  }, [nameCard]);

  useEffect(() => {
    const filteredImages = filterImages(selectedAnime, selectedCol, selectedRarity, props.imgs);

    if (props.imgs) {
      const newAnimeNamesSet = new Set(animeNames);
      props.imgs.forEach((img:any) => {
        newAnimeNamesSet.add(img.anime_name);
      });
      setAnimeNames(Array.from(newAnimeNamesSet));
    }
    props.setImgsSelected(filteredImages);

  }, [selectedAnime, selectedCol, selectedRarity, props.imgs]);

  return (
    <div className="filter">
      <div className='container-select'>
        <div>
          <select className='select-anime' value={selectedAnime} onChange={handleAnimeChange}>
            <option className='select-option' value="">{t('collection.allAnimes')}</option>
            {animeNames.map((anime) => (
              <option className='select-option' key={anime} value={anime}>{anime}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='container-select'>
        <select className='select-anime' value={selectedCol} onChange={handleCollectionChange}>
          <option className='select-option' value="Todas las cartas">{t('collection.allCards')}</option>
          <option className='select-option' value="Cartas obtenidas">{t('collection.obtainedCards')}</option>
          <option className='select-option' value="Cartas no obtenidas">{t('collection.notObtained')}</option>
        </select>
      </div>
      <div className='container-select'>
        <select className='select-anime' value={selectedRarity} onChange={handleRarityChange}>
          <option className='select-option' value="">{t('collection.allRares')}</option>
          <option className='select-option' value="SS">SS</option>
          <option className='select-option' value="S+">S+</option>
          <option className='select-option' value="S">S</option>
          <option className='select-option' value="A">A</option>
          <option className='select-option' value="B">B</option>
        </select>
      </div>
      <input className='search-input' type="text" placeholder={t('collection.nameOfCard')} onChange={handleChangeCardName} value={nameCard}></input>
      <button className='button-clear' onClick={handleClickClearAll}><img src='/paper.png' alt='Image for delete filter'/></button>
    </div>
  );
};

export default CardFilter;
