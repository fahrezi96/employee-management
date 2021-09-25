import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from './../services/crud.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  username;
  employee;

  constructor(
    private service: CrudService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(): void {
    this.username = this.route.snapshot.params.username;
    this.service.getDetail(this.username).subscribe((response) => {
      this.employee = response;
      console.log(this.employee);
    });
  }

  back() {
    this.location.back();
  }
}
