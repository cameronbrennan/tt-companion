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
    collection = dbname["classes"]
    if collection.count_documents({})>0:
        print("Collection already exists")
    else:
        index_res = http.request('GET', API_URL + '/api/classes/')
        if index_res.status != 200:
            print(index_res.status)
            raise ValueError('Could not connect to api')
        class_dict = json.loads(index_res.data.decode('utf-8'))
        if 'results' not in class_dict:
            raise ValueError('Missing results from response')
        class_list = class_dict['results']
        for class_obj in class_list:
            class_url = API_URL + class_obj['url']
            class_res = http.request('GET', class_url)
            if class_res.status != 200:
                raise ValueError('Could not get class_url at ' + class_url)
            class_details = json.loads(class_res.data.decode('utf-8'))
            if 'index' not in class_details:
                raise ValueError('Missing results from response')
            else:
                print(class_details['index'])
            # class_details["_id"] = class_details["index"] - implement custom _id values
        
            collection.insert_one(
                class_details
            )