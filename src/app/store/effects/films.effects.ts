import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FilmService } from '../../shared/services/film.service';
import * as FilmActions from '../actions/films.actions';

@Injectable()
export class FilmEffects {
  constructor(private actions$: Actions, private filmService: FilmService) {}

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadFilms),
      switchMap(() =>
        this.filmService.getMovies().pipe(
          map((films) => FilmActions.loadFilmsSuccess({ films })),
          catchError((error) => of(FilmActions.loadFilmsFailure({ error })))
        )
      )
    )
  );
  loadFilm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadFilm),
      switchMap((action) =>
        this.filmService.getMovie(action.id).pipe(
          map((film) => FilmActions.loadFilmSuccess({ film })),
          catchError((error) => of(FilmActions.loadFilmFailure({ error })))
        )
      )
    )
  );

  loadFilmStarships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadFilmStarships),
      switchMap(() =>
        this.filmService.getStarships().pipe(
          map((starships) =>
            FilmActions.loadFilmStarshipsSuccess({ starships })
          ),
          catchError((error) =>
            of(FilmActions.loadFilmStarshipsFailure({ error }))
          )
        )
      )
    )
  );

  loadFilmPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadFilmPeople),
      switchMap(() =>
        this.filmService.getPeople().pipe(
          map((characters) =>
            FilmActions.loadFilmPeopleSuccess({ characters })
          ),
          catchError((error) =>
            of(FilmActions.loadFilmPeopleFailure({ error }))
          )
        )
      )
    )
  );

  loadFilmPlanets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FilmActions.loadFilmPlanets),
      switchMap(() =>
        this.filmService.getPlanets().pipe(
          map((planets) => FilmActions.loadFilmPlanetsSuccess({ planets })),
          catchError((error) =>
            of(FilmActions.loadFilmPlanetsFailure({ error }))
          )
        )
      )
    )
  );
}
