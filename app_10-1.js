const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('input.dat'),
  output: process.stdout,
  console: false
});

let jolts = [];
let d1 = 0;
let d3 = 0;
readInterface.on('line', (line) => {
  jolts.push(Number(line));
}).on('close', () => {
  jolts.push(0);
  jolts = jolts.sort((a, b) => a-b);
  jolts.push(jolts[jolts.length-1] + 3);
  for (let i=1; i<jolts.length; i++) {
    if (jolts[i] - jolts[i-1] == 1) {
      d1++;
    } else if (jolts[i] - jolts[i-1] == 3) {
      d3++;
    }
  }
  console.log(`${d1} ${d3} ${d1*d3}`);
});