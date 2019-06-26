const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const clipboardy = require('clipboardy');



recursiveAsyncReadLine();

function recursiveAsyncReadLine() {
  readline.question('Please enter px: ', function(answer) {
    if (answer == 'exit') {
      return readline.close();
    }
    clearConsole();


    let rem;
    try {
      rem = parseFloat(answer) / 16;
    } catch (error) {
      console.log('not a valid input');
    }

    console.log(`${answer}px = ${rem}rem \n\nIt has been copied to your clipboard! 😄\n\n`);
    clipboardy.writeSync(`${rem}rem`);

    recursiveAsyncReadLine(); //Calling this function again to ask new question
  });
}

function clearConsole() {
  console.log('\033c');
}


function pbcopy(data) {
  var proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
}