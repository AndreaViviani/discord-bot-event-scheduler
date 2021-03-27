function getDate (date) {
    const moment = require('moment');


    const dateArr = date.split("T");
    // extracting day and time 
    const day = dateArr[0];
    const time = dateArr[1];
    
    //extracting month, year exactday
    const dayArr = day.split("/");
    const year = dayArr[2];
    const month = dayArr[1];
    const exactDay = dayArr[0];

    // setting time in the right format
    const exactTime = time.concat(":00");

    //creating new dat obj 
    const timestamp = Date.parse(`${year}-${month}-${exactDay}T${exactTime}`);

    return timestamp;
}

module.exports = {getDate: getDate};