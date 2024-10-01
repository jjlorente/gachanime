import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './CardModal.css';
import { useTranslation } from 'react-i18next';
import { addCard } from '../../../../services/market';
import { calculatePower, findUserCards } from '../../../../services/userCards';
import { updateTotalPower } from '../../../../services/user';

export const CardConfirmModal = (props: any) => {
  const { t } = useTranslation();

  const handleClose = () => {
    props.setOpenConfirm(false);
  };

  const handleOpen = async () => {
    let userId = localStorage.getItem("_id")
    if(userId && props.cardId && props.price) {
        await addCard(userId, props.cardId, props.price)
        let totalPower = await calculatePower(userId);
        if(totalPower){
          await updateTotalPower(userId, totalPower)
        }
        props.setOpenConfirm(false);
        props.setOpenModal(false);
        props.setPrice(0);
        findAllCardsUser(userId);
    }
  };

  const findAllCardsUser = async (id:any) => {
    try {
      const data = await findUserCards(id)
      if (data) {
        props.setUserCards(data.cards);
        localStorage.setItem("userData", JSON.stringify(data));
      }

    } catch (error: any) {
      console.error('Error:', error);
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
    gap:"1rem",
    maxHeight: "90vh",
    overflow: "auto",
  };

  return (
    props.cardId ?
    <Modal
      open={props.openConfirm}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <span className='jaro-regular' style={{fontSize:"1rem"}}>{t('market.confirmSellCard')} {props.price} GACHAS?</span>
        <div className='cnt-btns-modal-market'>
          <button className='btn-modal-confirm jaro-regular' onClick={handleOpen}>
            {t('summon.confirm2')}
          </button>
          <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
            {t('summon.cancel')}
          </button>
        </div>
      </Box>
    </Modal>
    :
    <></>
  );
};
