var navigation = {
		//"plugins": ["checkbox", "dnd", "search", "types", "search"],
		"plugins": ["search", "types"],
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
								"children": [
									{"id": "crime:HOMICIDE:2003", "text": "2003"},
									{"id": "crime:HOMICIDE:2004", "text": "2004"},
									{"id": "crime:HOMICIDE:2005", "text": "2005"},
									{"id": "crime:HOMICIDE:2006", "text": "2006"},
									{"id": "crime:HOMICIDE:2007", "text": "2007"},
									{"id": "crime:HOMICIDE:2008", "text": "2008"},
									{"id": "crime:HOMICIDE:2009", "text": "2009"},
									{"id": "crime:HOMICIDE:2010", "text": "2010"},
									{"id": "crime:HOMICIDE:2011", "text": "2011"},
									{"id": "crime:HOMICIDE:2012", "text": "2012"},
									{"id": "crime:HOMICIDE:2013", "text": "2013"},
									{"id": "crime:HOMICIDE:2014", "text": "2014"},
									{"id": "crime:HOMICIDE:2015", "text": "2015"},
								]
						}, {
								"id": "crime:BATTERY",
								"text": "Battery",
								"children": [
									{"id": "crime:BATTERY:2003", "text": "2003"},
									{"id": "crime:BATTERY:2004", "text": "2004"},
									{"id": "crime:BATTERY:2005", "text": "2005"},
									{"id": "crime:BATTERY:2006", "text": "2006"},
									{"id": "crime:BATTERY:2007", "text": "2007"},
									{"id": "crime:BATTERY:2008", "text": "2008"},
									{"id": "crime:BATTERY:2009", "text": "2009"},
									{"id": "crime:BATTERY:2010", "text": "2010"},
									{"id": "crime:BATTERY:2011", "text": "2011"},
									{"id": "crime:BATTERY:2012", "text": "2012"},
									{"id": "crime:BATTERY:2013", "text": "2013"},
									{"id": "crime:BATTERY:2014", "text": "2014"},
									{"id": "crime:BATTERY:2015", "text": "2015"},
								]
						}],
				}, {
						"id": "ethnicity",
						"text": "Ethnicity",
						"children": [
							{"id": "ethnicity:white_p:2010", "text": "White"},
							{"id": "ethnicity:black_p:2010", "text": "Black"},
							{"id": "ethnicity:asian_p:2010", "text": "Asian"},
							{"id": "ethnicity:other_p:2010", "text": "Other"},
							{"id": "ethnicity:mix_p:2010", "text": "Mixed"},
						],
				},
				{
						"id": "social",
						"text": "Social-economic indicators",
						"children": [
							{"id": "social:hardship:", "text": "Hardship Index"},
							{"id": "social:crowded:", "text": "Crowded Housing"},
							{"id": "social:poverty:", "text": "Poverty"},
							{"id": "social:income:", "text": "Income"},
							{"id": "social:diploma:", "text": "Education"},
							{"id": "social:notWorkingAge:", "text": "Dependence"},
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
			$('#layers-tree').on("select_node.jstree", function (e, data) {
				id = data.selected[0];
				values = id.split(":");
				dataSet = values[0];
				category = values[1];
				year = values[2];
				console.log(dataSet + " - " + category + " - " + year);
				if (year == "") {
					showDataSet(dataSet, category, category, "");
				} else {
					showDataSet(dataSet, year + ":" + category, category, "");
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
