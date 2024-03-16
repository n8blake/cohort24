import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-column-container',
  templateUrl: './column-container.component.html',
  styleUrls: ['./column-container.component.scss']
})
export class ColumnContainerComponent implements OnInit {

  @Input() title?: string

  constructor() { }

  ngOnInit(): void {
  }

}
