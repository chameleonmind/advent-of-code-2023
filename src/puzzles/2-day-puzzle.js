import { day2PuzzleInput1, day2InitialInput } from './2-day-input.js'

function getParsedTryouts (tryout = '') {
  const tryoutArr = tryout.trim().split(', ')
  const tryoutColorValues = {
    red: 0,
    green: 0,
    blue: 0
  }
  tryoutArr.forEach(color => {
    const c = color.trim().split(' ')
    tryoutColorValues[c[1]] = parseInt(c[0])
  })
  return tryoutColorValues
}

function parseSample (sample = day2InitialInput) {
  const games = sample.trim().split('\n')
  return games.map(game => {
    const gameNumber = game.split(':')[0].trim()
    const gameTryouts = game.split(':')[1].trim().split(';')
    const tryoutsInfo = []
    gameTryouts.forEach(tryout => {
      tryoutsInfo.push(getParsedTryouts(tryout))
    })

    return {
      gameNumber,
      gameId: parseInt(gameNumber.match(/\d+/g)[0]),
      gameTryoutsInfo: tryoutsInfo
    }
  })
}

const maxCubes = {
  red: 12,
  green: 13,
  blue: 14
}

function getMaximumNumberOfCubesInAllGames (allGames = []) {
  const gameMax = {}

  allGames.forEach(game => {
    gameMax[game.gameId] = {
      maxRed: 0,
      maxGreen: 0,
      maxBlue: 0
    }
    game.gameTryoutsInfo.forEach(tryout => {
      const redCubes = tryout.red
      const greenCubes = tryout.green
      const blueCubes = tryout.blue

      if (!gameMax[game.gameId].maxRed || redCubes > gameMax[game.gameId].maxRed) {
        gameMax[game.gameId].maxRed = redCubes
      }

      if (!gameMax[game.gameId].maxGreen || greenCubes > gameMax[game.gameId].maxGreen) {
        gameMax[game.gameId].maxGreen = greenCubes
      }

      if (!gameMax[game.gameId].maxBlue || blueCubes > gameMax[game.gameId].maxBlue) {
        gameMax[game.gameId].maxBlue = blueCubes
      }
    })
  })

  return gameMax
}

function calculatePowerOfCubes (gameMaxCubes = {}) {
  let totalPower = 0
  Object.keys(gameMaxCubes).forEach(gameId => {
    const game = gameMaxCubes[gameId]
    totalPower += game.maxRed * game.maxGreen * game.maxBlue
  })

  return totalPower
}

function calculateValidGames (games = [], logMessage = 'Valid games:') {
  const validGames = []

  games.forEach(game => {
    const valid = game.gameTryoutsInfo.every(tryout => {
      const redCubes = tryout.red
      const greenCubes = tryout.green
      const blueCubes = tryout.blue

      return redCubes <= maxCubes.red && greenCubes <= maxCubes.green && blueCubes <= maxCubes.blue
    })

    if (valid) {
      validGames.push(game)
    }
  })

  const getMaxCubes = getMaximumNumberOfCubesInAllGames(games)
  const powerOfCubes = calculatePowerOfCubes(getMaxCubes)

  console.log('1. Sum in ' + logMessage, validGames.reduce((acc, curr) => acc + curr.gameId, 0))
  console.log('2. Power of cubes in ' + logMessage, powerOfCubes)
}

export function day2GetGameAnswers () {
  const sampleGames = parseSample(day2InitialInput)
  calculateValidGames(sampleGames, 'valid sample games:')

  const actualGames = parseSample(day2PuzzleInput1)
  calculateValidGames(actualGames, 'valid actual games:')
}
