import './Quests.css'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findAllQuestUser, findQuests, updateReward } from '../../../services/userQuests';
import { QuestsData, UserQuests } from '../../Interfaces/GamesUser';
import { useUserGachas } from '../Home';
import RelativeTimeElement from './relative-time-element-define.js'
import { findDay } from '../../../services/day';

export {RelativeTimeElement}
export default RelativeTimeElement
export * from './relative-time-element-define.js'

export const Quests = (props:any) => {
  const [section, setSection] = useState("daily");
  const [userQuestsData, setUserQuestsData] = useState<UserQuests>();
  const [quests, setQuests] = useState<QuestsData[]>([]);
  const [dailyTime, setDailyTime] = useState<string>();

  const { alerts, setAlerts } = useUserGachas();
  const { userGachas, setUserGachas } = useUserGachas();

  const location = useLocation();

  const svgMenu = (
    <svg 
      className={'toggle-section-nav'} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20">
      <path fill="currentColor" d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path>
    </svg>
  );

  useEffect(() => {
    const loadQuests = async () => {
      const idUser = localStorage.getItem("_id");
      if (idUser) {
        const data = await findAllQuestUser(idUser);
        const dataQuest = await findQuests();
        const day = await findDay();

        let lastReset = new Date(day.lastReset);
        lastReset.setDate(lastReset.getDate() + 1);
        let year = lastReset.getFullYear();
        let month = String(lastReset.getMonth() + 1);
        let dayOfMonth = String(lastReset.getDate());
        let formattedDate = `${year},${month},${dayOfMonth}`;
        // setDailyTime(formattedDate)

        if(data) {
          setUserQuestsData(data);
          setQuests(dataQuest);
        }
      }
    };

    loadQuests();
  }, []);

  const claimReward = async (amount:number, game: string) => {
    if(userQuestsData) {
        const data = await updateReward(userQuestsData.userid, amount, game)
        if(data) {
          let gachas = data[1].gachas;
          setUserGachas(gachas);
          setUserQuestsData(data[0])
        }
    }

    let alertGame = localStorage.getItem("alerts");
    if (alertGame) {
        let arrayAlerts = JSON.parse(alertGame);
        let index = arrayAlerts.indexOf("quests");
        if (index !== -1) {
          arrayAlerts.splice(index, 1);
          localStorage.setItem("alerts", JSON.stringify(arrayAlerts));
        }
        setAlerts(arrayAlerts);
    }
  }

  const handleClick = async (amount: number, game: string, event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.preventDefault();
    await claimReward(amount, game);
  };
  
  const renderQuestButton = (questStatus: number, quest:string, amount: number) => {
    if(quest === "summon") {
      if(questStatus < 10) {
        return (
          <Link className='link-quest-btn' to={`/home/summon`}>
            Ir a invocar 🢂
          </Link>
        );
      } else if(questStatus === 10) {
        return (
          <span className='quest-recompensa-active-click' onClick={(event) => handleClick(amount, quest, event)}>
            Reclamar recompensa
            <span className="reward-icon"></span>
          </span>
        );
      } else if(questStatus > 10) {
        return (
          <span className='reward-obtained'>
            Reclamado
          </span>
        );
      }
    } else if(quest === "log") {
      if(questStatus < 7) {
        return (
          <span className='link-quest-btn'>
            No completada
          </span>
        );
      } else if(questStatus === 7) {
        return (
          <span className='quest-recompensa-active-click' onClick={(event) => handleClick(amount, quest, event)}>
            Reclamar recompensa
            <span className="reward-icon"></span>
          </span>
        );
      } else if(questStatus > 7) {
        return (
          <span className='reward-obtained'>
            Reclamado
          </span>
        );
      }
    } else if (questStatus === 0 && quest !== "all") {
      return (
        <Link className='link-quest-btn' to={`/home/games/${quest}`}>
          Ir al juego 🢂
        </Link>
      );
    } else if (questStatus === 1 && quest !== "all") {
      return (
        <span className="quest-recompensa-active-click" onClick={(event) => handleClick(amount, quest, event)}>
          Reclamar recompensa
          <span className="reward-icon"></span>
        </span>
      );
    } else if (questStatus === 2 && quest !== "all") {
      return (
        <span className='reward-obtained'>
          Reclamado
        </span>
      );
    } else if(quest === "all") {
      if(questStatus < 4) {
        return (
          <Link className='link-quest-btn' to={`/home/games`}>
            Ir a los juegos 🢂
          </Link>
        );
      } else if(questStatus === 4) {
        return (
          <span className='quest-recompensa-active-click' onClick={(event) => handleClick(amount, quest, event)}>
            Reclamar recompensa
            <span className="reward-icon"></span>
          </span>
        );
      } else if(questStatus > 4) {
        return (
          <span className='reward-obtained'>
            Reclamado
          </span>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className="Quests">
      <div className='section-quest'>
        <div className='title-quest-container'>
          <span onClick={() => {setSection("daily")}} className={section === "daily" ? 'daily-quest active-quest' : "daily-quest inactive-quest-daily"}>
            <p className='title-quest'>DIARIAS</p>
            {/* <p className='timer-quest'>
              { dailyTime ? 
                <relative-time datetime={dailyTime} format="elapsed" precision='minute' lang="es">
                </relative-time>
                :
                null
              }
            </p> */}
          </span>
          <span onClick={() => {setSection("week")}} className={section === "week" ? 'daily-quest active-quest' : "daily-quest inactive-quest-week"}>
            <p className='title-quest'>SEMANALES</p>
          </span>
        </div>
        {section === "daily" && quests ? 
          <section className='section-quest-comp'>
            <div className='container-quests'>
              <div className='container-quest'>

                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>{userQuestsData && userQuestsData.statusQuestImage > 0 ? 1 : 0} / 1</span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Adivina la imagen del anime</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 25</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusQuestImage, "image", 25) 
                    : 
                    <Link className='link-quest-btn' to={`/home/games/image`}>
                      Ir al juego 🢂
                    </Link>
                  }
                </div>
              </div>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>{userQuestsData && userQuestsData.statusQuestSilueta > 0 ? 1 : 0} / 1</span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Adivina la silueta del personaje</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 25</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusQuestSilueta, "silueta", 25) 
                    : 
                    <Link className='link-quest-btn' to={`/home/games/silueta`}>
                      Ir al juego 🢂
                    </Link>
                  }
                </div>
              </div>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>{userQuestsData && userQuestsData.statusQuestName > 0 ? 1 : 0} / 1</span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Completa el wordle diario</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 25</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusQuestName, "name", 25) 
                    : 
                    <Link className='link-quest-btn' to={`/home/games/name`}>
                      Ir al juego 🢂
                    </Link>
                  }
                </div>
              </div>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>{userQuestsData && userQuestsData.statusQuestOpening > 0 ? 1 : 0} / 1</span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Adivina de que anime es el opening</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 25</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                <div>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusQuestOpening, "opening", 25) 
                    : 
                    <Link className='link-quest-btn' to={`/home/games/opening`}>
                      Ir al juego 🢂
                    </Link>
                  }
                </div>
                </div>
              </div>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>
                    {userQuestsData 
                      ? (userQuestsData.statusQuestAllGames > 4 
                          ? 4 
                          : userQuestsData.statusQuestAllGames)
                      : 0} 
                    / 4
                  </span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Completa todos los juegos diarios!</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 100</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                <div>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusQuestAllGames, "all", 100) 
                    :
                    <Link className='link-quest-btn' to={`/home/games`}>
                      Ir a los juegos 🢂
                    </Link>
                  }
                </div>
                </div>
              </div>
            </div>

          </section>
          :
          section === "week" ? 
          <section className='section-quest-comp'>
            <div className='container-quests'>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>
                    {userQuestsData 
                      ? (userQuestsData.statusSummonsWeek > 10 
                          ? 10 
                          : userQuestsData.statusSummonsWeek)
                      : 0} 
                    / 10
                  </span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Haz 10 invocaciones de 10 cartas</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 150</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusSummonsWeek, "summon", 150) 
                    : 
                    <Link className='link-quest-btn' to={`/home/summon`}>
                      Ir a invocar 🢂
                    </Link>
                  }
                </div>
              </div>

              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>
                    {userQuestsData 
                      ? (userQuestsData.statusLogInWeek > 7 
                          ? 7 
                          : userQuestsData.statusLogInWeek)
                      : 0} 
                    / 7
                  </span>
                </div>
                <div className='info-quest'>
                  <span style={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap",fontSize:"1.1rem", textAlign:"center"}}>Conéctate a GACHANIME durante 7 días</span>
                  <div className='reward-quest'>
                    <img
                      src='/home/summon-o.png'
                      alt="Logo Summon"
                      className='logo-quest'
                    />
                    <div className='reward-quest-num'>
                      <span style={{fontSize:"1.3rem"}}>+ 300</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  {userQuestsData ? 
                    renderQuestButton(userQuestsData.statusLogInWeek, "log", 300) 
                    : 
                    <Link className='link-quest-btn' to={`/home/summon`}>
                      Ir a invocar 🢂
                    </Link>
                  }
                </div>
              </div>
            </div>
          </section>
          :
          null
        }
      </div>
    </div>
  )
}
