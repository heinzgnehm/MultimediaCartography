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
 						"state": {
   					                 "opened": false,
              					},
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
 						"state": {
   					                 "opened": false,
              					},						
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
 						"state": {
   					                 "opened": false,
              					},
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
			infocreate(navigation);
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
		$('#fullscreen').button().click(function(event) {
   			 var element = document.querySelector('body');
   			 toggleFullscreen(element);
 
}		);

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
		
		$('#tabs').tabs();


$('#autocomplete').autocomplete({
    source: ['Innovative Map', 'Future Map']
});

$('#menu-1,#menu-2').menu();



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
			//showYear(values[handle]);
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

/* the fuction take the text in the search field make a query to the mapbox geocoder, 
display only four result and when clicked on the result zoom either to its bbox (if present) or to its center*/
function geocodeThis() {
    var text = document.getElementById('search').value;
    console.log(text);
    if (text.length >= 1) {
        geocoderControl.geocoder.query({
            query: text,
            country: 'us',
            proximity: L.LatLng(41.881832, -87.623177)
        }, function(err, res) {
            $("#search-results").empty();
            //console.log(err);
            console.log(res.results.features);
            results = res.results.features;
            if (results.length > 0) {
                var maxitems = 4;
                var southWest = L.latLng(42.363436, -87.6074225),
                    northEast = L.latLng(41.272109, -88.838157),
                    chicagoBounds = L.latLngBounds(southWest, northEast);
                var showCount = 0;
                for (i = 0; i < results.length; i++) {
                    if (showCount > 4) {
                        break
                    }
                    if (results[i].hasOwnProperty('bbox')) {
                        var southWest = L.latLng(results[i].bbox[1], results[i].bbox[0]),
                            northEast = L.latLng(results[i].bbox[3], results[i].bbox[2]),
                            resBounds = L.latLngBounds(southWest, northEast);
                    } else {
                        resBounds = false
                    }
                    var resCenter = L.latLng(results[i].center[1], results[i].center[0]);
                    if ((chicagoBounds.contains(resCenter)) || (resBounds && chicagoBounds.intersects(resBounds)) ) {
						var labels = results[i].place_name.split(',');
						if (labels.length>2)
							{labels.splice(-2,2);}
						else if (labels.length>1)
							{labels.splice(-1,1);}
						else {}
						var label=labels.join(',');
						
                        var newinstance = "<div class=\"address-result\" id=\"add-res" + i + "\">" + label+ "</div>";
                        $("#search-results").append(newinstance);
                        showCount++;
                        $("#add-res" + i).data({
                            "bbox": resBounds,
                            "center": resCenter
                        })
                        $("#add-res" + i).click(function() {
                            $(".address-result").css("background-color", "white");
                            $(this).css("background-color", "#e4eff8");
                            //console.log("hey");
                            //console.log($(this).data("bbox"));
                            if ($(this).data("bbox")) {
                                var bbox = $(this).data("bbox");
                                map.fitBounds(bbox);
                            } else {
                                var center = $(this).data("center");

                                map.setView(center, 16);
                            }
                        });
                    }
                    //console.log( $("#add-res"+i));


                }
                if (showCount > maxitems) {
                    var newinstance = "<div class=\"address-result\" id=\"add-res-etc\">...</div>";
                    $("#search-results").append(newinstance);

                }

                $("#search-results").css("visibility", "visible");
            } else {
                $("#search-results").css("visibility", "hidden");
            }

        });
    } else {
        $("#search-results").css("visibility", "hidden");
    }

}
// listener to keyup and enter four lauch the geocoding

$('#search').keyup(function() {
    geocodeThis();

});
$('#search').keydown(function(e) {
    if (13 == e.keyCode) {
        geocodeThis();
    };

});

geocoderControl.on('found', function(res) {
    console.log(res);
    //output.innerHTML = JSON.stringify(res.results.features[0]);
});


/*** function to refresh info and bar buttons ***/
/** refresh the info button in the selected tree
 * @param {json} data: tree data
 */
