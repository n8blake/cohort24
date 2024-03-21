import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IAssignment } from 'src/app/models/assignment.interface';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { AssignmentsService } from 'src/app/services/assignment-services/assignments.service';

@Component({
  selector: 'app-assignments-page',
  standalone: true,
  imports: [DatePipe, NgFor, NgIf, OrderByPipe, RouterLink],
  templateUrl: './assignments-page.component.html',
  styleUrl: './assignments-page.component.scss'
})
export class AssignmentsPageComponent implements OnInit {

    assignments?: IAssignment[];
    today: Date = new Date();

    constructor( private assignmentsService:AssignmentsService ){}

    ngOnInit(): void {
      this.assignmentsService.getAssignments().subscribe(assignments => {
        this.assignments = assignments;
      })
    }

    dueLaterThanToday(assignment: IAssignment): Boolean {
      if (!assignment.due_at) return false;
      let dueDate = new Date(assignment.due_at)
      return dueDate >= this.today 
    }

    pastDue(assignment: IAssignment): Boolean {
      if (!assignment.due_at) return false;
      let dueDate = new Date(assignment.due_at)
      return dueDate < this.today 
    }

}
