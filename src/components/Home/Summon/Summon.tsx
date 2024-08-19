import { useEffect, useState } from 'react';
import './Summon.css';
import { findGacha } from '../../../services/gacha';
import { ModalConfirm } from './Modals/ModalConfirm';
import { PaginationComponent } from '../Collection/PaginationComponent';

export const Summon = (props: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [throws, setThrows] = useState(0);
  const [gachas, setGachas] = useState(0);
  const [animeType, setAnimeType] = useState("");
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [modalConfirmType, setModalConfirmType] = useState<number>();

  const lastPostIndex = currentPage * page;
  const firstPostIndex = lastPostIndex - page;

  useEffect(() => {
    const idUser = localStorage.getItem("_id");
    if (idUser) {
      getGachasAndThrows(idUser);
    }
  }, []);

  const getGachasAndThrows = async (userid: string) => {
    const dataGacha = await findGacha(userid);
    if (dataGacha) {
      setGachas(dataGacha.gachas);
      setThrows(dataGacha.throws);
    }
  };

  const sections = [
    {
      type: "normal",
      title: 'INVOCACIÓN GENERAL',
      anime: "",
      backgroundImage: "url('../pp.png')",
      typeTitle: 'TIRADAS ESTÁNDAR',
      descriptions: [
        'Cada 10 tiradas tienes garantizada una carta de rareza A o superior.',
        'Las tiradas estándar no tienen límite.',
        'Cada 80 tiradas tienes una carta S+ asegurada!'
      ]
    },
    {
      type: "special",
      title: 'INVOCACIÓN ESPECIAL',
      anime: "One Piece",
      backgroundImage: "url('../bg-banner.jpg')",
      typeTitle: 'DESEO ESPECIAL',
      descriptions: [
        'Cada 10 deseos tienes garantizada una carta de rareza A o superior del anime especial del banner!',
        'Los deseos especiales tienen límite de 100 deseos.'
      ]
    }
  ];

  const currentSection = sections.slice(firstPostIndex, lastPostIndex);

  return (
    <div className="Summon">
      {currentSection.length > 0 ? (
        currentSection.map((section: any, index: any) => (
          <div className='section-summon' key={index} style={{ backgroundImage: section.backgroundImage }}>

            <span className='title-summon'>{section.title}</span>

            <div className='container-type-summon'>
              <span className='title-type'>{section.typeTitle}</span>
              <span className='description-type'>{section.descriptions[0]}</span>
              <span className='description-type'>{section.descriptions[1]}</span>
            </div>

            <div className='progress-container'>
              <div className='progress-values'>
                <progress className='progress' value={throws} max={80} />
                <span className='throws'>{throws} / 80</span>
              </div>
              <span className='info-throws'>Cada 80 tiradas te aseguras una carta S+</span>
            </div>

            <div className='container-gachas'>
              <div className='gacha-button-container' 
                   onClick={() => { setOpenModalConfirm(true); setModalConfirmType(0); setAnimeType(section.anime) }}>
                <img src='/home/summon-o.png' alt="Logo Summon" className='logo-summon-gacha' />
                <span>x10</span>
              </div>

              <div className='gacha-button-container' 
                   onClick={() => { setOpenModalConfirm(true); setModalConfirmType(1); setAnimeType(section.anime) }}>
                <img src='/home/summon-o.png' alt="Logo Summon" className='logo-summon-gacha' />
                <span>x100</span>
              </div>
            </div>

            <ModalConfirm 
              openModalConfirm={openModalConfirm} 
              setOpenModalConfirm={setOpenModalConfirm} 
              modalConfirmType={modalConfirmType} 
              animeType={animeType} 
              gachas={gachas} 
              throws={throws} 
            />
          </div>
        ))
      ) : (
        <h3>Cargando banner...</h3>
      )}
      {/* 
      <div className='container-pagination'>
        <PaginationComponent
          totalPosts={sections.length} 
          cardsPerPage={page}
          setCurrentPage={setCurrentPage} 
        />
      </div> 
      */}
    </div>
  );
};
