//* Import modules
import {
  db
} from './database.js';
import {
  updateScreen
} from './main.js'

db.open();

// Get all lists from database
export async function getLists() {
  return await db.lists.toArray();
}
// Get one list from database
export async function getList(id) {
  return await db.lists.get(id);
}

// Make a new list
export async function newList(name) {
  db.lists.put({
    name: name,
    items: {}
  }).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

// Edit listname
export async function editList(id, change) {
  db.lists.update(id, {
    name: change
  }).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

// Delete list from database
export async function deleteList(id) {
  db.lists.delete(id).catch((error) => {
    console.error(error);
  });

  return await updateScreen();
}