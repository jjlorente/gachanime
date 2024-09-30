import './Main.css'
import { useEffect, useState } from 'react';
import { find, addVote } from '../../../services/surveys';
import { SiDiscord } from "react-icons/si";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import { findUserById } from '../../../services/user';
import { calculatePower } from '../../../services/userCards';
import { ProfileCard } from './ProfileCard/ProfileCard';
import { useTranslation } from 'react-i18next';
import { RiGamepadFill } from "react-icons/ri";
import { IoStorefrontSharp } from "react-icons/io5";

import RelativeTimeElement from '../Quests/relative-time-element-define.js'
export { RelativeTimeElement }
export default RelativeTimeElement
export * from '../Quests/relative-time-element-define.js'

export const Main = (props: any) => {
  const [voted, setVoted] = useState<boolean>()
  const [selectedOption, setSelectedOption] = useState<number>();
  const [selectedAnime, setSelectedAnime] = useState<string>();
  const [dataSurvey, setDataSurvey] = useState<any>();
  const [percentage, setPercentage] = useState<number>();
  const [percentage2, setPercentage2] = useState<number>();
  const [dataUser, setDataUser] = useState<any>();
  const [power, setPower] = useState<number>();
  const { i18n, t } = useTranslation();
  const [dailyTime, setDailyTime] = useState<string>();

  useEffect(() => {

    const findSurvey = async () => {
      try {
        const data = await find();
        let userId = localStorage.getItem("_id");
        if(userId){
          const userData = await findUserById(userId);
          setDataUser(userData)
          setDailyTime(data.expirationdDate)
          setVoted(data.usersId.includes(userId))
          setDataSurvey(data)
          const cards = await calculatePower(userId);
          if(cards) {
            setPower(cards.totalPower)
          }
        }
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    findSurvey();
  }, []);

  const handleButtonClick = (buttonNumber: number, animeName: string) => {
    setSelectedOption(buttonNumber);
    setSelectedAnime(animeName)
  };

  const voteClick = async () => {
    try {
      const userId = localStorage.getItem("_id");
      if (userId && selectedOption) {
        const data = await addVote(userId, selectedOption);
        setVoted(true);
        setDataSurvey(data);
      }
    } catch (error) {
      console.error("Error al registrar el voto:", error);
    }
  };

  useEffect(() => {
    if(dataSurvey) {
      let globalNum = dataSurvey.votes[0] + dataSurvey.votes[1];
      let percentageOption1 = Math.round((dataSurvey.votes[0] / globalNum) * 100);
      let percentageOption2 = 100 - percentageOption1;
      setPercentage(percentageOption1)
      setPercentage2(percentageOption2)
    }
  }, [dataSurvey]);

  const nextCommunity: Array<string> = t('survey.nextRoadMap', { returnObjects: true }); 

  return (
    <div className="Main">
      <div className='section-main'>
        <div className='container-links-sections-main'>
          <Link to={"/home/games"} className='link-main'>
            <span className='span-link-main'>{t('links.games')}</span>
            <RiGamepadFill className='link-main-icon' style={{height:"25px", width: "25px",marginLeft:"2px"}}/>
          </Link>
          <Link to={"/home/summon"} className='link-main'>
            <span className='span-link-main'>{t('links.summon')}</span>
            <img src='/home/summon-ww.png' className="link-main-icon" style={{height:"25px", width: "25px",marginLeft:"2px"}} alt="Image for summoning link"/>
          </Link>
          <Link to={"/home/quests"} className='link-main'>
            <span className='span-link-main'>{t('links.quests')}</span>
            <svg width={"25px"} className="link-main-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M16.667 18.333H3.333A.833.833 0 012.5 17.5v-15a.833.833 0 01.833-.833h13.334a.833.833 0 01.833.833v15a.833.833 0 01-.833.833zm-10-12.5V7.5h6.666V5.833H6.667zm0 3.334v1.666h6.666V9.167H6.667zm0 3.333v1.667h4.166V12.5H6.667z"></path></svg>
          </Link>
          <Link to={"/home/collection"} className='link-main'>
            <span className='span-link-main'>{t('links.collection')}</span>
            <svg width={"25px"} className="link-main-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M13.333 1.667L17.5 5.833v11.674a.827.827 0 01-.828.826H3.327a.833.833 0 01-.827-.826V2.493c0-.456.37-.826.828-.826h10.005zm-2.059 10.371l1.842 1.842 1.179-1.178-1.842-1.841a3.334 3.334 0 10-6.2-1.904 3.333 3.333 0 005.021 3.081zm-.515-1.693a1.67 1.67 0 01-1.83.385 1.667 1.667 0 111.83-.385z"></path></svg>
          </Link>
          <Link to={"/home/market"} className='link-main'>
            <span className='span-link-main'>{t('links.market')}</span>
            <IoStorefrontSharp className="link-main-icon" style={{height:"25px", width: "25px",marginLeft:"2px"}}/>
          </Link>
        </div>

        <div className='sections-container-community height-standar'>
          <ProfileCard dataUser={dataUser} power={power} />
          {dataSurvey ? (
            !voted && !dataSurvey.finished ? (
              <div className='subsection-main-survey'>
                <span style={{fontSize: "1.8rem"}}>{t('survey.infoTitle')}</span>
                <span style={{fontSize: "1.8rem"}}>
                  {selectedAnime ? `${selectedAnime}` : t('survey.infoChoose')}
                </span>
                { dailyTime ? 
                  <p className='timer-quest-survey'>
                    <relative-time datetime={dailyTime} format="elapsed" precision='minute' lang="es">
                    </relative-time>
                  </p>
                  :
                  null
                }
                <div className='progress-container-survey'>
                  <span style={{color:"#e9a030"}}>{percentage} %</span>
                  <span
                    className='proggres-bar-survey'
                    style={
                      percentage && percentage2 
                        ? { background: `linear-gradient(to right, #e9a030 ${percentage}%,#e9a030 ${percentage-1}%, white ${percentage+2}%, white  ${percentage}%)` }
                        : { display: `none` }
                    }
                  >
                    <img className='sticker-luffy' src='/luffy-sticker.png' alt="Luffy of sticker from One piece"/>
                  </span>
                  <span>{percentage2} %</span>
                </div>
                <div className="btn-vote-container">
                  <button
                    onClick={() => handleButtonClick(1, dataSurvey.name[0])}
                    className={selectedOption === 1 ? "jaro-regular btn-vote-clicked first-option" : "btn-vote jaro-regular first-option"}
                  >
                    {dataSurvey.name[0]}                    
                  </button>
                  <button
                    onClick={voteClick}
                    disabled={!selectedOption}
                    className={selectedOption ? "send-vote jaro-regular" : "send-vote-inactive jaro-regular"}
                  >
                    {t('survey.btnVote')} <IoSend />
                  </button>
                  <button
                    onClick={() => handleButtonClick(2, dataSurvey.name[1])}
                    className={selectedOption === 2 ? "jaro-regular btn-vote-clicked second-option secondary-color" : "btn-vote-secondary jaro-regular second-option"}
                  >
                    {dataSurvey.name[1]}
                  </button>
                </div>
              </div>

            ) : dataSurvey.finished ? (
              <div className='subsection-main-survey'>
                <span style={{fontSize: "3rem"}}>{t('survey.finishedPoll')}</span>
                <span style={{fontSize: "1.8rem"}}>
                {percentage && percentage2 && percentage > percentage2 || percentage === percentage2 ? `${dataSurvey.name[0]} gana con un ${percentage}%` : `${dataSurvey.name[1]} gana con un ${percentage2}%`}
                </span>
                <div className='progress-container-survey'>
                  <span style={{color:"#e9a030"}}>{percentage} %</span>
                  <span
                    className='proggres-bar-survey'
                    style={
                      percentage && percentage2 
                        ? { background: `linear-gradient(to right, #e9a030 ${percentage}%,#e9a030 ${percentage-1}%, white ${percentage+2}%, white  ${percentage}%)` }
                        : { display: `none` }
                    }
                  >
                  </span>
                  <span>{percentage2} %</span>
                </div>
                <div className="btn-vote-container">
                  {
                  percentage && percentage2 && percentage > percentage2 || percentage === percentage2 ? 
                    <span className="span-anime-survey" style={{backgroundColor:"#e9a030"}}>
                      {dataSurvey.name[0]}
                    </span>
                    :
                    <span className="span-anime-survey" style={{backgroundColor:"white", color: "black", borderColor: "#bcbcbc"}}>
                      {dataSurvey.name[1]}
                    </span>
                  }
                </div>
              </div>
          ) : (
            <div className='subsection-main-survey'>
              { dailyTime ? 
                  <p className='timer-quest-survey'>
                    <relative-time datetime={dailyTime} format="elapsed" precision='minute' lang="es">
                    </relative-time>
                  </p>
                  :
                  null
              }
              <span style={{fontSize:"1.8rem"}}>{t('survey.infoTitle')}</span>
              <span style={{fontSize:"1.8rem"}}>{t('survey.msgThanks')}</span>
              <div className='progress-container-survey'>
                <span style={{color:"#F1A127"}}>{percentage} %</span>
                <span
                  className='proggres-bar-survey'
                  style={
                    percentage && percentage2 
                      ? { background: `linear-gradient(to right, #e9a030 ${percentage}%,#e9a030 ${percentage-1}%, white ${percentage+2}%, white  ${percentage}%)` }
                      : { display: `none` }
                  }
                >
                  <img className='sticker-luffy' src='/luffy-sticker.png' alt="Luffy of sticker from One Piece"/>
                </span>
                <span>{percentage2} %</span>
              </div>
              <div className="btn-vote-container">
                <span className="span-anime-survey" style={{backgroundColor:"#e9a030"}}>
                  {dataSurvey.name[0]}
                </span>
                <span className="span-anime-survey" style={{backgroundColor:"white", color: "black", borderColor: "#bcbcbc"}}>
                  {dataSurvey.name[1]}
                </span>
              </div>
            </div>
          )
          ) : (
            <div className='subsection-main-survey'>
              <span>{t('survey.nextSurvey')}</span>
            </div>
          )}
        </div>


        <div className='sections-container-community'>
          <div className='subsection-main'>
            <span className='subtitle-main-section' style={{fontSize:"2rem",textAlign:"center", width:"100%"}}>{t('survey.titleCommunity')}</span>
            <span style={{textAlign:"center", width:"100%", fontSize:"1.3rem"}}> {t('survey.subTitleCommunity')} </span>
            <span style={{ fontSize:"1rem"}}> {t('survey.infoCommunity')} </span>
            <span style={{fontSize:"1.3rem",textAlign:"center", width:"100%"}}> {t('survey.nextCommunity')} </span>

            <div className='container-contact-type'>
              <SiDiscord style={{cursor:"not-allowed"}} />
              <RiTwitterXLine style={{cursor:"not-allowed"}} />
            </div>
          </div>
          <div className='subsection-main'>
            <span className='subtitle-main-section'> {t('survey.titleRoadMap')}</span>
            <div className='container-roadmap'>
              {nextCommunity.map((item: any, index: number) => (
                <span key={index} style={{ fontSize: "1rem" }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
