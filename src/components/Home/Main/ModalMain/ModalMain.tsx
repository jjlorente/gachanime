import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

export const ModalMain = (props: any) => {
  const [message, setMessage] = useState("");

  const handleClose = () => {
    props.setMd(false);
    setMessage("");
  };

  useEffect(() => {
    setMessage("");
  }, [props.md]);

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
    props.md === true
      ? (
        <Modal
          open={props.md}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className='modal-confirm'>
              <span>aaaaaaaaaaaaaa</span>
            </div>
          </Box>
        </Modal>
      )
      :
      null
  );
};
