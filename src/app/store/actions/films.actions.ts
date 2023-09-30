import { createAction, props } from '@ngrx/store';
import { Film, Person, Planet, Starship } from '../../core/models/film.model';

export const loadFilms = createAction('[Films] Load Films');

export const loadFilmsSuccess = createAction(
  '[Films] Load Films Success',
  props<{ films: Film[] }>()
);

export const loadFilmsFailure = createAction(
  '[Films] Load Films Failure',
  props<{ error: string }>()
);

export const loadFilm = createAction(
  '[Films] Load Film',
  props<{ id: string }>()
);
export const loadFilmSuccess = createAction(
  '[Films] Load Film Success',
  props<{ film: Film }>()
);

export const loadFilmFailure = createAction(
  '[Films] Load Film Failure',
  props<{ error: string }>()
);

export const loadFilmStarships = createAction('[Films] Load Film Starships');
export const loadFilmStarshipsSuccess = createAction(
  '[Films] Load Film Starships Success',
  props<{ starships: Starship[] }>()
);

export const loadFilmStarshipsFailure = createAction(
  '[Films] Load Film Starships Failure',
  props<{ error: string }>()
);

export const loadFilmPeople = createAction('[Films] Load Film People');
export const loadFilmPeopleSuccess = createAction(
  '[Films] Load Film People Success',
  props<{ characters: Person[] }>()
);

export const loadFilmPeopleFailure = createAction(
  '[Films] Load Film People Failure',
  props<{ error: string }>()
);

export const loadFilmPlanets = createAction('[Films] Load Film Planets');
export const loadFilmPlanetsSuccess = createAction(
  '[Films] Load Film Planets Success',
  props<{ planets: Planet[] }>()
);

export const loadFilmPlanetsFailure = createAction(
  '[Films] Load Film Planets Failure',
  props<{ error: string }>()
);
