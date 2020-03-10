import React from 'react';
import './App.css';

import { StateProvider } from './contexts/stateContext';

import Board from './components/container/board';

function App() {
  const [dropBox, setDropBox] = React.useState({});

  return (
    <StateProvider>
      <div className='top'>
        <h1>Retrospective Board</h1>
      </div>
      <div className="App">
        <Board title="Went Well" board="wentWell" cardColor="#589167" style={dropBox} setDropBox={setDropBox} />
        <Board title="To Improve" board="toImprove" cardColor="#df7861" style={dropBox} setDropBox={setDropBox} />
        <Board title="Action Items" board="actionItems" cardColor="#6384b3" style={dropBox} setDropBox={setDropBox} />
      </div>
    </StateProvider>
  );
}

export default App;
