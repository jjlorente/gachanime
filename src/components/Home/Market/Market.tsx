import { useEffect, useState } from 'react';
import './Market.css';
import { getDataMarket } from '../../../services/market';
import { PaginationComponent } from '../Collection/PaginationComponent';
import { ModalConfirmMarket } from './ModalConfirmMarket';
import MarketFilter from './MarketFilter';
import { useTranslation } from 'react-i18next';
import { trefoil } from 'ldrs';

export const Market = () => {
  trefoil.register();
  const { t } = useTranslation()

  const [dataMarket, setDataMarket] = useState<any>([]);
  const [dataMarketSelected, setDataMarketSelected] = useState<any>([]);

  const [userId, setUserId] = useState<string>("") 
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(10);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(false);

  const [idCard, setIdCard] = useState<string>("")
  const [userCardId, setUserCardId] = useState<string>("")
  const [price, setPrice] = useState<number>(0)

  const lastPostIndex = currentPage * cardsPerPage;
  const firstPostIndex = lastPostIndex - cardsPerPage;
  const currentCards = dataMarketSelected.slice(firstPostIndex, lastPostIndex);

  const getData = async () => {
    let id = localStorage.getItem("_id")
    if(id) {
      setUserId(id)
    }
    try {
      const data = await getDataMarket();
      setDataMarket(data)
      setDataMarketSelected(data)
    } catch {
      setDataMarketSelected([])
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getBackgroundColor = (rarity: any) => {
    switch (rarity) {
      case 'S+':
        return '#FF3939';
      case 'A':
        return '#00a4ff';
      case 'S':
        return '#c74cdf';
      default:
        return 'gray';
    }
  };

  const getRarityClassName = (rarity: any) => {
    switch (rarity) {
      case 'S+':
        return '-s-plus';
      case 'A':
        return '-a';
      case 'S':
        return '-s';
      default:
        return '-b';
    }
  };

  return (
    <div className='Market'>

      <MarketFilter setDataMarketSelected={setDataMarketSelected} setDataMarket={setDataMarket} dataMarket={dataMarket} setCurrentPage={setCurrentPage}/>

      <div className='section-market cards-container'>
        <div className='cnt-market-cards'>
          {dataMarketSelected && dataMarketSelected.length > 0 ? (
            currentCards.map((card: any, index: number) => {
              const rarityClass = getRarityClassName(card['card'].rarity);
              const backgroundColor = getBackgroundColor(card['card'].rarity);

              return (
                <div key={`card-${index}`}>
                  <div
                    className={'container-card-obtained container-card card-market' + ' border-collection' + rarityClass}
                  >
                    <img
                      src={card['card'].base64_image}
                      alt={`Imagen ${index + 1}`}
                      className={'card-collection'}
                    />
                    <span
                      style={{ background: backgroundColor }}
                      className={'rarity-card'}
                    >
                      {card['card'].rarity}
                    </span>

                    <span
                      style={{ background: backgroundColor }}
                      className={'power-card'}
                    >
                      {card['card'].power} P
                    </span>

                    <div style={{ background: backgroundColor }} className='container-name-card'>
                      <span
                        style={{ background: backgroundColor }}
                        className='name-card'
                      >
                        {card['card'].name}
                      </span>
                      <span className='anime-name-card'>
                        {card['card'].anime_name}
                      </span>
                    </div>
                  </div>
                  <div className='cnt-info-price'>
                    <span className='span-username-market'>{t('market.owner')} {card['user'].username}</span>
                    <span className='span-price-market'>
                      {card['price']}           
                      <img
                        src='/home/summon-o.png'
                        alt="Logo Summon"
                        className='logo-summon'
                      />
                    </span>
                    {
                      userId === card['user']._id ? 
                      <button key={`cancel-btn-${index}`} className="cancel-btn-market jaro-regular" onClick={() => {setOpenModal(true); setIdCard(card['card']._id); setPrice(card['price']); setMode(false)}}>{t('summon.cancel')}</button>
                      :
                      <button key={`buy-btn-${index}`} className="confirm-btn-market jaro-regular" onClick={() => {setOpenModal(true); setIdCard(card['card']._id); setPrice(card['price']); setUserCardId(card['user']._id); setMode(true)}}>{t('market.buyButton')}</button>
                    }
                  </div>
                </div>
              );
            })
          ) : (
            dataMarket && dataMarket.length > 0 ? 
              <span style={{fontSize:"2rem"}}>{t('market.notAvailable')}</span>
            :
              <div >
                <l-trefoil size="200" stroke="33" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
              </div>
          )}
        </div>
        {dataMarketSelected.length > 0 ? 
          <PaginationComponent 
            totalPosts={dataMarketSelected.length} 
            cardsPerPage={cardsPerPage}
            setCurrentPage={setCurrentPage}
          /> 
          : 
          <></>
        }
      </div>
      <ModalConfirmMarket setDataMarketSelected={setDataMarketSelected} mode={mode} setDataMarket={setDataMarket} openConfirm={openModal} setOpenConfirm={setOpenModal} idCard={idCard} price={price} userCardId={userCardId}/>
    </div>
  );
};
