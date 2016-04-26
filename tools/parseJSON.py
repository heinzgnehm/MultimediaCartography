#!/usr/bin/python

from __future__ import division
import io, json

with open('/Users/hgnehm/Sites/chicago/community_ethnicity_00.json') as data_file:    
    data0 = json.load(data_file)

with open('/Users/hgnehm/Sites/chicago/community_ethnicity_10.json') as data_file:    
    data1 = json.load(data_file)

for i in range(0, 77):

	community0 = data0['features'][i]['properties']['community']
	community1 = data1['features'][i]['properties']['community']
	print(community0 + " <-> " + community1)
	total1 = data1['features'][i]['properties']['tot']

	white = data1['features'][i]['properties']['white']
	data1['features'][i]['properties'].pop('white', None)
	data1['features'][i]['properties']['2010:white'] = white
	data1['features'][i]['properties']['2010:white_p'] = white / total1 * 100
	
	black = data1['features'][i]['properties']['black']
	data1['features'][i]['properties'].pop('black', None)
	data1['features'][i]['properties']['2010:black'] = black
	data1['features'][i]['properties']['2010:black_p'] = black / total1 * 100
	
	native = data1['features'][i]['properties']['native']
	data1['features'][i]['properties'].pop('native', None)
	data1['features'][i]['properties']['2010:native'] = native
	data1['features'][i]['properties']['2010:native_p'] = native / total1 * 100
	
	asian = data1['features'][i]['properties']['asian']
	data1['features'][i]['properties'].pop('asian', None)
	data1['features'][i]['properties']['2010:asian'] = asian
	data1['features'][i]['properties']['2010:asian_p'] = asian / total1 * 100
	
	islander = data1['features'][i]['properties']['islander']
	data1['features'][i]['properties'].pop('islander', None)
	data1['features'][i]['properties']['2010:islander'] = islander
	data1['features'][i]['properties']['2010:islander_p'] = islander / total1 * 100
	
	other = data1['features'][i]['properties']['other']
	data1['features'][i]['properties'].pop('other', None)
	data1['features'][i]['properties']['2010:other'] = other
	data1['features'][i]['properties']['2010:other_p'] = other / total1 * 100
	
	mix = data1['features'][i]['properties']['mix']
	data1['features'][i]['properties'].pop('mix', None)
	data1['features'][i]['properties']['2010:mix'] = mix
	data1['features'][i]['properties']['2010:mix_p'] = mix / total1 * 100

	#total_p = white_p + black_p + native_p + asian_p + islander_p + other_p + mix_p
	#print(community + ": total " + str(total) + " white " + str(white) + " percent " + str(white_p))
	#print(community + ": total " + str(total) + " black " + str(black) + " percent " + str(black_p))
	#print(community + ": total " + str(total) + " native " + str(native) + " percent " + str(native_p))
	#print(community + ": total " + str(total) + " asian " + str(asian) + " percent " + str(asian_p))
	#print(community + ": total " + str(total) + " islander " + str(islander) + " percent " + str(islander_p))
	#print(community + ": total " + str(total) + " other " + str(other) + " percent " + str(other_p))
	#print(community + ": total " + str(total) + " mix " + str(mix) + " percent " + str(mix_p))
	#print(community + ": total " + str(total_p))
	
with io.open('/Users/hgnehm/Desktop/chicago-ethnicity.json', 'w', encoding='utf-8') as f:
  f.write(unicode(json.dumps(data1, ensure_ascii=False)))