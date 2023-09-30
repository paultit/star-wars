import { Component } from '@angular/core';
import { JwtService } from '../jwt.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public password!: string;
  public username!: string;

  constructor(
    private authService: JwtService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login() {
    if (!this.username || !this.password) {
      this._snackBar.open('Please, fill on all the fields', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.authService.login(this.username);
    this.router.navigate(['/dashboard']);
  }
}
