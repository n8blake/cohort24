import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IAssignment } from 'src/app/models/assignment.interface';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  
  baseURL: string = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  getAssignments(): Observable<IAssignment[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get<IAssignment[]>(this.baseURL + '/api/assignments/', options).pipe(catchError(this.handleError<IAssignment[]>('getAssignments', [])));
  }

  getAssignmentsForCourse(courseId : number): Observable<IAssignment[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get<IAssignment[]>(this.baseURL + '/api/assignments/course/' + courseId, options).pipe(catchError(this.handleError<IAssignment[]>('getAssignmentsForCourse', [])));
  }

  getAssignment(courseId : number, assignmentId: number): Observable<IAssignment> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get<IAssignment>(this.baseURL + '/api/assignments/'+ assignmentId + '/course/' + courseId, options).pipe(catchError(this.handleError<IAssignment>('getAssignmentsForCourse')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status !== 401) {
        console.log(error);
      }
      return of(result as T);
    };
  }

}
