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

var metersToKilometers = function(meters) {
    return meters/1000;
};

var formatSpeed = function(speed) {
    return speed * 3.6;
};
var formatHeartrate = function(h) {
    return h;
};

var getValueForKey = function(key) {
    return function(field) {
        return field[key];
    };
};

var minOfSets = function(sets, valueFunction) {
    var minsOfSets = sets.map(function(s) {
        return d3.min(s, valueFunction);
    });
    return d3.min(minsOfSets);
};

var maxOfSets = function(sets, valueFunction) {
    var maxsOfSets = sets.map(function(s) {
        return d3.max(s, valueFunction);
    });
    return d3.max(maxsOfSets);
};
