import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { ToastService } from './../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private service: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.router.navigate(['list']);
    }
  }

  login(data): void {
    if (data.value.username && data.value.password) {
      this.service.login(data.value).subscribe((response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['list']);
          this.showSuccess(`Login success`);
        } else {
          this.showError(`Username or Password isn't matched`);
        }
      });
    } else {
      this.showError('Username and Password must be filled');
    }
  }

  showSuccess(text) {
    this.toastService.show(text, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Notifications',
    });
  }

  showError(text) {
    this.toastService.show(text, {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Notifications',
    });
  }
}
