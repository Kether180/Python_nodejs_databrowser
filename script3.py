import json

with open('tradingcountries.json') as json_data:
	for entry in json_data:
	 print(entry)