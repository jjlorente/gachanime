import { useUserGames } from '../Games';
import { useUserGachas } from "../../Home";
import { updateReward } from '../../../../services/userGames';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

export const TriesReward = (props: any) => {
    const { imageTries, userGamesData, siluetaTries, nameTries, openingTries, eyeTries, pixelTries, mode } = useUserGames();
    const { setUserGachas } = useUserGachas();
    const { t } = useTranslation();
    const { setAlerts } = useUserGachas();
    const [tries, setTries] = useState<number>();

    useEffect(() => {
        if ( props.game==="image" && imageTries!=null ) {
            setTries(imageTries)
        } else if ( props.game==="silueta" && siluetaTries!=null ) {
            setTries(siluetaTries)
        } else if ( props.game==="name" && nameTries!=null ) {
            setTries(nameTries)
        } else if ( props.game==="opening" && openingTries!=null ) {
            setTries(openingTries)
        } else if ( props.game==="eye" && eyeTries!=null ) {
            setTries(eyeTries)
        } else if ( props.game==="pixel" && pixelTries!=null ) {
            setTries(pixelTries)
        }
    },[imageTries, siluetaTries, nameTries, openingTries, eyeTries, pixelTries])

    const claimReward = async () => {
        if(userGamesData && props.gachasRecompensa && mode !== null) {
            const data = await updateReward(userGamesData.userid, props.gachasRecompensa, 2, props.game, mode)
            if(data) {
                let gachas = data[1].gachas;
                setUserGachas(gachas);
                if(props.game==="image") {
                    props.setStatusReward(data[0].statusRewardImage[mode]);
                } else if (props.game==="silueta") {
                    props.setStatusReward(data[0].statusRewardSilueta[mode]);
                } else if (props.game==="name") {
                    props.setStatusReward(data[0].statusRewardName);
                } else if (props.game==="opening") {
                    props.setStatusReward(data[0].statusRewardOpening[mode]);
                } else if (props.game==="eye") {
                    props.setStatusReward(data[0].statusRewardEye[mode]);
                } else if (props.game==="pixel") {
                    props.setStatusReward(data[0].statusRewardPixel[mode]);
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
                    {t('games.triesFailed')} {tries === 0 ? 0 : tries}
                </>
            </span>  
            {(props.gachasRecompensa && (props.statusReward === 1 || props.statusReward === 0)) ? (
                <span onClick={props.finishedGame === true && props.statusReward === 1 ? claimReward : undefined} className={props.finishedGame === true ? 'gachas-recompensa-active-click' : 'gachas-recompensa-inactive'}>
                    {t('games.claimReward') + props.gachasRecompensa}
                    <img src='/home/summon-w.png' alt="Logo of Summon" className='logo-summon-w' />
                    {props.statusReward === 1 ? (
                        <span className='reward-icon'></span>
                    ) : null}
                </span>
            ) : props.statusReward === 2 ? (
                <span className='gachas-recompensa-active'>
                    {t('games.rewardClaimed')}
                </span>
            ) : null}
        </div>
    )
}
