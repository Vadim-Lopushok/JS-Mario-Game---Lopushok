'use strict';

import {
  initAboutGamePage,
  initConfigPage, initGame,
  initMain,
  initPeoplePage,
} from './utils.js';

window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash() {
  let hash = window.location.hash;
  let State = decodeURIComponent(hash.substr(1));

  if (State !== '')
    State = JSON.parse(State);
  else
    State = {pageName: 'Main'};
  document.getElementById('wrapper').innerHTML = '';

  switch (State.pageName) {
    case 'Main':
      initMain();
      localStorage.clear();
      break;
    case 'Config':
      initConfigPage();
      break;
    case 'Who loves mario?':
      initPeoplePage();
      break;
    case 'About Game':
      initAboutGamePage();
      break;
    case 'New Game':
      initGame();
      break;
  }
}

function SwitchToState(State) {
  location.hash = encodeURIComponent(JSON.stringify(State));
}

export function SwitchToMainPage() {
  SwitchToState({pageName: 'Main'});
}

export function SwitchToConfigPage() {
  SwitchToState({pageName: 'Config'});
}

export function SwitchToPeoplePage() {
  SwitchToState({pageName: 'Who loves mario?'});
}

export function SwitchToAboutPage() {
  SwitchToState({pageName: 'About Game'});
}

export function SwitchToNewGamePage() {
  SwitchToState({pageName: 'New Game'});
  document.location.reload();
}

SwitchToStateFromURLHash();