package tfg.pokemon.jai.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Ataque;
import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Especie;
import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.repository.PokemonRepository;

@Service
public class PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    @Autowired
    private EspecieService especieService;

    @Autowired
    private AtaqueService ataqueService;


    public void save(Long idPoke, Entrenador entrenador){
        Collection<Ataque> ataques = new ArrayList<>();
        Especie especie = especieService.findById(idPoke);
        while (ataques.size() < 3) {
            Ataque ataque = ataqueService.obtenerAtaqueAleatorio(especie.getTipo().getId());
            if (!ataques.contains(ataque)) {
                ataques.add(ataque);
            }
        }
        Pokemon pokemon = new Pokemon();
        pokemon.setEntrenadorPokemon(entrenador);
        pokemon.setNivel(3);
        pokemon.setEspecie(especie);
        pokemon.setAtaques(ataques);
        pokemon.setExperiencia(0);
        pokemon.setDefensa(pokemon.getNivel() * especie.getDefensaBase());
        pokemon.setFuerza(pokemon.getNivel() * especie.getAtaqueBase());
        pokemon.setVida(pokemon.getNivel() * especie.getVidaBase());
        pokemon.setVidaActual(pokemon.getVida());
        pokemonRepository.save(pokemon);
    }
    public List<Pokemon> findAll() {
        return pokemonRepository.findAll();
    }
    public Pokemon findById(Long idPoke) {
        return pokemonRepository.findById(idPoke).orElse(null);
    }
    public List<Pokemon> findByEntrenador(Long idEntrenador) {
        return pokemonRepository.findByEntrenadorPokemonId(idEntrenador);
    }

    public void updateVida(Long idPoke, Integer nuevaVida) {
        Pokemon pokemon = pokemonRepository.findById(idPoke).orElse(null);
        if (pokemon != null) {
            // Actualizar el valor de vida del Pokémon
            pokemon.setVidaActual(nuevaVida);
            // Guardar los cambios en la base de datos
            pokemonRepository.save(pokemon);
        } else {

            // Manejar el caso en el que no se encuentre el Pokémon con el ID especificado
            // Aquí puedes lanzar una excepción, registrar un mensaje de error, etc.
        }
    }
    public void captura(Long idEspecie, Entrenador entrenador, Integer lvPokeSalvaje) {
        Collection<Ataque> ataques = new ArrayList<>();
        Especie especie = especieService.findById(idEspecie);
        while (ataques.size() < 3) {
            Ataque ataque = ataqueService.obtenerAtaqueAleatorio(especie.getTipo().getId());
            if (!ataques.contains(ataque)) {
                ataques.add(ataque);
            }
        }
        ataques.add(ataqueService.obtenerAtaqueAleatorio(especie.getTipo().getId()));
        ataques.add(ataqueService.obtenerAtaqueAleatorio(especie.getTipo().getId()));
        ataques.add(ataqueService.obtenerAtaqueAleatorio(especie.getTipo().getId()));
        Pokemon pokemon = new Pokemon();
        pokemon.setEntrenadorPokemon(entrenador);
        pokemon.setNivel(lvPokeSalvaje);
        pokemon.setEspecie(especie);
        pokemon.setAtaques(ataques);
        pokemon.setExperiencia(0);
        pokemon.setDefensa(lvPokeSalvaje * especie.getDefensaBase());
        pokemon.setFuerza(lvPokeSalvaje * especie.getAtaqueBase());
        pokemon.setVida(lvPokeSalvaje * especie.getVidaBase());
        pokemon.setVidaActual(pokemon.getVida());
        pokemonRepository.save(pokemon);
    }
    public List<Pokemon> findPartidasByEntrenadorId(Long idEntrenador) {
        return pokemonRepository.findAllByEntrenadorPokemonId(idEntrenador);
    }
    public void curarPokemones(List<Pokemon> pokemones) {
        for (Pokemon pokemon : pokemones) {
            pokemon.setVidaActual(pokemon.getVida());
            pokemonRepository.save(pokemon);
        }
    }
}
