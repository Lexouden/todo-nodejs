//* Import of all modules
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
  deleteItem,
  getItemList
} from './items.js';
import {
  db
} from './database.js';

// Get list container
const lists = document.getElementById('lists');

// Print / Write results to screen
const writeToScreen = (list) => {
  let tableID = uuid();

  if (!list.name) return console.error('No listname given');

  // Create list element
  const listElement = document.createElement('div');
  lists.appendChild(listElement);
  listElement.classList.add('col-sm', 'list'); // Add classes to list  

  // Add a title to the list
  const title = document.createElement('h3');
  title.innerText = list.name;
  listElement.appendChild(title);

  // Create sortable table
  const table = document.createElement('table');
  listElement.appendChild(table);
  table.classList.add('sortable');
  table.id = tableID;

  // Create Table contents
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');

  table.appendChild(thead);
  thead.appendChild(tr);

  // Create table heads
  for (let x = 0; x <= 3; x++) {
    let th = document.createElement('th');
    switch (x) {
      case 0:
        th.innerText = 'Task';
        th.classList.add('sorttable_nosort');
        break;
      case 1:
        th.innerText = 'Duration';
        break;
      case 2:
        th.innerText = 'Status';
        break;
      case 3: 
        th.innerText = '';
        th.classList.add('sorttable_nosort');
        break;
      default:
        console.error('An unexpected error occured');
    }
    tr.appendChild(th);
  }

  table.appendChild(tbody);

  // Loop through all items
  for (const [key, item] of Object.entries(list.items)) {
    let tr = document.createElement('tr');
    let button = document.createElement('button');
    tbody.appendChild(tr);

    // Loop through item properties
    for (let x = 0; x <= 3; x++) {
      let td = document.createElement('td');
      switch (x) {
        case 0:
          td.innerText = item.description;
          break;
        case 1:
          td.innerText = `${item.duration} min.`;
          break;
        case 2:
          td.innerText = item.status;
          break;
        case 3: 
          td.appendChild(button);
          button.classList.add('btn', 'btn-danger', 'far', 'fa-times-circle');
          button.setAttribute('onclick', 'deleteItem(this)')
          button.setAttribute('data-item-id', key)
          button.setAttribute('data-list-id', list.id)
          break;  
        default:
          console.error('An unexpected error occured');
      }
      tr.appendChild(td);
    }
  }

  var sortableTable = document.getElementById(tableID);
  sorttable.makeSortable(sortableTable);
}

// Load lists
(async () => {
  try {
    var lists = await getLists();
    lists.forEach(list => {
      writeToScreen(list);
    });
  } catch (e) {
    console.log(e.stack);
  }
})();

// Generate random ID
function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

async function updateScreen() {
  // Get all list elements
  const listClass = document.getElementsByClassName('list');
  listClass.remove(); // Remove list elements from DOM

  // Re-render lists
  try{  
    var newLists = await getLists();
    newLists.forEach(list => {
      writeToScreen(list);
    });
  }catch(e){
    console.log(e.stack);
  }
}

/**
 * Copy pasta function for removing elements easily
 */
Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}

/**
 ** Functions to be called in inspect console for testing and debugging.
 */
window.writeToScreen = writeToScreen;

window.getLists = getLists;
window.getList = getList;
window.newList = newList;
window.editList = editList;
window.deleteList = deleteList;

window.newItem = newItem;
window.editItem = editItem;
window.deleteItem = deleteItem;
window.getItem = getItemList;

window.updateScreen = updateScreen;