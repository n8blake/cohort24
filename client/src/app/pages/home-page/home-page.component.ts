import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {


  constructor(

  ) {}

  ngOnInit(): void {

  }

  getObjectProperties(obj: Object): { key: string; value: any }[] {
    return Object.entries(obj).map(([key, value]) => ({
      key,
      value,
    }));
  }



}
