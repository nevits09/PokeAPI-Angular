import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly Math = Math;
  protected readonly pokemonService = inject(PokemonService);
  protected readonly pokemons = signal<Pokemon[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly selectedPokemon = signal<Pokemon | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal('');

  protected readonly filteredPokemons = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.pokemons();
    return this.pokemons().filter((pokemon) =>
      pokemon.name.toLowerCase().includes(term) || pokemon.id.toString() === term,
    );
  });

  constructor() {
    this.loadPokemons();
  }

  protected loadPokemons(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('No se pudieron cargar los Pokémon. Comprueba tu conexión e inténtalo de nuevo.');
        this.isLoading.set(false);
      },
    });
  }

  protected openModal(pokemon: Pokemon): void {
    this.selectedPokemon.set(pokemon);
  }

  protected closeModal(): void {
    this.selectedPokemon.set(null);
  }
}
