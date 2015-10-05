var doPlot = function (xAxis, yAxis, rides, runs) {
    if (json) {
        d3.select('svg').remove();
        var keyMapping = {
            distance: 'distance',
            movingTime: 'movingTime',
            speed: 'averageSpeed',
            heartrate: 'averageHeartrate',
        };
        var labelMapping = {
            distance: 'Distance',
            movingTime: 'Moving Time',
            speed: 'Average Speed',
            heartrate: 'Average Heartrate',
        };
        var typeMapping = {
            distance: 'logarithmic',
            movingTime: 'logarithmic',
            speed: 'linear',
            heartrate: 'linear',
        };
        var graphBuilder = new GraphBuilder().withDimensions(900, 500)
            .withMouseOverActions(function (d) {
                MouseOverActions.updateTooltip(d);
                MouseOverActions.updateMap(d);
            })
            .withXConfiguration(typeMapping[xAxis], getValueForKey(keyMapping[xAxis]), Formatters[xAxis], labelMapping[xAxis])
            .withYConfiguration(typeMapping[yAxis], getValueForKey(keyMapping[yAxis]), Formatters[yAxis], labelMapping[yAxis]);
        var graph = graphBuilder.build();
        var svg = graph.addSvgToBody();
        if (rides) {
            if (runs) {
                graph.configureDomain(json.rides, json.runs);
            } else {
                graph.configureDomain(json.rides, []);
            }
        } else {
            graph.configureDomain(json.runs, []);
        }
        graph.addAxes(svg);
        if (rides) {
            graph.addData(svg, json.rides, 'ride');
        }
        if (runs) {
            graph.addData(svg, json.runs, 'run');
        }
    }
};
