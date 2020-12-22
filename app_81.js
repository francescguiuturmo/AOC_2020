const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('input.dat'),
  output: process.stdout,
  console: false
});

let instructions = [];
readInterface.on('line', (line) => {
  const sLine = line.split(' ');
  instructions.push({
    operation: sLine[0],
    value: Number(sLine[1]),
    executed: false
  });
}).on('close', () => {
  let loopDetected = false;
  let i = 0;
  let accumulator = 0;
  while (!loopDetected) {
    const instruction = instructions[i];
    if (instruction.executed) {
      loopDetected = true;
    } else {
      instruction.executed = true;
      if (instruction.operation == 'nop') {
        i++;
      } else if (instruction.operation == 'acc') {
        accumulator += instruction.value;
        i++;
      } else if (instruction.operation == 'jmp') {
        i += instruction.value;
      }
    }
  }
  console.log(accumulator);
});