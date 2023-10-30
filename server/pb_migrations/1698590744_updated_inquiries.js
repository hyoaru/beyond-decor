/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // remove
  collection.schema.removeField("bj4c1awg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9dduvwz1",
    "name": "main_package",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "13ht9xzi",
    "name": "add_ons",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bj4c1awg",
    "name": "items",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("9dduvwz1")

  // remove
  collection.schema.removeField("13ht9xzi")

  return dao.saveCollection(collection)
})
