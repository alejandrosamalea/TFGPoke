package tfg.pokemon.jai.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import tfg.pokemon.jai.domain.Especie;
import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.domain.Tipo;
import tfg.pokemon.jai.repository.EspecieRepository;
import tfg.pokemon.jai.repository.TipoRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class EspecieService {
    @Autowired
    private EspecieRepository especieRepository;

    private static final String UPLOAD_DIR = "src\\main\\resources\\static\\img\\especie";

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
    

    public void init(List<Map<String, String>> pokemonDataList) throws IOException {
        // Verifica si la base de datos de Pokémon está vacía antes de proceder a guardar nuevos datos. 
        if (especieRepository.count() == 0) {
            borrarTodasLasImagenes();
            // Iterar sobre los datos de los Pokémon recibidos y guardarlos en la base de datos
            for (Map<String, String> pokemonData : pokemonDataList) {
                Especie pokemon = new Especie();
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
                especieRepository.save(pokemon);
            }
        }
    }

    public void save(String nombrePokemon,Integer vidaBasePokemon,Integer defensaBasePokemon,Integer ataqueBasePokemon,Long idTipo,String nombreImagen) {
        Especie pokemon = new Especie(nombrePokemon,vidaBasePokemon,defensaBasePokemon,ataqueBasePokemon);
        pokemon.setImagen(nombreImagen);
        pokemon.setTipo(tipoRepository.getReferenceById(idTipo));
        especieRepository.save(pokemon);
    }

    public List<Especie> findAll() {
        return especieRepository.findAll();
    }

    public Especie findById(Long idPokemon) {
        return especieRepository.findById(idPokemon).orElse(null);
    }
    public static void borrarTodasLasImagenes() throws IOException {
        Files.walk(Paths.get(UPLOAD_DIR))
             .filter(Files::isRegularFile)
             .forEach(file -> {
                 try {
                     Files.deleteIfExists(file);
                 } catch (IOException e) {
                     e.printStackTrace();
                 }
             });
    }
     public List<Especie> pokemonesIniciales(int cantidad) {
        List<Especie> todosPokes = especieRepository.findAll();
        List<Especie> pokesIniciales = new ArrayList<>();
        Random random = new Random();
        while (pokesIniciales.size() < cantidad) {
            int indice = random.nextInt(todosPokes.size()); 
            Especie pokeInicial = todosPokes.get(indice);
            if (!pokesIniciales.contains(pokeInicial)) {
                pokesIniciales.add(pokeInicial);
            }
        }        
        return pokesIniciales;
    }
}
