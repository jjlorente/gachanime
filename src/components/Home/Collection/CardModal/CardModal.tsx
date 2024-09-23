import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './CardModal.css';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import { CardConfirmModal } from './CardConfirmModal';

export const CardModal = (props: any) => {
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [price, setPrice] = useState<number>();

  const {i18n, t} = useTranslation();

  const handleClose = () => {
    setPrice(0)
    props.setOpenModal(false);
  };

  const handleOpen = () => {
    if(price && price > 0) {
      setOpenConfirm(true);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*$/;
  
    if (regex.test(value)) {
      const priceCard = Number(value);
      setPrice(priceCard);
    }
  };
  
  

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#224080',
    color: "white",
    border: '2px solid orange',
    borderRadius: "5px",
    fontSize: "2rem",
    boxShadow: 24,
    textAlign: "center",
    width: "fit-content",
    p:3,
    maxHeight: "fit-content"
  };

  return (
    props.card ?
    <>
      <Modal
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "start", gap:"1rem" }}>

            <div className='container-info-card'>
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
                <img 
                  src={props.card.base64_image} 
                  alt={`Imagen ${props.card.name}`} 
                  className={"card-modal " + "border-collection"+props.card.rarity}
                />
                <span className={'jaro-regular name-sell-span ' +'span-card-name '+ "bg-card"+props.card.rarity} style={{ fontSize: "1.8rem", width:"100%" }}>
                  {props.card.name}
                </span>
              </div>
              <div style={{display:"flex", flexDirection:"column",gap:".5rem"}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                  <span className={'jaro-regular ' +'span-card-name'} style={{ fontSize: "1rem", textAlign:"start" }}>
                    {t('collection.sellCardMsg')}
                  </span>
                  <input onChange={handleChange} maxLength={6} value={price && price > 0 ? price : ""} placeholder='Precio en GACHAS...' className={'jaro-regular input-btn-market'} type="text" style={{ fontSize: "1rem" }}/>
                </div>
                <div className='cnt-btns-modal-market'>
                  <button className={price && price > 0 ? 'btn-modal-confirm jaro-regular' : 'btn-modal-confirm jaro-regular inactive-btn-market'} onClick={handleOpen}>
                    {t('collection.confirmSellMsg')}
                  </button>
                  <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                    {t('summon.cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <CardConfirmModal openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} setOpenModal={props.setOpenModal} cardId={props.card._id} price={price} setPrice={setPrice} setImgsSelected={props.setImgsSelected} setImgs={props.setImgs} setUserCards={props.setUserCards}/>
    </>
    :
    <></>
  );
};
