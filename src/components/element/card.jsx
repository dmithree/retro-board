import React from 'react';
import './card.css';

import { StateContext } from '../../contexts/stateContext';

function Card(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');
  const [newText, setNewText] = React.useState('');

  const deleteCard = () => {
    setAnimation('animated bounceOut');
    setNewText('');
    setTimeout(()=>{
      const stateCopy = {...state};
      const boardCopy = stateCopy[props.board].filter((i)=> i.id !== props.item.id);
      stateCopy[props.board] = boardCopy;
      setState(stateCopy);
      setAnimation('');
    },750);
  };

  const poll = ballot => {
    const stateCopy = {...state};
    stateCopy[props.board].forEach((item)=>{
      const copyItem = {...item};
      item.id === props.item.id
        ? ballot ? item.vote++ : item.vote--
        : item = copyItem;
    });
    setState(stateCopy);
  };

  const saveNewText = () => {
    const stateCopy = {...state};
    stateCopy[props.board].forEach((item)=>{
      const copyItem = {...item};
      item.id === props.item.id
        ? item.text = newText
        : item = copyItem;
    });
    setState(stateCopy);
    setNewText('');
  };



  const edit = <><input onChange={e => setNewText(e.target.value)} value={newText} type='text' placeholder='Enter Text' /><button onClick={saveNewText}><i className='bx bxs-check-circle bx-border'></i></button></>;
  const noedit = <><h2>{props.item.text}</h2><button onClick={saveNewText}><i className='bx bxs-rename bx-border'></i></button></>;


  return(
    <div className={'card '+animation} style={{backgroundColor: props.bg}}>
      <div className='content'>
        {
          props.item.text === "" ? edit : noedit
        }
      </div>
      <div className='comments'>
        <p>{props.item.comment.length} Commented</p>
        <div className='showCom'></div>
      </div>
      <div className='opts'>
        <div className='left'>
          <button onClick={()=>poll(true)}><i className='bx bxs-upvote bx-border'></i></button>
          <p>{props.item.vote}</p>
          <button onClick={()=>poll(false)}><i className='bx bxs-downvote bx-border'></i></button>
        </div>
        <div className='right'>
          <button onClick={deleteCard}><i className='bx bx-trash bx-border'></i></button>
          <button><i className='bx bx-move-horizontal bx-border'></i></button>
        </div>
      </div>
    </div>
  )
}

export default Card
