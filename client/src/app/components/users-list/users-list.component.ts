import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {

  @Input() users?: IUser[]

  constructor() {}

}
