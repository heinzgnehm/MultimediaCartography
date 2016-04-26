var chicago_crime = {

	name: "",
	year: 0,
	id: "",
	title: "",
	metric: "",
	grades: [],
	years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
	categories: ["HOMICIDE", "THEFT", "BATTERY", "NARCOTICS", "ASSAULT", "BURGLARY", "ROBBERY"],
	dataSet: {},
	dataSetLoaded: false,

	init: function(name, title, metric) {
		if (!this.dataSetLoaded) {
			this.dataSet = this.loadDataSet("data/crime.geojson");
			this.dataSetLoaded = true;
		}
		this.name = name;
		this.year = Number(name.slice(0, 4));
		this.id = name.slice(5);
		console.log("year: " + this.year + ", id: " + this.id);
		this.title = title;
		this.metric = metric;
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

	getYears: function() {
		return this.years;
	},

	getCategories: function() {
		return this.categories;
	},

  setYear(year) {
		this.year = Math.floor(year);
		this.name = this.year + ":" + this.id;
		this.title = this.year + ":" + this.id;
		console.log("year: " + this.year + ", id: " + this.id);
	},

	/*
		Create 8 different classes based on the mininmal and maximal data values.
	*/
	createGrades: function(data) {
		var min = this.min(data);
		var max = this.max(data);
		var step = Math.round((max - min) / 8);
		console.log("min: " + min + ", max: " + max + ", step: " + step);
		this.grades = [];
		for (i = 0; i <= 8; i++) {
			this.grades.push(i * step);
		}
	},

	min: function(data) {
		var min = Number.MAX_VALUE;
		for (i = 0; i < data.features.length ; i++) {
			for (j = 0; j < this.years.length; j++) {
				property = this.years[j] + ":" + this.id;
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
