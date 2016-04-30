#!/usr/bin/python

from __future__ import division
import io, json



with open('/Users/hgnehm/Sites/chicago/data/crime.geojson') as data_file:    
    data = json.load(data_file)

for i in range(0, 77):
	community = data['features'][i]['properties']['community']
	for year in range(2003, 2016):
		category = str(year) + ":homicide_pc"
		value = data['features'][i]['properties'][category]
		print(community + ";" + str(year) + ";" + str(value))