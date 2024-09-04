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

export const Main = (props: any) => {
  const [voted, setVoted] = useState<boolean>()
  const [selectedOption, setSelectedOption] = useState<number>();
  const [selectedAnime, setSelectedAnime] = useState<string>();
  const [dataSurvey, setDataSurvey] = useState<any>();
  const [percentage, setPercentage] = useState<number>();
  const [percentage2, setPercentage2] = useState<number>();
  const [dataUser, setDataUser] = useState<any>();
  const [power, setPower] = useState<number>();

  useEffect(() => {

    const findSurvey = async () => {
      try {
        const data = await find();
        let userId = localStorage.getItem("_id");
        if(userId){
          const userData = await findUserById(userId);
          setDataUser(userData)
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
      } else {
        console.log("userId o selectedOption no está definido");
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

  return (
    <div className="Main">
      <div className='section-main'>
        <div className='container-links-sections-main'>
          <Link to={"/home/games"} className='link-main'>JUEGOS</Link>
          <Link to={"/home/quests"} className='link-main'>MISIONES</Link>
          <Link to={"/home/summon"} className='link-main'>INVOCAR</Link>
          <Link to={"/home/collection"} className='link-main'>COLECCIÓN</Link>
        </div>

        <div className='sections-container-community height-standar'>
          <ProfileCard dataUser={dataUser} power={power} />
          {dataSurvey ? (

            !voted ? (

              <div className='subsection-main-survey'>
                <span style={{fontSize: "1.9rem"}}>La comunidad elige la próxima colección de cartas de GACHANIME</span>
                <span style={{fontSize: "1.8rem"}}>
                  {selectedAnime ? `${selectedAnime}` : "Elige uno de los dos animes"}
                </span>
                <div className='progress-container-survey'>
                  <span>{percentage} %</span>
                  <span
                    className='proggres-bar-survey'
                    style={
                      percentage && percentage2 
                        ? { background: `linear-gradient(to right, #051641 ${percentage}%, white  ${percentage}%)` }
                        : { display: `none` }
                    }
                  >
                    <img className='sticker-luffy' src='/luffy-sticker.png' alt="Luffy sticker"/>
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
                    Votar <IoSend />
                  </button>
                  <button
                    onClick={() => handleButtonClick(2, dataSurvey.name[1])}
                    className={selectedOption === 2 ? "jaro-regular btn-vote-clicked second-option secondary-color" : "btn-vote-secondary jaro-regular second-option"}
                  >
                    {dataSurvey.name[1]}
                  </button>
                </div>
              </div>

            ) : (

              <div className='subsection-main-survey'>
                <span style={{fontSize:"1.9rem"}}>La comunidad elige la próxima colección de cartas de GACHANIME</span>
                <span style={{fontSize:"1.8rem"}}>¡Gracias por votar!</span>
                <div className='progress-container-survey'>
                  <span>{percentage} %</span>
                  <span
                    className='proggres-bar-survey'
                    style={
                      percentage && percentage2 
                        ? { background: `linear-gradient(to right, #051641 ${percentage}%, white  ${percentage}%)` }
                        : { display: `none` }
                    }
                  >
                    <img className='sticker-luffy' src='/luffy-sticker.png' alt="Luffy sticker"/>
                  </span>
                  <span>{percentage2} %</span>
                </div>
                <div className="btn-vote-container">
                  <span className="span-anime-survey" style={{backgroundColor:"#051641"}}>
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
              <span>Próximamente habrá una nueva encuesta para decidir la siguiente colección de cartas</span>
            </div>
          )}
        </div>


        <div className='sections-container-community'>
          <div className='subsection-main'>
            <span className='subtitle-main-section' style={{fontSize:"2rem",textAlign:"center", width:"100%"}}>UNETE A LA COMUNIDAD</span>
            <span style={{textAlign:"center", width:"100%", fontSize:"1.3rem"}}>¡Nos encantaría saber tu opinión!</span>
            <span style={{ fontSize:"1rem"}}>Si encontraste algún error, bug, o tienes alguna sugerencia para mejorar, por favor cuéntanos. Valoramos mucho tu feedback y cada comentario nos ayuda a mejorar GACHANIME.</span>
            <span style={{fontSize:"1.3rem",textAlign:"center", width:"100%"}}>Próximamente estarán disponibles:</span>

            <div className='container-contact-type'>
              <SiDiscord style={{cursor:"not-allowed"}} />
              <RiTwitterXLine style={{cursor:"not-allowed"}} />
            </div>
          </div>
          <div className='subsection-main'>
            <span className='subtitle-main-section'>PRÓXIMAMENTE EN GACHANIME</span>
            <div className='container-roadmap'>
              <span style={{fontSize:"1rem"}}>- Mercado de compra y venta de cartas entre jugadores por GACHAS</span>
              <span style={{fontSize:"1rem"}}>- Banners para invocaciones especiales</span>
              <span style={{fontSize:"1rem"}}>- Nuevo juego diario</span>
              <span style={{fontSize:"1rem"}}>- Modo PVP diario</span>
              <span style={{fontSize:"1rem"}}>- Ranking entre jugadores</span>
              <span style={{fontSize:"1rem"}}>- Discord y Twitter para la comunidad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
