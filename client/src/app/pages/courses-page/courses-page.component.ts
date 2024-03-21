import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/models/course.interface';
import { CoursesService } from 'src/app/services/course-services/courses.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss'
})
export class CoursesPageComponent implements OnInit {

  courses?: ICourse[]

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

}
