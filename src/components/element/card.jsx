import React from 'react';
import './card.css';

import { StateContext } from '../../contexts/stateContext';

function Card(props) {
  const [state, setState] = React.useContext(StateContext);
  const [animation, setAnimation] = React.useState('');
  const [text, setText] = React.useState(props.item.text);
  const [validation, setValidation] = React.useState({style:{},class:''});
  const [edit, setEdit] = React.useState(props.item.text === '' ? true : false);
  const [comment, setComment] = React.useState('');
  const [commentStyle, setCommentStyle] = React.useState({display:'none'});

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

  const dragStart = e => {
    e.persist();
    e.dataTransfer.setData('id', e.target.id);
    e.dataTransfer.setData('board', props.board);
    props.setDropBox({border:'5px dashed grey',height:'200px'});
    setCommentStyle({display: 'none'});

    props.edit ? setEdit(true) : setEdit(false);

    setTimeout(()=>{
      e.target.style.display = 'none';
    }, 0);
  };

  const dragEnd = e => {
    e.persist();
    setTimeout(()=>{e.target.style.display = 'inherit'}, 0);
    props.setDropBox({});

    if(props.item.text === ''){
      setEdit(true);
      setText('');
    }
  };

  const saveNewText = () => {
    const stateCopy = {...state};
    stateCopy[props.board].forEach((item)=>{
      const itemCopy = {...item};
      item.id === props.item.id
        ? item.text = text
        : item = itemCopy;
    });
    setState(stateCopy);

    props.item.text === '' ? setValidation({style:{borderColor:'#eb4d55'},class:'animated shake'}) : setEdit(false);
    setTimeout(()=>{
      edit ? setValidation({style:{borderColor:''},class:''}) : setValidation({style:{},class:''});
    },1000);
  };
  const deleteCard = () => {
    setAnimation('animated bounceOut');
    setTimeout(()=>{
      setAnimation('');
      const stateCopy = {...state};
      const boardCopy = stateCopy[props.board].filter((i)=> i.id !== props.item.id);
      stateCopy[props.board] = boardCopy;
      setState(stateCopy);
      console.log(stateCopy[props.board][0])
      if(stateCopy[props.board].length > 0 && stateCopy[props.board][0].text === ''){
        setEdit(true);
        setText('');
      }else {
        setEdit(false);
      }
    },750);
  };
  const addComment = () => {
    const stateCopy = {...state};

    comment !== '' && stateCopy[props.board].forEach( i => {
      if(i.id === props.item.id){
        i.comment.push(comment);
      }
    });

    setState(stateCopy);
    setComment('');

  };

  const showInput = <><input onChange={e => setText(e.target.value)} value={text} type='text' placeholder='Enter Text Here' style={validation.style} className={validation.class} /><button onClick={saveNewText}><i className='bx bxs-check-circle bx-border'></i></button></>;
  const showText = <><h2>{props.item.text}</h2><button onClick={() => setEdit(true)}><i className='bx bxs-rename bx-border'></i></button></>;

  return(
    <div className={'card '+animation} style={{backgroundColor: props.bg}} draggable={true} onDragEnd={dragEnd} onDragStart={dragStart} onDragOver={e=> e.stopPropagation()} id={props.item.id}>
      <div className='content'>
        {
          edit ? showInput : showText
        }
      </div>
      <div className='comments'>
        <p>{props.item.comment.length} Commented</p>
        <button onClick={()=>setCommentStyle(commentStyle.display === 'none' ? {display:'flex'} : {display:'none'})}><i className='bx bxs-comment bx-border'></i></button>
      </div>
      <div className='allComments' style={commentStyle}>
        <div className='addComment'>
          <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
          <button onClick={addComment}><i className='bx bxs-comment-check bx-border'></i></button>
        </div>
        {
          props.item.comment.map((txt, idx) => {
            return <div className='comment' key={'msg-'+idx}>
              <i className='bx bxs-comment-detail' ></i><span>{txt}</span>
            </div>
          })
        }
      </div>
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
