import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useUserGachas } from '../Home';
import { buyCard, cancelCard, getDataMarket } from '../../../services/market';
import { calculatePower } from '../../../services/userCards';
import { updateTotalPower } from '../../../services/user';


export const ModalConfirmMarket = (props: any) => {
  const { i18n, t } = useTranslation();
  const { userGachas, setUserGachas } = useUserGachas();
  const [ haveGachas, setHaveGachas ] = useState<boolean>(false)

  const handleClose = () => {
    props.setOpenConfirm(false);
  };

  const handleOpen = async () => {
    let userId = localStorage.getItem("_id")
    if(userId && props.idCard && props.price && props.userCardId && props.mode === true) {
        if(userGachas && userGachas - props.price >= 0) {
          let data = await buyCard(userId, props.idCard, props.price, props.userCardId);
          await getData();
          let totalPower = await calculatePower(userId);
          if(totalPower){
            await updateTotalPower(userId, totalPower)
          }
          setUserGachas(data.gachas)
          props.setOpenConfirm(false)
        } else {
          setHaveGachas(true)
        }
    } else {
      if(userId && props.mode === false) {
        if(userId && props.idCard && props.price) { 
          props.setOpenConfirm(false)
          await cancelCard(userId, props.idCard, props.price);
          await getData();
          let totalPower = await calculatePower(userId);
          if(totalPower){
            await updateTotalPower(userId, totalPower)
          }
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
            props.mode === true && haveGachas === false ? 
            <>
                <span className='jaro-regular' style={{fontSize:"1rem"}}>{t('market.firstPartMes')} {props.price} {t('market.secondPartMes')}</span>
                <div className='cnt-btns-modal-market'>
                  <button className='btn-modal-confirm jaro-regular' onClick={handleOpen}>
                    {t('market.confirm')}
                  </button>
                  <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                    {t('summon.cancel')}
                  </button>
                </div>
            </>
            :
            props.mode === false && haveGachas === false ? 
            <>
                <span className='jaro-regular' style={{fontSize:"1rem"}}>{t('market.sellCardMes')}</span>
                <div className='cnt-btns-modal-market'>
                  <button className='btn-modal-confirm jaro-regular' onClick={handleOpen}>
                    {t('market.confirm')}
                  </button>
                  <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                    {t('summon.cancel')}
                  </button>
                </div>
            </>
            :
            haveGachas === true ? 
            <>
              <span className='jaro-regular' style={{fontSize:"1rem"}}>
                {t('market.exitMess')}
              </span>
              <div className='cnt-btns-modal-market'>
                <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                  {t('summon.exit')}
                </button>
              </div>
            </>
            :
            null
        }
      </Box>
    </Modal>
    :
    <></>
  );
};
