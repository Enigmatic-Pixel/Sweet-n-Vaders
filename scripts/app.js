
// Space invaders

function setupGame() {

  const width = 25
  const gridSize = width ** 2
  const grid = document.querySelector('.grid')
  const cells = []
  //cells start from 0 - 624
  const topRow = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const bottomRow = [600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624]
  const rightColumn = [624, 599, 574, 549, 524, 499, 474, 449, 424, 399, 374, 349, 324, 299, 274, 249, 224, 199, 174, 149, 124, 99, 74, 49, 24]
  const leftColumn = [600, 575, 550, 525, 500, 475, 450, 425, 400, 375, 350, 325, 300, 275, 250, 225, 200, 175, 150, 125, 100, 75, 50, 25, 0]
  let ship = 612
  let bullet = ship
  let gameOver = false

  const livesShown = document.querySelector('#lives')
  let lives = 3
  livesShown.innerHTML = lives
  const scoreShown = document.querySelector('#score')
  let points = 0
  scoreShown.innerHTML = points


  // ======= create board ===========
  for (let i = 0; i < gridSize; i++) {
    const cell = document.createElement('div')
    grid.appendChild(cell)
    cells.push(cell)
  }
  cells[ship].classList.add('ship')
  const aliens = []
  aliens.forEach((e) => {
    cells[e].classList.add('alien')
  })

  // ========= Start Screen Buttons ===============
  const titlePage = document.querySelector('header')
  const gamePage = document.querySelector('main')
  const startButton = document.querySelector('#start')
  const aButton = document.querySelector('#a')
  const dButton = document.querySelector('#d')
  const spacebarButton = document.querySelector('#spacebar')

  spacebarButton.addEventListener('mouseover', () => {
    spacebarButton.classList.add('hover')
    spacebarButton.innerHTML = 'Shoots Bullet'
  })
  spacebarButton.addEventListener('mouseout', () => {
    spacebarButton.classList.remove('hover')
    spacebarButton.innerHTML = 'Spacebar'
  })

  aButton.addEventListener('mouseout', () => {
    aButton.classList.remove('hover')
    aButton.innerHTML = 'A'
  })
  aButton.addEventListener('mouseover', () => {
    aButton.classList.add('hover')
    aButton.innerHTML = 'Move left'
  })

  dButton.addEventListener('mouseout', () => {
    dButton.classList.remove('hover')
    dButton.innerHTML = 'D'
  })
  dButton.addEventListener('mouseover', () => {
    dButton.classList.add('hover')
    dButton.innerHTML = 'Move right'
  })

  startButton.addEventListener('mouseover', () => {
    startButton.classList.add('hover')
    startButton.style.padding = '10px 30px 60px 30px'
    startButton.style.width = '400px'
    startButton.style.fontSize = '40px'
  })
  startButton.addEventListener('mouseout', () => {
    startButton.classList.remove('hover')
    startButton.style.padding = ''
    startButton.style.width = ''
    startButton.style.fontSize = ''
  })

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      spacebarButton.classList.add('hover')
      spacebarButton.innerHTML = 'Shoots Bullet'
    }
    if (e.keyCode === 65) {
      aButton.classList.add('hover')
      aButton.innerHTML = 'Move left'
    }
    if (e.keyCode === 68) {
      dButton.classList.add('hover')
      dButton.innerHTML = 'Move right'
    }
  })

  document.addEventListener('keyup', () => {
    spacebarButton.classList.remove('hover')
    spacebarButton.innerHTML = 'Spacebar'
    aButton.classList.remove('hover')
    aButton.innerHTML = 'A'
    dButton.classList.remove('hover')
    dButton.innerHTML = 'D'
  })

  startButton.addEventListener('click', () => {
    setTimeout(() => {
      titlePage.style.display = 'none'
      gamePage.style.display = 'flex'
    }, 200)
    setTimeout(() => {
      startGame()
    }, 1000)
  })

  //
  function startGame() {
    bombsInPlay = 0
    topRow.forEach((position) => {
      if ((position > 2) && (position < 22)) {
        aliens.push(position)
        cells[position].classList.add('alien')
      }
    })
  }

  let bulletsShot = 0
  const bulletArrayOfArrays = []
  let newBullet = ship - width

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 65: {
        if (ship === 600) {
          return
        }
        cells[ship].classList.remove('ship')
        ship = ship - 1
        cells[ship].classList.add('ship')
        break
      }
      case 68: {
        if (ship === 624) {
          return
        }
        cells[ship].classList.remove('ship')
        ship = ship + 1
        cells[ship].classList.add('ship')
        break
      }
      case 32: {
        bullet = ship - width
        cells[bullet].classList.add('bullet')
        bulletArrayOfArrays.push([bullet])
        bulletShot()
        bulletsShot += 1
        break
      }
    }
  })


  function bulletShot() {
    const bulletArray = bulletArrayOfArrays[bulletsShot]
    const interval = setInterval(() => {
      cells[bulletArray[0]].classList.remove('bullet')
      newBullet = bulletArray[0] - width
      cells[newBullet].classList.add('bullet')
      bulletArray.splice(0, 1)
      bulletArray.push(newBullet)
      for (let i = 0; i < aliens.length; i++) {
        if (bulletArray.includes(aliens[i])) {
          points += 1
          scoreShown.innerHTML = points
          cells[bulletArray[0]].classList.remove('alien')
          cells[bulletArray[0]].classList.add('explosion')
          setTimeout(() => {
            cells[bulletArray[0]].classList.remove('explosion')
          }, 400)
          aliens.splice(i, 1)
          clearInterval(interval)
          cells[bulletArray[0]].classList.remove('bullet')
        }
        checkGameOver()
        if (gameOver === true) {
          clearInterval(interval)
        }
      }
    }, 50)

    setTimeout(() => {
      clearInterval(interval)
      setTimeout(() => {
        topRow.forEach((i) => {
          if (cells[i].className === 'bullet') {
            cells[i].classList.remove('bullet')
          }
        })
        for (let i = 0; i < cells.length; i++) {
          if (newBullet === i) {
            return
          } else {
            cells[i].classList.remove('bullet')
          }
        }
      }, 40)
    }, 1150)
  }

  let bombsDropped = 0
  const bombArrayOfArrays = []
  let newBomb

  const life3 = document.querySelector('#heartThree')
  const life2 = document.querySelector('#heartTwo')
  const life1 = document.querySelector('#heartOne')

  function lifeCycle() {
    if (lives === 3) {
      life3.style.background = ''
      life2.style.background = ''
      life1.style.background = ''
    }
    if (lives === 2) {
      life3.style.background = 'none'
    } else if (lives === 1) {
      life2.style.background = 'none'
    } else if (lives === 0) {
      life1.style.background = 'none'
    }
  }

  function bombDrops() {
    const bombArray = bombArrayOfArrays[bombsDropped]
    const interval2 = setInterval(() => {
      checkGameOver()
      if (gameOver === true) {
        clearInterval(interval2)
        removeRandomAliens()
        return
      }
      cells[bombArray[0]].classList.remove('bomb')
      newBomb = bombArray[0] + width
      cells[newBomb].classList.add('bomb')
      bombArray.splice(0, 1)
      bombArray.push(newBomb)
      if (bombArray.includes(ship)) {
        console.log('ship hit')
        lives -= 1
        livesShown.innerHTML = lives
        lifeCycle()
        cells[bombArray[0]].classList.add('explosion')
        setTimeout(() => {
          cells[bombArray[0]].classList.remove('explosion')
        }, 400)
        clearInterval(interval2)
        cells[bombArray[0]].classList.remove('bomb')
        bombsInPlay -= 1
      } else if (newBomb > 599) {
        setTimeout(() => {
          cells[bombArray[0]].classList.remove('bomb')
        }, 60)
        clearInterval(interval2)
        bombsInPlay -= 1
      }
    }, 150)
  }

  let random = 6
  let bombsInPlay = 0
  let bombWave = 5

  setInterval(() => {
    if (aliens.length > 0) {
      random = aliens[Math.floor(Math.random() * aliens.length)]
      bombDrop(random)
    }
  }, 200)

  function bombDrop(random) {
    console.log(bombWave)
    if (bombsInPlay < bombWave) {
      if (cells[random + width].className === ('alien') || (cells[random + 24].className === ('alien'))) {
        return
      } else {
        cells[random + width].classList.add('bomb')
        bombArrayOfArrays.push([random + width])
        bombDrops()
        bombsDropped += 1
        bombsInPlay += 1
      }
    }
  }


  function moveSingleAlien(cells, oldPosition, newPosition, index) {
    cells[oldPosition].classList.remove('alien')
    aliens[index] = newPosition
    cells[newPosition].classList.add('alien')
    checkLastRow()
  }


  let runTime = 0
  let waveSize = 3

  function addAliens() {
    if (runTime < waveSize) {
      topRow.forEach((position) => {
        if ((position > 5) && (position < 25) && (runTime % 2 === 0)) {
          aliens.push(position)
          cells[position].classList.add('alien')
        } else if ((position > -1) && (position < 19) && (runTime % 2 !== 0)) {
          aliens.push(position)
          cells[position].classList.add('alien')
        }
      })
      runTime += 1
    }
  }

  let direction = 'right'
  let moveDown = true

  function rightColumnOccupied() {
    return rightColumn.some((i) => {
      return cells[i].className === 'alien'
    })
  }

  function leftColumnOccupied() {
    return leftColumn.some((i) => {
      return cells[i].className === 'alien'
    })
  }

  setInterval(() => {
    calculateDirection()
    switch (direction) {
      case 'left': {
        aliens.forEach((position, index) => {
          moveSingleAlien(cells, position, position - 1, index)
        })
        break
      }
      case 'right': {
        for (let i = aliens.length - 1; i >= 0; i--) {
          moveSingleAlien(cells, aliens[i], aliens[i] + 1, i)
        }
        break
      }
      case 'down': {
        aliens.forEach((position, index) => {
          moveSingleAlien(cells, position, position + width, index)
        })
        addAliens()
        break
      }
    }
  }, 500)


  function calculateDirection() {
    if (rightColumnOccupied() && moveDown) {
      direction = 'down'
      moveDown = false
    } else if (rightColumnOccupied() && !moveDown) {
      direction = 'left'
      moveDown = true
    } else if (leftColumnOccupied() && moveDown) {
      direction = 'down'
      moveDown = false
    } else if (leftColumnOccupied() && !moveDown) {
      direction = 'right'
      moveDown = true
    }
  }

  function checkLastRow() {
    bottomRow.forEach((i) => {
      if (cells[i].className === 'alien') {
        lives -= 1
        livesShown.innerHTML = lives
        lifeCycle()
        aliens.forEach((position, index) => {
          if (position === i) {
            cells[i].classList.remove('alien')
            aliens.splice(index, 1)
            checkGameOver()
          }
        })
      }
    })
  }

  function removeRandomAliens() {
    for (let i = 0; i < cells.length; i++) {
      if (aliens.length < 1) {
        cells[i].classList.remove('bomb')
        cells[i].classList.remove('bullets')
      }
      if (aliens.includes(i)) {
        return
      } else {
        cells[i].classList.remove('alien')
      }
    }
  }

  let result = ''
  let wave = 1
  const gameEnd = document.querySelector('.gameOver')
  const winnerTitle = document.querySelector('h3')
  const winnerContent = document.querySelector('#tryAgain')
  const pageText = document.querySelector('.pageText')
  const waveShown = document.querySelector('#wave')
  const header = document.querySelector('#gameHeader')

  function checkGameOver() {
    if (lives <= 0) {
      lives = 0
      points = 0
      gameOver = true
      result = 'loss'
      console.log('You loose')
      aliens.splice(0, aliens.length)
      removeRandomAliens()
    } else if (aliens.length < 1) {
      gameOver = true
      result = 'win'
      console.log('You win')
      aliens.splice(0, aliens.length)
      removeRandomAliens()
    }

    if (result === 'loss') {
      grid.style.display = 'none'
      header.style.marginTop = '10%'
      pageText.style.marginBottom = '700px'
      winnerContent.innerHTML = 'You lost, try again!'
      winnerTitle.innerHTML = 'Game Over!'
      winnerTitle.style.fontSize = '80px'
      restartButton.innerHTML = 'Restart'
      gameEnd.style.display = 'flex'
    } else if (result === 'win') {
      grid.style.display = 'none'
      header.style.marginTop = '10%'
      pageText.style.marginBottom = '700px'
      winnerTitle.innerHTML = 'Congratulations!'
      winnerContent.innerHTML = 'You win, play again!'
      winnerTitle.style.fontSize = '70px'
      restartButton.innerHTML = 'Next wave'
      gameEnd.style.display = 'flex'
    }
  }

  const restartButton = document.querySelector('#restart')
  const countDown = document.querySelector('#countDown')
  let countDownNum = 3

  restartButton.addEventListener('mouseover', () => {
    restartButton.classList.add('hover')
  })
  restartButton.addEventListener('mouseout', () => {
    restartButton.classList.remove('hover')
  })

  restartButton.addEventListener('click', () => {
    if (result === 'win') {
      waveSize += 1
      bombWave += 1
      wave += 1
    }
    result = ''
    gameOver = false
    lives = 3
    runTime = 0
    direction = 'right'
    moveDown = true

    const endInterval = setInterval(() => {
      if (countDownNum >= 0) {
        countDown.style.display = 'block'
        countDown.innerHTML = countDownNum
        countDownNum -= 1
      } else {
        countDownNum = 3
        countDown.style.display = 'none'
        clearInterval(endInterval)
      }
    }, 1000)

    setTimeout(() => {
      gameEnd.style.display = 'none'
      restartButton.style.display = 'none'
      pageText.style.marginBottom = '700px'
      waveShown.style.display = 'flex'
      waveShown.innerHTML = 'Wave ' + wave
      winnerContent.innerHTML = ''
      winnerTitle.innerHTML = ''
      gameEnd.style.display = 'flex'
    }, 5000)

    setTimeout(() => {
      header.style.marginTop = '1%'
      waveShown.style.display = 'none'
      restartButton.style.display = 'block'
      pageText.style.marginBottom = ''
      gameEnd.style.display = 'none'
      grid.style.display = 'flex'
      livesShown.innerHTML = lives
      lifeCycle()
      scoreShown.innerHTML = points
      setTimeout(() => {
        startGame()
      }, 500)
    }, 6000)
  })
}

document.addEventListener('DOMContentLoaded', setupGame)
