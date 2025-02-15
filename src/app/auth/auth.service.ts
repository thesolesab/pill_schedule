import { Injectable } from '@angular/core';
import { IndexedDbService } from '../data/services/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit() {
    // Инициализация базы данных
  }

  isAuth() {
    const data = this.indexedDbService.getData('my-store', '1');
    console.log('Полученные данные:', data);
  }
}
