import pytest
from testcontainers.mongodb import MongoDbContainer
from python_demo.mongo_service import MongoService


@pytest.fixture(scope="module")
def mongo_container():
    container = MongoDbContainer()
    container.start()

    mongo_uri = container.get_connection_url()
    MongoService().connect_to_database(mongo_uri, "testdb")

    yield container

    MongoService().close_connection()
    container.stop()


def test_insert(mongo_container):
    collectionName = "users"

    MongoService().db.get_collection(collectionName).delete_many({})

    MongoService().insert_record(collectionName, {"name": "Test User A", "age": 60})
    MongoService().insert_record(collectionName, {"name": "Test User B", "age": 80})

    users = MongoService().db.get_collection(collectionName).find().to_list()

    assert len(users) == 2
    assert users[0]["name"] == "Test User A"
    assert users[1]["name"] == "Test User B"


def test_find(mongo_container):
    collectionName = "users"

    MongoService().db.get_collection(collectionName).delete_many({})
    MongoService().db.get_collection(collectionName).insert_many(
        [{"name": "Test User A", "age": 60}, {"name": "Test User B", "age": 80}]
    )

    user = MongoService().find_record("users", {"name": "Test User A"})

    assert user is not None
    assert user["name"] == "Test User A"
    assert user["age"] == 60
