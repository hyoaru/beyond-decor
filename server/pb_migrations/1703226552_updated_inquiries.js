/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // remove
  collection.schema.removeField("9dduvwz1")

  // remove
  collection.schema.removeField("13ht9xzi")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r4zk5lyp",
    "name": "main_package",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "wr0mse7vtnen7ql",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vcirmm31",
    "name": "addons",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "culzs3jviie9t44",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

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

  // remove
  collection.schema.removeField("r4zk5lyp")

  // remove
  collection.schema.removeField("vcirmm31")

  return dao.saveCollection(collection)
})
