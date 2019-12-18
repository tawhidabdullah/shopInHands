import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 7000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

/* 


  Hey! It was just an example! For me it's Tawhid,For you that's arthi,
  My point was that if you care about someone you want the best for them.


  But I am glad that now we are talking about reality.I know "arthi doesn't want to talk to him". I also know that tawhid did made some mistakes.But now what ? We just leave their story ruined and walk away ?
  i do not thing that would be the ideal thing to do. I feel like it still can be saved. Because now time and space has changed And so as THEY!

Adri i know you usually do not talk about this kinda intense topic,Even i don't,Sorry about that! But it necessary.
  



*/
