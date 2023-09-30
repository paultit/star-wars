import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FilmsState } from '../reducers/films.reducer';

export const selectFilmState = createFeatureSelector<FilmsState>('films');

export const selectFilms = createSelector(
  selectFilmState,
  (filmState) => filmState.films
);

export const selectFilmById = createSelector(selectFilmState, (filmState) => {
  const selectedId = filmState.selectedFilmId;
  return selectedId
    ? filmState.films.find((film) => film.episode_id === selectedId)
    : null;
});

export const selectFilmStarships = createSelector(
  selectFilmState,
  (filmState) => filmState.starships
);

export const selectFilmPeople = createSelector(
  selectFilmState,
  (filmState) => filmState.characters
);

export const selectFilmPlanets = createSelector(
  selectFilmState,
  (filmState) => filmState.planets
);
