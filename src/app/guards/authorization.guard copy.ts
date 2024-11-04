import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Attempting to access route with roles:', route.data['roles']);
    console.log('Current user roles:', this.authService.roles);

    if (!this.authService.isAuthenticated) {
      console.log('User is not authenticated. Redirecting to login page.');
      this.router.navigateByUrl('/login');
      return false;
    }

    const requiredRoles = route.data['roles'];
    const userRoles = this.authService.roles;

    for (const role of requiredRoles) {
      if (userRoles.includes(role)) {
        console.log('User has required role. Access granted.');
        return true;
      }
    }

    console.log('User does not have required role. Access denied.');
    this.router.navigateByUrl('/unauthorized');
    return false;
  }
}

