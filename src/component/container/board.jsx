import React from 'react';
import './board.css';

function Board(props) {
  const createCard = () => {
    props[props.setState]([
      ...props[props.state], ""
    ]);
  };
  return (
    <div className="board">
      <h2>{props.title}</h2>
      <button onClick={createCard}><span role="img" aria-label="add">&#10133;</span></button>
      {props.children}
    </div>
  )
}

export default Board
