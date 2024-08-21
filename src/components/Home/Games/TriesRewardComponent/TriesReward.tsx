import { useUserGames } from '../Games';
import { useUserGachas } from "../../Home";
import { updateReward } from '../../../../services/userGames';

import { useState, useEffect } from 'react';

export const TriesReward = (props: any) => {
    const { imageTries, userGamesData, siluetaTries } = useUserGames();
    const { userGachas, setUserGachas } = useUserGachas();

    const { alerts, setAlerts } = useUserGachas();
    
    const [tries, setTries] = useState<number>();

    useEffect(() => {
        if ( props.game==="image" && imageTries!=null ) {
            setTries(imageTries)
        } else if ( props.game==="silueta" && siluetaTries!=null ) {
            setTries(siluetaTries)
        }
    },[imageTries,siluetaTries])

    const claimReward = async () => {
        if(userGamesData && props.gachasRecompensa) {
            const data = await updateReward(userGamesData.userid, props.gachasRecompensa, 2, props.game)
            if(data) {
                let gachas = data[1].gachas;
                setUserGachas(gachas);
                if(props.game==="image") {
                    props.setStatusReward(data[0].statusRewardImage);
                } else if (props.game==="silueta") {
                    props.setStatusReward(data[0].statusRewardSilueta);
                }
            }
        }
        let alertGame = localStorage.getItem("alerts");
        if (alertGame) {
            let arrayAlerts = JSON.parse(alertGame);
            let index = arrayAlerts.indexOf("games");
            if (index !== -1) {
            arrayAlerts.splice(index, 1);
            localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
            }
            setAlerts(arrayAlerts);
        }
    }

    return (
        <div className='container-tries-image'>
            <span className='gachas-recompensa-active'>
                <>
                    Intentos fallidos: {tries === 0 ? 0 : tries}
                </>
            </span>  
            {(props.gachasRecompensa && (props.statusReward === 1 || props.statusReward === 0)) ? (
                <span onClick={props.finishedGame === true && props.statusReward === 1 ? claimReward : undefined} className={props.finishedGame === true ? 'gachas-recompensa-active-click' : 'gachas-recompensa-inactive'}>
                    {"Reclamar recompensa: " + props.gachasRecompensa}
                    <img src='/home/summon-w.png' alt="Logo Summon" className='logo-summon-w' />
                    {props.statusReward === 1 ? (
                        <span className='reward-icon'></span>
                    ) : null}
                </span>
            ) : props.statusReward === 2 ? (
                <span className='gachas-recompensa-active'>
                    {"Recompensa reclamada"}
                </span>
            ) : null}
        </div>
    )
}
