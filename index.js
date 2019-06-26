const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const clipboardy = require('clipboardy');

recursiveAsyncReadLine();

function recursiveAsyncReadLine() {
  readline.question('Please enter px (or type exit): ', function(answer) {
    if (answer == 'exit') {
      return readline.close();
    }
    clearConsole();

    const parsedAnswer = parseAnswer(answer);

    if (parsedAnswer) {
      const rem = convertToRem(parsedAnswer);
      printAndCopy(parsedAnswer, rem);
    }

    recursiveAsyncReadLine(); //Calling this function again to ask new question
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

function convertToRem(px) {
  return px / 16;
}

function printAndCopy(px, rem) {
  console.log(
    `${px}px = ${rem}rem \n\nIt has been copied to your clipboard! 😄\n\n`
  );
  clipboardy.writeSync(`${rem}rem`);
}
