#!/usr/bin/python

from __future__ import division
import io, json

# Read the population for each community and store them in an array.
#
population = {}
populationFile = open('/Users/hgnehm/Sites/chicago/tools/population.txt', 'r')
for line in populationFile:
	items = line.split(";")
	community = items[0];
	pop = items[1].replace("\n", "")
	population[community] = pop;

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

with open('/Users/hgnehm/Sites/chicago/data/crime_original.geojson') as data_file:    
    data = json.load(data_file)

for key, value in data['features'][0]['properties'].iteritems():
	
	if ":" in key:
		year = key[0:4]
		category = key[5:100]
		if category in crime:
			new_category = year + ":" + crime[category]
			rename[key] = new_category
			print("rename " + key + " to " + new_category)
		else:
			delete.append(key)
			print("delete " + key);

for i in range(0, 77):

	community = data['features'][i]['properties']['community'].title()
	pop = int(population[community])
	data['features'][i]['properties']['community'] = community
	data['features'][i]['properties']['population'] = pop

	for key in delete:
		data['features'][i]['properties'].pop(key, None)
		
	for key in rename:
		renamedCategory = rename[key]
		perCapitaCategory = renamedCategory + "_pc"
		value = int(data['features'][i]['properties'][key])
		perCapita = value / (100000 / pop)
		data['features'][i]['properties'].pop(key, None)
		data['features'][i]['properties'][renamedCategory] = value
		data['features'][i]['properties'][perCapitaCategory] = perCapita
		print(community + " (" + str(pop) + ") | " + new_category + " | " + str(value) + " > " + str(perCapita))
		
with io.open('/Users/hgnehm/Sites/chicago/data/crime.geojson', 'w', encoding='utf-8') as f:
	f.write(unicode(json.dumps(data, ensure_ascii=False)))