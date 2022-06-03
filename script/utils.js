import {
  SwitchToAboutPage, SwitchToConfigPage,
  SwitchToMainPage,
  SwitchToNewGamePage,
  SwitchToPeoplePage,
} from './SPA.js';

// collision functions
export function isOnTopPlatform({object, platform}) {
  return (object.position.y + object.height <= platform.position.y &&
      object.position.y + object.height + object.velocity.y >=
      platform.position.y && object.position.x + object.width >=
      platform.position.x && object.position.x <= platform.position.x +
      platform.width);
}

export function collisionTop({object1, object2}) {
  return (object1.position.y + object1.height <= object2.position.y &&
      object1.position.y + object1.height + object1.velocity.y >=
      object2.position.y && object1.position.x + object1.width >=
      object2.position.x && object1.position.x <= object2.position.x +
      object2.width);
}

export function isOnTopPlatformCircle({object, platform}) {
  return (object.position.y + object.radius <= platform.position.y &&
      object.position.y + object.radius + object.velocity.y >=
      platform.position.y && object.position.x + object.radius >=
      platform.position.x && object.position.x <= platform.position.x +
      platform.width);
}

export function hitBottomOfPlatform({object, platform}) {
  return (object.position.y <= platform.position.y + platform.height &&
      object.position.y - object.velocity.y >= platform.position.y +
      platform.height && object.position.x + object.width >=
      platform.position.x && object.position.x <= platform.position.x +
      platform.width);
}

export function hitSideOfPlatform({object, platform}) {
  return (object.position.x + object.width + object.velocity.x -
      platform.velocity.x >= platform.position.x && object.position.x +
      object.velocity.x <= platform.position.x + platform.width &&
      object.position.y <= platform.position.y + platform.height &&
      object.position.y + object.height >= platform.position.y);
}

export function objectsTouch({object1, object2}) {
  return (object1.position.x + object1.width >= object2.position.x &&
      object1.position.x <= object2.position.x + object2.width &&
      object1.position.y + object1.height >= object2.position.y &&
      object1.position.y <= object2.position.y + object2.height);
}

// build pages function

export function initMain() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initMenu());
  wrapper.appendChild(initWrapLogo());
  return wrapper;
}

export function initMenu() {
  let mainMenu = document.createElement('div');
  mainMenu.className = 'main-menu';
  mainMenu.appendChild(initMenuButtons('New Game', 'btn', SwitchToNewGamePage));
  mainMenu.appendChild(initMenuButtons('Config', 'btn', SwitchToConfigPage));
  mainMenu.appendChild(
      initMenuButtons('Who loves mario?', 'btn', SwitchToPeoplePage));
  mainMenu.appendChild(initMenuButtons('About Game', 'btn', SwitchToAboutPage));
  return mainMenu;
}

export function initMenuButtons(text, className, hashChange) {
  let button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  button.onclick = hashChange;
  return button;
}

export function initWrapLogo() {
  let container = document.createElement('div');
  container.className = 'container';
  container.appendChild(initLogo());
  return container;
}

export function initLogo() {
  let logo = document.createElement('div');
  logo.className = 'logo';
  logo.appendChild(initLogoImg());
  return logo;
}

export function initLogoImg() {
  let figure = document.createElement('figure');
  let img = document.createElement('img');
  img.className = 'logo';
  img.src = '../sprites/background/logoMario.png';
  img.alt = 'Mario Logo';
  figure.appendChild(img);
  return figure;
}

export function initConfigPage() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initConfigLogo());
  wrapper.appendChild(initConfig());
  wrapper.appendChild(initButton(SwitchToMainPage));
  return wrapper;
}

export function initConfigLogo() {
  let miniLogo = document.createElement('div');
  miniLogo.className = 'minilogo';
  let img = document.createElement('img');
  img.src = '../sprites/background/miniLogoMario.png';
  img.alt = 'Mario';
  miniLogo.appendChild(img);
  return miniLogo;
}

