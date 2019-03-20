export const db = new Dexie('todo_database');

db.version(1).stores({
  lists: '++id, name, items'
});