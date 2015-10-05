
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
