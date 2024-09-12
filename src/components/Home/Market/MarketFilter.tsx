import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MarketFilter = (props:any) => {
  const [selectedAnime, setSelectedAnime] = useState('');
  const [selectedCol, setSelectedCol] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [nameCard, setNameCard] = useState('');
  const {i18n, t} = useTranslation();
  const [animeNames, setAnimeNames] = useState<string[]>([]);

  const filterImages = (anime:any, collection:any, rarity:any, imgs:any) => {
    let filteredImages = imgs;
    props.setCurrentPage(1);

    if (anime) {
      filteredImages = filteredImages.filter((card:any) => card['card'].anime_name === anime);
    }

    if(rarity) {
      filteredImages = filteredImages.filter((card:any) => card['card'].rarity === rarity);
    } 

    if (collection === 'Mis cartas') {
        let idUser = localStorage.getItem("_id");
        filteredImages = filteredImages.filter((card:any) => card['user']._id === idUser) ;
    } 

    if (nameCard) {

      filteredImages = filteredImages.filter((card:any) => {
        let name = card['card'].name.toLowerCase();
        return name.includes(nameCard.toLowerCase());
      });
    }
    
    return filteredImages;
  };

  const handleAnimeChange = (event:any) => {
    const { value } = event.target;
    setSelectedAnime(value);

    const filteredImages = filterImages(value, selectedCol, selectedRarity, props.dataMarket);
    props.setDataMarketSelected(filteredImages);
  };

  const handleCollectionChange = (event:any) => {
    const { value } = event.target;
    setSelectedCol(value);

    const filteredImages = filterImages(selectedAnime, value, selectedRarity, props.dataMarket);
    props.setDataMarketSelected(filteredImages);
  };

  const handleRarityChange = (event:any) => {
    const { value } = event.target;
    setSelectedRarity(value);

    const filteredImages = filterImages(value, selectedCol, selectedRarity, props.dataMarket);
    props.setDataMarketSelected(filteredImages);
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
    const filteredImages = filterImages(selectedAnime, selectedCol, selectedRarity, props.dataMarket);
    props.setDataMarketSelected(filteredImages);
  }, [nameCard]);

  useEffect(() => {
    const filteredImages = filterImages(selectedAnime, selectedCol, selectedRarity, props.dataMarket);

    if (props.dataMarket) {
      const newAnimeNamesSet = new Set(animeNames);
      props.dataMarket.forEach((card:any) => {
        newAnimeNamesSet.add(card['card'].anime_name);
      });
      setAnimeNames(Array.from(newAnimeNamesSet));
    }
    props.setDataMarketSelected(filteredImages);

  }, [selectedAnime, selectedCol, selectedRarity, props.dataMarket]);

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
          <option className='select-option' value="Mis cartas">{t('market.myCards')}</option>
        </select>
      </div>
      <div className='container-select'>
        <select className='select-anime' value={selectedRarity} onChange={handleRarityChange}>
          <option className='select-option' value="">{t('collection.allRares')}</option>
          <option className='select-option' value="S+">S+</option>
          <option className='select-option' value="S">S</option>
          <option className='select-option' value="A">A</option>
          <option className='select-option' value="B">B</option>
        </select>
      </div>
      <input className='search-input' type="text" placeholder={t('collection.nameOfCard')} onChange={handleChangeCardName} value={nameCard}></input>
      <button onClick={handleClickClearAll} className='button-clear' ><img src='/paper.png'/></button>
    </div>
  );
};

export default MarketFilter;
