import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlProvider {
  dbName: SQLiteObject;
  constructor(private sqlite: SQLite) {
    // console.log('Hello SqlProvider Provider');
  }

  createDatabase() {
      this.sqlite.create({
        name: 'shipship.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.dbName = db;
        console.log('db created successfully :',db);
        this.createTable();
      })
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.dbName.open().then((res) => {
        let query = "CREATE TABLE IF NOT EXISTS 'parcel' (id INTEGER PRIMARY KEY AUTOINCREMENT, trackerID text NOT NULL, courier text NOT NULL, senderParcel text, content text, addedDate text, isArchive text)";
        this.dbName.executeSql(query, []).then((res) => {
          console.log('createTable res :',res);
          resolve(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        })
      });
    })
  }

  insertData(param){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "INSERT INTO 'parcel' (trackerID, courier, senderParcel, content, addedDate, isArchive) VALUES (?,?,?,?,?,?)";
        this.dbName.executeSql(query, param).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  getData(){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "SELECT * FROM 'parcel' WHERE isArchive = '0' ORDER BY addedDate DESC";
        this.dbName.executeSql(query, []).then((res) => {
          // console.log('res ==',res);
          // console.log('res.rows.item ==>>',res.rows.item);
          let todos = [];
          if(res.rows.length > 0 ) {
            for (let i = 0; i < res.rows.length; i++) {
              todos.push(res.rows.item(i));
            }
          }
          resolve(todos)
          // resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  /*updateData(name,age){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "UPDATE 'TESTINGDATA' SET name='No name', age=19 WHERE name='" + name + "' and age =" + age;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }*/

  updateArchive(id){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "UPDATE 'parcel' SET isArchive='1' WHERE id='" + id +"'";
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  deleteArchive(id){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "DELETE FROM 'parcel' WHERE id='" + id + "'";
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  deleteData(name,age){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "DELETE FROM 'TESTINGDATA' WHERE name='" + name + "' and age=" + age ;
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

  deleteAllRows(){
    return new Promise((resolve, reject) => {
      this.dbName.open().then(() => {
        let query = "DELETE FROM 'TESTINGDATA'";
        this.dbName.executeSql(query, []).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        })
      });
    })
  }

}
