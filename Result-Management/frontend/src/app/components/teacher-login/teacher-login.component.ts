import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-teacher-login',
  standalone: true,
  imports: [CommonModule,FormsModule,NavBarComponent],
  templateUrl: './teacher-login.component.html',
  styleUrl: './teacher-login.component.css'
})
export class TeacherLoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.username && this.password) {
      
      this.authService.login(this.username, this.password, 'teacher').subscribe(
        (isLoggedIn) => {
          if (isLoggedIn) {
            this.router.navigate(['/teacher-dashboard']);
          } else {
            this.errorMessage = 'Invalid username or password.';
          }
        },
        () => {
          this.errorMessage = 'Error logging in. Try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }

}
