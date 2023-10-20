/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "rqzv4utlku5w28p",
    "created": "2023-10-20 06:31:26.610Z",
    "updated": "2023-10-20 06:31:26.610Z",
    "name": "works_gallery",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "td1shxw3",
        "name": "event_name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "mbwzdbli",
        "name": "event_place",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "acb8bn3c",
        "name": "event_date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("rqzv4utlku5w28p");

  return dao.deleteCollection(collection);
})
