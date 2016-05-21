var chicago_social = {

	name: "",
	title: "",
	unit: "",
	grades: [],
	dataSet: {},
	dataSetLoaded: false,

	init: function(name) {
		if (this.dataSet != undefined) {
			this.dataSet = this.loadDataSet("data/social.geojson");
			this.dataSetLoaded = true;
		}
		this.name = name;
		this.title = metadata[name].title;
		this.unit = metadata[name].unit;
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
		Create 8 different classes based on the mininmal and maximal data values.
	*/
	createGrades: function(data) {
		var min = this.min(data);
		var max = this.max(data);
		var step = Math.round((max - min) / 5);
		//console.log("min: " + min + ", max: " + max + ", step: " + step);
		this.grades = [];
		for (i = 0; i <= 5; i++) {
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

			color = colorbrewer.YlOrRd[this.grades.length];

			for (var i = this.grades.length - 1; i > 0; i--) {
				if (d > this.grades[i]) {
					return color[i];
				}
			}
			return color[0];
	},

	getLegend: function() {

		var legend = "";
		labels = [];
		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < this.grades.length; i++) {
			legend +=
			'<i style="background:' + this.getColor(this.grades[i] + 1) + '"></i> ' +
			this.grades[i] + (this.grades[i + 1] ? '&ndash;' + (this.grades[i + 1] - 1) + this.unit + '<br>' : '+' + this.unit);
		}
		return legend;
	}
}
