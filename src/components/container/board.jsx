import React from 'react';
import './board.css';
import Card from '../element/card';

import {StateContext} from '../../contexts/stateContext';

function Board(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');

  const drop = e => {
    e.preventDefault();
    setAnimation('animated bounceIn');
    props.setDropBox({});
   
    const id = e.dataTransfer.getData('id');
    const board = e.dataTransfer.getData('board');

    const stateCopy = {...state};
    const card = stateCopy[board].filter(i => parseInt(i.id) === parseInt(id));
    const newBoard = stateCopy[board].filter(i => parseInt(i.id) !== parseInt(id));
    stateCopy[board] = newBoard;

    let newId = 0;
    if(stateCopy[props.board].length > 0){
      newId = stateCopy[props.board][stateCopy[props.board].length - 1].id + 1;
    }
    card[0].id = newId;
    stateCopy[props.board].push(card[0]);

    setState(stateCopy);
  };

  const dropbox = (e, border) => {
    e.target.style.borderColor = border;
  };

  const createCard = () => {
    setAnimation('animated bounceIn');
    const stateCopy = {...state};
    const id = stateCopy[props.board].length > 0
      ? parseInt(stateCopy[props.board][stateCopy[props.board].length - 1].id) + 1 : 0;
    stateCopy[props.board] = [
      ...stateCopy[props.board],
      {
        id: id,
        text: "",
        vote: 0,
        comment:[]
      }
    ];
    setState(stateCopy);
  };

  const shadeColor = (color, percent) => {

    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    const RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
  }

  return (
    <div className="board" onDrop={drop} onDragOver={ e=>e.preventDefault()}>
      <div className='header' onDragOver={e=> e.stopPropagation()} style={{backgroundColor:shadeColor(props.cardColor, -50)}}>
        <h1>{props.title}</h1>
        <button onClick={createCard}><i className='bx bx-list-plus'></i></button>
      </div>
        {
          state[props.board].map((item, idx) => {
            return <div className={animation} key={'card-'+idx}>
              <Card
                setDropBox={props.setDropBox}
                bg={props.cardColor}
                key={idx}
                board={props.board}
                item={item}
              />
            </div>
          })
        }
        <div className='dropbox' style={props.style} onDragOver={e => dropbox(e,'#4f98ca')} onDragLeave={e => dropbox(e,'grey')}></div>
    </div>
  )
}

export default Board
