/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns")

  // remove
  collection.schema.removeField("pkp3t6gp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "acuaunlq",
    "name": "field",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pkp3t6gp",
    "name": "image_path",
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
  collection.schema.removeField("acuaunlq")

  return dao.saveCollection(collection)
})