function refreshinfo(data) {
    //console.log(data);
    //console.log('oop');
    $("#jstree-button-tab").empty();
    for (i = 0; i < data['#'].children.length; i++) {
        var folder = data['#'].children[i];
        //console.log(folder);
	var newbuttoncontainer = $("<div class=\"jstree-button-container\"></div>");
        var newinfo = "<button id=\"" + folder + "-info\" class=\"ui-btn ui-shadow ui-corner-all jstree-button info-button\">info</button>";
        newbuttoncontainer.append(newinfo);
	$("#jstree-button-tab").append(newbuttoncontainer);
        //add event listener for the button
        $('#' + folder + '-info').button().click(function(event) {
            id = event.target.getAttribute('id');
            $('#dialog').dialog({
                title: id
            });
            $('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
            event.preventDefault();
        });
        if (data[folder].state.opened == true) {
            for (j = 0; j < data[folder].children.length; j++) {
		subid =data[folder].children[j].replace(/:/g,'-');
		var newbuttoncontainer = $("<div class=\"jstree-button-container\"></div>");
		// bar graph test
		var newbar = "<button  id=\""  + subid + "-bar\" class=\"ui-btn ui-corner-all  jstree-button bar-button\"></button>";
		newbuttoncontainer.append(newbar);
                //console.log(data[subid].state.opened);
                var newinfo = "<button id=\"" + subid + "-info\" class=\"ui-btn ui-shadow ui-corner-all jstree-button info-button\">info</button>";
                //console.log(newinfo);
                newbuttoncontainer.append(newinfo);
		$("#jstree-button-tab").append(newbuttoncontainer);
		// add event listener to info button
                $('#' + subid + '-info').button().click(function(event) {
                    id = event.target.getAttribute('id');
		    console.log(id);
                    $('#dialog').dialog({
                        title: id
                    });
                    $('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
                    event.preventDefault();
                });
		// bar button clicl event
		$('#' + subid + '-bar').button().click(function(event) {
                    id = event.target.getAttribute('id');
		    // to do toglle bar graph
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
    $(".bar-button").button({
	icons: {
            primary: "ui-icon-bar"
        },
        text: false
    });
};
/** create the initilas info buttons 

 * @param {json} data: initial tree data
 */
function infocreate(data) {
    //console.log(data);
    //console.log('oop');
    $("#jstree-button-tab").empty();
    data = data.core.data;
    for (i = 0; i < data.length; i++) {
        var folder = data[i].id;
        //console.log(folder);
	var newbuttoncontainer = $("<div class=\"jstree-button-container\"></div>");
        var newinfo = "<button id=\"" + folder + "-info\" class=\"ui-btn ui-shadow ui-corner-all jstree-button info-button\">info</button>";
        newbuttoncontainer.append(newinfo);
	$("#jstree-button-tab").append(newbuttoncontainer);
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
		subid =data[folder].children[j].replace(/:/g,'-');
		// bar graph test
		var newbuttoncontainer = $("<div class=\"jstree-button-container\"></div>");
		var newbar = "<button  id=\""  + subid + "-bar\" class=\"ui-btn ui-corner-all  jstree-button bar-button\"></button>";
                //console.log(data[data[folder].children[j]].state.opened);
                var newinfo = "<button id=\"" + subid + "-info\" class=\"ui-btn ui-shadow ui-corner-all info-button\">info</button>";
                //console.log(newinfo);
                newbuttoncontainer.append(newinfo);
		$("#jstree-button-tab").append(newbuttoncontainer);
                $('#' + subid + '-info').button().click(function(event) {
                    id = event.target.getAttribute('id');
                    $('#dialog').dialog({
                        title: id
                    });
                    $('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
                    event.preventDefault();
                });
		// bar button clicl event
		$('#' + subid + '-bar').button().click(function(event) {
                    id = event.target.getAttribute('id');
		    // to do toglle bar graph
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
    $(".bar-button").button({
	icons: {
            primary: "ui-icon-bar"
        },
        text: false
    });
};

//event listener for object clicked to refresj the buttons
$('#layers-tree')
    // listen for event
    .on('changed.jstree', function(e, data) {
	refreshinfo($("#layers-tree").jstree(true)._model.data);
        // to do: toggle visibility of layers.
    })
//open
$('#layers-tree')
    // listen for event
    .on('open_node.jstree', function(e, data) {
        refreshinfo($("#layers-tree").jstree(true)._model.data);
    })
    //close
$('#layers-tree')
    // listen for event
    .on('close_node.jstree', function(e, data) {
        refreshinfo($("#layers-tree").jstree(true)._model.data);
    })
    //event listener for drag and drop
    //close
$('#layers-tree')
    // listen for event
    .on('move_node.jstree', function(e, data) {
        console.log("hheee");
        refreshinfo($("#layers-tree").jstree(true)._model.data);
    })

/*** Toggle full screen function ***/
function toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
