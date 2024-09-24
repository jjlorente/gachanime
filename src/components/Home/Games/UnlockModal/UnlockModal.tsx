import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './UnlockModal.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IoAddCircleSharp } from "react-icons/io5";

export const UnlockModal = (props: any) => {
  const {i18n, t} = useTranslation();
  const [arrayCards, setArrayCards] = useState<Array<Array<string>>>([]);

  const reqMedium = [[
            "s-plus", "All"
        ],[
            "s", "All"
        ],[
            "s", "Dragon Ball"
        ],[
            "a", "Naruto"
        ],[
            "a", "Frieren: Beyond Journeys Ends"
        ],[
            "b", "One Piece"
        ],[
            "b", "Dragon Ball"
        ],[
            "b", "Naruto"
        ]
    ]
    const reqHard = [[
        "s-plus", "Dragon Ball"
    ],[
        "s-plus", "Naruto"
    ],[
        "s-plus", "All"
    ],[
        "s", "One Piece"
    ],[
        "s", "Frieren: Beyond Journeys Ends"
    ],[
        "s", "All"
    ],[
        "a", "Dragon Ball"
    ],[
        "a", "Naruto"
    ]
]
  const handleClose = () => {
    props.setOpenModal(false);
  };

  const handleOpen = async () => {
    let userId = localStorage.getItem("_id")
  };

  useEffect(() => {
    if(props.mode === 1) {
        setArrayCards(reqMedium)
    } else if (props.mode === 2) {
        setArrayCards(reqHard)
    }
  }, [props.mode])

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
    width:"85%",
    maxWidth: "900px",
    display: "block",
    p:3,
    maxHeight: "90vh",
    overflow: "auto",
    gap:"1rem"
  };

  return (
    props.unlock === false ?
    <Modal
      open={props.openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className='cnt-modal-unlock'>
            <div className='container-card-unlock'>

                {arrayCards && arrayCards.map((card, index) => (
                    <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap:".3rem"}}>
                        <div className={`container-card  border-collection-${card[0]} click-unlock click-unlock-${card[0]}`}>
                            <IoAddCircleSharp className='add-card-btn'/>
                        </div>
                        <div style={{display: "flex", justifyContent:"center", alignItems:"center", flexDirection:"column", width:"100%"}} className={`bg-unlock-${card[0]} jaro-regular`}>
                            <span style={{width:"100%", fontSize:"1.5rem"}}>
                                {card[0] === "s-plus" ? "S+" : card[0].toUpperCase()}
                            </span>
                            <span className='jaro-regular' style={{width:"100%", fontSize:"1rem"}}>
                                {card[1] === "All" ? "Cualquier anime" : card[1] === "Frieren: Beyond Journeys Ends" ? "Anime Frieren" : "Anime "+card[1]}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button className='btn-modal-cancel jaro-regular' onClick={handleClose}>
                {t('summon.exit')}
            </button>
        </div>
      </Box>
    </Modal>
    :
    <></>
  );
};
