function getStringFromDate (date) {
    const myDate = date.toString();
    const dateArr = myDate.split(" ");
    let weekDay = "";
    const day = dateArr[2];
    let month = "";
    const year = dateArr[3];
    const time = dateArr[4];

    // translate weekday
    switch(dateArr[0]) {
        case "Mon":
            weekDay = "Lunedì";
            break;
        case "Tue":
            weekDay = "Martedì";
            break;
        case "Wed":
            weekDay = "Mercoledì";
            break;
        case "Thu":
            weekDay = "Giovedì";
            break;
        case "Fri":
            weekDay = "Venerdì";
            break;
        case "Sat":
            weekDay = "Sabato";
            break;
        case "Sun":
            weekDay = "Domenica";
            break;
    }
    // translating month
    switch(dateArr[1]){
        case "Jan":
            month = "Gennaio";
            break;
        case "Feb":
            month = "Febbraio";
            break;
        case "Mar":
            month = "Marzo";
            break;
        case "Apr":
            month = "Aprile";
            break;
        case "May":
            month = "Maggio";
            break;
        case "Jun":
            month = "Giugno";
            break;
        case "Jul":
            month = "Luglio";
            break;
        case "Aug":
            month = "Agosto";
            break;
        case "Sep":
            month = "Settembre";
            break;
        case "Oct":
            month = "Ottobre";
            break;
        case "Nov":
            month = "Novembre";
            break;
        case "Dec":
            month = "Dicembre";
            break;
    }

    return `${weekDay} ${day} ${month} ${year} alle ${time}`;
}

module.exports = getStringFromDate;