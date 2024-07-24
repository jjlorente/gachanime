import './ImageGame.css'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { findUserGames, findGameImageById, registerNewGameUser } from '../../../../services/userGames';
import { GameData, Game } from '../../../Interfaces/GamesUser';
import { trefoil } from 'ldrs';
import { useUserGachas } from "../../Home";

export const ImageGame = () => {
    const { userGachas, setUserGachas } = useUserGachas();
    
    useEffect(()=> {
        console.log(userGachas)
    },[])

    const animeArray = ["Frieren: Beyond Journeys End", "One Piece", "Kaiju No. 8", "Demon Slayer: Kimetsu No Yaiba", "My Hero Academia"]

    library.add(faRotateRight);
    trefoil.register();

    const [userGamesData, setUserGamesData] = useState<GameData>()
    const [gameImageData, setGameImageData] = useState<Game>()
    const [imgSelected, setImgSelected] = useState<number>()
    const [animeNameImage, setAnimeNameImage] = useState<string>()
    const [imageTries, setImageTries] = useState<number>(0)
    const [resets, setResets] = useState<number>(5)
    const [animesSuggested, setAnimesSuggested] = useState<Array<string>>([])
    const [valueInput, setValueInput] = useState<string>("")

    const findAllGamesUser = async (id:any) => {
        try {
            const data = await findUserGames(id)
            console.log(data)
            if (data) {
                setUserGamesData(data);
                setImageTries(data.triesimage);
                setResets(data.resets);
            } else {
                localStorage.setItem("imgSelected", "")
                try {
                    const data = await registerNewGameUser(id)
                    if(data) {
                        setUserGamesData(data);
                        setImageTries(data.triesimage);
                        setResets(data.resets);
                    }
                } catch (error: any) {
                    console.error('Error:', error);
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
            if(error === "Games no encontradas") {
                console.log("heheheh")
            }
        }
    };

    const findImageGame = async (id:any) => {
        try {
            const data = await findGameImageById(id)
            if (data) {
                setAnimeNameImage(data.anime_name);
                setGameImageData(data);
                const randomIndex = Math.floor(Math.random() * data.image_game.length);
                const imgSelectedStorage = localStorage.getItem("imgSelected");
                if (!imgSelectedStorage) {
                    setImgSelected(randomIndex)
                    localStorage.setItem("imgSelected", randomIndex.toString())
                } else {
                    const imgSelectedNumber = Number(imgSelectedStorage);
                    setImgSelected(imgSelectedNumber)
                }
            }
        } catch (error: any) {
            console.error('Error:', error);
        }
    };

    const changeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {

        const regex = /^[a-zA-Z0-9\s]*$/; 
        if (regex.test(e.target.value)) {
            setValueInput(e.target.value)
            if(e.target.value==="") {
                setAnimesSuggested([]);
                return
            }
            const inputValue = e.target.value.toLowerCase();
            const results = animeArray.filter((anime) =>
            anime.toLowerCase().includes(inputValue)
            );
            setAnimesSuggested(results);
        }
    };

    const handleClickAnime = (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.textContent;
        if(value === animeNameImage) {
            console.log("SIIIIII"); 
        } else {
            console.log("NOOOO"); 
        }
    };

    useEffect(() => {
        const idUser = localStorage.getItem("_id");

        if(idUser){
            findAllGamesUser(idUser)
        }

    }, [])

    useEffect(()=>{
        if(userGamesData) {
            findImageGame(userGamesData.imageid)
        }
    },[userGamesData])


    return (

        <div className='container-imagegame'>
            <div className='header-imagegame'>
                <h1 className='title-imagegame'>
                    ¿De que anime es la imagen?
                </h1>
                <span className='gachas-resets'>
                    {resets} / 5
                    <FontAwesomeIcon icon={faRotateRight} className="refresh" />  
                </span>     
            </div>

            <div className='container-image-center'>
                <div className='section-image-center image-center-game' >        
                    {imgSelected !== undefined ? 
                        <img className='img-game' width={"500%"} height={"auto"} src={ gameImageData?.image_game[imgSelected] } alt="" />
                        :
                        <l-trefoil size="200" stroke="22" stroke-length="0.5" bg-opacity="0.2" color={"#0077ff"} speed="3"></l-trefoil>
                    }       
                </div>
                <div className='container-tries-image'>
                    <span className='gachas-recompensa-active'>
                        Intentos fallidos: {imageTries === 0 ? 0 : imageTries}
                    </span>  
                    <span className='gachas-recompensa-inactive'>
                        Reclamar recompensa: 500 <img src='../../home/summon-o.png' alt="Logo Summon" className='logo-summon'></img>
                    </span>                      
                </div>
            </div>

            <div className='container-imagegame-input'>
                <span style={{fontSize:"1rem"}}>Cada intento fallido aleja un poco la imágen y pierdes 10 gachas de la recompensa final.</span>
                <input type="text" className='input-imagegame jaro-regular' maxLength={50} placeholder='Nombre del anime...' onChange={changeInputName} value={valueInput}/>
                    {animesSuggested && animesSuggested.length > 0 ? (
                        <div className='container-suggested'>{
                            animesSuggested.map((anime, index) => (
                                <span className='anime-suggested anime-name' key={index} onClick={handleClickAnime}>{anime}</span>
                            ))}
                        </div>
                        
                    ) : (
                        valueInput !== "" ? 
                        <div className='container-suggested'>
                            <span className='anime-suggested'>No hay animes con este nombre...</span>
                        </div>
                        :
                        <></>
                    )}
            </div>

            <div className='errors-imagegame'>
                <span className='error-span-image' style={{fontSize:"1.3rem"}}>Frieren</span>
            </div>

        </div>
    )
}
