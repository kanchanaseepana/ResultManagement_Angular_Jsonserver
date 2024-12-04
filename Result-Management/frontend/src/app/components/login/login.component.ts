import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  loginAsStudent() {
    console.log('Navigating to /student');
    this.router.navigate(['/student']);
  }

  loginAsTeacher() {
    this.router.navigate(['/teacher-login']);
  }

}
