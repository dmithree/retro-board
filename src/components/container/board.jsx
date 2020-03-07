import React from 'react';
import './board.css';
import Card from '../element/card';

import {StateContext} from '../../contexts/stateContext';

function Board(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');
  const [dropBox, setDropBox] = React.useState({});

  const drop = e => {
    e.preventDefault();
    setAnimation('animated bounceIn');
    setDropBox({});
    e.target.style.padding = 'auto';
    const id = e.dataTransfer.getData('id');
    const board = e.dataTransfer.getData('board');

    const stateCopy = {...state};
    const card = stateCopy[board].filter(i => parseInt(i.id) === parseInt(id));
    const newBoard = stateCopy[board].filter(i => parseInt(i.id) !== parseInt(id));
    //
    stateCopy[board] = newBoard;
    //
    // console.log(newBoard);
    // board -> origin
    // props.board -> destination

    stateCopy[props.board].push(card[0]);

    // THE IDS HAVE TO BE UNIQUE

    // console.log({card});

    setState(stateCopy);
    console.log(state);
    // const card = document.getElementById(id);
    // e.target.appendChild(card);


    // card.style.display='block';
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
  return (
    <div className="board" onDrop={drop} onDragOver={ e=>e.preventDefault() } style={dropBox}>
      <div className='header' onDragOver={e=> e.stopPropagation()}>
        <h1>{props.title}</h1>
        <button onClick={createCard}><i className='bx bx-list-plus'></i></button>
      </div>
        {
          state[props.board].map((item, idx) => {
            return <div className={animation} key={'card-'+idx}>
              <Card
                setDropBox={setDropBox}
                bg={props.cardColor}
                key={idx}
                board={props.board}
                item={item}
              />
            </div>
          })
        }
    </div>
  )
}

export default Board
