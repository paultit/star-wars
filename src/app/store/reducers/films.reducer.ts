import { createReducer, on } from '@ngrx/store';
import * as FilmsActions from '../actions/films.actions'; // Импортируйте действия
import { Film, Person, Planet, Starship } from '../../core/models/film.model'; // Импортируйте модели

export interface FilmsState {
  films: Film[];
  film: Film | null;
  loading: boolean;
  selectedFilmId: number | null;
  starships: Starship[];
  characters: Person[];
  planets: Planet[];
  error: string | null;
}

const initialState: FilmsState = {
  films: [],
  film: null,
  loading: false,
  selectedFilmId: null,
  starships: [],
  characters: [],
  planets: [],
  error: null,
  // Инициализируйте другие поля состояния, если они есть
};

export const filmsReducer = createReducer(
  initialState,
  on(FilmsActions.loadFilms, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FilmsActions.loadFilmsSuccess, (state, { films }) => ({
    ...state,
    films,
    loading: false,
  })),
  on(FilmsActions.loadFilmsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(FilmsActions.loadFilm, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FilmsActions.loadFilmSuccess, (state, { film }) => ({
    ...state,
    film,
    loading: false,
    selectedFilmId: film.episode_id,
  })),
  on(FilmsActions.loadFilmFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(FilmsActions.loadFilmStarships, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FilmsActions.loadFilmStarshipsSuccess, (state, { starships }) => ({
    ...state,
    starships,
    loading: false,
  })),
  on(FilmsActions.loadFilmStarshipsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(FilmsActions.loadFilmPeople, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FilmsActions.loadFilmPeopleSuccess, (state, { characters }) => ({
    ...state,
    characters,
    loading: false,
  })),
  on(FilmsActions.loadFilmPeopleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(FilmsActions.loadFilmPlanets, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(FilmsActions.loadFilmPlanetsSuccess, (state, { planets }) => ({
    ...state,
    planets,
    loading: false,
  })),
  on(FilmsActions.loadFilmPeopleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
