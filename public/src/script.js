import {
  newList,
  editList,
  deleteList,
  getLists,
  getList
} from './lists.js';
import {
  newItem,
  editItem,
  deleteItem
} from './items.js';
import {
  db
} from './database.js';

const lists = document.getElementById('lists');

const writeToScreen = (list) => {
  if(!list.name) return console.error('No listname given');
  
  const listElement = document.createElement('div');  
  lists.appendChild(listElement);
  listElement.classList.add('col-sm', 'list'); // Add classes to list

  const title = document.createElement('h3'); // Add a title to the list
  title.innerText = list.name;
  title.appendChild(listElement);

  for (const [key, item] of Object.entries(list.items)) {
    console.log(key, item)
  }
}

window.writeToScreen = writeToScreen;

window.getLists = getLists;
window.getList = getList;
window.newList = newList;
window.editList = editList;
window.deleteList = deleteList;

window.newItem = newItem;
window.editItem = editItem;
window.deleteItem = deleteItem;