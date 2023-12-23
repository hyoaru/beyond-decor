/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // remove
  collection.schema.removeField("ejeljr1j")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zf38ylrf",
    "name": "package_type",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejeljr1j",
    "name": "package_type",
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
  collection.schema.removeField("zf38ylrf")

  return dao.saveCollection(collection)
})
