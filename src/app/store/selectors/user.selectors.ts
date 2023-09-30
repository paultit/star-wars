import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { UserState } from '../reducers/user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectUserState,
  (state) => state.isAuthenticated
);

export const selectUserPermissions = createSelector(
  selectUser,
  (user) => user?.permissions || []
);
