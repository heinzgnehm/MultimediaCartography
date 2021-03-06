/*
 * Multimedia Cartography web atlas project
 * ETH Zurich, Spring term 2016
 *
 * Authors: Heinz Gnehm, Konstantinos Schoinas, Giulio Tagliaferro
 * Date:    2016-05-21
 */

var chicago_crime = {

	name: "",
	year: 2003,
	id: "",
	title: "",
	unit: "",
	grades: [],
	years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
	categories: ["homicide", "theft", "battery", "narcotics", "assault", "burglary", "robbery"],
	dataSet: {},
	dataSetLoaded: false,

	/*
		Initialize the crime data set and load the JSON file if it is not already loaded.
	*/
	init: function(name) {
		if (!this.dataSetLoaded) {
			this.dataSet = this.loadDataSet("data/crime.geojson");
			this.dataSetLoaded = true;
		}
		this.name = name;
		this.year = Number(name.slice(0, 4));
		this.id = name.slice(5);
		//console.log("year: " + this.year + ", id: " + this.id + ", name: " + this.name);
		this.unit = metadata[this.id].unit;
		this.title = metadata[this.id].title + " " + this.year.toFixed() + " (" + this.unit + ")";
		//this.createGrades(this.dataSet);
		//console.log("linear grades " + this.grades);
		this.createNonLinearGrades(this.dataSet, 4);
		//console.log("non-linear grades " + this.grades);
	},

	/*
		Load the data set.
	*/
	loadDataSet: function(fileName) {
		var request = new XMLHttpRequest();
		request.open("GET", fileName, false);
		request.send(null);
		return JSON.parse(request.responseText);
	},

	/*
		Return the data set.
	*/
	getDataSet: function() {
		return this.dataSet;
	},

	getYears: function() {
		return this.years;
	},

	getCategories: function() {
		return this.categories;
	},

	/*
		Get an array with yearly crime data for displaying a time series line chart.
	*/
	getChartData: function(community, crime) {
		var index;
		for (i = 0; i < this.dataSet.features.length; i++) {
			if (community == this.dataSet.features[i].properties.community) {
				index = i;
				//console.log("found community " + community + " at index " + index);
				break;
			}
		}
		data = {};
		for (i = 0; i < this.years.length; i++) {
			var category = this.years[i] + ":" + crime;
			data[this.years[i]] = this.dataSet.features[index].properties[category];
		}
		return data;
	},

  setYear(year) {
		this.year = Math.floor(year);
		this.name = this.year + ":" + this.id;
		this.title = metadata[this.id].title + " " + this.year + " (" + this.unit + ")";
		//console.log("year: " + this.year + ", id: " + this.id);
	},

	/*
		Create 6 different non-linear classes with an equal amount of communities.
	*/
	createNonLinearGrades: function(data, steps) {

		// Create an array with the density of crime data (over all years and all communities).
		var density = {};
		for (i = 0; i < data.features.length; i++) {
			community = data.features[i].properties.community;
			for (j = 0; j < this.years.length; j++) {
				category = this.years[j] + ":" + this.id;
				value = data.features[i].properties[category].toFixed();
				if (density[value]) {
					density[value] = density[value] + 1;
				} else {
					density[value] = 1;
				}
			}
		}

		//console.log(density);
		var threshold = (data.features.length * this.years.length / steps).toFixed();
		//console.log("threshold: " + threshold);
		var keys = Object.keys(density);
		var count = 0;
		this.grades = [];
		this.grades.push(0);
		count = count + density[keys[0]];
		for (i = 1; i < keys.length; i++) {
			//console.log("processing key " + keys[i] + " with value " + density[keys[i]]);
			count = count + density[keys[i]];
			if (count > threshold) {
				//console.log("class at " + keys[i] + " with " + count + " members");
				this.grades.push(keys[i]);
				count = 0;
			}
		}
		//console.log("remaining " + count);
	},

	/*
		Create 8 different classes based on the mininmal and maximal data values.
	*/
	createGrades: function(data) {
		var min = this.min(data);
		var max = this.max(data);
		var step = Math.round((max - min) / 3);
		//console.log("min: " + min + ", max: " + max + ", step: " + step);
		this.grades = [];
		for (i = 0; i <= 3; i++) {
			this.grades.push(i * step);
		}
	},

	min: function(data) {
		var min = Number.MAX_VALUE;
		for (i = 0; i < data.features.length ; i++) {
			for (j = 0; j < this.years.length; j++) {
				property = this.years[j] + ":" + this.id;
				//community = data.features[i].properties["community"];
				//homicide = data.features[i].properties["2003:homicide"];
				//console.log(community + " | 2003:homicide = " + homicide);
				//console.log("Value " + community + " | " + property + " = " + data.features[i].properties[property]);
				if (data.features[i].properties[property] < min) {
					min = data.features[i].properties[property];
				}
			}
		}
		return min;
	},

	max: function(data) {
		var max = Number.MIN_VALUE;
		for (i = 0; i < data.features.length ; i++) {
			for (j = 0; j < this.years.length; j++) {
				property = this.years[j] + ":" + this.id;
				if (data.features[i].properties[property] > max) {
					max = data.features[i].properties[property];
				}
			}
		}
		return max;
	},

	getColor: function(d) {

			color = colorbrewer.Oranges[this.grades.length];

			for (var i = this.grades.length - 1; i > 0; i--) {
				if (d > this.grades[i]) {
					return color[i];
				}
			}
			return color[0];
	},

	getLegend: function() {

		// Creates conflict with different info CSS element, legend classes are not correctly aligned.
		//var div = L.DomUtil.create('div', 'info legend'),
		var legend = "";
		//grades = this.grades;
		labels = [];
		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < this.grades.length; i++) {
			var gradeText = "";
			var grade = parseInt(this.grades[i]);
			if (this.grades[i + 1]) {
				var nextGrade = parseInt(this.grades[i + 1]);
				if (grade == nextGrade - 1) {
					gradeText = grade + "<br>";
				} else {
					gradeText = grade + "&ndash;" + (nextGrade - 1) + "<br>";
				}
			} else {
				gradeText = grade + "+";
			}
			var gradePlusOne = parseInt(this.grades[i]) + 1;
			//console.log("crime.js > getLegend(): grade " + i + " | value " + gradePlusOne + " | color " + (this.getColor(gradePlusOne)));
			legend += '<i style="background:' + this.getColor(gradePlusOne) + '"></i> ' + gradeText;
		}
		return legend;
	}
}
