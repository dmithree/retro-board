import React, {useState} from 'react';
import './App.css';

import Board from './component/container/board';
import Card from './component/element/card'


function App() {
  const [wentWell, setWentWell] = useState([]);
  const [toImprove, setToImprove] = useState([]);
  const [actionItems, setActionItems] = useState([]);

  return (
    <div className="App">
      <Board title="Went Well" state="wentWell" setState="setWentWell" wentWell={wentWell} setWentWell={setWentWell}>
        {
          wentWell.map((ignoreThis, idx) => {
            return <Card
              bg="#357376"
              key={idx}
              idx={idx}
              state="wentWell"
              setState="setWentWell"
              wentWell={wentWell}
              setWentWell={setWentWell}
            />
          })
        }
      </Board>
      <Board title="To Improve" state="toImprove" setState="setToImprove" toImprove={toImprove} setToImprove={setToImprove}>
        {
          toImprove.map((ignoreThis, idx) => {
            return <Card
              bg="#9d0b0b"
              key={idx}
              idx={idx}
              state="toImprove"
              setState="setToImprove"
              toImprove={toImprove}
              setToImprove={setToImprove}
            />
          })
        }
      </Board>
      <Board title="Action Items" state="actionItems" setState="setActionItems" actionItems={actionItems} setActionItems={setActionItems}>
        {
          actionItems.map((ignoreThis, idx) => {
            return <Card
              bg="#fcc169"
              key={idx}
              idx={idx}
              state="actionItems"
              setState="setActionItems"
              actionItems={actionItems}
              setActionItems={setActionItems}
            />
          })
        }
      </Board>
    </div>
  );
}

export default App;
