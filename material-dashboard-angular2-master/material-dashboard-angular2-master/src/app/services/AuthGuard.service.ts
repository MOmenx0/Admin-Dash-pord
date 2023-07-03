import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(window.atob(token.split('.')[1]));
      const expirationDate = new Date(decodedToken.exp * 1000);
      const currentDate = new Date();
      if (currentDate < expirationDate) {
        return true;
      }
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


}