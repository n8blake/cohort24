import { Injectable } from '@angular/core';
import { CoursesService } from './courses.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseRouteActivatorService {

  constructor(private coursesService: CoursesService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const courseExists = !!this.coursesService.getCourse(route.params['id'])
    if(!courseExists) this.router.navigate(['/404'])
    return courseExists;
  }
}
