/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpk1kgipoq76tdm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hhhprklw",
    "name": "position",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jpk1kgipoq76tdm")

  // remove
  collection.schema.removeField("hhhprklw")

  return dao.saveCollection(collection)
})
