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
				'check_callback': true,
				"themes": {
						"stripes": true
				},
				'data': [{
						"id": "crime",
						"text": "Crime",
 						"state": {
   					                 "opened": false,
   					                 "disabled":true
              					},
              					a_attr: {
        					class: "no_checkbox no_transparent"
    						},
						"children": [{
								"id": "crime:homicide_pc",
								"text": "Homicide",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:burglary_pc",
								"text": "Burglary",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:robbery_pc",
								"text": "Robbery",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:battery_pc",
								"text": "Battery",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:theft_pc",
								"text": "Theft   ",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:assault_pc",
								"text": "Assault",
								"icon": "icons/svg/layer.svg",
						}, {
								"id": "crime:narcotics_pc",
								"text": "Narcotics",
								"icon": "icons/svg/layer.svg",
						}],
				}, {
						"id": "ethnicity",
						"text": "Ethnicity",
 						"state": {
   					                 "opened": false,
   					                 "disabled":true
              					},
              					a_attr: {
        					class: "no_checkbox no_transparent"
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
						"text": "Socioeconomic indicators",
 						"state": {
   					                 "opened": false,
   					                 "disabled":true,
              					},
              					a_attr: {
        					class: "no_checkbox no_transparent"
    						},
						"children": [
							{"id": "social:hardship", "text": "Hardship Index", "icon": "icons/svg/layer.svg",},
							{"id": "social:crowded", "text": "Crowded Housing", "icon": "icons/svg/layer.svg",},
							{"id": "social:poverty", "text": "Poverty", "icon": "icons/svg/layer.svg",},
							{"id": "social:income", "text": "Income", "icon": "icons/svg/layer.svg",},
							{"id": "social:diploma", "text": "Education", "icon": "icons/svg/layer.svg",},
							{"id": "social:unemployed", "text": "Unemployment", "icon": "icons/svg/layer.svg",},
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
			//create buttons
			infocreate(navigation);
			// initilize searchin function
			var to = false;
			$('#search-layer').keyup(function() {
        			if (to) {
            				clearTimeout(to);
        				}
        			to = setTimeout(function() {
           				var v = $('#search-layer').val();
           				$('#layers-tree').jstree(true).search(v);
       				}, 250);
   			 });
			/*$("#layers-tree").bind("loaded.jstree", function(event, data) {
   					$('.lvl1').find('ins.jstree-checkbox').hide();
					}).jstree({});*/

			$('#layers-tree').on("select_node.jstree", function (e, data) {
				console.log(e);
				console.log(data);
				// get last selected data
				id = data.selected[data.selected.length-1];
				// deselect all the rest
				if (data.selected.length>1){
					for (i=0;i<data.selected.length-1;i++){
					$('#layers-tree').jstree(true).deselect_node(data.selected[i]);
					}
						}

				
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
					case "crime":     showDataSet(dataSet, year + ":" + category); showSlider(); break;
					case "ethnicity": showDataSet(dataSet, year + ":" + category); hideSlider(); break;
					case "social":    showDataSet(dataSet, category); hideSlider(); break;
					//case 1: console.log("Show sub-menu"); break;
					//case 2: showDataSet(dataSet, category, category, ""); break;
					//case 3: showDataSet(dataSet, year + ":" + category, year + ":" + category, ""); break;
				}
			});
			// remove dtaset in case some body deselect them all
			$('#layers-tree').on("deselect_node.jstree", function (e, data) {
				console.log('deselected');
				map.removeLayer(layer);});
				

		});



		$('#collapse-left').button().click(function() {
				$('.navigation').css("visibility", "hidden");
		    $('.collapsed-navigation').css("visibility", "visible");
				//$('#map').css("visibility", "visible");
		    //$('.mappanel').css("left","30px");
		});

		$('#close-panel').button().click(function() {
				console.log('iiiii');
				$('.graph-panel').css("width", "0");
		    		$('.map').css("right", "0");
		    		map.resize();
		    		isBarGraph=false;
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
			var url = "info/info.html";
			//var url = $('#mapframe').prop('src').replace(/Maps\//, 'Descriptions/').replace(/\..*$/, '.html');
			$('#dialog').dialog({
				title: 'Map Description'
			});
			$('#dialogframe').prop('src', url);event.preventDefault();
		});
		$('#fullscreen').button().click(function(event) {
   			 var element = document.querySelector('body');
   			 toggleFullscreen(element);

		});
		$('#landing').button().click(function(event) {
   			 $("body").load("landing.html");

		});
		$('#help').button().click(function(event) {
        		  	showHelp();
   			 	$("#help").button({
		    			       icons: {
		                               		primary: "ui-icon-helps-close"
		                               },
		   			       text: false
					       });
		});
		/* home button event and layover */
		$('#home-map').button().click(function(event) {
   			 map.setView([41.8369, -87.6847], 11);

		});
		$('#home-map').button().hover(function(){$(this).removeClass("home-map").addClass("home-map-mouseover")}
					     ,function(){$(this).removeClass("home-map-mouseover").addClass("home-map")});

		$("#fullscreen").button({
		    icons: {
		        primary: "ui-icon-arrow-4-diag"
		    },
		    text: false
		});
		$("#landing").button({
		    icons: {
		        primary: "ui-icon-home"
		    },
		    text: false
		});
		$("#collapse-left").button({
		    icons: {
		        primary: "ui-icon-carat-1-nw"
		    },
		    text: false
		});
		$("#close-panel").button({
		    icons: {
		        primary: "ui-icon-close"
		    },
		    text: false
		});
		$("#collapse-right").button({
		    icons: {
		        primary: "ui-icon-carat-1-se"
		    },
		    text: false
		});
		$("#help").button({
		    icons: {
		        primary: "ui-icon-helps"
		    },
		    text: false
		});
		$("#home-map").button({
		   /* icons: {
		        primary: "ui-icon-home"
		    },*/
		    text: false
		});
		$('#tabs').tabs();

//gloabl varible for help status and bar graph
var isHelp=false;
var isBarGraph=false;
var currentBarId='';

/*
	start help if was lanched from landing page
*/
setInterval( function(){if (startHelp=='true'){
	showHelp();
	$("#help").button({
		    			       icons: {
		                               		primary: "ui-icon-helps-close"
		                               },
		   			       text: false
					       });
	}
},2000);

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
			if(isBarGraph&&chosenDataSet&&currentBarId&&currentBarId.trim('-')[0]=='crime'){
			updateBarGraph();}
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
                            $(this).css("background-color", "#eeeeee");
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
						$('#dialogframe').prop('src', 'info/info.html#' + id);
						console.log("gui.js > refreshinfo() > top: call info page at info/info.html#" + id);
            //$('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
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
										//$('#dialogframe').prop('src', 'info/info.html#' + id);
										$('#dialogframe').prop('src', 'info/info.html#' + id);
										console.log("gui.js > refreshinfo() > bottom: call info page at info/info.html#" + id);
                    //$('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
                    event.preventDefault();
                });
		// bar button clicl event
		$('#' + subid + '-bar').button().click(function(event) {
		    updateBarGraph(event);
		    //$(".graph-tab").load('graph/BarGraphSort.html?id='+ id);
		    /*$('#bar-graph').dialog({
                        title: 'Bar Graph',
                        name: id,
                        position: {
                        	my: "left top",
                        	at: "right top",
                        	of: ".navigation",
                        	collision: 'none',

                        },
                        height: $(window).height()-38-105,
                        width: $(window).width()-330,

                    });
                    $('#bar-graph-frame').prop('src', 'graph/BarGraphSort.html?id='+ id);*/
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
						$('#dialogframe').prop('src', 'info/info.html#' + id);
						console.log("gui.js > infocreate() > top: call info page at info/info.html#" + id);
						//$('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
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
										$('#dialogframe').prop('src', 'info/info.html#' + id);
										console.log("gui.js > infocreate() > bottom: call info page at info/info.html#" + id);
                    //$('#dialogframe').prop('src', 'Descriptions/' + id + '.html');
                    event.preventDefault();
                });
		// bar button clicl event
		$('#' + subid + '-bar').button().click(function(event) {
                    id = event.target.getAttribute('id');
                    console.log(id);
		    if (id.split('-')[0]=="crime"){
		    	year=parseInt(slider.noUiSlider.get());
		    	id=id.split('-')[0]+'-'+year.toString()+':'+id.split('-')[1]+'-'+id.split('-')[2];
		    	}
		    if (id.split('-')[0]=="ethnicity"){
		    	year=parseInt(slider.noUiSlider.get());
		    	id=id.split('-')[0]+'-'+'2010'+':'+id.split('-')[1]+'-'+id.split('-')[2];
		    	}

		    $('#bar-graph').dialog({
                        title: 'Bar Graph',
                        name: id,
                        position: {
                        	my: "left top",
                        	at: "right top",
                        	of: ".navigation",
                        	collision: 'none',

                        },
                        height: $(window).height()-38-105,
                        width: $(window).width()-330,

                    });
                    $('#bar-graph-frame').prop('src', 'graph/BarGraphSort.html?id='+ id);
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

/*** update the bar graph when year is changed ***/
function updateBarGraph(event){
		    event = event || 0;
			var graphPanelWidth=$(window).width()-parseInt($(".navigation").css("width"))-640-50;
		    console.log(graphPanelWidth);
		    $('.graph-panel').css("width",graphPanelWidth.toString()+"px");
		    $('.map').css("right",(graphPanelWidth-2).toString()+"px");
		    if (event!=0){
                    	id = event.target.getAttribute('id');
                    	currentBarId=id;
                    } else {
                    	id=currentBarId;
                    }
                  
                    console.log(id);
		    if (id.split('-')[0]=="crime"){
		    	year=parseInt(slider.noUiSlider.get());
		    	id=id.split('-')[0]+'-'+year.toString()+':'+id.split('-')[1]+'-'+id.split('-')[2];
		    	}
		    if (id.split('-')[0]=="ethnicity"){
		    	year=parseInt(slider.noUiSlider.get());
		    	id=id.split('-')[0]+'-'+'2010'+':'+id.split('-')[1]+'-'+id.split('-')[2];
		    	}
		    showBarGraph(id);
		    isBarGraph=true;
	//console.log($('#bar-graph').dialog("option"));
	/*id =$('#bar-graph').dialog("option").name;
	if (id.split('-')[0]=='crime'){
		year=parseInt(slider.noUiSlider.get());
		id=id.split('-')[0]+'-'+year.toString()+':'+id.split('-')[1].split(':')[1]+'-'+id.split('-')[2];
		$('#bar-graph').dialog({
                        title: 'Bar Graph',
                        name: id,
                        position: {
                        	my: "left top",
                        	at: "right top",
                        	of: ".navigation",
                        	collision: 'none',

                        },
                        height: $(window).height()-38-105,
                        width: $(window).width()-330,

                    });
                    $('#bar-graph-frame').prop('src', 'graph/BarGraphSort.html?id='+ id);

	}

	}*/

}

function showHelp(){
	$(".tips").remove();
	$("#layers-tree").jstree(true).open_node("crime");
   	//$("#layers-tree").jstree(true).deselect_node("crime:homicide_pc");
   	// create all tips	
   	createMark('help',{dx:50,dy:30},"Close help mode",'pointer');
   	createMark('landing',{dx:50,dy:70},"Back to landing page");
   	createMark('fullscreen',{dx:50,dy:110},"Fullscreen");
   	
   	createMark('crime-info',{dx:100,dy:20},"Info about the dataset");
   	createMark('crime-burglary_pc-bar',{dx:120,dy:20},"Generate bar graph for the dataset");
   	createMark('crime:theft_pc_anchor',{dx:230,dy:20},"Select the dataset",'menu-anchor');
   	
   	createMark('about',{dx:-50,dy:70},"About the Atlas");
   	createMark('imprint',{dx:-50,dy:30},"Imprint");
   	
   	createMark('home-map',{dx:-50,dy:20},"Zoom to initial view");
   	createMark('noUi-handle',{dx:50,dy:-20},"Change year",'handle');
   	
   	$("*:not(.tips):not(body)").addClass("trasparent");
   	$("#help-help").click(function() {
 			 $(".tips").remove();
			 $("*:not(.tips):not(body):not(#help)").removeClass("trasparent");
			 $("#help").button({
	    			       icons: {
	                               		primary: "ui-icon-helps"
	                               },
	   			       text: false
				       });
			 isHelp=false;
	});
	isHelp=true;
	}

function createMark(id,dline,text,type){
	type = type || 0;
	var num = 100;
	$("#help").css('width',10);
	var helpMark = $("<div></div>");
	var pos= $(document.getElementById(id)).offset();
	var hwidth=parseInt($(document.getElementById(id)).css("width"));
	var hheight=parseInt($(document.getElementById(id)).css("height"));
	// option also for class
	if (pos) {
	} else {
 		 pos= $(document.getElementsByClassName(id)).offset();
 		 hwidth=parseInt($(document.getElementsByClassName(id)).css("width"));
		 hheight=parseInt($(document.getElementsByClassName(id)).css("height"));
	}
	//console.log(pos);

	//console.log(id +"." +pos);
	helpMark.attr('id', id+'-help');
	helpMark.attr('class', 'help tips');
	helpMark.css({top: pos.top-7, left: pos.left-8, position:'absolute', width: hwidth+15,height: hheight+15,});
	
	switch(type){
		case 'menu-anchor':
			helpMark.css({top: pos.top-7, left: pos.left-8, position:'absolute', width: hwidth+30,height: hheight+15,});
			break;
		case 'handle':
			helpMark.css({top: pos.top-10, left: pos.left-11, position:'absolute', width: hwidth+15,height: hheight+15,});
			break;
		case 'pointer':
			helpMark.css({top: pos.top-7, left: pos.left-8, position:'absolute', width: hwidth+15,height: hheight+15, cursor:'pointer'});
			break;
		case 0:
			break;
		default:
        		return 0;
		}
		
	helpMark.appendTo('body');
	//create line
	pos=helpMark.offset();
	hwidth=parseInt(helpMark.css("width"));
	hheight=parseInt(helpMark.css("height"));
	var helpLine = $("<div></div>");
	helpLine.attr('id', id+'-help-line');
	helpLine.attr('class', 'help-line  tips');
	var helpText = $("<div>"+text+"</div>");
	helpText.attr('id', id+'-help-text');
	helpText.attr('class', 'help-text  tips')
	if(dline.dx>0&&dline.dy>0){
		helpLine.css({top: pos.top+hheight+5, left: pos.left+hwidth/2-2, position:'absolute', width: dline.dx+6,height: dline.dy+6,});
		helpLineSvg = "<svg height=\""+(dline.dy+6).toString()+"\" width=\""+(dline.dx+6).toString()+"\">"+
	  				"<polyline points=\"3,3 3,"+(dline.dy).toString()+" "+ (dline.dx).toString() +","+ (dline.dy).toString() + "\" style=\"fill:none;stroke:#d41f25;stroke-width:2\" />"+
	 		 		"Sorry, your browser does not support inline SVG."+
			      "</svg>";
		helpLine.append(helpLineSvg);
		// fix text position
		helpText.css({top: pos.top+hheight+dline.dy-5, left: pos.left+hwidth/2-4+dline.dx, position:'absolute'});
		}
	else if (dline.dx<0&&dline.dy<0){
		// DO not occur ,to be implemented, tested
		}
	else if (dline.dx<0&&dline.dy>0){
		dline.dx=Math.abs(dline.dx);
		dline.dy=Math.abs(dline.dy);
		helpLine.css({top: pos.top+hheight+5, left: pos.left+hwidth/2-dline.dx-4, position:'absolute', width: dline.dx+6,height: dline.dy+6,});
		helpLineSvg = "<svg height=\""+(dline.dy+6).toString()+"\" width=\""+(dline.dx+6).toString()+"\">"+
	  				"<polyline points=\""+(dline.dx+3).toString()+",3 "+(dline.dx+3).toString()+","+(dline.dy+3).toString()+" 3,"+ (dline.dy+3).toString() + "\" style=\"fill:none;stroke:#d41f25;stroke-width:2\" />"+
	 		 		"Sorry, your browser does not support inline SVG."+
			      "</svg>";
		helpLine.append(helpLineSvg);
		// fix text position
		helpText.css({top: pos.top+hheight+dline.dy-3, right: $(window).width()-pos.left-hwidth/2+4+dline.dx, position:'absolute'});
		}
	else if (dline.dx>0&&dline.dy<0){
		dline.dx=Math.abs(dline.dx);
		dline.dy=Math.abs(dline.dy);
		helpLine.css({top: pos.top-dline.dy-5, left: pos.left+hwidth/2, position:'absolute', width: dline.dx+6,height: dline.dy+6,});
		helpLineSvg = "<svg height=\""+(dline.dy+6).toString()+"\" width=\""+(dline.dx+6).toString()+"\">"+
	  				"<polyline points=\"3,"+(dline.dy+3).toString()+" 3,3 "+(dline.dx+3).toString()+",3\" style=\"fill:none;stroke:#d41f25;stroke-width:2\" />"+
	 		 		"Sorry, your browser does not support inline SVG."+
			      "</svg>";
		helpLine.append(helpLineSvg);
		// fix text position
		helpText.css({top: pos.top-dline.dy-9, left: pos.left+hwidth/2+dline.dx+3, position:'absolute'});
		
		}
	
	helpLine.appendTo('body');
	helpText.appendTo('body');
	}

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

/*** event listener for windows resize **/
window.addEventListener("resize", function(){
    if(isBarGraph){
    	updateBarGraph();
    }
    if(isHelp){
    	showHelp();
    }
}); 
