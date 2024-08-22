import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserGames } from '../Games';
import { findGameById, resetGame, updateSelected} from '../../../../services/userGames';

export const Resets = (props: any) => {
    const { resets, setResets, userGamesData, setUserGamesData } = useUserGames();

    const resetGameClick = async () => {
        if(userGamesData) {
            const data = await resetGame(userGamesData.userid, props.game);
            if(data) {
                setResets(data.resets);
                if (props.game === "image") {
                    const dataImg = await findGameById(data.imageid)
                    if(dataImg) {
                        const randomIndex = Math.floor(Math.random() * dataImg.image_game.length);
                        localStorage.setItem("imgSelected", randomIndex.toString());
                        const dataImage = await updateSelected(userGamesData.userid, randomIndex, props.game);
                        if(dataImage) {
                            setUserGamesData(dataImage);
                            props.findGame(dataImage.imageid)
                        }
                    }
                } else if (props.game === "silueta") {
                    console.log("entro1")
                    const dataSil = await findGameById(data.siluetaid)
                    if(dataSil) {
                        const randomIndex = Math.floor(Math.random() * dataSil.silueta_game.length);
                        localStorage.setItem("siluetaSelected", randomIndex.toString());
                        const dataSilueta = await updateSelected(userGamesData.userid, randomIndex, props.game);
                        if(dataSilueta) {
                            setUserGamesData(dataSilueta);
                            props.findGame(dataSilueta.siluetaid)
                        }
                    }
                }
            }
        }
    }

    return (
        <div className='header-imagegame'>

            <h1 className='title-imagegame'>
                {props.title}
            </h1>

            <span className={resets === 0 || props.finishedGame === true ? "resets-empty" : "gachas-resets"} onClick={resets === 0 || props.finishedGame ? undefined : resetGameClick}>
                <>
                    {resets} / 5
                    <FontAwesomeIcon icon={faRotateRight} className={resets === 0 || props.finishedGame === true ? "" : "refresh"} />  
                </>
            </span> 

        </div>
    )
}