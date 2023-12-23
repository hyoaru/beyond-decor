/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "fzbtiyu5zgtkfns",
    "created": "2023-10-15 11:00:04.941Z",
    "updated": "2023-10-22 04:50:51.167Z",
    "name": "landing_cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oeqdynsm",
        "name": "quotation",
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
      },
      {
        "system": false,
        "id": "acuaunlq",
        "name": "image_file",
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
