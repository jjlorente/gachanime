import { useEffect, useState } from 'react';
import { PaginationComponent } from '../Collection/PaginationComponent';
import './Summon.css';

export const Summon = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);

  const lastPostIndex = currentPage * page;
  const firstPostIndex = lastPostIndex - page;
  
  const sections = [
    {
      type:"normal",
      title: 'INVOCACIÓN GENERAL',
      backgroundImage:"url('../pp.png')",
      typeTitle: 'DESEO ESTÁNDAR',
      descriptions: [
        'Cada 10 deseos tienes garantizada una carta de rareza A o superior.',
        'Los deseos estándar no tienen límite.'
      ]
    },
    {
      type:"special",
      title: 'INVOCACIÓN ESPECIAL',
      backgroundImage:"url('../bg-banner.jpg')",
      typeTitle: 'DESEO ESPECIAL',
      descriptions: [
        'Cada 10 deseos tienes garantizada una carta de rareza A o superior del anime especial del banner!',
        'Los deseos especiales tienen límite de 100 deseos.'
      ]
    }
  ];

  const currentSection = sections.slice(firstPostIndex,lastPostIndex);

  return (
    <div className="Summon">
      {currentSection.length > 0 ? (
        currentSection.map((section:any, index:any) => {
          return (
            <div className='section-summon' style={{ backgroundImage: section.backgroundImage}}>

              <span className='title-summon'>{section.title}</span>

              <div className='container-type-summon'>
                <span className='title-type'>{section.typeTitle}</span>
                <span className='description-type'>{section.descriptions[0]}</span>
                <span className='description-type'>{section.descriptions[1]}</span>
              </div>

              <div className='container-gachas'>
                <div className='gacha-button-container'>
                  <div className='t'>
                    <img src='../home/summon-o.png' alt="Logo Summon" className='logo-summon-gacha' />
                    <span>x</span>
                    <span>10</span>
                  </div>
                </div>
                <div className='gacha-button-container'>
                  <div className='t'>
                    <img src='../home/summon-o.png' alt="Logo Summon" className='logo-summon-gacha' />
                    <span>x</span>
                    <span>100</span>
                  </div>
                </div>
              </div>

            </div>
          );
        })
      ) : (
        <p>No hay banners...</p>
      )} 
      {/* <div className='container-pagination'>
        <PaginationComponent
          totalPosts={sections.length} 
          cardsPerPage={page}
          setCurrentPage={setCurrentPage} 
        />
      </div> */}
    </div>
  );
};
