'use strict'
let menuList = document.querySelector('.list-block')

window.onhashchange = switchToStateFromURLHash

let SPAState = {}

function switchToStateFromURLHash () {
  let URLHash = window.location.hash
  let stateStr = URLHash.substr(1)

  if (stateStr !== '')
  {
    SPAState = { pagename: stateStr }
  } else
    SPAState = { pagename: 'Main' }

  console.log('Новое состояние приложения:')
  console.log(SPAState)

  let pageHTML = ''
  switch (SPAState.pagename) {
    case 'Main':
      pageHTML += '<div class=\'main\'>'
      pageHTML += '<div class=\'logo\'></div>'
      pageHTML += '</div>'
      break
    case 'Game':
      pageHTML += '<div class=\'rotate-to-portrait\'><span>Turn the screen</span></div>'
      pageHTML += '<div class=\'game-block\'>'
      pageHTML += '<input class=\'buttons main-menu-bottom\' type=\'button\' value=\'Back To Menu\' onclick=\'switchToMainPage()\'>'
      pageHTML += '<div class=\'main-field\' style=\'text-align : center;\'>'
      pageHTML += '<svg id=\'field\' style=\'\'></svg>'
      break
    case 'Rules':
      pageHTML += '<input class=\'buttons main-menu-bottom\' type=button value=\'Back To Menu\' onclick=\'switchToMainPage()\'>'
      pageHTML += '<div class=\'rules\'>'
      pageHTML += '<p class=\'title\'>Config<p>'
      pageHTML += '<p>Press A to run to the left!</p>'
      pageHTML += '<p>Press W to jump!</p>'
      pageHTML += '<p>Press D to run to the right!</p>'
      pageHTML += '<p>Press the space bar in an enhanced form to release fireballs!</p>'
      pageHTML += '<br>'
      pageHTML += '<p>GOOD LUCK!</p>'
      pageHTML += '</div>'
      break
    case 'About':
      pageHTML += '<input class=\'buttons main-menu-bottom\' type=button value=\'Back To Menu\' onclick=\'switchToMainPage()\'>'
      pageHTML += '<div class=\'rules\'>'
      pageHTML += '<p class=\'title\'>Subtitles<p>'
      pageHTML += '<p>Developed by Vadim Lopushok</p>'
      pageHTML += '</div>'
  }

  document.getElementById('IPage').innerHTML = pageHTML

  if (SPAState.pagename === 'Game') {
    //startFlag = true                       //меняем флаг для запуска игры при возврате на вкладку
    //game = new modelGame()
    //game.start()
  }

  if (SPAState.pagename !== 'Main') {
    menuList.style.display = 'none'          //скрываем меню во время игры
  } else {
    menuList.style.display = ''
  }
}

function switchToState (newState) {
  let stateStr = newState.pagename
  location.hash = stateStr
}

function switchToMainPage () {
  switchToState({ pagename: 'Main' })
}

function switchToGamePage (photoId) {
  switchToState({ pagename: 'Game' })
}

function switchToRulesPage () {
  switchToState({ pagename: 'Rules' })
}

function switchToRecordsPage () {
  switchToState({ pagename: 'About' })
}

switchToStateFromURLHash()