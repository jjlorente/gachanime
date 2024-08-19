import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const ModalConfirm = (props: any) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleClose = () => {
    props.setOpenModalConfirm(false);
    setMessage("");
  };

  const handleConfirm = (numberCards: any) => {
    if (numberCards === 1 && props.gachas < 10) {
      setMessage("Necesitas x10 gachas para poder tirar!");
    } else if (numberCards === 10 && props.gachas < 100) {
      setMessage("Necesitas x100 gachas para poder tirar!");
    } else {
      props.setOpenModalConfirm(false);
      navigate('/summoning', { 
        state: { 
          prop1: props.modalConfirmType,
          prop2: props.animeType,
          prop3: numberCards,
          throws: props.throws,
          gachas: props.gachas 
        } 
      });
    }
  };

  useEffect(() => {
    setMessage("");
  }, [props.openModalConfirm]);

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
    width: "fit-content",
    p: 3,
    textAlign: "center"
  };

  return (
    props.modalConfirmType === 0
      ? (
        <Modal
          open={props.openModalConfirm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='modal-confirm'>
              {message !== ""
                ? (
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <span className='jaro-regular' style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{message}</span>
                    <button className='btn-modal-confirm jaro-regular' onClick={() => { props.setOpenModalConfirm(false) }}>De acuerdo</button>
                  </div>
                )
                : (
                  <>
                    <Typography className='jaro-regular' style={{ fontSize: "1.5rem" }} id="modal-modal-title" variant="h6" component="h2">
                      ¿Estás seguro en gastar x10 gachas?
                    </Typography>
                    <Typography className='jaro-regular' style={{ marginTop: "1rem" }} id="modal-modal-description" sx={{ mt: 2 }}>
                      Al gastar 10 gachas recibirás una carta de cualquier rareza.
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center", width: "100%", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap-reverse", height: "fit-content" }}>
                      <button className='btn-modal-cancel jaro-regular' onClick={() => { props.setOpenModalConfirm(false) }}>Cancelar</button>
                      <button className='btn-modal-confirm jaro-regular' onClick={() => handleConfirm(1)}>Confirmar</button>
                    </div>
                  </>
                )}
            </div>
          </Box>
        </Modal>
      )
      : (
        <Modal
          open={props.openModalConfirm}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {message
              ? (
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <span className='jaro-regular' style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{message}</span>
                  <button className='btn-modal-confirm jaro-regular' onClick={() => { props.setOpenModalConfirm(false) }}>De acuerdo</button>
                </div>
              )
              : (
                <>
                  <Typography className='jaro-regular' style={{ fontSize: "1.5rem" }} id="modal-modal-title" variant="h6" component="h2">
                    ¿Estás seguro en gastar x100 gachas?
                  </Typography>
                  <Typography className='jaro-regular' style={{ marginTop: "1rem" }} id="modal-modal-description" sx={{ mt: 2 }}>
                    Al gastar 100 gachas recibirás 10 cartas y una carta de rareza A o superior.
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", width: "100%", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap-reverse", height: "fit-content" }}>
                    <button className='btn-modal-cancel jaro-regular' onClick={() => { props.setOpenModalConfirm(false) }}>Cancelar</button>
                    <button className='btn-modal-confirm jaro-regular' onClick={() => handleConfirm(10)}>Confirmar</button>
                  </div>
                </>
              )}
          </Box>
        </Modal>
      )
  );
};
