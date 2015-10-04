var doPlot = function (xAxis, yAxis, rides, runs) {
    if (json) {
        d3.select('svg').remove();
        var graphBuilder = new GraphBuilder().withDimensions(800, 500);

        switch(xAxis) {
        case 'distance':
            graphBuilder = graphBuilder.withLogarithmicXConfiguration(getValueForKey('distance'), metersToKilometers, 'Distance');
            break;
        case 'movingTime':
            graphBuilder = graphBuilder.withLogarithmicXConfiguration(getValueForKey('movingTime'), secondsToFormatHourMinute, 'Moving Time');
            break;
        case 'speed':
            graphBuilder = graphBuilder.withLinearXConfiguration(getValueForKey('averageSpeed'), formatSpeed, 'Average Speed');
            break;
        case 'heartrate':
            graphBuilder = graphBuilder.withLinearXConfiguration(getValueForKey('averageHeartrate'), formatHeartrate, 'Average Heartrate');
            break;
        }
        switch(yAxis) {
        case 'distance':
            graphBuilder = graphBuilder.withLogarithmicYConfiguration(getValueForKey('distance'), metersToKilometers, 'Distance');
            break;
        case 'movingTime':
            graphBuilder = graphBuilder.withLogarithmicYConfiguration(getValueForKey('movingTime'), secondsToFormatHourMinute, 'Moving Time');
            break;
        case 'speed':
            graphBuilder = graphBuilder.withLinearYConfiguration(getValueForKey('averageSpeed'), formatSpeed, 'Average Speed');
            break;
        case 'heartrate':
            graphBuilder = graphBuilder.withLinearYConfiguration(getValueForKey('averageHeartrate'), formatHeartrate, 'Average Heartrate');
            break;
        }
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
}
var GraphBuilder = function () {
    return {
        withDimensions: function (width, height) {
            this.width = width;
            this.height = height;
            return this;
        },
        withLinearXConfiguration: function (xValue, xTickFormat, label) {
            var xScale = d3.scale.linear().range([0, this.width]);

            this.xValue = xValue;
            this.xMap = function(d) { return xScale(xValue(d)); }
            this.xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(xTickFormat);
            this.xScale = xScale;
            this.xAxisLabel = label;
            return this;
        },
        withLinearYConfiguration: function (yValue, yTickFormat, label) {
            var yScale = d3.scale.linear().range([this.height, 0]);

            this.yValue = yValue;
            this.yMap = function(d) { return yScale(yValue(d)); }
            this.yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(yTickFormat);
            this.yScale = yScale;
            this.yAxisLabel = label;
            return this;
        },
        withLogarithmicXConfiguration: function (xValue, xTickFormat, label) {
            var xScale = d3.scale.log().base(10).range([0, this.width]);

            this.xValue = xValue;
            this.xMap = function(d) { return xScale(xValue(d)); }
            this.xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(xTickFormat);
            this.xScale = xScale;
            this.xAxisLabel = label;
            return this;
        },
        withLogarithmicYConfiguration: function (yValue, yTickFormat, label) {
            var yScale = d3.scale.log().base(10).range([this.height, 0]);

            this.yValue = yValue;
            this.yMap = function(d) { return yScale(yValue(d)); }
            this.yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(yTickFormat);
            this.yScale = yScale;
            this.yAxisLabel = label;
            return this;
        },
        build: function () {
            var that = this;

            var updateTooltip = function(d) {
                var template = Handlebars.compile($('#tooltip-template').html());
                var newContent = $(template({
                    id: d.id,
                    name: d.name,
                    distance: metersToKilometers(d.distance),
                    movingTime: secondsToFormatHourMinute(d.movingTime),
                    averageSpeed: formatSpeed(d.averageSpeed),
                    averageHeartrate: d.averageHeartrate,
                }))
                $('#tooltip').html(newContent);
            };
            var updateMap = function(d) {
                addPathToElementAsMap($('#map').get(0), d.polyline);
            };
            var mouseoverAction = function(d) {
                updateTooltip(d);
                updateMap(d);
            };

            return {
                addSvgToBody: function() {
                    var svg = d3.select('body')
                        .append('svg').attr('width', that.width + 300).attr('height', that.height + 100)
                        .append('g').attr('transform', 'translate(40, 40)');
                    svg.append('text').attr('cx', that.width + 100).attr('cy', 100).attr('class', 'rect');
                    return svg;
                },
                addAxes: function (svg) {
                    svg.append('g').attr('class', 'x Axis').attr('transform', 'translate(0, ' + that.height + ')').call(that.xAxis)
                        .append('text').attr('x', that.width + 10).text(that.xAxisLabel);
                    svg.append('g').attr('class', 'y Axis').call(that.yAxis)
                        .append('text').text(that.yAxisLabel);
                },
                addData: function (svg, data, clazz) {
                    svg.selectAll('.' + clazz)
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('class', clazz).attr('r', 2).attr('cx', that.xMap).attr('cy', that.yMap)
                        .on('mouseover', mouseoverAction);
                },
                configureDomain: function(rides, runs) {
                    that.xScale.domain([minOfSets([runs, rides], that.xValue), maxOfSets([runs, rides], that.xValue)]);
                    that.yScale.domain([minOfSets([runs, rides], that.yValue), maxOfSets([runs, rides], that.yValue)]);
                }
            };
        }
    };
};
