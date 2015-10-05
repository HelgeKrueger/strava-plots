var Formatters = {
    movingTime: function(seconds) {
        var m = moment.duration(seconds, 'seconds');
        var minutes = m.minutes();
        var hours = Math.floor(m.asHours());

        if(minutes < 10) {
            return hours + ':0' + minutes;
        } else {
            return hours + ':' + minutes;
        }
    },
    distance: function(meters) {
        return meters/1000;
    },
    speed: function(speed) {
        return speed * 3.6;
    },
    heartrate: function(h) {
        return h;
    }
};
