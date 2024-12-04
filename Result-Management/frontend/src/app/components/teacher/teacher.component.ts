import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [FormsModule,CommonModule,NavBarComponent,MatIconModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit {

  results: any[] = [];
  newResult = { rollNumber: '', name: '', dob: '', score: null };
  editingResult: any = null;
  errorMessage = '';

  constructor(private resultService: ResultService , private router:Router) {}

  ngOnInit() {
    this.fetchResults();
  }

  fetchResults() {
    this.resultService.getResults().subscribe(
      (data) => {
        this.results = data;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error fetching records. Try again later.';
      }
    );
  }

  addResult() {
    if (this.newResult.rollNumber && this.newResult.name && this.newResult.dob && this.newResult.score !== null) {
      this.resultService.addResult(this.newResult).subscribe(
        (data) => {
          this.results.push(data);
          this.newResult = { rollNumber: '', name: '', dob: '', score: null };
        },
        (error) => {
          this.errorMessage = 'Error adding record. Try again later.';
        }
      );
    } else {
      this.errorMessage = 'Please fill all fields.';
    }
  }

  startEditing(result: any) {
    this.editingResult = { ...result };
  }

  saveEdit() {

    this.errorMessage = '';
  
    if (
      !this.editingResult.rollNumber.trim() ||
      !this.editingResult.name.trim() ||
      !this.editingResult.dob ||
      this.editingResult.score === null || this.editingResult.score === ''
    ) {
      this.errorMessage = 'All fields are required. Please fill in all fields.';
      return; 
    }
  
    // If validation passes, update the result
    if (this.editingResult) {
      this.resultService.updateResult(this.editingResult.id, this.editingResult).subscribe(
        (data) => {
          const index = this.results.findIndex((res) => res.id === this.editingResult.id);
          this.results[index] = this.editingResult;
          this.editingResult = null;
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Error updating record. Try again later.';
        }
      );
    }
  }

  

  deleteResult(id: number) {
    this.resultService.deleteResult(id).subscribe(
      () => {
        this.results = this.results.filter((result) => result.id !== id);
      },
      (error) => {
        this.errorMessage = 'Error deleting record. Try again later.';
      }
    );
  }
  navigateToAddStudent() {
    this.router.navigate(['/add-student']);
  }

  cancelEdit() {
    this.editingResult = null;
  }

}
