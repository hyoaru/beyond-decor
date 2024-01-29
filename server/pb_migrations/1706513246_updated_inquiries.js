/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // remove
  collection.schema.removeField("8idpfivv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4a2luquv",
    "name": "event_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8idpfivv",
    "name": "event_date",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("4a2luquv")

  return dao.saveCollection(collection)
})
