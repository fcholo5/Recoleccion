import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(email: string, pass: string): boolean {
    if (email === 'test@gmail.com' && pass === '1234') {
      localStorage.setItem('token', 'abc123');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLogged(): boolean {
    return !!localStorage.getItem('token');
  }

}
