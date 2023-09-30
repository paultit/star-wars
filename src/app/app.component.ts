import { Component } from '@angular/core';
import { JwtService } from './auth/jwt.service';
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { Observable } from 'rxjs';
import { User } from './core/models/user.model';
import {
  selectIsAuthenticated,
  selectUser,
} from './store/selectors/user.selectors';
import { logout } from './store/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Star-wars-app';
  user$: Observable<User | null>;

  constructor(
    private store: Store<AppState>,
    private authSrtvice: JwtService,
    private router: Router
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {}

  logout() {
    this.authSrtvice.logout();
    this.router.navigate(['/login']);
  }
}
