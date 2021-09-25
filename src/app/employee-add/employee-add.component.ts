import { Component, OnInit } from '@angular/core';
import { CrudService } from './../services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
})
export class EmployeeAddComponent implements OnInit {
  constructor(private service: CrudService, private router: Router) {}

  ngOnInit(): void {}

  create(data) {
    this.service.create(data.value).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }
}
