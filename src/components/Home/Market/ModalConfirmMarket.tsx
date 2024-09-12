import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useUserGachas } from '../Home';
import { buyCard, cancelCard, getDataMarket } from '../../../services/market';


export const ModalConfirmMarket = (props: any) => {
  const {i18n, t} = useTranslation();
  const { userGachas, setUserGachas } = useUserGachas();

  const handleClose = () => {
    props.setOpenConfirm(false);
  };

  const handleOpen = async () => {
    let userId = localStorage.getItem("_id")
    if(userId && props.idCard && props.price && props.userCardId && props.mode === true) {
        if(userGachas && userGachas - props.price >= 0) {
            let data = await buyCard(userId, props.idCard, props.price, props.userCardId);
            await getData();
            setUserGachas(data.gachas)
            props.setOpenConfirm(false)
        }
    } else {
        if(userId && props.mode === false) {
            if(userId && props.idCard && props.price) { 
                props.setOpenConfirm(false)
                await cancelCard(userId, props.idCard, props.price);
                await getData();
            }
        }
    }
  };


  const getData = async () => {
    try {
        const data = await getDataMarket();
        props.setDataMarket(data)
        props.setDataMarketSelected(data)
    } catch {
        props.setDataMarket([])
        props.setDataMarketSelected([])
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
    maxHeight: "fit-content",
    gap:"1rem"
  };

  return (
    props.idCard ?
    <Modal
      open={props.openConfirm}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {
            props.mode === true ? 
            <>
                <span className='jaro-regular' style={{fontSize:"1rem"}}>¿Estás seguro de comprar la carta por {props.price} GACHAS?</span>
                <div className='cnt-btns-modal-market'>
                    <button className='btn-modal-confirm jaro-regular' onClick={handleOpen}>
                        Confirm
                    </button>
                    <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                        {t('summon.cancel')}
                    </button>
                </div>
            </>
            :
            <>
                <span className='jaro-regular' style={{fontSize:"1rem"}}>¿Estás seguro de quitar la carta en venta?</span>
                <div className='cnt-btns-modal-market'>
                    <button className='btn-modal-confirm jaro-regular' onClick={handleOpen}>
                        Confirm
                    </button>
                    <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                        {t('summon.cancel')}
                    </button>
                </div>
            </>
        }
      </Box>
    </Modal>
    :
    <></>
  );
};
