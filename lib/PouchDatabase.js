import PouchDB from 'pouchdb-react-native'
PouchDB.plugin(require('pouchdb-find'));
const database = new PouchDB('mydb');
export default database;