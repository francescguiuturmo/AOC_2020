const readline = require('readline');
const fs = require('fs');
const readInterface = readline.createInterface({
  input: fs.createReadStream('input.dat'),
  output: process.stdout,
  console: false
});

let emptyBags = new Set();
let allBags = new Map();
const bagToFind = 'shiny gold';
readInterface.on('line', (line) => {
  const sLine = line.split(' contain ');
  const colorContainerBag = sLine[0].replace(' bags', '');
  const containingBags = sLine[1];
  if (containingBags == 'no other bags.') {
    emptyBags.add(colorContainerBag);
  } else {
    const sContainingBags = containingBags.split(', ');
    const containingBagsDetails = [];
    for (const containingBag of sContainingBags) {
      const quantity = Number(containingBag.substring(0, 1));
      const colorContainingBag = containingBag.substring(2).replace('.', '').replace(' bags', '').replace(' bag', '');
      containingBagsDetails.push({
        color: colorContainingBag,
        quantity: quantity
      })
    }
    allBags.set(colorContainerBag, containingBagsDetails);
  }
}).on('close', () => {
  const count = getBagsQuantity(bagToFind, 1);
  console.log(count);
});

const getBagsQuantity = (color, multi) => {
  if (emptyBags.has(color)) {
    console.log(`Empty bag ${color}`);
    return 0;
  } else {
    const containingBagsDetails = allBags.get(color);
    let sum = 0;
    for (const containedBag of containingBagsDetails) {
      console.log(`PRE ${color} ${containedBag.color} ${containedBag.quantity} ${sum}`);
      sum += containedBag.quantity*multi + getBagsQuantity(containedBag.color, containedBag.quantity*multi);
      console.log(`POST ${color} ${containedBag.color} ${containedBag.quantity} ${sum}`);
    }
    return sum;
  }
}