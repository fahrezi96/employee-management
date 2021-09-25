import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(request): Observable<any> {
    const user = {
      username: 'Admin',
      password: '123',
    };

    if (
      request.username === user.username &&
      request.password === user.password
    ) {
      return of({ success: true, token: 'x123!' });
    } else {
      return of({ success: false });
    }
  }
}
