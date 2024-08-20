import { Resets } from '../ResetsComponent/Resets'
import './SiluetaGame.css'
import { useUserGames } from '../Games';
import { useState, useEffect } from 'react';

export const SiluetaGame = () => {

    return (
        <>
            <div className='header-imagegame'>
                <h1 className='title-imagegame'>
                    ¿De que anime es la imagen?
                </h1>
                <Resets game={"silueta"} /> 
            </div>
        </>
    )
}