export function initConfig() {
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
  p.innerHTML = 'Press W to jump!' + '<br>' + 'Press A to go left!' + '<br>' +
      'Press D to go right!' + '<br>' +
      'Use the space bar to shoot fireballs in an enhanced form!';
  configI.appendChild(p);
  config.appendChild(configH);
  config.appendChild(configI);
  return config;
}

export function initButton(hashchange) {
  let buttonDiv = document.createElement('div');
  buttonDiv.className = 'buttons';
  let button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Main Page';
  button.onclick = hashchange;
  buttonDiv.appendChild(button);
  return buttonDiv;
}

export function initPeoplePage() {
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

export function createWrap() {
  let container = document.createElement('div');
  container.className = 'cont';
  container.appendChild(
      createUserField('user-name', 'Name', 'Ann', 'user-name'));
  container.appendChild(
      createUserField('user-score', 'Coins', 22, 'user-score'));
  return container;
}

export function createUserField(className, text, info, id) {
  let div = document.createElement('div');
  div.className = className;
  div.id = id;
  let heading = document.createElement('h2');
  heading.textContent = text;
  div.appendChild(heading);
  return div;
}

export function initAboutGamePage() {
  let wrapper = document.getElementById('wrapper');
  wrapper.className = 'wrapper';
  wrapper.appendChild(initConfigLogo());
  wrapper.appendChild(initHistory());
  wrapper.appendChild(initButton(SwitchToMainPage));
}

export function initHistory() {
  let marioHistory = document.createElement('div');
  marioHistory.className = 'history';
  let historyHeading = document.createElement('div');
  historyHeading.className = 'historyHeading';
  let h2 = document.createElement('h2');
  h2.textContent = 'About Game';
  historyHeading.appendChild(h2);
  let historyInfo = document.createElement('div');
  historyInfo.className = 'history-info';
  let h3 = document.createElement('h3');
  h3.textContent = 'What is a Mario Game?';
  historyInfo.appendChild(h3);
  let historyText = document.createElement('div');
  historyText.className = 'textHistory';
  let p = document.createElement('p');
  p.textContent = 'Marios first T.V. appearance was in a cartoon series as a circus trainer in the Saturday Supercade on CBS from 1983-1985. His first starring role in a T.V. series was in the Super Mario Show in 1989 which combined live-action segments with animated features. Mario made his big screen debut in the 1989 movie The Wizard; which was followed by the Super Mario Bros. with Bob Hoskins playing the role of Mario.Home on the NESNintendos first U.S. home videogame console, the Nintendo Entertainment System (NES) was released in 1985 with Mario starring in Super Mario Bros. The legendary title has gone on to sell more than 50 million units worldwide. Super Mario Land we released in 1989 with the launch of the Game Boy and has sold more than 14 million units worldwide.';
  historyText.appendChild(p);
  marioHistory.appendChild(historyHeading);
  marioHistory.appendChild(historyInfo);
  marioHistory.appendChild(historyText);
  return marioHistory;
}

// init Canvas
export function initGame() {
  let wrapper = document.getElementById('wrapper');
  wrapper.appendChild(initCanvas('canvas', 'canvas', 1024, 576));
  wrapper.appendChild(initButton(SwitchToMainPage));

  window.addEventListener('popstate', () => {
    location.reload();
  }, false);
}

export function initCanvas(id, className, width, height) {
  let canvas = document.createElement('canvas');
  canvas.id = id;
  canvas.className = className;
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

// records menu
export function initCount() {
  let users = JSON.parse(localStorage.getItem('Users'));
  let [name, coins] = users;
  users.forEach(user => {
    let userName = document.getElementById('user-name');
    let textName = document.createElement('p');
    textName.textContent = user.name;
    let nameField = document.createElement('div');
    nameField.appendChild(textName);
    userName.appendChild(nameField);
    let userScore = document.getElementById('user-score');
    let scoreText = document.createElement('p');
    scoreText.textContent = user.coins;
    let scoreField = document.createElement('div');
    scoreField.appendChild(scoreText);
    userScore.appendChild(scoreField);

  });
}

export function setLocalStorage() {
  localStorage.clear();
  let users = [{'name': 'John', 'coins': 3},{'name': 'Vadim', 'coins': 5}, {'name': 'MarioBoy', 'coins': 6}];
  localStorage.setItem('Users', JSON.stringify(users));
}

// handling touch events
// добавляет обработчики событий для элемента canvas
let ongoingTouches = [];

export function startup() {
  let el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchcancel", handleCancel, false);
  el.addEventListener("touchmove", handleMove, false);
}

// событие о новом касании
function handleStart(evt) {
  evt.preventDefault();
  console.log("touchstart.");
  let el = document.getElementById("canvas");
  let ctx = el.getContext("2d");
  let touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    console.log("touchstart:" + i + "...");
    ongoingTouches.push(copyTouch(touches[i]));
    let color = colorForTouch(touches[i]);
    ctx.beginPath();
    ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
    ctx.fillStyle = color;
    ctx.fill();
    console.log("touchstart:" + i + ".");
  }
}

//функция ответственна за обновление данных о касании
function handleMove(evt) {
  evt.preventDefault();
  let el = document.getElementById("canvas");
  let ctx = el.getContext("2d");
  let touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let color = colorForTouch(touches[i]);
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      console.log("continuing touch "+idx);
      ctx.beginPath();
      console.log("ctx.moveTo(" + ongoingTouches[idx].pageX + ", " + ongoingTouches[idx].pageY + ");");
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      console.log("ctx.lineTo(" + touches[i].pageX + ", " + touches[i].pageY + ");");
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.stroke();

      ongoingTouches.splice(idx, 1, copyTouch(touches[i]));  // swap in the new touch record
      console.log(".");
    } else {
      console.log("can't figure out which touch to continue");
    }
  }
}

