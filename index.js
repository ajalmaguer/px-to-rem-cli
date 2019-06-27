const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const clipboardy = require('clipboardy');

let basePx = 16;

confirmBasePx();

function confirmBasePx() {
  readline.question('16px base? Otherwise, enter new base: ', function(answer) {
    basePx = parseAnswer(answer || basePx);

    if (!basePx) {
      confirmBasePx();
    } else {
      askAndConvert();
    }
  });
}

function askAndConvert() {
  readline.question('Please enter px (or type exit): ', function(answer) {
    if (answer == 'exit') {
      return readline.close();
    }
    clearConsole();

    const parsedAnswer = parseAnswer(answer);

    if (parsedAnswer) {
      const rem = convertToRem(parsedAnswer, basePx);
      printAndCopy(parsedAnswer, rem);
    }

    askAndConvert(); //Calling this function again to ask new question
  });
}

function clearConsole() {
  console.log('\033c');
}

function parseAnswer(answer) {
  const output = parseFloat(answer);
  if (output) {
    return output;
  } else {
    console.log('Not a valid input.\n');
    return null;
  }
}

function convertToRem(px, base) {
  return px / base;
}

function printAndCopy(px, rem) {
  console.log(
    `${px}px = ${rem}rem \n\nRem value has been copied to your clipboard! 😄\n\n`
  );
  clipboardy.writeSync(`${rem}rem`);
}
