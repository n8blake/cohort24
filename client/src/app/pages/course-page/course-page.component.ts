import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAssignment } from 'src/app/models/assignment.interface';
import { ICourse } from 'src/app/models/course.interface';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { AssignmentsService } from 'src/app/services/assignment-services/assignments.service';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [NgFor, NgIf, OrderByPipe, DatePipe, RouterLink],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.scss'
})
export class CoursePageComponent implements OnInit {

  course?: ICourse;
  assignments?: IAssignment[];
  today: Date = new Date();

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.course = this.activatedRoute.snapshot.data['course']
    if(!this.course){
      this.router.navigate(['/404'])
    } else {
      this.assignmentService.getAssignmentsForCourse(this.course.id).subscribe(assignments => {
        this.assignments = assignments;
      })
    }
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
