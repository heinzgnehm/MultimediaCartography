#!/usr/bin/python

from __future__ import division
import io, json

with open('/Users/hgnehm/Sites/chicago/data/ethnicity.geojson') as data_file:    
    data = json.load(data_file)

chicago = 0;

for i in range(0, 77):

	community = data['features'][i]['properties']['community']
	population = data['features'][i]['properties']['tot']
	chicago = chicago + population
	print("community " + community + " population " + str(population))
	
print("Chicago population " + str(chicago))