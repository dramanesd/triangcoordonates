import {openDatabase} from 'react-native-sqlite-storage',

const database = openDatabase({name: 'GeoDatabase.db'});

const db = {
  
}

export default db;