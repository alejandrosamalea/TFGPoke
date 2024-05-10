package tfg.pokemon.jai.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.domain.Tipo;
import tfg.pokemon.jai.repository.PokemonRepository;
import tfg.pokemon.jai.repository.TipoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PokemonService {
    @Autowired
    private PokemonRepository pokemonRepository;

    @Autowired
    private TipoRepository tipoRepository;
    //  Asocia cada tipo en inglés con su correspondiente ID.
    private final Map<String, Long> traduccionTipos = new HashMap<String, Long>() {{
        put("fire", 1L);
        put("water", 2L);
        put("grass", 3L);
        put("dragon", 4L);
        put("flying", 5L);
        put("bug", 6L);
        put("normal", 7L);
        put("poison", 8L);
        put("electric", 9L);
        put("ground", 10L);
        put("fairy", 11L);
        put("fighting", 12L);
        put("psychic", 13L);
        put("rock", 14L);
        put("ghost", 15L);
        put("ice", 16L);
    }};
    

    public void init(List<Map<String, String>> pokemonDataList) {
        // Verifica si la base de datos de Pokémon está vacía antes de proceder a guardar nuevos datos. 
        if (pokemonRepository.count() == 0) {
            // Iterar sobre los datos de los Pokémon recibidos y guardarlos en la base de datos
            for (Map<String, String> pokemonData : pokemonDataList) {
                Pokemon pokemon = new Pokemon();
                //recoge el nombre y tipo que le hemos pasado
                String nombre = pokemonData.get("name");
                String tipo = pokemonData.get("type");
                // Verificar si tenemos la traducción del tipo en español
                if (traduccionTipos.containsKey(tipo)) {
                    Tipo tipoObj = tipoRepository.findById(traduccionTipos.get(tipo)).get();
                    pokemon.setTipo(tipoObj);
                }
                pokemon.setNombre(nombre);

                    Integer defensaBase = Integer.parseInt(pokemonData.get("defense"));
                    pokemon.setDefensaBase(defensaBase);
                
                    int ataqueBase = Integer.parseInt(pokemonData.get("attack"));
                    pokemon.setAtaqueBase(ataqueBase);
                
                    int hpBase = Integer.parseInt(pokemonData.get("hp"));
                    pokemon.setVidaBase(hpBase);


                // Puedes establecer otros campos del Pokémon si es necesario
                pokemonRepository.save(pokemon);
            }
        }
    }

    public void save(String nombrePokemon,Integer vidaBasePokemon,Integer defensaBasePokemon,Integer ataqueBasePokemon,Long idTipo) {
        Pokemon pokemon = new Pokemon(nombrePokemon,vidaBasePokemon,defensaBasePokemon,ataqueBasePokemon);

        pokemon.setTipo(tipoRepository.getReferenceById(idTipo));
        pokemonRepository.save(pokemon);
    }

    public List<Pokemon> findAll() {
        return pokemonRepository.findAll();
    }

    public Pokemon findById(Long idPokemon) {
        return pokemonRepository.findById(idPokemon).orElse(null);
    }
}
