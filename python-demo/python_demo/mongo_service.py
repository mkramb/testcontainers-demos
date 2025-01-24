from pymongo import MongoClient
from typing import Any, Dict

from python_demo.utils import Singleton


class MongoService(metaclass=Singleton):
    def connect_to_database(self, uri: str, db_name: str):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def insert_record(self, collection_name: str, data: Dict[str, Any]) -> Any:
        collection = self.db[collection_name]
        result = collection.insert_one(data)

        return result.inserted_id

    def find_record(
        self, collection_name: str, query: Dict[str, Any]
    ) -> Dict[str, Any]:
        collection = self.db[collection_name]
        return collection.find_one(query)

    def close_connection(self):
        self.client.close()
