/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ylst6gba",
    "name": "client_name",
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
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // remove
  collection.schema.removeField("ylst6gba")

  return dao.saveCollection(collection)
})
