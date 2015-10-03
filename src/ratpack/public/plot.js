var GraphBuilder = function () {
    return {
        withDimensions: function (width, height) {
            this.width = width;
            this.height = height;
            return this;
        },
        withXValue: function (xValue) {
            this.xValue = xValue;
            return this;
        },
        withYValue: function (yValue) {
            this.yValue = yValue;
            return this;
        },
        withXTickFormat: function (format) {
            this.xTickFormat = format;
            return this;
        },
        withYTickFormat: function (format) {
            this.yTickFormat = format;
            return this;
        },
        build: function () {
            var height = this.height;
            var width = this.width;
           
            var xValue = this.xValue;
            var yValue = this.yValue;
            var xScale = d3.scale.log().base(10).range([0, this.width]);
            var yScale = d3.scale.log().base(10).range([this.height, 0]);
            var xMap = function(d) { return xScale(xValue(d)); }
            var yMap = function(d) { return yScale(yValue(d)); }
            var xAxis = d3.svg.axis().scale(xScale).orient('bottom') .tickFormat(this.xTickFormat);
            var yAxis = d3.svg.axis().scale(yScale).orient('left') .tickFormat(this.yTickFormat);

            return {
                addSvgToBody: function() {
                    var svg = d3.select('body')
                        .append('svg')
                            .attr('width', width + 300)
                            .attr('height', height + 100)
                        .append('g')
                            .attr('transform', 'translate(40, 40)');
                    svg.append('text')
                        .attr('cx', width + 100)
                        .attr('cy', 100)
                        .attr('class', 'rect');
                    return svg;
                },
                addAxes: function (svg) {
                    svg.append('g')
                        .attr('class', 'x Axis')
                        .attr('transform', 'translate(0, ' + height + ')')
                        .call(xAxis)
                        .append('text')
                        .attr('x', width)
                        .text('Distance');
                    svg.append('g')
                        .attr('class', 'y Axis')
                        .call(yAxis)
                        .append('text').text('Time');
                },
                addData: function (svg, data, clazz) {
                    svg.selectAll('.' + clazz)
                        .data(data)
                        .enter()
                        .append('circle')
                        .attr('class', clazz)
                        .attr('r', 2)
                        .attr('cx', xMap)
                        .attr('cy', yMap)
                        .on('mouseover', function(d) {
                            var text = 'name: <a href="https://www.strava.com/activities/' + d.id + '">' + d.name + '</a><br/>';
                            text += 'distance: ' + d.distance/1000 + ' km<br/>';
                            text += 'moving time: ' + secondsToFormatHourMinute(d.movingTime) + '<br/>';
                            document.getElementById('tooltip').innerHTML = text;
                        });
                },
                configureDomain: function(rides, runs) {
                    xScale.domain([
                        d3.min([d3.min(runs, xValue), d3.min(rides, xValue)]),
                        d3.max([d3.max(runs, xValue), d3.max(rides, xValue)]),
                    ]); 
                    yScale.domain([
                        d3.min([d3.min(runs, yValue), d3.min(rides, yValue)]),
                        d3.max([d3.max(runs, yValue), d3.max(rides, yValue)]),
                    ]); 
                }
            };
        }
    };
};
