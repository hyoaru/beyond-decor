/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lrwrwds0",
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
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns")

  // remove
  collection.schema.removeField("lrwrwds0")

  return dao.saveCollection(collection)
})
