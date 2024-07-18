// src/App.js
import { useState,useEffect } from 'react';
import './Video.css';
import b from '../../../../../assets/b.mp4';
import s from '../../../../../assets/s.mp4';
import ss from '../../../../../assets/ss.mp4';

function Video(props:any) {
  const [showVideo, setShowVideo] = useState(true);
  const [videoRarity, setVideoRarity] = useState("");

  const handleVideoEnd = () => {
    setShowVideo(false);
    props.setVideoPlayed(true);
    setVideoRarity("");
  };

  useEffect(() => {
    if (props.cardSummoned) {
        let rarity = "b";
        for (const card of props.cardSummoned) {
            console.log(card.rarity)
          if (card.rarity === "S+") {
            console.log("aaaa")
            rarity = "ss";
            break;
          } else if(card.rarity === "S") {
            console.log("eeee")
            rarity = "s"
          } 
        }
        setVideoRarity(rarity)
      }
      console.log(videoRarity)
  }, [props.cardSummoned])

  return (
    <>
      {showVideo && videoRarity ? (
        <>
        <span className='btn-skip-video' onClick={() => { setShowVideo(false), props.setVideoPlayed(true) }}>SKIP &#x2192;</span>
        <div className="Video">
          <div className='container-video-summon'>
            <video 
              className="fullscreen-video" 
              autoPlay 
              muted 
              onEnded={handleVideoEnd}
            >
                {videoRarity != "" ? 
                    <source src={videoRarity === "ss" ? ss : videoRarity === "s" ? s : videoRarity === "b" ? b : b} type="video/mp4" />
                    :
                    <></>
                }

            </video>
          </div>
        </div>
        </>
      ) : (
        <div className='anima' ></div>
      )}
    </>
  );
}

export default Video;
