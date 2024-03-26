import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAdminUser()) {
      return true;
    } else {
      // Store the current URL in session storage
      sessionStorage.setItem('redirectUrl', state.url);
      
      this.router.navigate(['/def/Dashboard']); // Redirect non-admin users to the dashboard
      return false;
    }
  }
}