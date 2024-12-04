import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ResultService } from '../../services/result.service';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule,NavBarComponent],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  newResult = { rollNumber: '', name: '', dob: '', score: null };
  errorMessage = '';
  nameError = false; // To track name field validation

  constructor(private resultService: ResultService, private router: Router) {}

  // Validate Name Field
  validateName() {
    const trimmedName = this.newResult.name?.trim(); 
    this.nameError = !trimmedName; 
  }

  addResult() {
    // Validate Name Field before submission
    this.validateName();

    if (!this.nameError && this.newResult.rollNumber && this.newResult.dob && this.newResult.score !== null) {
      this.resultService.addResult(this.newResult).subscribe(
        () => {
          alert('Student added successfully!');
          this.router.navigate(['/teacher-dashboard']); // Redirect back to dashboard
        },
        () => {
          this.errorMessage = 'Error adding record. Try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all fields correctly.';
    }
  }


  // addResult() {
  //   if (this.newResult.rollNumber && this.newResult.name && this.newResult.dob && this.newResult.score !== null) {
  //     this.resultService.addResult(this.newResult).subscribe(
  //       () => {
  //         alert('Student added successfully!');
  //         this.router.navigate(['/teacher-dashboard']); // Redirect back to dashboard
  //       },
  //       () => {
  //         this.errorMessage = 'Error adding record. Try again later.';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Please fill all fields.';
  //   }
  // }

  // addResult(studentForm: any) {
  //   if (studentForm.valid) {
  //     this.resultService.addResult(this.newResult).subscribe(
  //       () => {
  //         alert('Student added successfully!');
  //         this.router.navigate(['/teacher-dashboard']);
  //       },
  //       () => {
  //         this.errorMessage = 'Error adding record. Try again later.';
  //       }
  //     );
  //   } else {
  //     this.errorMessage = 'Please ensure all fields are filled correctly.';
  //   }
  // }
  
  goBack(){
    this.router.navigate(['/teacher-dashboard']);
  }

}
