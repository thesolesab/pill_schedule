import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBPDatabase;

  constructor() {
    this.initDb()
  }

  async initDb() {
    this.db = await openDB('pill-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('my-store')) {
          db.createObjectStore('my-store', { keyPath: 'id' })
        }
      }
    })
  }
}
