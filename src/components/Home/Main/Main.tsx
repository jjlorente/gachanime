import './Main.css'
import { ModalMain } from './ModalMain/ModalMain'
import { useEffect, useState } from 'react';

export const Main = (props: any) => {
  const [md,setMd] = useState<boolean>(false);

  return (
    <div className="Main">
      <div className='section-main'>
        <h1>¡Bienvenido a <span style={{color:"#FEAA2A"}}>GACHANIME</span>!</h1>
        <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
          <div className='subsection-main' onClick={() => {setMd(true)}}>¡Bienvenido a GACHANIME!</div>
          <div className='subsection-main'>PARCHES</div>
        </div>
        <div className='subsection-main'>
          ENCUESTA
        </div>
        <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
          <div className='subsection-main'>ROAD MAP</div>
          <div className='subsection-main'>CONTÁCTANOS</div>
        </div>
        <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
          <div className='subsection-main'>MISIONES</div>
          <div className='subsection-main'>JUEGOS</div>
        </div>
      </div>
      
      <ModalMain md={md} setMd={setMd}/>
    </div>
  )
}
