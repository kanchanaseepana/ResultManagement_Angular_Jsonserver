import { Component, OnInit, OnDestroy } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { CommonModule } from '@angular/common'; // Required for *ngIf and other structural directives
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule,NavBarComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit,OnDestroy{

  rollNumber = '';
  dob = '';
  result: any = null;
  error = '';

  constructor(private resultService: ResultService,private router: Router,private authService:AuthService) {}

  ngOnInit(): void {
    // Reset result when the page is reloaded or when navigating back
    this.result = null;
    this.error = '';
  }

  ngOnDestroy(): void {
    // Clear data when navigating away from this component
    this.result = null;
    this.error = '';
  }

  fetchResult() {
    if (!this.rollNumber.trim() || !this.dob.trim()) {
      this.error = 'Both Roll Number and Date of Birth are required and cannot be just spaces.';
      return;
    }

    
    this.authService.login(this.rollNumber, this.dob, 'student').subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        // After successful login, fetch the result
        this.resultService.getResultByRollNoAndDob(this.rollNumber, this.dob).subscribe(
          (data) => {
            if (data.length) {
              this.result = data[0];
              this.error = '';
              this.router.navigate(['/result'], {
                queryParams: { name: this.result.name, score: this.result.score }
              });
            } else {
              this.error = 'No result found. Please check your roll number and DOB.';
              this.result = null;
            }
          }
        );
      } else {
        this.error = 'Invalid Roll Number or Date of Birth. Please try again.';
        this.result = null;
      }
    });
  }

  
  clearForm() {
    this.rollNumber = '';
    this.dob = '';
    this.result = null;
    this.error = '';
  }

  goBack(){
    this.router.navigate(['']);
  }

}
