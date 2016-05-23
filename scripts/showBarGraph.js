/*
 * Multimedia Cartography web atlas project
 * ETH Zurich, Spring term 2016
 *
 * Authors: Heinz Gnehm, Konstantinos Schoinas, Giulio Taglioferro,
 * Date:    2016-05-21
*/

function showBarGraph(id) {
    $(".graph-tab-in").empty();
    $(".graph-tab-in").append("<label id=\"sort-label\"><input type=\"checkbox\">Sort values</label>");
    id = id.split('-');
   //console.log(id);
    var dataset = id[0];
    var property_name = id[1];
    // set the dimensions of the canvas
    var margin = {
            top: 10,
            right: 20,
            bottom: 100,
            left: 130
        },
        width = 800 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    // arrange the format of the percent label of y axis in integer
    var formatPercent = d3.format("d");

    // set the ranges of each axis
    var y = d3.scale.ordinal().rangeRoundBands([0, height], .09);
    var x = d3.scale.linear().range([0, width]);;

    // define x the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(formatPercent)


    // define y the axis
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    // add the SVG element
    var svg = d3.select(".graph-tab-in").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // load the data
   //console.log("../data/" + dataset + ".geojson");
    d3.json("data/" + dataset + ".geojson", function(error, data) {

        data.features.forEach(function(d) {
            	//console.log(d);
            d.Label = d.properties.community;
            d.Number = d.properties[property_name]; //.PERCENT_OF;
            //console.log("community: " + d.properties.community + "; percent: " + d.properties.PERCENT_OF);
        });

        // scale the range of the data
       x.domain([0, d3.max(data.features,(function(d) {
		     return d.Number;
		}))]);

		y.domain(data.features.map(function(d) {
			return d.Label;
		}));



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
            .attr("transform", "rotate(0)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            //.text("Poverty per Community");


       // Add bar chart
       svg.selectAll("bar")
           .data(data.features)
           .enter().append("rect")
           .attr("class", "bar")
           .attr("x", -function(d) { return x(d.Number); })
           .attr("width", function(d) { return x(d.Number); })
	       .attr("y", function(d) { return y(d.Label);})
           .attr("height", y.rangeBand())



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
                    .attr("fill", "magenta")
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
            var y0 = y.domain(data.features.sort(this.checked ?

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
                    return y0(a.Label) - y0(b.Label);
                });

            // make transition
            var transition = svg.transition().duration(2000),
                delay = function(d, i) {
                    return i * 50;
                };

            // transition of bars
            transition.selectAll(".bar")
                .delay(delay)
                .attr("y", function(d) {
                    return y0(d.Label);
                });
            transition.select(".y.axis")
                .call(yAxis)
                .selectAll("g")
                .delay(delay);

            //transition of y axis labels
            transition.select(".y.axis")
                .call(yAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.9em")
                .attr("dy", ".25em")
                .attr("transform", "rotate(-25)")
                .delay(delay);

        }
    });
}
