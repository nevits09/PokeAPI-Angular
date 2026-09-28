import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemons(limit = 36, offset = 0): Observable<Pokemon[]> {
    return this.http
      .get<PokemonListResponse>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
      .pipe(
        map((response) => response.results.map((item) => this.http.get<Pokemon>(item.url))),
        switchMap((requests) => forkJoin(requests)),
      );
  }

  getPokemonByName(nameOrId: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${encodeURIComponent(nameOrId.toLowerCase().trim())}`);
  }
}