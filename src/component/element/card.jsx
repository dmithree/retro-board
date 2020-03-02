import React from 'react';
import './card.css';

function Card(props) {
  const [cardText, setCardText] = React.useState(props[props.state][props.idx]);

  const setValue = value => {
    const temp = [...props[props.state]];
    temp[props.idx] = value;
    props[props.setState](temp);
  };

  const deleteCard = () => {
    props[props.setState](
      props[props.state].filter((i, card)=> props.idx !== card)
    );
  };


  if(props[props.state][props.idx] === ""){
    return (
      <div className="cardEdit" style={{backgroundColor: props.bg}}>
        <input placeholder="Enter Text Here!" onChange={e => setCardText(e.target.value)} />
        <button onClick={() => setValue(cardText)}><span role="img" aria-label="ok">&#10004;</span></button>
        <button onClick={deleteCard}><span role="img" aria-label="delete">&#10060;</span></button>
      </div>
    )
  }else {
    return (
      <div className="cardView" style={{backgroundColor: props.bg}} draggable={true}>
        <div className="cardValue">
          <i><strong>{props[props.state][props.idx]}</strong></i>
          <button onClick={() => setValue("")}><span role="img" aria-label="edit">&#9999;</span></button>
          <button onClick={deleteCard}><span role="img" aria-label="delete">&#10060;</span></button>
        </div>
        <div>
          <button onClick={() => setValue("")}><span role="img" aria-label="edit">&#9999;</span></button>
          <button onClick={deleteCard}><span role="img" aria-label="delete">&#10060;</span></button>
        </div>
      </div>
    )
  }
}

export default Card
