import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() width?: Number 
  @Input() height?: Number 

  constructor() { }

  ngOnInit(): void {
    if(this.width && !this.height){
      this.height = this.width
    } else if(this.height && !this.width){
      this.width = this.height
    } else if(!this.height && !this.width) {
      this.height = 64
      this.width = 64
    }
  }

}
