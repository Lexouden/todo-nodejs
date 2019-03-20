import {
  db
} from './database.js';

db.open();

// Generate random UUID for Item
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export function newItem({
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
}

export function editItem({
  id,
  change
}) {
  
}

export function deleteItem(id) {

}