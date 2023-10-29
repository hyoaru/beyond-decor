/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2bykqm62",
    "name": "preferred_design_description",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bsjz1ge1mr0cuha")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2bykqm62",
    "name": "preferred_design",
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

  return dao.saveCollection(collection)
})
