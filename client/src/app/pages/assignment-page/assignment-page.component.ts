import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IAssignment } from 'src/app/models/assignment.interface';
import { ICourse } from 'src/app/models/course.interface';
import { CoursesService } from 'src/app/services/course-services/courses.service';

@Component({
  selector: 'app-assignment-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './assignment-page.component.html',
  styleUrl: './assignment-page.component.scss'
})
export class AssignmentPageComponent implements OnInit {

  assignment?: IAssignment
  course?: ICourse
  parsedElements?: ParsedElement[]

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private coursesService: CoursesService){}

  ngOnInit(): void {
    this.assignment = this.activatedRoute.snapshot.data['assignment']
    if(!this.assignment){
      //this.router.navigate(['/404'])
    } else {
      // ?
      if(this.assignment.description){
        this.parsedElements = this.parseHtmlFragment(this.assignment.description); 
      }
    }
  }

  parseHtmlFragment(htmlFragment: string): ParsedElement[] {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML fragment into a document
    const doc = parser.parseFromString(htmlFragment, "text/html");
    // Query all elements with the 'data-api-endpoint' attribute
    const elements = doc.querySelectorAll('[data-api-endpoint]');

    
    // Map the NodeList to an array of objects with the desired information
    const parsedElements: ParsedElement[] = Array.from(elements).map(element => (
      {
        apiEndpoint: element.getAttribute('data-api-endpoint'),
        apiReturnType: element.getAttribute('data-api-returntype'),
        textContent: element.textContent?.trim() // Get the text content, trimming any extra whitespace
      }
    ));

    return parsedElements;
}

}

interface ParsedElement {
  apiEndpoint: string | undefined | null;
  apiReturnType: string | undefined | null;
  textContent: string | undefined | null;
}


