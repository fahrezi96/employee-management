import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, DoCheck {
  isLogin: boolean;
  username: string;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.username = 'Admin';
    }
  }

  ngDoCheck(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.username = 'Admin';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogin = false;
    this.router.navigate(['login']);
  }
}
