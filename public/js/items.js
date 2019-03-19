import {
  db
} from './database.js';

db.open();

export function newItem({
  description,
  duration,
  status,
  listID
}) {
  db.items.put({
    description: description,
    duration: duration,
    status: status
  }).catch((error) => {
    // alert("Check console for error");
    console.error(error);
  });
}

export function editItem() {

}

export function deleteItem() {

}