import './ImageGame.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ImageGame = () => {
    library.add(faRotateRight);
    return (
        <div className='container-imagegame'>
            <div className='header-imagegame'>
                <h1 className='title-imagegame'>
                    ¿De que anime es la imagen?
                </h1>
                <span className='gachas-resets'>
                    3 / 3
                    <FontAwesomeIcon icon={faRotateRight} className="refresh" />  
                </span>     
            </div>

            <div className='container-image-center'>
                <div className='section-image-center image-center-game' >               
                    <img className='img-game' width={"400%"} height={"auto"} src="../../../../public/home/sky.jpg" alt="" />
                </div>
                <div className='container-tries-image'>
                    <span className='gachas-recompensa-inactive'>
                        Reclamar recompensa: 500 <img src='../../home/summon-o.png' alt="Logo Summon" className='logo-summon'></img>
                    </span>                      
                </div>
            </div>

            <div className='container-imagegame-input'>
                <span style={{fontSize:"1.2rem"}}>Cada intento fallido aleja un poco la imágen y pierdes 10 gachas de la recompensa final.</span>
                <input type="text" className='input-imagegame jaro-regular' maxLength={50} placeholder='Nombre del anime...'/>
            </div>

            <div className='errors-imagegame'>
                <span className='error-span-image' style={{fontSize:"1.3rem"}}>Frieren</span>
            </div>

        </div>
    )
}
