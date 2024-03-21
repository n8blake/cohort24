import { Injectable } from '@angular/core';
import { AssignmentsService } from './assignments.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AssignmentResolverService {

  constructor(private assignmentsService: AssignmentsService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    return this.assignmentsService.getAssignment(route.params['courseId'], route.params['assignmentId'])
  }
}
