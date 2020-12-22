const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('input.dat'),
  output: process.stdout,
  console: false
});

const preamble = 25;
const numbers = [];
let found = false;
let invalidIndex = 0;
let target = 0;
readInterface.on('line', (line) => {
  numbers.push(Number(line));
}).on('close', () => {
  for (let i=preamble; i<numbers.length-1 && !found; i++) {
    target = numbers[i];
    const numbersToSum = numbers.slice(i-preamble, i);
    let targetReached = false;
    for (let j=0; j<numbersToSum.length-1 && !targetReached; j++) {
      for (let k=j+1; k<numbersToSum.length && !targetReached; k++) {
        if (numbersToSum[j] + numbersToSum[k] == target) {
          targetReached = true;
        }
      }
    }
    if (!targetReached) {
      found = true;
      invalidIndex = i;
      console.log(target);
    }
  }
  let numbersToSum = [];
  let sum = 0;
  for (let i=0; i<invalidIndex-1; i++) {
    let j = i+1;
    sum = numbers[i] + numbers[j];
    numbersToSum.push(numbers[i]);
    numbersToSum.push(numbers[j]);
    while (sum < target) {
      j++;
      sum += numbers[j];
      numbersToSum.push(numbers[j]);
    }
    if (sum == target) {
      console.log(Math.min(...numbersToSum) + Math.max(...numbersToSum));
      break;
    } else {
      numbersToSum = [];
      sum = 0
    }
  }
});