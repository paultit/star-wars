// jwt.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../core/models/user.model';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.actions';

interface FakeToken {
  exp: number;
  name: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private apiUrl = 'https://example.com/auth'; // Замените на вашу реальную API URL
  private tokenKey = 'auth_token';
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private store: Store) {
    this.checkToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isTokenExpired(token: string | null): boolean {
    if (!token) {
      return true;
    }
    const tokenData = JSON.parse(token);
    const expiration = tokenData.exp * 1000;
    return Date.now() > expiration;
  }

  login(name: string): Observable<FakeToken> {
    const fakeToken = this.generateFakeToken(name);
    this.saveToken(fakeToken);
    this.store.dispatch(UserActions.loginSuccess({ user: fakeToken }));
    return of(fakeToken);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.store.dispatch(UserActions.logout());
  }

  saveToken(token: FakeToken): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }

  destroyToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private generateFakeToken(name: string): FakeToken {
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 3600,
      name: name,
      permissions: this.generateRandomPermissions(),
    };
    return payload;
  }

  private generateRandomPermissions(): string[] {
    const possiblePermissions = ['read', 'edit', 'delete'];
    const numberOfPermissions =
      Math.floor(Math.random() * possiblePermissions.length) + 1;
    const randomPermissions = [];

    for (let i = 0; i < numberOfPermissions; i++) {
      const randomIndex = Math.floor(
        Math.random() * possiblePermissions.length
      );
      randomPermissions.push(possiblePermissions[randomIndex]);
    }

    return randomPermissions;
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.store.dispatch(
        UserActions.setIsAuthenticated({ isAuthenticated: true })
      );
    } else {
      this.store.dispatch(
        UserActions.setIsAuthenticated({ isAuthenticated: false })
      );
    }
  }
}
