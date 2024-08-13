import './Main.css'

export const Main = (props:any) => {
  return (
    <div className="Main">
      <div className='section-main'>
        <div style={{display:"flex", flexDirection:"row", gap:"2rem"}}>
          <div className='subsection-main'>NOTICIAS</div>
          <div className='subsection-main'>PARCHES</div>
        </div>
        <div className='subsection-main'>
          ENCUESTA
        </div>
      </div>
    </div>
  )
}
