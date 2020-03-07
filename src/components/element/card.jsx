import React from 'react';
import './card.css';

import { StateContext } from '../../contexts/stateContext';

function Card(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');
  const [text, setText] = React.useState(props.item.text);
  const [validation, setValidation] = React.useState({style:{},class:''});
  const [edit, setEdit] = React.useState(true);

  const deleteCard = () => {
    setAnimation('animated bounceOut');
    setTimeout(()=>{
      setAnimation('');
      const stateCopy = {...state};
      const boardCopy = stateCopy[props.board].filter((i)=> i.id !== props.item.id);
      stateCopy[props.board] = boardCopy;
      setState(stateCopy);

      // text === '' && setEdit(true);
      // !edit && setText('');
      // !edit && setText('');

      // setText('');
    },750);
    // text === ''
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
      const noItem = {...item};
      item.id === props.item.id
        ? item.text = text
        : item = noItem;
    });
    setState(stateCopy);
    text === '' ? setValidation({style:{borderColor:'#eb4d55'},class:'animated shake'}) : setEdit(false);
    // edit && setText('');
    setTimeout(()=>{
      edit ? setValidation({style:{borderColor:'auto'},class:''}) : setValidation({style:{},class:''});
    },650)
  };

  const showInput = <><input onChange={e => setText(e.target.value)} value={text} type='text' placeholder='Enter Text Here' style={validation.style} className={validation.class} /><button onClick={saveNewText}><i className='bx bxs-check-circle bx-border'></i></button></>;
  const showText = <><h2>{props.item.text}</h2><button onClick={() => setEdit(true)}><i className='bx bxs-rename bx-border'></i></button></>;

  //  REFACTOR THE WHOLE EDIT THING

  const dragStart = e => {
    e.persist();
    props.setDropBox({padding:'0 0 150px'})
    e.dataTransfer.setData('id', e.target.id);
    e.dataTransfer.setData('board', props.board);
  };

  return(
    <div className={'card '+animation} style={{backgroundColor: props.bg}} draggable={true} onDragStart={dragStart} onDragOver={e=> e.stopPropagation()} id={props.item.id}>
      <div className='content'>
        {
          edit ? showInput : showText
        }
      </div>
      <div className='comments'>
        <p>{props.item.comment.length} Commented</p>
        <button><i className='bx bx-show-alt bx-border'></i></button>
      </div>
      <div className='showCom'></div>
      <div className='opts'>
        <div className='left'>
          <button onClick={()=>poll(true)}><i className='bx bxs-upvote bx-border'></i></button>
          <p>{props.item.vote}</p>
          <button onClick={()=>poll(false)}><i className='bx bxs-downvote bx-border'></i></button>
        </div>
        <div className='right'>
          <button onClick={deleteCard}><i className='bx bx-trash bx-border'></i></button>
        </div>
      </div>
    </div>
  )
}

export default Card
