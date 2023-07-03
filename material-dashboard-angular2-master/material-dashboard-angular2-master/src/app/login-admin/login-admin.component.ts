import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/Login';
import { LoginService } from '../services/Login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  newLogin: LoginModel = new LoginModel();
  message: string = '';

  constructor(private loginService: LoginService, private router: Router) { }
  
  ngOnInit(): void {
  }
  onSubmit() {
    this.loginService.login(this.newLogin).subscribe(
      response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          const role = this.getRoleFromToken(response.token);
          if (role === 'Admin') {
            localStorage.setItem('role', role);
            this.router.navigate(['/dashboard']); // Redirect to dashboard on successful login
          } else {
            localStorage.removeItem('role');
            this.message = 'You do not have permission to access this page.';
          }
        } else {
          this.message = 'Invalid username or password.';
        }
      },
      error => {
        this.message = 'An error occurred: ' + error.message;
      }
    );
  }
  
  private getRoleFromToken(token: string): string {
    const decodedToken = JSON.parse(window.atob(token.split('.')[1]));
    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
}