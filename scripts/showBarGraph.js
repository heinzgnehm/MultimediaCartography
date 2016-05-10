function showBarGraph(id) {
    $(".graph-tab").empty();
    $(".graph-tab").append("<label id=\"sort-label\"><input type=\"checkbox\">Sort values</label>");
    id = id.split('-');
    console.log(id);
    var dataset = id[0];
    var property_name = id[1];
    // set the dimensions of the canvas
    var margin = {
            top: 20,
            right: 20,
            bottom: 150,
            left: 40
        },
        width = 1000 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // arrange the format of the percent label of y axis in integer
    var formatPercent = d3.format("d");

    // set the ranges of each axis
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);
    var y = d3.scale.linear().range([height, 0]);

    // define x the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")

    // define y the axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    // add the SVG element
    var svg = d3.select(".graph-tab").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // load the data
    console.log("../data/" + dataset + ".geojson");
    d3.json("data/" + dataset + ".geojson", function(error, data) {

        data.features.forEach(function(d) {
            	//console.log(d);
            d.Label = d.properties.community;
            d.Number = d.properties[property_name]; //.PERCENT_OF;
            //console.log("community: " + d.properties.community + "; percent: " + d.properties.PERCENT_OF);
        });

        // scale the range of the data
        x.domain(data.features.map(function(d) {
            return d.Label;
        }));
        y.domain([0, d3.max(data.features, function(d) {
            return d.Number;
        })]);

        // add x axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)");

        // add y axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Poverty per Community");

        // add bar chart
        svg.selectAll("bar")
            .data(data.features)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.Label);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.Number);
            })
            .attr("height", function(d) {
                return height - y(d.Number);
            })


        // add mouseover event
        .on("mouseover", function(d) {
                d3.select(this)
                    .attr("fill", "red");
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", 450)
                    .attr("y", height)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "15px")
                    .attr("font-weight", "bold")
                    .attr("fill", "yellow")
                    .text("Poverty: " + d.Number + " % ");
            })
            // add mouseout event     			
            .on("mouseout", function(d) {
                d3.select(this)
                    .transition()
                    .duration(5)
                    .attr("fill", function(d) {
                        return ""
                    });
                d3.select("#tooltip").remove();
            });


        // sort data with time interval
        d3.select("input").on("change", change);

        var sortTimeout = setTimeout(function() {
            d3.select("input").property("checked", true).each(change);
        }, 2500);

        function change() {
            clearTimeout(sortTimeout);

            // Copy-on-write since tweens are evaluated after a delay
            var x0 = x.domain(data.features.sort(this.checked ?

                        function(a, b) {
                            return b.Number - a.Number;
                        } :
                        function(a, b) {
                            return d3.ascending(a.Label, b.Label);
                        })
                    .map(function(d) {
                        return d.Label;
                    }))
                .copy();

            // sort the bars
            svg.selectAll(".bar")
                .sort(function(a, b) {
                    return x0(a.Label) - x0(b.Label);
                });

            // make transition
            var transition = svg.transition().duration(2000),
                delay = function(d, i) {
                    return i * 50;
                };

            // transition of bars
            transition.selectAll(".bar")
                .delay(delay)
                .attr("x", function(d) {
                    return x0(d.Label);
                });
            transition.select(".x.axis")
                .call(xAxis)
                .selectAll("g")
                .delay(delay);

            //transition of x axis labels
            transition.select(".x.axis")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.9em")
                .attr("dy", ".25em")
                .attr("transform", "rotate(-50)")
                .delay(delay);

        }
        // legend rectangle colors
        var colors = [
            ["Community Name", "#377EB8"],
            ["Poverty Percent", "000000"]
        ];

        // add legend
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("height", 100)
            .attr("width", 100)
            .attr('transform', 'translate(-20,50)');

        // legend rectangle shape
        var legendRect = legend.selectAll('rect').data(colors);

        legendRect.enter()
            .append("rect")
            .attr("x", width - 115)
            .attr("width", 10)
            .attr("height", 10);

        legendRect
            .attr("y", function(d, i) {
                return i * 20;
            })
            .style("fill", function(d) {
                return d[1];
            });

        // legend label text	
        var legendText = legend.selectAll('text').data(colors);

        legendText.enter()
            .append("text")
            .attr("x", width - 100);

        legendText
            .attr("y", function(d, i) {
                return i * 20 + 9;
            })
            .text(function(d) {
                return d[0];
            });

        // add title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 10 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("text-decoration", "underline")
            .text("Poverty per Community in Chicago");

    });
}
