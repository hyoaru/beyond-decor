/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wr0mse7vtnen7ql")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jgbwda9k",
    "name": "is_displayed",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wr0mse7vtnen7ql")

  // remove
  collection.schema.removeField("jgbwda9k")

  return dao.saveCollection(collection)
})
