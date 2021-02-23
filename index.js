const fs = require('fs');
const english = fs.readFileSync('./english.txt', 'utf-8').split('\n');
const bip39 = require('bip39');
const PREFIX = process.env.PREFIX
const COUNT = process.env.COUNT || 10
const valid = [];
let count = 0;

// getRandom function taken from https://stackoverflow.com/a/19270021
function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  let resultStr = result.join(' ');
  return resultStr;
}

let missingCount = 12-(PREFIX.split(' ').length)

while (count < COUNT) {
  let randomWords = getRandom(english, missingCount);
  if (bip39.validateMnemonic(`${PREFIX} ${randomWords}`)) {
    count++;
    valid.push(`${PREFIX} ${randomWords}`)
  }
}

console.log(`***PLEASE DO NOT USE THIS TOOL***`);

valid.forEach((v) => {
  console.log(v);
})