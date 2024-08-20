import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserGames } from '../Games';
import { findGameImageById, resetGame, updateImageSelected} from '../../../../services/userGames';

export const Resets = (props: any) => {
    const { resets, setResets, userGamesData, setUserGamesData } = useUserGames();

    const resetGameClick = async () => {
        if(userGamesData) {
            const data = await resetGame(userGamesData.userid, props.game);
            if(data) {
                setResets(data.resets);
                if(props.game === "image") {
                    const dataImg = await findGameImageById(data.imageid)
                    if(dataImg) {
                        const randomIndex = Math.floor(Math.random() * dataImg.image_game.length);
                        localStorage.setItem("imgSelected", randomIndex.toString());
                        const dataImage = await updateImageSelected(userGamesData.userid, randomIndex);
                        if(dataImage) {
                            setUserGamesData(dataImage);
                            props.findImageGame(dataImage.imageid)
                        }
                    }
                }
            }
        }
    }

    return (
        <>
            <span className={resets === 0 || props.finishedGame === true ? "resets-empty" : "gachas-resets"} onClick={resets === 0 || props.finishedGame ? undefined : resetGameClick}>
                <>
                    {resets} / 5
                    <FontAwesomeIcon icon={faRotateRight} className={resets === 0 || props.finishedGame === true ? "" : "refresh"} />  
                </>
            </span> 
        </>
    )
}
