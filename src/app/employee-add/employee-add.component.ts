import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Router } from '@angular/router';
import { ToastService } from './../services/toast.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
  constructor(
    private service: CrudService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  create(data) {
    if (
      data.value.username &&
      data.value.firstName &&
      data.value.lastName &&
      data.value.email &&
      data.value.description &&
      data.value.basicSalary &&
      data.value.group &&
      data.value.birthDate &&
      (data.value.status == 0 || data.value.status == 1)
    ) {
      this.service.create(data.value).subscribe(() => {
        this.router.navigate(['/list']);
      });
      this.showSuccess('New data succesfully added');
    } else {
      this.showError('All input must be filled');
    }
  }

  cancel() {
    this.router.navigate(['/list']);
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
