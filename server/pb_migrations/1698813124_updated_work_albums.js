/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4knufgxd",
    "name": "image_files",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 12,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4knufgxd",
    "name": "image_files",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 20,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/jpeg",
        "image/png"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
