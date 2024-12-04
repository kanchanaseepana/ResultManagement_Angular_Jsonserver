import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private teacherApiUrl = 'http://localhost:3000/teachers';  // Teacher API URL
  private studentApiUrl = 'http://localhost:3000/results';  // Student API URL (or wherever your student data is)
  private loggedIn = false;
  private userType: 'teacher' | 'student' = 'teacher';  // To track which type of user is logged in

  constructor(private http: HttpClient) {
    const storedLoginState = localStorage.getItem('loggedIn');
    const storedUserType = localStorage.getItem('userType');
    if (storedLoginState === 'true' && storedUserType) {
      this.loggedIn = true;
      this.userType = storedUserType as 'teacher' | 'student'; // Set the user type
    }
  }

  login(username: string, password: string, userType: 'teacher' | 'student'): Observable<boolean> {
    const apiUrl = userType === 'teacher' ? this.teacherApiUrl : this.studentApiUrl;
  
    return this.http.get<any[]>(`${apiUrl}`).pipe(
      map((users) => {
        let userFound = false;
  
        if (userType === 'student') {
          console.log('Users from student API:', users);
          // For student, check rollNumber and dob
          const user = users.find((u) => u.rollNumber === username && u.dob === password);
          if (user) {
            userFound = true;
          }
        } else if (userType === 'teacher') {
          // For teacher, check username and password
          const user = users.find((u) => u.username === username && u.password === password);
          if (user) {
            userFound = true;
          }
        }
  
        if (userFound) {
          this.loggedIn = true;
          this.userType = userType;
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userType', userType);
        }
  
        return this.loggedIn;
      })
    );
  }
  

  isLoggedIn(): boolean {
    console.log(this.loggedIn);
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
    this.userType = 'teacher';  
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userType');
  }

  getUserType(): 'teacher' | 'student' {
    return this.userType;
  }
  
}
