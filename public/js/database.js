export var db = new Dexie('todo_database');

db.version(1).stores({
  lists: '++id, name, items',
  items: '++id, description, duration, status'
});