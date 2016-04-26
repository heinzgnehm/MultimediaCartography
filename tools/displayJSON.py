#!/usr/bin/python

from __future__ import division
import io, json

crime = {
	"ASSAULT": "assault",
	"BATTERY": "battery",
	"BURGLARY": "burglary",
	"HOMICIDE": "homicide",
	"NARCOTICS": "narcotics",
	"ROBBERY": "robbery",
	"THEFT": "theft"
}

delete = []

rename = {}

with open('/Users/hgnehm/Sites/chicago/data/crime.geojson') as data_file:    
    data = json.load(data_file)

for key, value in data['features'][0]['properties'].iteritems():
	
	if ":" in key:
		year = key[0:4]
		category = key[5:100]
		if category in crime:
			new_category = year + ":" + crime[category]
			rename[key] = new_category 
			#data['features'][i]['properties'].pop(key, None)
			#data['features'][0]['properties'][new_category] = value
			#print("Category " + key + " -> rename to " + new_category)
		else:
			delete.append(key)
			#data['features'][i]['properties'].pop(key, None)
			#print("Category " + key + " -> delete")

for item in delete:
	print("Delete " + item);

for i in range(0, 77):

	for key in delete:
		data['features'][i]['properties'].pop(key, None)
		
with io.open('/Users/hgnehm/Sites/chicago/data/crime_new.geojson', 'w', encoding='utf-8') as f:
	f.write(unicode(json.dumps(data, ensure_ascii=False)))