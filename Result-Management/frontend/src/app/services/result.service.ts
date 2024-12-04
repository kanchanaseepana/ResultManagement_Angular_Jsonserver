import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private apiUrl = 'http://localhost:3000/results';

  constructor(private http: HttpClient) {}

  getResults(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getResultByRollNoAndDob(rollNumber: string, dob: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?rollNumber=${rollNumber}&dob=${dob}`);
  }

  addResult(result: any): Observable<any> {
    return this.http.post(this.apiUrl, result);
  }

  updateResult(id: number, result: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, result);
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
