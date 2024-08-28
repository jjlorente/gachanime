import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUserGames } from '../Games';
import { findGameById, resetGame, updateSelected } from '../../../../services/userGames';

export const Resets = (props: any) => {
    const { resets, setResets, userGamesData, setUserGamesData } = useUserGames();
    const { setNameTries } = useUserGames();

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
                    localStorage.setItem("arrayErrorsImage", JSON.stringify([]));  
                } else if (props.game === "silueta") {
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
                    localStorage.setItem("arrayErrorsSilueta", JSON.stringify([]));  
                } else if (props.game === "opening") {
                    const dataOpening = await findGameById(data.openingid)
                    if(dataOpening) {
                        const randomIndex = Math.floor(Math.random() * dataOpening.opening.length);
                        localStorage.setItem("openingSelected", randomIndex.toString());
                        const dataOp = await updateSelected(userGamesData.userid, randomIndex, props.game);
                        if(dataOp) {
                            setUserGamesData(dataOp);
                            props.findGame(dataOp.openingid)
                        }
                    }
                    localStorage.setItem("arrayErrorsOpening", JSON.stringify([]));  
                } else if (props.game === "name") {
                    const dataName = await findGameById(data.nameid)
                    if(dataName) {
                        localStorage.setItem("arrayTriesName", "[]");
                        localStorage.setItem("localArrayColors", "[]");

                        setNameTries(0);
                        props.setArrayColors([])
                        const randomIndex = Math.floor(Math.random() * dataName.names_game.length);
                        localStorage.setItem("nameSelected", randomIndex.toString());
                        const dataNameGame = await updateSelected(userGamesData.userid, randomIndex, props.game);
                        if(dataNameGame) {
                            setUserGamesData(dataNameGame);
                            props.findGame(dataNameGame.nameid)
                        }
                    }
                    localStorage.setItem("arrayErrorsName", JSON.stringify([]));  
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
