/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fzbtiyu5zgtkfns",
    "created": "2023-10-15 11:00:04.941Z",
    "updated": "2023-10-15 11:00:04.941Z",
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
  const collection = dao.findCollectionByNameOrId("fzbtiyu5zgtkfns");

  return dao.deleteCollection(collection);
})
