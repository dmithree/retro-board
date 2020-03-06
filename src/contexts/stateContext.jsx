import React, { useState, createContext } from 'react';

export const StateContext = createContext();

export const StateProvider = ({children}) => {
  const p = parseInt(10);
  const [state, setState] = useState({
    wentWell:[
      {
        id:0,
        text:'Refactoring retro-board state.',
        like:p,
        comment:['Refactor code to use Context.']
      }
    ],
    toImprove:[],
    actionItems:[]
  });
  // console.log(state);
  return (
    <StateContext.Provider value={[state, setState]}>
      {children }
    </StateContext.Provider>
  );
}
