import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable, Subscription, map, tap } from 'rxjs';
import { Film } from '../core/models/film.model';
import { selectFilms } from '../store/selectors/film.selectors';
import { loadFilms } from '../store/actions/films.actions';
import { selectUserPermissions } from '../store/selectors/user.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  movies$!: Observable<Film[]> | undefined;
  userPermissions$: Observable<string[]>;

  constructor(private store: Store<AppState>) {
    this.userPermissions$ = this.store.select(selectUserPermissions);
  }

  ngOnInit(): void {
    this.store.dispatch(loadFilms());
    this.movies$ = this.store
      .select(selectFilms)
      .pipe(
        map((films: Film[]) =>
          [...films].sort((a, b) => a.episode_id - b.episode_id)
        )
      );
  }
}
