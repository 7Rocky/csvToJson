# csvToJson
_This application transforms CSV data to JSON data._

## Get started

To run the application, yo must follow the following steps:
* Clone or download this repository

  ```
  $ git clone https://github.com/7Rocky/csvToJson
  $ cd csvToJson
  ```
* Install project dependencies with
  ```
  $ npm install
  ```
  - Note: If [Node.js](https://nodejs.org/es/) or [npm](https://www.npmjs.com) are not installed in your system, go to Node.js or npm web pages and follow the installation guide (it will take less than 5 minutes).
* Copy your **.csv** file to `/csvToJson`
* Use the following command: 
  ```
  $ node index.js <csvFilePath>
  ```
  - Note: The argument `<csvFilePath>` is required. You must use a relative path, such as: `./your_file.csv`.

## Results
Your data in **.csv** format will be converted to a **.json** file with the same filename an in the same directory as the **.csv** file.

In the repository you can find an example with
_data.csv => data.json_

## Comments
If you have any comments on the code, or problems using the application, I'll be glad to answer you.

Hope it is useful! :smile:
