import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'GeoDatabase.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database ...');
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size,
          )
            .then(DB => {
              db = DB;
              console.log('Database OPEN');
              db.executeSql('SELECT 1 FROM Coordonnees LIMIT 1')
                .then(() => {
                  console.log('Database is ready ... executing query ...');
                })
                .catch(error => {
                  console.log('Received error: ', error);
                  console.log('Database not yet ready ... populating data');
                  db.transaction(tx => {
                    db.executeSql(
                      'CREATE TABLE IF NOT EXISTS Coordonnees (id INTEGER PRIMARY KEY AUTOINCREMENT, noeud VARCHAR(10), longitude VARCHAR(50), latitude VARCHAR(50), createdAt TEXT)',
                    );
                  })
                    .then(() => {
                      console.log('Table created successfully');
                    })
                    .catch(error => {
                      console.log('Table not created ', error);
                    });
                });
              resolve(db);
            })
            .catch(error => {
              console.log('DB ', error);
            });
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional');
        });
    });
  }

  closeDatabase(db) {
    if (db) {
      console.log('Closing DB');
      db.close()
        .then(status => {
          console.log('Database CLOSED');
        })
        .catch(error => {
          console.log('DB not Closed ', error);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }

  addGeoData(coordonate) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Coordonnees VALUES (?,?,?,?,?)', [
              coordonate.id,
              coordonate.noeud,
              coordonate.longitude,
              coordonate.latitude,
              coordonate.createdAt,
            ])
              .then(([tx, results]) => {
                resolve(results);
              })
              .catch(err => {
                console.log('Inserting ', err);
              });
          })
            .then(results => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log('Inertion ', err);
            });
        })
        .catch(err => {
          console.log('Initiation ', err);
        });
    });
  }

  getGeoData() {
    return new Promise(resolve => {
      const coordonnees = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT c.id, c.noeud, c.longitude, c.latitude, c.createdAt FROM Coordonnees c ORDER BY c.createdAt DESC',
              [],
            ).then(([tx, results]) => {
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                const {id, noeud, longitude, latitude, createdAt} = row;
                coordonnees.push({
                  id,
                  noeud,
                  longitude,
                  latitude,
                  createdAt,
                });
              }
              console.log(coordonnees);
              resolve(coordonnees);
            });
          })
            .then(results => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  GeoDataById(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Coordonnees WHERE id = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                if (results.rows.length > 0) {
                  let row = results.rows.item(0);
                  resolve(row);
                }
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  updateGeoData(id, c) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'UPDATE Coordonnees SET noeud = ?, longitude = ?, latitude = ?, createdAt = ? WHERE id = ?',
              [
                c.noeud,
                c.longitude,
                c.latitude,
                c.createdAt,
                id,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  deleteGeoData(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Coordonnees WHERE id = ?', [id]).then(
              ([tx, result]) => {
                console.log(result);
                resolve(result);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
}
