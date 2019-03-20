import {
  db
} from './database.js';

db.open();

export async function getLists() {
  return await db.lists.toArray();
}

export async function getList(id) {
  return await db.lists.get(id);
}

export function newList(name) {
  db.lists.put({
    name: name,
    items: {}
  }).catch((error) => {
    console.error(error);
  });
}

export function editList(id, change) {
  db.lists.update(id, {
    name: change
  }).catch((error) => {
    console.error(error);
  });
}

export function deleteList(id) {
  db.lists.delete(id).catch((error) => {
    console.error(error);
  });
}