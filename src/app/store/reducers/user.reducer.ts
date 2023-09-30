import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions'; // Импортируйте действия
import { User } from 'src/app/core/models/user.model';

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false

};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(UserActions.logout, (state) => ({
    ...state,
    user: null,
    isAuthenticated: false,
  })),
);
