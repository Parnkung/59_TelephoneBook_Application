import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';
/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Database {

  private _db; //database service obj

    private _phonebooks; 

	//to initialise database if doesm't exist.
    initDB() {
        PouchDB.plugin(cordovaSqlitePlugin);
        this._db = new PouchDB('phonebooks.db', { adapter: 'cordova-sqlite' });
    }
	//insert function: add data to database
    add(contact) {  
        return this._db.post(contact);
    }
	//update function: edit data in database
    update(contact) {  
        return this._db.put(contact);
    }
	//delete func: remove data from database
    delete(contact) {  
        return this._db.remove(contact);
    }
	//getall func: retreive all data from database
    getAll() {  
        if (!this._phonebooks) {
            return this._db.allDocs({ include_docs: true})
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of contact objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.
                    this._phonebooks = docs.rows.map(row => {
						return row.doc;							
                    });
					
                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true})
                        .on('change', this.onDatabaseChange);

                    return this._phonebooks;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this._phonebooks);
        }
    }

    private onDatabaseChange = (change) => {  
        var index = this.findIndex(this._phonebooks, change.id);
        var contact = this._phonebooks[index];

        if (change.deleted) {
            if (contact) {
                this._phonebooks.splice(index, 1); // delete
            }
        } else {
            if (contact && contact._id === change.id) {
                this._phonebooks[index] = change.doc; // update
            } else {
                this._phonebooks.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {  
        var low = 0, high = array.length, mid;
        while (low < high) {
        mid = (low + high) >>> 1;
        array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }

}
