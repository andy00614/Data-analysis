const fs = require('fs');
const csv = require('csv-parser');

let date2Data = {};

fs.createReadStream('./data.csv') // replace with your csv file
  .pipe(csv({ separator: '\t' })) // use tab as separator
  .on('data', (row) => {
    let key = `${row['Start Date']}\t${row['End Date']}`;
    if (!date2Data[key]) {
      date2Data[key] = [];
    }
    date2Data[key].push(parseFloat(row['User Retention'].replace('%', '')));
  })
  .on('end', () => {
    console.log(date2Data);
  });
