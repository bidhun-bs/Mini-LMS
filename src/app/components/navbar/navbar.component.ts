import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}
  onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}