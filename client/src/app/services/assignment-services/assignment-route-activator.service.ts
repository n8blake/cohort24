import { Injectable } from '@angular/core';
import { AssignmentsService } from './assignments.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentRouteActivatorService {

  constructor(private assignmentsService:AssignmentsService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const assignmentExists = !!this.assignmentsService.getAssignment(route.params['courseId'], route.params['assignmentId'])
    if(!assignmentExists) this.router.navigate(['/404'])
    return assignmentExists;
  }

}
