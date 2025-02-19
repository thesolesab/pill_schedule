import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db!: IDBPDatabase;
  private initPromise: Promise<void>;

  constructor() {
    this.initPromise = this.initDb(); // Ждем завершения инициализации
  }

  private async initDb() {
    this.db = await openDB('pill-database', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('user-store')) {
          db.createObjectStore('user-store', { keyPath: 'username' });
        }
        if (!db.objectStoreNames.contains('pills-store')) {
          db.createObjectStore('pills-store', { keyPath: 'pillName' });
        }
      }
    });
  }

  private async ensureDbInitialized() {
    if (!this.db) {
      await this.initPromise; // Ждем завершения инициализации
    }
  }

  async addData(storeName: string, data: any) {
    await this.ensureDbInitialized();
    return this.db.add(storeName, data);
  }

  async getAllData(storeName: string) {
    await this.ensureDbInitialized();
    return this.db.getAll(storeName);
  }

  async getData(storeName: string, id: string) {
    await this.ensureDbInitialized();
    return this.db.get(storeName, id);
  }

  async updateData(storeName: string, data: any) {
    await this.ensureDbInitialized();
    return this.db.put(storeName, data);
  }

  async deleteData(storeName: string, id: string) {
    await this.ensureDbInitialized();
    return this.db.delete(storeName, id);
  }

async clearAllData() {
    await this.ensureDbInitialized();

    // Получаем список всех хранилищ
    const storeNames = this.db.objectStoreNames;

    // Очищаем каждое хранилище
    for (const storeName of storeNames) {
      await this.db.clear(storeName);
   }
  }
}

