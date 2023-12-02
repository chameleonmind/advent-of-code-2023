/**
 * --- Day 1: Trebuchet?! ---
 *
 * Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.
 *
 * You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
 *
 * You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").
 *
 * As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.
 *
 * The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.
 *
 * --- Part Two ---
 *
 * Your calculation isn't quite right. It looks like some of the digits are actually spelled out with letters: one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".
 *
 * Equipped with this new information, you now need to find the real first and last digit on each line. For example:
 *
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 * In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76. Adding these together produces 281.
 *
 * What is the sum of all of the calibration values?
 */

import { calibrationInput } from './1-day-input.js'

export const sampleDocument = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

export const additionalSampleDocument = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

const numberMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9'
}

/**
 * Replaces number names with numbers, but it keeps the first and last character of a number name
 * to cover the cases such as oneight, which should be converted to 18
 * @param str { string } - the string to be parsed
 * @param index { number } - the index of the number name to be replaced
 * @returns {*|string|string}
 */
function replaceNumberNamesWithNumbers (str = '', index = 0) {
  const numberMapKeys = Object.keys(numberMap)
  if (index < numberMapKeys.length) {
    const key = numberMapKeys[index] // one, two, three etc
    const regex = new RegExp(key, 'g')
    // keep the first and last letter of the word, replace the middle with the number
    // needed to cover cases such as oneight, which should be converted to 18
    const newStr = str.replace(regex, `${key[0]}${numberMap[key]}${key[key.length - 1]}`)
    return replaceNumberNamesWithNumbers(newStr, index + 1)
  } else {
    return str
  }
}

function findSumOfCalibrationValues (calibrationDocument = '') {
  const doc = calibrationDocument.trim().split('\n')
  let totalSum = 0

  for (let i = 0; i < doc.length; i++) {
    const parsedNumberNames = replaceNumberNamesWithNumbers(doc[i].toLowerCase())

    let numOnly = parsedNumberNames.replace(/\D/g, '')

    if (!numOnly) {
      numOnly = '0'
    }

    const firstDigit = numOnly[0]
    const lastDigit = numOnly[numOnly.length - 1]
    const completeDigit = `${firstDigit}${lastDigit}`

    totalSum += parseInt(completeDigit)
  }

  return totalSum
}

export function trebuchetCalculateSum () {
  const sum = findSumOfCalibrationValues(calibrationInput)
  console.log('Sum of calibration values:', sum)
}
