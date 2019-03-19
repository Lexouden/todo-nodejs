import {
  db
} from './database.js';

db.open();

export function newList(name) {
  db.lists.put({
    name: name
  }).catch((error) => {
    alert("Check console for error");
    console.error(error);
  });
}

export function editList(id, content) {

}

export function deleteList(id) {

}