var secondsToFormatHourMinute = function(seconds) {
    var m = moment.duration(seconds, 'seconds');
    var minutes = m.minutes();
    var hours = Math.floor(m.asHours());

    if(minutes < 10) {
        return hours + ':0' + minutes;
    } else {
        return hours + ':' + minutes;
    }
};
