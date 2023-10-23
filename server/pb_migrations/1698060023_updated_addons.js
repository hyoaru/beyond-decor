/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("culzs3jviie9t44")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1hhqos40",
    "name": "price",
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
  const collection = dao.findCollectionByNameOrId("culzs3jviie9t44")

  // remove
  collection.schema.removeField("1hhqos40")

  return dao.saveCollection(collection)
})
