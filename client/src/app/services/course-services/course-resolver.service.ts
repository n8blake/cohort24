import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverService {

  constructor(private coursesService: CoursesService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    return this.coursesService.getCourse(route.params['id']);
  }

}
