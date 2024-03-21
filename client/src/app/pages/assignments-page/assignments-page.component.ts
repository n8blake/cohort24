import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments-page',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './assignments-page.component.html',
  styleUrl: './assignments-page.component.scss'
})
export class AssignmentsPageComponent implements OnInit {

    today: Date = new Date()
    nextWeek: Date = new Date()
    
    ngOnInit(): void {
      this.nextWeek.setDate(this.nextWeek.getDate() + 7)
    }

}
