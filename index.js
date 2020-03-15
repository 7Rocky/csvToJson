const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const INDENT_SPACES = 2;
const INPUT_FORMAT = '.csv';
const OUTPUT_FORMAT = '.json';

const BACKGROUND_GREEN = '\u001b[42;1m';

const COLOR_GREEN = '\033[0;32m';
const COLOR_RED = '\033[0;31m';

const RESET = '\033[0m';

const jsonData = [];

let csvFilePath = process.argv[2];
let time;

if (csvFilePath) {
  csvFilePath = csvFilePath.trim();

  if (csvFilePath.endsWith(INPUT_FORMAT)) {
    jsonFilePath = csvFilePath.replace(INPUT_FORMAT, OUTPUT_FORMAT);

    time = Date.now();

    fs.open(
      jsonFilePath, 'w',
      error => error ?
        handleError(error) :
        showSuccess(`Created file ${RESET}${BACKGROUND_GREEN} ${jsonFilePath} `)
    );

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', csvItem => jsonData.push(csvItem))
      .on('end', () => appendDataToFile(jsonData, jsonFilePath));
  
  } else {
    showError(`A ${INPUT_FORMAT} file must be specified for the conversion`);
  }

} else {
  showError('No input file specified\n\nYou must use the following command:'); 
  console.log('node index.js <csvFilePath>\n');
}

/**
 * Takes data object and writes it in the specified file in JSON format
 * @method appendDataToFile
 * @param {Object} data
 * @param {string} file
 */
function appendDataToFile(data, file) {
  for (item of data) {
    for (attr in item) {
      if (!isNaN(Number(item[attr]))) {
        item[attr] = Number(item[attr]);
      }
    }
  }

  fs.appendFile(
    file,
    JSON.stringify(data, null, INDENT_SPACES) + '\n',
    handleError
  );
  
  showSuccess(`Ended conversion in ${RESET}${BACKGROUND_GREEN} ${Date.now() - time} ms `);
  
  showInfo(`Your ${OUTPUT_FORMAT} file => ${path.join(__dirname, file)}`);
}

/**
 * If there is an error, it is displayed in console
 * @method handleError
 * @param {Object} error
 */
function handleError(error) {
  if (error) {
    console.log(error);
  }
}

/**
 * Displays a message with a preffix 'ERROR: ' in red color
 * @method showError
 * @param {string} message
 */
function showError(message) {
  console.log(`\n${COLOR_RED}ERROR: ${message}${RESET}\n`);
}

/**
 * Displays a message with a preffix 'SUCCESS: ' in green color
 * @method showSuccess
 * @param {string} message
 */
function showSuccess(message) {
  console.log(`\n${COLOR_GREEN}SUCCESS: ${message}${RESET}\n`);
}

/**
 * Displays a message with a preffix 'INFO: '
 * @method showInfo
 * @param {string} message
 */
function showInfo(message) {
  console.log(`\nINFO: ${message}\n`);
}
