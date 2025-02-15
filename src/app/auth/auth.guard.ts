import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { IndexedDbService } from '../data/services/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private indexedDbService: IndexedDbService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const userData = await this.indexedDbService.getAllData('user-store');
    console.log(userData);

    if (userData) {
      // Если данные есть, перенаправляем на главную страницу
      this.router.navigate(['/home']);
      return false;
    } else {
      // Если данных нет, разрешаем доступ к странице логина
      return true;
    }
  }
}
