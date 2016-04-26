var navigation = {
		//"plugins": ["checkbox", "dnd", "search", "types", "search"],
		"plugins": ["checkbox", "dnd", "search", "types"],
		/*grid:{columns: [{tree:true,width:230},
						{header:"info",width:20}],
				width:250
		},
		*/
		'core': {
				"animation": 0,
				"check_callback": true,
				"themes": {
						"stripes": true
				},
				'data': [{
						"id": "crime",
						"text": "Crime",
						"children": [{
								"id": "crime:HOMICIDE",
								"text": "Homicide",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:BURGLARY",
								"text": "Burglary",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:ROBBERY",
								"text": "Robbery",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:BATTERY",
								"text": "Battery",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:THEFT",
								"text": "Theft",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:ASSAULT",
								"text": "Assault",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:NARCOTICS",
								"text": "Narcotics",
								"icon": "icons/svg/layer.svg",
						}],
				}, {
						"id": "ethnicity",
						"text": "Ethnicity",
						"children": [
							{"id": "ethnicity:white_p:2010", "text": "White", "icon": "icons/svg/layer.svg"},
							{"id": "ethnicity:black_p:2010", "text": "Black", "icon": "icons/svg/layer.svg",},
							{"id": "ethnicity:asian_p:2010", "text": "Asian", "icon": "icons/svg/layer.svg",},
							{"id": "ethnicity:other_p:2010", "text": "Other", "icon": "icons/svg/layer.svg",},
							{"id": "ethnicity:mix_p:2010", "text": "Mixed", "icon": "icons/svg/layer.svg",},
						],
				},
				{
						"id": "social",
						"text": "Social-economic indicators",
						"children": [
							{"id": "social:hardship", "text": "Hardship Index", "icon": "icons/svg/layer.svg",},
							{"id": "social:crowded", "text": "Crowded Housing", "icon": "icons/svg/layer.svg",},
							{"id": "social:poverty", "text": "Poverty", "icon": "icons/svg/layer.svg",},
							{"id": "social:income", "text": "Income", "icon": "icons/svg/layer.svg",},
							{"id": "social:diploma", "text": "Education", "icon": "icons/svg/layer.svg",},
							{"id": "social:notWorkingAge", "text": "Dependence", "icon": "icons/svg/layer.svg",},
						],
				}]
		},
		"types": {
				"#": {
						"max_depth": 2,
						"valid_children": ["default"],
						"root": {

						},
						"max_depth": 1,
						"valid_children": ["file"],
				},
				"file": {
						"max_depth": 0,
						"valid_children": [],
				}
		}
};

		/*
			Show the navigation.
		*/
		$(function () {
			$('#layers-tree').jstree(navigation);
			//infocreate(navigation);
			$('#layers-tree').on("select_node.jstree", function (e, data) {
				id = data.selected[0];

				/*
						The id identifies the chosen data set.
						0 colons: top level folder -> no action.
						1 colon:  data set without a time series (socio-economic indicators).
						2 colons: data set with a time series (crime date, ethnicity).
				*/
				values = id.split(":");
				dataSet = values[0];
				category = values[1];
				if (dataSet == "crime") {
					year = Math.floor(slider.noUiSlider.get());
				} else {
					year = values[2];
				}
				console.log("chosen Year on slider is " + year);
				switch (dataSet) {
					case "crime":     showDataSet(dataSet, year + ":" + category, year + ":" + category, ""); showSlider(); break;
					case "ethnicity": showDataSet(dataSet, year + ":" + category, year + ":" + category, ""); hideSlider(); break;
					case "social":    showDataSet(dataSet, category, category, ""); hideSlider(); break;
					//case 1: console.log("Show sub-menu"); break;
					//case 2: showDataSet(dataSet, category, category, ""); break;
					//case 3: showDataSet(dataSet, year + ":" + category, year + ":" + category, ""); break;
				}
			});

		});

		$('#collapse-left').button().click(function() {
				$('.navigation').css("visibility", "hidden");
		    $('.collapsed-navigation').css("visibility", "visible");
				//$('#map').css("visibility", "visible");
		    //$('.mappanel').css("left","30px");
		});

		$('#collapse-right').button().click(function() {
				$('.navigation').css("visibility", "visible");
		    $('.collapsed-navigation').css("visibility", "hidden");
				//$('#map').css("visibility", "visible");
		    //$('.mappanel').css("left","280px");
		});

		$('#imprint').button().click(function(event) {
			$('#dialog').dialog({
		  	title: 'Imprint'
		  });
		  $('#dialogframe').prop('src', 'info/imprint.html');
		  event.preventDefault();
		});

		$('#about').button().click(function(event) {
			$('#dialog').dialog({
				title: 'About'
			});
			$('#dialogframe').prop('src', 'info/about.html');
			event.preventDefault();
		});

		$('#description').button().click(function() {
			var url = $('#mapframe').prop('src').replace(/Maps\//, 'Descriptions/').replace(/\..*$/, '.html');
			$('#dialog').dialog({
				title: 'Map Description'
			});
			$('#dialogframe').prop('src', url);event.preventDefault();
		});

		$("#fullscreen").button({
		    icons: {
		        primary: "ui-icon-arrow-4-diag"
		    },
		    text: false
		});
		$("#collapse-left").button({
		    icons: {
		        primary: "ui-icon-carat-1-nw"
		    },
		    text: false
		});
		$("#collapse-right").button({
		    icons: {
		        primary: "ui-icon-carat-1-se"
		    },
		    text: false
		});

		/*
			Create the info buttons for each category.
		*/
		function infocreate(data) {
		    //console.log(data);
		    //console.log('oop');
		    $("#info-tab").empty();
		    data = data.core.data;
		    for (i = 0; i < data.length; i++) {
		        var folder = data[i].id;
		        console.log(folder);
		        var newinfo = "<button id=\"" + folder + "-info\" class=\"ui-btn ui-shadow ui-corner-all info-button\">info</button>";
		        $("#info-tab").append(newinfo);
		        //add event listener for the button
		        $('#' + folder + '-info').button().click(function(event) {
		            id = event.target.getAttribute('id');
		            $('#dialog').dialog({
		                title: id
		            });
		            $('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
		            event.preventDefault();
		        });
		        if (data[i].state.opened == true) {
		            for (j = 0; j < data[i].children.length; j++) {
		                //console.log(data[data[folder].children[j]].state.opened);
		                var newinfo = "<button id=\"" + data[i].children[j].id + "-info\" class=\"ui-btn ui-shadow ui-corner-all info-button\">info</button>";
		                //console.log(newinfo);
		                $("#info-tab").append(newinfo);
		                $('#' + data[i].children[j].id + '-info').button().click(function(event) {
		                    id = event.target.getAttribute('id');
		                    $('#dialog').dialog({
		                        title: id
		                    });
		                    $('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
		                    event.preventDefault();
		                });
		            }
		        }

		    }
		    $(".info-button").button({
		        icons: {
		            primary: "ui-icon-info"
		        },
		        text: false
		    });
		};

		var slider = document.getElementById('slider');

		noUiSlider.create(slider, {
			start: [ 2003 ],
			step: 1,
			range: {
				'min': 2003,
				'max': 2015
			},
			pips: {
				mode: 'count',
				values: 2015-2003 + 1,
				density: -1,
			}
		});

			slider.noUiSlider.on('update', function (values, handle) {
			console.log("slider changed to " + values[handle]);
			showYear(values[handle]);
		});

			slider.noUiSlider.on('change', function (values, handle) {
			console.log("slider changed to " + values[handle]);
			showYear(values[handle]);
		});

		function showSlider() {
			console.log("show time slider");
			$('.slider-container').css("z-index", "2");
		}

		function hideSlider() {
			console.log("hide time slider");
			$('.slider-container').css("z-index", "0");
		}
