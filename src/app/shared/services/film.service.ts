import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Film, Person, Planet, Starship } from 'src/app/core/models/film.model';
import { response } from 'express';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  private url = 'https://swapi.dev/api/films';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Film[]> {
    return this.http.get<Film[]>(this.url).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        // Handle errors here
        console.error('Error fetching films:', error);
        throw error;
      })
    );
  }

  getMovie(id: string): Observable<Film> {
    const url = `${this.url}/${id}`;
    return this.http.get<Film>(url).pipe(
      catchError((error) => {
        console.error('Error fetching film:', error);
        throw error;
      })
    );
  }

  getStarships(): Observable<Starship[]> {
    const url = 'https://swapi.dev/api/starships';
    return this.http.get<Starship[]>(url).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        // Handle errors here
        console.error('Error fetching film:', error);
        throw error;
      })
    );
  }

  getPlanets(): Observable<Planet[]> {
    const url = 'https://swapi.dev/api/planets';
    return this.http.get<Planet[]>(url).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        // Handle errors here
        console.error('Error fetching film:', error);
        throw error;
      })
    );
  }

  getPeople(): Observable<Person[]> {
    const url = 'https://swapi.dev/api/people';
    return this.http.get<Person[]>(url).pipe(
      map((response: any) => response.results),
      catchError((error) => {
        // Handle errors here
        console.error('Error fetching film:', error);
        throw error;
      })
    );
  }
}
