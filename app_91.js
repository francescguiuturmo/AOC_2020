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
readInterface.on('line', (line) => {
  numbers.push(Number(line));
}).on('close', () => {
  for (let i=preamble; i<numbers.length-1 && !found; i++) {
    const target = numbers[i];
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
      console.log(target);
    }
  }
});