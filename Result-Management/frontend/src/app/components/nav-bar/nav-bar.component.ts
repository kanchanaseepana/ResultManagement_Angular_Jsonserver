import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private router: Router,private authservice:AuthService) {}

  isLoggedIn(){
    return this.authservice.isLoggedIn();
  }

  

  logout() {
    this.authservice.logout();
    this.router.navigate(['/']);
    
    
  }

}
