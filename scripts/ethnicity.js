var chicago_ethnicity = {

	name: "",
	title: "",
	id: "",
	unit: "",
	grades: [],
	categories: ["white", "black", "native", "asian", "mix", "islander", "other"],
	dataSet: {},
	dataSetLoaded: false,

	init: function(name) {
		if (this.dataSet != undefined) {
			this.dataSet = this.loadDataSet("data/ethnicity.geojson");
			this.dataSetLoaded = true;
		}
		this.id = name.slice(5);
		console.log("ethnicity.js:init: id = " + this.id);
		this.name = name;
		this.title = metadata[this.id].title;
		this.unit = metadata[this.id].unit;
		this.createGrades(this.dataSet);
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

	/*
		Get an array with the ethnic mix of a community for displaying a pie chart.
	*/
	getChartData: function(community) {
		var index;
		for (i = 0; i < this.dataSet.features.length; i++) {
			if (community == this.dataSet.features[i].properties.community) {
				index = i;
				console.log("found community " + community + " at index " + index);
				break;
			}
		}
		data = {};
		for (i = 0; i < this.categories.length; i++) {
			data[this.categories[i]] = this.dataSet.features[index].properties["2010:" + this.categories[i]];
		}
		return data;
	},

	/*
		Create 8 different classes based on the mininmal and maximal data values.
	*/
	createGrades: function(data) {
		var min = this.min(data);
		var max = this.max(data);
		var step = Math.round((max - min) / 8);
		//console.log("min: " + min + ", max: " + max + ", step: " + step);
		this.grades = [];
		for (i = 0; i <= 8; i++) {
			this.grades.push(i * step);
		}
	},

	min: function(data) {
		var min = Number.MAX_VALUE;
		for (i = 0; i < data.features.length ; i++) {
			if (data.features[i].properties[this.name] < min) {
				min = data.features[i].properties[this.name];
			}
		}
		return min;
	},

	max: function(data) {
		var max = Number.MIN_VALUE;
		for (i = 0; i < data.features.length ; i++) {
			if (data.features[i].properties[this.name] > max) {
				max = data.features[i].properties[this.name];
			}
		}
		return max;
	},

	getColor: function(d) {

			return 	d > this.grades[7] ? '#800026' :
							d > this.grades[6] ? '#BD0026' :
							d > this.grades[5] ? '#E31A1C' :
							d > this.grades[4] ? '#FC4E2A' :
							d > this.grades[3] ? '#FD8D3C' :
							d > this.grades[2] ? '#FEB24C' :
							d > this.grades[1] ? '#FED976' :
																	'#FFEDA0';
	},

	getDiv: function() {

		var div = L.DomUtil.create('div', 'info legend'),
		//grades = this.grades;
		labels = [];
		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < this.grades.length; i++) {
			div.innerHTML +=
			'<i style="background:' + this.getColor(this.grades[i] + 1) + '"></i> ' +
			this.grades[i] + (this.grades[i + 1] ? '&ndash;' + this.grades[i + 1] + '<br>' : '+');
		}
		return div;
	}
}
