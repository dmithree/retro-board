import React from 'react';
import './App.css';

// import { StateContext } from './contexts/stateContext';
import { StateProvider } from './contexts/stateContext';

import Board from './components/container/board';
// import Card from './components/element/card'

function App() {
  const [layoutIcon, setLayoutIcon] = React.useState('');
  const [layout, setLayout] = React.useState({flexDirection:'row'});

  // const [state, setState] = React.useContext(StateContext);
  // const [wentWell, setWentWell] = useState([]);
  // const [toImprove, setToImprove] = useState([]);
  // const [actionItems, setActionItems] = useState([]);
  // const [state, setState] = useState({
  //   wentWell:[
  //     {
  //       id:0,
  //       text:'Refactoring retro-board state.',
  //       like:10,
  //       comment:['Refactor code to use Context.']
  //     }
  //   ],
  //   toImprove:[],
  //   actionItems:[]
  // });
  // console.log("state: ", state);

  const handleLayout = () => {
    layoutIcon !== '' ? setLayoutIcon('') : setLayoutIcon('bx-rotate-90');
    layout.flexDirection === 'row' ? setLayout({flexDirection:'column'}) : setLayout({flexDirection:'row'});
  };

  return (
    <StateProvider>
      <div className='top'>
        <h1>Retrospective Board</h1>
        <button onClick={handleLayout}><i className={'bx bx-menu bx-border '+layoutIcon}></i></button>
      </div>
      <div className="App" style={layout}>

        <Board title="Went Well" board="wentWell" cardColor="#589167" />
        <Board title="To Improve" board="toImprove" cardColor="#df7861" />
        <Board title="Action Items" board="actionItems" cardColor="#6384b3" />
        {
        // <Board title="Went Well" board="wentWell">
        //   {
        //     state.wentWell.map((item, idx) => {
        //       return <Card
        //         bg="#357376"
        //         key={idx}
        //
        //         item={item}
        //       />
        //     })
        //   }
        // </Board>
        // <Board title="To Improve" board="toImprove">
        //   {
        //     state.toImprove.map((item, idx) => {
        //       return <Card
        //         bg="#f5f5f5"
        //         key={idx}
        //
        //         item={item}
        //       />
        //     })
        //   }
        // </Board>
      }</div>
    </StateProvider>
  );
}

export default App;
