const csv = require('csv-parser');
const fs = require('fs');

const INDENT_SPACES = 2;
const INPUT_FORMAT = '.csv';
const OUTPUT_FORMAT = '.json';

const COLOR_GREEN = '\033[0;32m';
const COLOR_RED = '\033[0;31m';
const COLOR_RESET = '\033[0m';
  
const handleError = error => error ? console.log(error) : null;

const showError = message => console.log(`\n${COLOR_RED}ERROR: ${message}${COLOR_RESET}\n`);

const showSuccess = message => console.log(`\n${COLOR_GREEN}SUCCESS: ${message}${COLOR_RESET}\n`);

const showInfo = message => console.log(`\nINFO: ${message}\n`);

const data = [];

let inputFilePath = process.argv[2];

if (inputFilePath) {
  inputFilePath = inputFilePath.trim();

  if (inputFilePath.endsWith(INPUT_FORMAT)) {
    outputFilePath = inputFilePath.replace(INPUT_FORMAT, OUTPUT_FORMAT);

    fs.open(outputFilePath, 'w', error => error ? handleError(error) : showSuccess(`Created file ${outputFilePath}`));

    fs.createReadStream(inputFilePath)
      .pipe(csv())
      .on('data', item => data.push(item))
      .on('end', () => {
        fs.appendFile(outputFilePath, JSON.stringify(data, null, INDENT_SPACES) + '\n', handleError);
        showSuccess('End of conversion');
        showInfo(`Your ${OUTPUT_FORMAT} file => ${__dirname}/${outputFilePath.slice(2)}`);
      });
      
  } else {
    showError(`A ${INPUT_FORMAT} file must be specified for the conversion`);
  }
} else {
  showError('No input file specified\n\nYou must use the following command:'); 
  console.log('node index.js <inputFilePath>\n');
}
