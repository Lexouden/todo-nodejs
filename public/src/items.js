//* Import modules
import {
  db
} from './database.js';

db.open();

export async function getItemList(listID) {
  return await db.lists.get(listID);
}

export async function newItem({
  description,
  duration,
  status,
  id
}) {
  db.lists.update(id, {
    [`items.${uuid()}`]: {
      description: description,
      duration: duration,
      status: status
    }
  }).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

export async function editItem({
  id,
  change,
  listID
}) {
  // Get list of item to be edited
  let list = await getItemList(listID);

  // Check if change property is an object
  if (!change instanceof Object) return console.error('"Change" has to be an Object with properties');

  // Check if change present, if so change it.
  if (typeof change.description !== 'undefined' || change.description !== null || change.description !== '') list.items[id].description = change.description || list.items[id].description;
  if (typeof change.duration !== 'undefined' || change.duration !== null || change.duration !== '') list.items[id].duration = change.duration || list.items[id].duration;
  if (typeof change.status !== 'undefined' || change.status !== null || change.status !== '') list.items[id].status = change.status || list.items[id].status;

  // Push update to database
  db.lists.update(listID, list).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

export async function deleteItem(id, listID) {
  // Get list containing item
  let list = await db.lists.get(listID);

  // Delete item from object
  delete list.items[id];

  // Push update to database
  db.lists.put(list).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}