// Обработка завершения касания
function handleEnd(evt) {
  evt.preventDefault();
  let el = document.getElementById("canvas");
  let ctx = el.getContext("2d");
  let touches = evt.changedTouches;

  for (var i = 0; i < touches.length; i++) {
    let color = colorForTouch(touches[i]);
    let idx = ongoingTouchIndexById(touches[i].identifier);

    if (idx >= 0) {
      ctx.lineWidth = 4;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
      ctx.lineTo(touches[i].pageX, touches[i].pageY);
      ctx.fillRect(touches[i].pageX - 4, touches[i].pageY - 4, 8, 8);  // and a square at the end
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else {
      console.log("can't figure out which touch to end");
    }
  }
}

function handleCancel(evt) {
  evt.preventDefault();
  console.log("touchcancel.");
  var touches = evt.changedTouches;

  for (let i = 0; i < touches.length; i++) {
    let idx = ongoingTouchIndexById(touches[i].identifier);
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

function colorForTouch(touch) {
  let r = touch.identifier % 16;
  let g = Math.floor(touch.identifier / 3) % 16;
  let b = Math.floor(touch.identifier / 7) % 16;
  r = r.toString(16); // make it a hex digit
  g = g.toString(16); // make it a hex digit
  b = b.toString(16); // make it a hex digit
  var color = "#" + r + g + b;
  console.log("color for touch with identifier " + touch.identifier + " = " + color);
  return color;
}
// Копирование объекта касания
function copyTouch({ identifier, pageX, pageY }) {
  return { identifier, pageX, pageY };
}

function ongoingTouchIndexById(idToFind) {
  for (let i = 0; i < ongoingTouches.length; i++) {
    let id = ongoingTouches[i].identifier;

    if (id === idToFind) {
      return i;
    }
  }
  return -1;    // not found
}