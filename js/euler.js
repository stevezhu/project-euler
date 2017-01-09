const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2), {
  default: {
    benchmark: false
  }
});

process.env.BENCHMARK = argv.benchmark;

let renameFiles = function(digits) {
  let files = fs.readdirSync('./'); // get all files in current dir
  let dirPattern = /problem-(0*)?(\d+)$/; // match and retrieve the problem number without leading zeroes
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let match = file.match(dirPattern);
    if (match !== null) {
      let num = match[2];
      let newDir = 'problem-';
      for (let j = num.length; j < digits; j++) { // prepend 0's
        newDir += '0';
      }
      newDir += num;
      fs.renameSync(file, newDir); // rename
    }
  }
};

let commands = {
  run: function(number) {
    let files = fs.readdirSync('./'); // get all files in current dir
    let pattern;
    if (number) {
      pattern = new RegExp('problem-0*' + number + '$');
    } else {
      pattern = /problem-\d+/; // match all problem-* directories
    }
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (pattern.test(file)) {
        require(path.resolve('./', file, 'run.js'));
      }
    }
  },
  rename: function(max) {
    renameFiles(3);
  }
};

let command = commands[argv._[0]];
if (command) {
  command.apply(this, argv._.slice(1));
} else {
  console.log('Invalid command. Use `run` or `rename`.');
}
