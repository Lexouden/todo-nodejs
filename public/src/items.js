//* Import modules
import {
  db
} from './database.js';
import {
  updateScreen,
  uuid
} from './main.js'

db.open();

// Get list which contains item
export async function getItemList(listID) {
  return await db.lists.get(listID);
}

export async function getItem(id, listID) {
  let list = await db.lists.get(listID); // Get list of Item
  let item = list.items[id]; // Get item from list
  
  return item; // Send item back
}

export async function newItem({ // Create new item and push to selected list
  description,
  duration,
  status,
  id
}) {
  db.lists.update(id, {
    [`items.${await uuid()}`]: {
      description: description,
      duration: duration,
      status: status
    }
  }).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

export async function editItem({ // Edit item
  id,
  change,
  listID
}) {
  // Get list of item to be edited
  let list = await getItemList(listID);

  // Check if change property is an object
  if (!change instanceof Object) return console.error('"Change" has to be an Object with properties');

  // Check if change present, if so change it.
  change.description ? list.items[id].description = change.description : list.items[id].description = list.items[id].description;
  change.duration ? list.items[id].duration = change.duration : list.items[id].duration = list.items[id].duration;
  change.status ? list.items[id].status = change.status : list.items[id].status = list.items[id].status;

  // Push update to database
  db.lists.update(listID, list).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}

export async function deleteItem(id, listID) {
  // Get list containing item
  let list = await db.lists.get(listID).catch((error) => {
    console.error(error);
  });

  if (!list) return console.error('No list retreived')

  // Delete item from object
  delete list.items[id];

  // Push update to database
  db.lists.put(list).catch((error) => {
    console.error(error);
  });

  await updateScreen();
}