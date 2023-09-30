import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user.model';

export const login = createAction(
  '[User] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout');

export const logoutSuccess = createAction('[User] Logout Success');

export const logoutFailure = createAction(
  '[User] Logout Failure',
  props<{ error: string }>()
);

export const setIsAuthenticated = createAction(
  '[User] Set IsAuthenticated',
  props<{ isAuthenticated: boolean }>()
);
