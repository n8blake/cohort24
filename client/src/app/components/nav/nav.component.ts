import { Component, Input, OnInit } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { NgIf } from '@angular/common';

@Component({
	selector: 'app-nav',
	standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgIf],
	templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
	// Step 1:
	// Create a property to track whether the menu is open.
	// Start with the menu collapsed so that it does not
	// appear initially when the page loads on a small screen!
	isMenuCollapsed = true;

    @Input() user?:IUser;

    constructor(private authService: AuthService, private router:Router) {}

    ngOnInit(): void {
        this.authService.logoutUser$.subscribe(logout => {
            if(logout){
              this.user = undefined;
            }
        })
    }

    signout(): void {
        this.authService.logout().subscribe(result => {
            this.router.navigate(['home']);
        });
    }

}
