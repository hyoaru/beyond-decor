/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  collection.name = "work_albums"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p")

  collection.name = "works_gallery"

  return dao.saveCollection(collection)
})
