import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  constructor(
    private service: UserService,
    private route: Router,
    private cookie: CookieService
  ) {}

  isLoggedIn: boolean | undefined;

  ngOnInit() {
    this.service.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logoutUser() {
    this.service.logoutUser().subscribe({
      next: (info) => {
        this.service.setLoggedIn(false);
        console.log(this.isLoggedIn);
        this.route.navigateByUrl('/home');
        alert('logout successful');
      },
      error: (err) => {
        alert(err.error.message);
        console.log(this.isLoggedIn);
      },
    });
  }
}
