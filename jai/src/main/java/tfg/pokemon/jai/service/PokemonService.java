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
        ataques.add(ataqueService.findById(1L));
        ataques.add(ataqueService.findById(3L));
        ataques.add(ataqueService.findById(2L));
        Pokemon pokemon = new Pokemon();
        pokemon.setEntrenadorPokemon(entrenador);
        pokemon.setNivel(3);
        pokemon.setEspecie(especie);
        pokemon.setAtaques(ataques);
        pokemon.setExperiencia(0);
        pokemonRepository.save(pokemon);
    }
    public List<Pokemon> findAll() {
        return pokemonRepository.findAll();
    }
    public Pokemon findById(Long idPoke) {
        return pokemonRepository.findById(idPoke).orElse(null);
    }
}
