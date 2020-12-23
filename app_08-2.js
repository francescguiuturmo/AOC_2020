const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('input.dat'),
  output: process.stdout,
  console: false
});

let instructions = [];
let jmpInstructions = [];
let lineNumber = 0;
readInterface.on('line', (line) => {
  const sLine = line.split(' ');
  instructions.push({
    operation: sLine[0],
    value: Number(sLine[1]),
    executed: false
  });
  if (sLine[0] == 'jmp') {
    jmpInstructions.push(lineNumber);
  }
  lineNumber++
}).on('close', () => {
  let found = false;
  let loopDetected = false;
  let i = 0;
  let accumulator = 0;
  for (let j = 0; j < jmpInstructions.length && !found; j++) {
    instructions[jmpInstructions[j]].operation = 'nop';
    while (!loopDetected && i < instructions.length) {
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
    if (!loopDetected) {
      found = true;
    } else {
      for (const instruction of instructions) {
        instruction.executed = false;
      }
      loopDetected = false
      accumulator = 0;
      i = 0;
      instructions[jmpInstructions[j]].operation = 'jmp';
    }
  }
  console.log(accumulator);
});