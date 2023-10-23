/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wr0mse7vtnen7ql")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "i46lukej",
    "name": "short_description",
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
  const collection = dao.findCollectionByNameOrId("wr0mse7vtnen7ql")

  // remove
  collection.schema.removeField("i46lukej")

  return dao.saveCollection(collection)
})
