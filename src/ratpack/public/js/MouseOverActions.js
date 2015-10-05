var MouseOverActions = {
    updateTooltip: function(d) {
        var template = Handlebars.compile($('#tooltip-template').html());
        var newContent = $(template({
            id: d.id,
            name: d.name,
            distance: Formatters['distance'](d.distance),
            movingTime: Formatters['movingTime'](d.movingTime),
            averageSpeed: Formatters['speed'](d.averageSpeed),
            averageHeartrate: d.averageHeartrate,
        }))
        $('#tooltip').html(newContent);
    },
    updateMap: function(d) {
        addPathToElementAsMap($('#map').get(0), d.polyline);
    }
};
