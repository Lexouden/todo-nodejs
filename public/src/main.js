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

// Get list container
const lists = document.getElementById('lists');
$('#newItemBtn').click(createNewItem);
$('#newListBtn').click(createNewList);
$('#listModalSave').click(saveList);

$('#myModal').modal('handleUpdate')

// Print / Write results to screen
const writeToScreen = async (list) => {
  let tableID = await uuid();

  if (!list.name) return console.error('No listname given');

  // Create list element
  const listElement = document.createElement('div');
  lists.appendChild(listElement);
  listElement.classList.add('col-xl-5', 'col-12', 'list'); // Add classes to list  

  // Add a title to the list
  const title = document.createElement('h3');
  title.innerText = list.name;
  listElement.appendChild(title);

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-danger', 'float-right', 'fa', 'fa-times')
  button.addEventListener('click', removeList);
  button.setAttribute('data-list-id', list.id);
  listElement.appendChild(button);


  // Create sortable table
  const table = document.createElement('table');
  listElement.appendChild(table);
  table.classList.add('table', 'table-striped', 'table-dark', 'table-hover', 'sortable', 'w-100');
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
          button.classList.add('btn', 'btn-danger', 'far', 'fa-times-circle', 'removebtn');
          button.addEventListener('click', removeItem);
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
export async function uuid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export async function updateScreen() {
  // Get all list elements
  const listClass = document.getElementsByClassName('list');
  listClass.remove(); // Remove list elements from DOM

  // Re-render lists
  try {
    var newLists = await getLists();
    newLists.forEach(list => {
      writeToScreen(list);
    });
  } catch (e) {
    console.log(e.stack);
  }
}

// Functions for item management
async function createNewItem() {
  let label = $('#itemModalLabel');
  let body = $('#itemModalBody');

  let template = `<form class="m-2">
  <div class="form-group row">
    <label for="description">Description</label>
    <textarea class="form-control" id="description" cols="30" rows="3" required></textarea>
  </div>
  <div class="form-group row">
    <div class="form-group">
      <label for="duration">Duration</label>
      <input class="form-control" type="number">
    </div>
    <div class="form-group form-check">
      <label for="status">Status</label>
      <select id="status" class="form-control" required>
        <option value="Unfinished" selected>Unfinished</option>
        <option value="Finished">Finished</option>
      </select>
    </div>
  </div>
  <div class="form-group row">
    <label for="listSelect">List</label>
    <select class="form-control" id="listSelect" required>
      <option disabled selected>Select a list to assign the item to.</option>
    </select>
  </div>
</form>`;

  $('#itemModal').modal('toggle');

  label.text('Create new item');
  body.html(template);

  // Add all lists to select field
  let lists = await getLists();
  for (let list in lists) {
    $('#listSelect').append(`<option value=${lists[list].id}>${lists[list].name}</option>`)
  }

}

function saveItem() {

}

function updateItem() {

}

async function removeItem() {
  if (!this.dataset.itemId && !this.dataset.listId) return console.error('Missing data attribute')
  await deleteItem(this.dataset.itemId, parseInt(this.dataset.listId));
}

// Functions for list management 
function createNewList() {
  let label = $('#listModalLabel');
  let body = $('#listModalBody');
  let save = $('#listModalSave');

  let template = `<form class="m-2">
              <div class="form-group row">
                <label for="name">Name</label>
                <input class="form-control" type="text" id="name" autocomplete="off" required>
              </div>
            </form>`

  $('#listModal').modal('toggle');

  label.text('Create new List');
  body.html(template);
  save.data('type', 'new');
}

function saveList() {
  let save = $('#listModalSave');
  let type = save.data('type');

  if (type === 'new') {
    let name = $('#name').val();
    if (!name || name === '') return; // Check if name is given
    $('#listModal').modal('toggle'); // Close Modal

    return newList(name);
  }
}

async function updateList() {
  let label = $('#listModalLabel');
  let body = $('#listModalBody');
  let save = $('#listModalSave');
  let name = $(this).data('list-name');
  let id = $(this).data('list-id');

  let template = `<form class="m-2">
              <div class="form-group row">
                <label for="name">Name</label>
                <input class="form-control" type="text" id="name" autocomplete="off" value='${name}' required>
              </div>
            </form>`;

  $('#listModal').modal('toggle');

  label.text(`Change the name of ${name} list`);
  body.html(template);
  save.data('type', 'update');
  save.data('parameter-id', id);
}

async function removeList() {
  if (!this.dataset.listId) return console.error('List id not received from data attribute');

  await deleteList(parseInt(this.dataset.listId));
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