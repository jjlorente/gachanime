import './Quests.css'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { findUserQuests, registerNewQuestUser } from '../../../services/userQuests';

export const Quests = (props:any) => {
  const [section, setSection] = useState("daily");
  const location = useLocation();

  const svgMenu = (
    <svg 
      className={'toggle-section-nav'} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20">
      <path fill="currentColor" d="M4 16V4H2v12h2zM13 15l-1.5-1.5L14 11H6V9h8l-2.5-2.5L13 5l5 5-5 5z"></path>
    </svg>
  );

  const findAllQuestUser = async (id: any) => {
    try {
      const data = await findUserQuests(id);
      if (data) {
        console.log(data)
      } else {
        try {
          const data = await registerNewQuestUser(id);
          if (data) {
            console.log(data)
          }
        } catch (error: any) {
          console.error('Error:', error);
        }
      }
    } catch (error: any) {
      console.error('Error:', error);
      if (error === "Games no encontradas") {
        console.log("Games no encontradas");
      }
    }
  };

  useEffect(() => {
    const idUser = localStorage.getItem("_id");

    if (idUser) {
      // findAllQuestUser(idUser);
    }

  }, []);

  return (
    <div className="Quests">
      <div className='section-quest'>
        <div className='title-quest-container'>
          <span onClick={() => {setSection("daily")}} className={section === "daily" ? 'daily-quest active-quest' : "daily-quest inactive-quest-daily"}>
            DIARIAS
          </span>
          <span onClick={() => {setSection("week")}} className={section === "week" ? 'daily-quest active-quest' : "daily-quest inactive-quest-week"}>
            SEMANALES
          </span>
        </div>
        {section === "daily" ? 
          <section className='section-quest-comp'>
            {/* <div style={{display:"flex",width:"100%", justifyContent:"end",alignItems:"center"}}>
              <span>TIMER</span>
            </div> */}
            <div className='container-quests'>


              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>0 / 1</span>
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
                      <span style={{fontSize:"1.3rem"}}>+ 50</span>
                      <span style={{fontSize:".9rem"}}>Gachas</span>
                    </div>
                  </div>
                </div>
                <div className='link-quest'>
                  <Link className='link-quest-btn' to="/home/games/silueta">
                    Ir al juego 🢂
                  </Link>
                </div>
              </div>


              <div className='container-quest'>
                V
              </div>
              <div className='container-quest'>
                B
              </div>
              <div className='container-quest'>
                B
              </div>
            </div>
          </section>

          :

          <section className='section-quest-comp'>
            <div style={{display:"flex",width:"100%", justifyContent:"end",alignItems:"center"}}>
              <span>TIMER</span>
            </div>
            <div className='container-quests'>
              <div className='container-quest'>
                <div className='progress-quest'>
                  <span>Progreso</span>
                  <span>0 / 1</span>
                </div>
              </div>
              <div className='container-quest'>
                V
              </div>
              <div className='container-quest'>
                B
              </div>
            </div>
          </section>
        }
      </div>
    </div>
  )
}
