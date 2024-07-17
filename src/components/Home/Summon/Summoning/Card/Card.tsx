
const Card = (props:any) => {
  const borderClass = props.card.rarity === "S+" ? "border-s-plus" :
                      props.rarity === "A" ? "border-a" :
                      props.card.rarity === "S" ? "border-s" :
                      props.card.rarity === "B" ? "border-b" : "";

  const containerClass = props.isFlipped ? 'inactive-card' : 'active-card';

  return (
    <div className="back-front">
      <div className={`container-card inactive-card`} onClick={props.onClick}>
            <div 
              key={props.index+"img"} 
              className={
                props.card.rarity === "S+" ? "card-not-showed card-not-showed-s-plus" :
                props.card.rarity === "A" ? "card-not-showed card-not-showed-a" :
                props.card.rarity === "S" ? "card-not-showed card-not-showed-s" :
                props.card.rarity === "B" ? "box card-not-showed card-not-showed-b" :
                ""
              }
            >
            <div className={`border ${borderClass}`}></div>
            <img src='../home/summon-w.png' alt="Logo Summon" className='logo-summon-card' />
          </div>
      </div>

      <div className={`container-card ${containerClass}`}
        style={{ border: props.card.rarity === "S+" ? "3px solid #ff3939" :
                    props.card.rarity === "A" ? "3px solid #c74cdf" :
                    props.card.rarity === "S" ? "3px solid #00a4ff" :
                    props.card.rarity === "B" ? "3px solid gray" : "" }}>
        <div className={`border ${borderClass}`}>
          <img src={props.card.base64_image} alt={`Imagen ${props.card.index + 1}`} className="card-collection" />
          <span className='rarity-card' style={{ background: props.card.rarity === "S+" ? "#FF3939" :
                                                   props.card.rarity === "A" ? "#c74cdf" :
                                                   props.card.rarity === "S" ? "#00a4ff" :
                                                   props.card.rarity === "B" ? "gray" : "" }}>
            {props.card.rarity}
          </span>
          <span className='power-card' style={{ background: props.card.rarity === "S+" ? "#FF3939" :
                                                  props.card.rarity === "A" ? "#c74cdf" :
                                                  props.card.rarity === "S" ? "#00a4ff" :
                                                  props.card.rarity === "B" ? "gray" : "" }}>
            {props.card.power} P
          </span>
          <div className='container-name-card' style={{ background: props.card.rarity === "S+" ? "#FF3939" :
                                                         props.card.rarity === "A" ? "#c74cdf" :
                                                         props.card.rarity === "S" ? "#00a4ff" :
                                                         props.card.rarity === "B" ? "gray" : "" }}>
            <span className='name-card' style={{ background: props.card.rarity === "S+" ? "#FF3939" :
                                                  props.card.rarity === "A" ? "#c74cdf" :
                                                  props.card.rarity === "S" ? "#00a4ff" :
                                                  props.card.rarity === "B" ? "gray" : "" }}>
              {props.card.name}
            </span>
            <span className='anime-name-card'>{props.card.anime_name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
