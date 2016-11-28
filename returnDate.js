module.exports = function () {
    var d = new Date();
    var month = d.getMonth();
    var day = d.getDate();
    var hours = d.getHours() - 4;
    var min = d.getMinutes();
    switch (month) {
        case 0:
            month = 'Jan';
            break;
        case 1:
            month = 'Feb';
            break;
        case 2:
            month = 'Mar';
            break;
        case 3:
            month = 'Apr';
            break;
        case 4:
            month = 'May';
            break;
        case 5:
            month = 'Jun';
            break;
        case 6:
            month = 'Jul';
            break;
        case 7:
            month = 'Aug';
            break;
        case 8:
            month = 'Sep';
            break;
        case 9:
            month = 'Oct';
            break;
        case 10:
            month = 'Nov';
            break;
        
        default:
            month = 'Dec';
    }
    if (hours >= 12) {
        min += ' PM';
    } else {
        min += ' AM';
    }
    if (hours >= 13) {
        hours -= 12;
    }
    return month + ' ' + day + ', ' + hours + ':' + min;
};