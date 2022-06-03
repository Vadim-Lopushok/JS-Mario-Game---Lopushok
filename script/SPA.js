'use strict'

window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash(){
  let hash = window.location.hash;
  let State = decodeURIComponent(hash.substr(1));

  if (State !== "")
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
function SwitchToMainPage() {
  SwitchToState({ pageName: 'Main'} );
}
function SwitchToConfigPage() {
  SwitchToState({ pageName: 'Config'} );
}
function SwitchToPeoplePage() {
  SwitchToState({ pageName: 'Who loves mario?'} );
}
function SwitchToAboutPage() {
  SwitchToState({ pageName: 'About Game'} );
}
function SwitchToNewGamePage() {
  SwitchToState({pageName: 'New Game'} );
  document.location.reload();
}
SwitchToStateFromURLHash();

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function initMain() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initMenu());
  wrapper.appendChild(initWrapLogo());
  return wrapper;
}

function initMenu() {
  let mainMenu = document.createElement('div');
  mainMenu.className = 'main-menu';
  mainMenu.appendChild(initMenuButtons('New Game', 'btn', SwitchToNewGamePage));
  mainMenu.appendChild(initMenuButtons('Config', 'btn', SwitchToConfigPage));
  mainMenu.appendChild(initMenuButtons('Who loves mario?', 'btn', SwitchToPeoplePage));
  mainMenu.appendChild(initMenuButtons('About Game', 'btn', SwitchToAboutPage));
  return mainMenu;
}

function initMenuButtons(text, className, hashChange) {
  let button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.onclick = hashChange;
  return button;
}

function initWrapLogo() {
  let container = document.createElement('div');
  container.className = 'container';
  container.appendChild(initLogo());
  return container;
}

function initLogo() {
  let logo = document.createElement('div');
  logo.className = 'logo';
  logo.appendChild(initLogoImg());
  return logo;
}

function initLogoImg() {
  let figure = document.createElement('figure');
  let img = document.createElement('img');
  img.className = 'logo';
  img.src = '../sprites/background/logoMario.png';
  img.alt = 'Mario Logo';
  figure.appendChild(img);
  return figure;
}

function initConfigPage() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initConfigLogo());
  wrapper.appendChild(initConfig());
  wrapper.appendChild(initButton(SwitchToMainPage));
  return wrapper;
}

function initConfigLogo() {
  let miniLogo = document.createElement('div');
  miniLogo.className = 'minilogo';
  let img = document.createElement('img');
  img.src = '../sprites/background/miniLogoMario.png';
  img.alt = 'Mario';
  miniLogo.appendChild(img);
  return miniLogo;
}

function initConfig() {
  let config = document.createElement('div');
  config.className = 'config';
  let configH = document.createElement('div');
  configH.className = 'title';
  let h1 = document.createElement('h1');
  h1.textContent = 'Key management';
  configH.appendChild(h1);
  let configI = document.createElement('div');
  configI.className = 'info';
  let p = document.createElement('p');
  p.innerHTML = 'Press W to jump!' + '<br>' + 'Press A to go left!'+ '<br>' + 'Press D to go right!'+ '<br>' + 'Use the space bar to shoot fireballs in an enhanced form!';
  configI.appendChild(p);
  config.appendChild(configH);
  config.appendChild(configI);
  return config;
}

function initButton(hashchange) {
  let buttonDiv = document.createElement('div');
  buttonDiv.className = 'buttons';
  let button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Main Page';
  button.onclick = hashchange;
  buttonDiv.appendChild(button);
  return buttonDiv;
}

function initPeoplePage() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initConfigLogo());
  wrapper.appendChild(createWrap());
  setLocalStorage();
  initCount();
  wrapper.appendChild(initButton(SwitchToMainPage));
  wrapper.appendChild(initMenuButtons('New Game', 'btn', SwitchToNewGamePage));
  return wrapper;
}

function createWrap() {
  let container = document.createElement('div');
  container.className = 'cont';
  container.appendChild(createUserField('user-name', 'Name', 'Mark', 'user-name'));
  container.appendChild(createUserField('user-score', 'Score', 22, 'user-score'));
  return container;
}

function createUserField(className, text, info, id) {
  let div = document.createElement('div');
  div.className = className;
  div.id = id;
  let heading = document.createElement('h2');
  heading.textContent = text;
  div.appendChild(heading);
  return div;
}

function initCount() {
  let users = JSON.parse(localStorage.getItem('Users'));
  //деструктуризация
  let [name, score] = users;
  users.forEach(user => {
    let userName = document.getElementById('user-name');
    let textName = document.createElement('p');
    textName.textContent = user.name;
    let nameField = document.createElement('div');
    nameField.appendChild(textName);
    userName.appendChild(nameField);
    let userScore = document.getElementById('user-score');
    let scoreText = document.createElement('p');
    scoreText.textContent = user.score;
    let scoreField = document.createElement('div');
    scoreField.appendChild(scoreText);
    userScore.appendChild(scoreField);

  });
}

function setLocalStorage() {
  localStorage.clear();
  let users = [{"name":"John","score":8},{"name":"Peter","score":6}];
  localStorage.setItem('Users', JSON.stringify(users));
}

function initAboutGamePage() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initConfigLogo());
  wrapper.appendChild(initHistory());
  wrapper.appendChild(initButton(SwitchToMainPage));
}

function initHistory() {
  let history = document.createElement('div');
  history.className = 'history';
  let historyHeading = document.createElement('div');
  historyHeading.className = 'history-heading';
  let h2 = document.createElement('h2');
  h2.textContent = 'About Game';
  historyHeading.appendChild(h2);
  let historyInfo = document.createElement('div');
  historyInfo.className = 'history-info';
  let h3 = document.createElement('h3');
  h3.textContent = 'History';
  historyInfo.appendChild(h3);
  let historyText = document.createElement('div');
  historyText.className = 'history-text';
  let p = document.createElement('p');
  p.textContent = 'Marios first T.V. appearance was in a cartoon series as a circus trainer in the Saturday Supercade on CBS from 1983-1985. His first starring role in a T.V. series was in the Super Mario Show in 1989 which combined live-action segments with animated features. Mario made his big screen debut in the 1989 movie The Wizard; which was followed by the Super Mario Bros. with Bob Hoskins playing the role of Mario.Home on the NESNintendos first U.S. home videogame console, the Nintendo Entertainment System (NES) was released in 1985 with Mario starring in Super Mario Bros. The legendary title has gone on to sell more than 50 million units worldwide. Super Mario Land we released in 1989 with the launch of the Game Boy and has sold more than 14 million units worldwide.';
  historyText.appendChild(p);
  history.appendChild(historyHeading);
  history.appendChild(historyInfo);
  history.appendChild(historyText);
  return history;
}

function initGame() {
  let wrapper = document.getElementById('wrapper');
  wrapper.appendChild(initCanvas('canvas', 'canvas', 600, 600));
  wrapper.appendChild(initButton(SwitchToMainPage));
}

function initCanvas(id, className, width, height) {
  let canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.className = className;
  canvas.width = width;
  canvas.height = height;
  return canvas;
}