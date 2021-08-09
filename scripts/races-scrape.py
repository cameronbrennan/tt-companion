from logging import error
import urllib3
import json
http = urllib3.PoolManager()

API_URL = "https://www.dnd5eapi.co"

def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    # CONNECTION_STRING = "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/myFirstDatabase"
    CONNECTION_STRING = "mongodb://localhost:27017/ttcompanion"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['ttcompanion']
    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    

    # Get the database
    dbname = get_database()
    collection = dbname["races"]
    if collection.count_documents({})>0:
        print("Collection already exists")
    else:
        index_res = http.request('GET', API_URL + '/api/races/')
        if index_res.status != 200:
            print(index_res.status)
            raise ValueError('Could not connect to api')
        race_dict = json.loads(index_res.data.decode('utf-8'))
        if 'results' not in race_dict:
            raise ValueError('Missing results from response')
        race_list = race_dict['results']
        for race_obj in race_list:
            race_url = API_URL + race_obj['url']
            race_res = http.request('GET', race_url)
            if race_res.status != 200:
                raise ValueError('Could not get race_url at ' + race_url)
            race_details = json.loads(race_res.data.decode('utf-8'))
            if 'index' not in race_details:
                raise ValueError('Missing results from response')
            else:
                print(race_details['index'])
            # race_details['_id'] = race_details["index"] - figure out custom _ids
        
            collection.insert_one(
                race_details
            )