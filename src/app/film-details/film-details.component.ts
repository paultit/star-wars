import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Film, Person, Planet, Starship } from '../core/models/film.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {
  loadFilm,
  loadFilmPeople,
  loadFilmPlanets,
  loadFilmStarships,
} from '../store/actions/films.actions';
import {
  selectFilmById,
  selectFilmPeople,
  selectFilmPlanets,
  selectFilmStarships,
} from '../store/selectors/film.selectors';
import {
  Subscription,
  combineLatest,
  of,
  switchMap,
  tap
} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MovieDetailsModalComponent } from '../shared/components/movie-details-modal/movie-details-modal.component';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css'],
})
export class FilmDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  movie!: Film;
  movieStarships = new MatTableDataSource<Starship>();
  moviePeople = new MatTableDataSource<Person>();
  moviePlanets = new MatTableDataSource<Planet>();
  starshipColumns: string[] = [
    'name',
    'starshipClass',
    'passengers',
    'length',
    'created',
  ];
  characterColumns: string[] = ['name', 'gender', 'height', 'mass', 'created'];
  planetColumns: string[] = [
    'name',
    'climate',
    'gravity',
    'population',
    'created',
  ];
  private filmDataSub!: Subscription;
  @ViewChild('sortStarships') sortStarships = new MatSort();
  @ViewChild('sortCharacters') sortCharacters = new MatSort();
  @ViewChild('sortPlanets') sortPlanets = new MatSort();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.filmDataSub = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id');
          if (id !== null) {
            this.store.dispatch(loadFilm({ id }));
            this.store.dispatch(loadFilmStarships());
            this.store.dispatch(loadFilmPeople());
            this.store.dispatch(loadFilmPlanets());
            const film$ = this.store.select(selectFilmById);
            const starships$ = this.store.select(selectFilmStarships);
            const characters$ = this.store.select(selectFilmPeople);
            const planets$ = this.store.select(selectFilmPlanets);

            return combineLatest([film$, starships$, characters$, planets$]).pipe(
              tap(([film, starships, characters, planets]) => {
                if (film) {
                  this.movie = film;
                }
                if (starships) {
                  this.movieStarships.data = starships;
                }
                if (characters) {
                  this.moviePeople.data = characters;
                }
                if (planets) {
                  this.moviePlanets.data = planets;
                }
              })
            );
          } else {
            return of([null, null, null, null]);
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.movieStarships.sort = this.sortStarships;
    this.moviePeople.sort = this.sortCharacters;
    this.moviePlanets.sort = this.sortPlanets;
  }

  ngOnDestroy(): void {
    if (this.filmDataSub) {
      this.filmDataSub.unsubscribe();
    }
  }

  openModal(data: any, dataType: string): void {
    const dialogRef = this.dialog.open(MovieDetailsModalComponent, {
      data: { data, type: dataType },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
