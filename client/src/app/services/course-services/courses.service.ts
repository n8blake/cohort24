import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICourse } from 'src/app/models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  baseURL: string = '';

  constructor(private http: HttpClient) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  getCourses(): Observable<ICourse[]> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
    return this.http.get<ICourse[]>(this.baseURL + '/api/courses/', options).pipe(catchError(this.handleError<ICourse[]>('getCourses', [])));

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
