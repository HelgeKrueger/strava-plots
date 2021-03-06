var GraphBuilder = function () {
    return {
        withDimensions: function (width, height) {
            this.width = width;
            this.height = height;
            return this;
        },
        withXConfiguration: function (type, xValue, xTickFormat, label) {
            var xScale;
            if (type == 'linear') {
                xScale = d3.scale.linear().range([0, this.width]);
            } else {
                xScale = d3.scale.log().base(10).range([0, this.width]);
            }

            this.xValue = xValue;
            this.xMap = function(d) { return xScale(xValue(d)); }
            this.xAxis = d3.svg.axis().scale(xScale).orient('bottom').tickFormat(xTickFormat);
            this.xScale = xScale.clamp(true);
            this.xAxisLabel = label;
            return this;
        },
        withYConfiguration: function (type, yValue, yTickFormat, label) {
            var yScale;
            if (type == 'linear') {
                yScale = d3.scale.linear().range([this.height, 0]);
            } else {
                yScale = d3.scale.log().base(10).range([this.height, 0]);
            }

            this.yValue = yValue;
            this.yMap = function(d) { return yScale(yValue(d)); }
            this.yAxis = d3.svg.axis().scale(yScale).orient('left').tickFormat(yTickFormat);
            this.yScale = yScale.clamp(true);
            this.yAxisLabel = label;
            return this;
        },
        withMouseOverActions: function (action) {
            this.mouseoverAction = action;
            return this;
        },
        build: function () {
            var that = this;

            return {
                addSvgToBody: function() {
                    var svg = d3.select('body')
                        .append('svg').attr('width', that.width + 300).attr('height', that.height + 100)
                        .append('g').attr('transform', 'translate(40, 40)');
                    svg.append('text').attr('cx', that.width + 100).attr('cy', 100).attr('class', 'rect');
                    that.rect = svg.append("rect")
                        .attr("class", "pane")
                        .attr("width", that.width)
                        .attr("height", that.height)
                    return svg;
                },
                addAxes: function (svg) {
                    svg.append('g').attr('class', 'x Axis').attr('transform', 'translate(0, ' + that.height + ')').call(that.xAxis)
                        .append('text').attr('x', that.width + 10).text(that.xAxisLabel);
                    svg.append('g').attr('class', 'y Axis').call(that.yAxis)
                        .append('text').text(that.yAxisLabel);
                },
                addData: function (svg, data, clazz) {
                    var updateSelect = svg.selectAll('.' + clazz).data(data);
                    updateSelect.enter().append('circle')
                        .attr('class', clazz).attr('r', 5).attr('cx', that.xMap).attr('cy', that.yMap)
                        .on('mouseover', that.mouseoverAction);
                    updateSelect.exit().remove();
                },
                addZoom: function (svg) {
                    var zoomListener = d3.behavior.zoom()
                          .x(that.xScale)
                          .y(that.yScale)
                          .scaleExtent([1, 8])
                          .on("zoom", function () {
                              svg.select(".x.axis").call(that.xAxis);
                              svg.selectAll(".y.axis").call(that.yAxis);
                              svg.selectAll(".run").attr('cx', that.xMap).attr('cy', that.yMap);
                              svg.selectAll(".ride").attr('cx', that.xMap).attr('cy', that.yMap);
                          });
                    that.rect.call(zoomListener);
                },
                configureDomain: function(rides, runs) {
                    that.xScale.domain([minOfSets([runs, rides], that.xValue), maxOfSets([runs, rides], that.xValue)]);
                    that.yScale.domain([minOfSets([runs, rides], that.yValue), maxOfSets([runs, rides], that.yValue)]);
                }
            };
        }
    };
};
