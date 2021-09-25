import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { ToastService } from './../services/toast.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit {
  page = 1;
  pageSize = 5;
  collectionSize;
  employees;
  allEmployees;
  filteredEmployees;
  search;
  sortVal = {
    no: true,
    firstName: true,
    email: true,
    birthDate: true,
    basicSalary: true,
    status: true,
    group: true,
  };

  constructor(
    private service: CrudService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((response) => {
      this.allEmployees = response;
      this.filteredEmployees = response.map((data, i) => ({
        no: i + 1,
        ...data,
      }));
      this.employees = response
        .map((data, i) => ({ no: i + 1, ...data }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = response.length;
    });
  }

  onSearch() {
    if (this.search) {
      this.getAll();
      let filteredEmployees = this.allEmployees.filter((employee) => {
        let pattern = new RegExp(this.search, 'i');
        if (
          employee.firstName.match(pattern) ||
          employee.lastName.match(pattern) ||
          employee.email.match(pattern)
        ) {
          return employee;
        }
      });

      this.filteredEmployees = filteredEmployees.map((data, i) => ({
        no: i + 1,
        ...data,
      }));
      this.employees = filteredEmployees
        .map((data, i) => ({ no: i + 1, ...data }))
        .slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize
        );
      this.collectionSize = filteredEmployees.length;
    } else {
      this.getAll();
    }
  }

  sort(prop) {
    this.filteredEmployees.sort((a, b) => {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
      return 0;
    });

    if (!this.sortVal[prop]) {
      this.filteredEmployees.reverse();
    }

    this.employees = this.filteredEmployees.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );

    this.sortVal[prop] = !this.sortVal[prop];
  }

  notifOnEdit(text) {
    this.toastService.show(text, {
      classname: 'bg-warning text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Notifications',
    });
  }

  notifOnDelete(text) {
    this.toastService.show(text, {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Notifications',
    });
  }
}
