import { ActionReducerMap } from '@ngrx/store';
import * as fromUser from './reducers/user.reducer'; // Импортируйте редукторы для каждого фич-модуля
import * as fromFilms from './reducers/films.reducer';

export interface AppState {
  user: fromUser.UserState; // Определите интерфейс состояния для каждого фич-модуля
  films: fromFilms.FilmsState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer, // Свяжите каждый фич-модуль с его редуктором
  films: fromFilms.filmsReducer,
};
