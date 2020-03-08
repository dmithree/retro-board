import React from 'react';
import './App.css';

import { StateProvider } from './contexts/stateContext';

import Board from './components/container/board';

function App() {
  const [layoutIcon, setLayoutIcon] = React.useState('');
  const [layout, setLayout] = React.useState({flexDirection:'row'});
  const [dropBox, setDropBox] = React.useState({});

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
        <Board title="Went Well" board="wentWell" cardColor="#589167" style={dropBox} setDropBox={setDropBox} />
        <Board title="To Improve" board="toImprove" cardColor="#df7861" style={dropBox} setDropBox={setDropBox} />
        <Board title="Action Items" board="actionItems" cardColor="#6384b3" style={dropBox} setDropBox={setDropBox} />
      </div>
    </StateProvider>
  );
}

export default App;
