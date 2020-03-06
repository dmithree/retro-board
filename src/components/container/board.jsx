import React from 'react';
import './board.css';
import Card from '../element/card';

import {StateContext} from '../../contexts/stateContext';

function Board(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');

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
    <div className="board ">
      <div className='header'>
        <h1>{props.title}</h1>
        <button onClick={createCard}><i className='bx bx-list-plus'></i></button>
      </div>
        {
          state[props.board].map((item, idx) => {
            return <div className={animation} key={'card-'+idx}>
              <Card
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
