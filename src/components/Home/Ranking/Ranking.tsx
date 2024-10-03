import { useEffect, useState } from 'react'
import { getRank } from '../../../services/user';
import './Ranking.css'
import { useTranslation } from 'react-i18next';

export const Ranking = () => {
    const [ranks, setRanks] = useState<any>([]); 
    const [sectionRank, setSectionRank] = useState<any>("power"); 
    const { t } = useTranslation();

    useEffect(() => {
        const getRanks = async () => {
        try {
            const data = await getRank(); 
            setRanks(data);
        } catch (error) {
            console.error("Error fetching ranks:", error);
        }
        };

        getRanks();
    }, []);
    
    return (
        <div className='Ranking'>
            <nav className='nav-sections-ranking'>
                <h4 className={sectionRank === "power" ? 'span-rank-section-active' : 'span-rank-section'} onClick={()=>{setSectionRank("power")}}>
                    {t('ranking.power')}
                </h4>
                <h4 className={sectionRank === "level" ? 'span-rank-section-active' : 'span-rank-section'} onClick={()=>{setSectionRank("level")}}>
                    {t('ranking.level')}
                </h4>
                <h4 className={sectionRank === "card" ? 'span-rank-section-active' : 'span-rank-section'} onClick={()=>{setSectionRank("card")}}>
                    {t('ranking.cards')}
                </h4>
            </nav>
            <div className='section-ranking'>
            {
                ranks.topTotalPowerUsers && ranks.topLevelUsers && ranks.topTotalPowerUsers.length > 0 && ranks.topLevelUsers.length > 0 ? (
                    sectionRank === "power" ? (
                        <div className='users-container'>
                            {ranks.topTotalPowerUsers.map((user: any, index: number) => (
                                <div className={index === 0 ? 'user-info-cont one' : index === 1 ? 'user-info-cont two' : index === 2 ? 'user-info-cont third' : "user-info-cont"} key={index}>
                                    <span>Nº {index + 1}</span>
                                    <div className='username-top'>
                                        <span>{user.username.split(" ")[0] ? user.username.split(" ")[0] : user.username}</span>
                                        <img className='img-marco-top' src={user.profilePicture} alt='Profile image from user of GACHANIME'></img>
                                    </div>
                                    <span>{user.totalPower} P</span>
                                </div>
                            ))}
                        </div>
                    ) : sectionRank === "level" ? (
                        <div className='users-container'>
                            {ranks.topLevelUsers.map((user: any, index: number) => (
                                <div className={index === 0 ? 'user-info-cont one' : index === 1 ? 'user-info-cont two' : index === 2 ? 'user-info-cont third' : "user-info-cont"} key={index}>
                                    <span>Nº {index + 1}</span>
                                    <div className='username-top'>
                                        <span>{user.username.split(" ")[0] ? user.username.split(" ")[0] : user.username}</span>
                                        <img className='img-marco-top' src={user.profilePicture} alt='Profile image from user of GACHANIME'></img>
                                    </div>
                                    <span>Level {user.profileLevel}</span>
                                </div>
                            ))}
                        </div>
                    ) : sectionRank === "card" ? (
                        <div className='users-container'>
                            {ranks.topCollection.map((user: any, index: number) => (
                                <div className={index === 0 ? 'user-info-cont one' : index === 1 ? 'user-info-cont two' : index === 2 ? 'user-info-cont third' : "user-info-cont"} key={index}>
                                    <span>Nº {index + 1}</span>
                                    <div className='username-top'>
                                        <span>{user.userDetails.username.split(" ")[0] ? user.userDetails.username.split(" ")[0] : user.userDetails.username }</span>
                                        <img className='img-marco-top' src={user.userDetails.profilePicture} alt='Profile image from user of GACHANIME'></img>
                                    </div>
                                    <span>{user.totalUniqueCards} / {ranks.totalCards}</span>
                                </div>
                            ))}
                        </div>
                    ) : ( null )
                ) : (
                    <span>Loading...</span>
                )
            }
            </div>
        </div>
    )
}
