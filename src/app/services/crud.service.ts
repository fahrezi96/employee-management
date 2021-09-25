import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { employees } from './employees';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor() {}

  getAll(): Observable<any> {
    return of(employees);
  }

  getDetail(username): Observable<any> {
    const employee = (employees as any[]).find((e) => e.username === username);
    return of(employee);
  }

  create(data) {
    (employees as any[]).unshift(data);
    return of({ success: true });
  }
}
