package tfg.pokemon.jai.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Especie;
import tfg.pokemon.jai.domain.NPC;
import tfg.pokemon.jai.domain.PokemonNPC;
import tfg.pokemon.jai.repository.NPCRepository;
import tfg.pokemon.jai.repository.PokemonNPCRepository;

@Service
public class PokemonNPCService {
    @Autowired
    private PokemonNPCRepository pokemonNPCRepository;

    @Autowired
    private NPCRepository NPCRepository;
    @Autowired
    private EspecieService especieService;

 


    public void init() {
        /* POKEMONES DE MARIA */
        if (pokemonNPCRepository.count() == 0) {
            NPC maria = new NPC();
            ArrayList<PokemonNPC> pokemonNPCList = new ArrayList<>();
    
            Especie jynx = especieService.findById(124L);
            PokemonNPC pokemon = new PokemonNPC();
            pokemon.setNivel(6);
            pokemon.setEspecie(jynx);
            pokemon.setDefensa(pokemon.getNivel() * jynx.getDefensaBase());
            pokemon.setFuerza(pokemon.getNivel() * jynx.getAtaqueBase());
            pokemon.setVida(pokemon.getNivel() * jynx.getVidaBase());
            pokemonNPCRepository.save(pokemon);
            pokemonNPCList.add(pokemon);
    
            Especie butterfree = especieService.findById(24L);
            PokemonNPC pokemon2 = new PokemonNPC();
            pokemon2.setNivel(6);
            pokemon2.setEspecie(butterfree);
            pokemon2.setDefensa(pokemon2.getNivel() * butterfree.getDefensaBase());
            pokemon2.setFuerza(pokemon2.getNivel() * butterfree.getAtaqueBase());
            pokemon2.setVida(pokemon2.getNivel() * butterfree.getVidaBase());
            pokemonNPCRepository.save(pokemon2);
            pokemonNPCList.add(pokemon2);
    
            Especie arbok = especieService.findById(12L);
            PokemonNPC pokemon3 = new PokemonNPC();
            pokemon3.setNivel(6);
            pokemon3.setEspecie(arbok);
            pokemon3.setDefensa(pokemon3.getNivel() * arbok.getDefensaBase());
            pokemon3.setFuerza(pokemon3.getNivel() * arbok.getAtaqueBase());
            pokemon3.setVida(pokemon3.getNivel() * arbok.getVidaBase());
            pokemonNPCRepository.save(pokemon3);
            pokemonNPCList.add(pokemon3);
    
            Especie jigglypuff = especieService.findById(39L);
            PokemonNPC pokemon4 = new PokemonNPC();
            pokemon4.setNivel(6);
            pokemon4.setEspecie(jigglypuff);
            pokemon4.setDefensa(pokemon.getNivel() * jigglypuff.getDefensaBase());
            pokemon4.setFuerza(pokemon.getNivel() * jigglypuff.getAtaqueBase());
            pokemon4.setVida(pokemon.getNivel() * jigglypuff.getVidaBase());
            pokemonNPCRepository.save(pokemon4);
            pokemonNPCList.add(pokemon4);
            
            pokemon.setEntrenadorPokemon(maria);
            pokemon2.setEntrenadorPokemon(maria);
            pokemon3.setEntrenadorPokemon(maria);
            pokemon4.setEntrenadorPokemon(maria);

            maria.setNombre("Maria");
            maria.setPokemones(pokemonNPCList);
            NPCRepository.save(maria);

            /* POKEMONES DE ALBERTO */
            NPC alberto = new NPC();
            ArrayList<PokemonNPC> pokemonNPCListAlberto = new ArrayList<>();
        
            Especie gastly = especieService.findById(92L);
            PokemonNPC pokemonGastly = new PokemonNPC();
            pokemonGastly.setNivel(6);
            pokemonGastly.setEspecie(gastly);
            pokemonGastly.setDefensa(pokemonGastly.getNivel() * gastly.getDefensaBase());
            pokemonGastly.setFuerza(pokemonGastly.getNivel() * gastly.getAtaqueBase());
            pokemonGastly.setVida(pokemonGastly.getNivel() * gastly.getVidaBase());
            pokemonNPCRepository.save(pokemonGastly);
            pokemonNPCListAlberto.add(pokemonGastly);
        
            Especie koffing = especieService.findById(109L);
            PokemonNPC pokemonKoffing = new PokemonNPC();
            pokemonKoffing.setNivel(6);
            pokemonKoffing.setEspecie(koffing);
            pokemonKoffing.setDefensa(pokemonKoffing.getNivel() * koffing.getDefensaBase());
            pokemonKoffing.setFuerza(pokemonKoffing.getNivel() * koffing.getAtaqueBase());
            pokemonKoffing.setVida(pokemonKoffing.getNivel() * koffing.getVidaBase());
            pokemonNPCRepository.save(pokemonKoffing);
            pokemonNPCListAlberto.add(pokemonKoffing);
        
            Especie muk = especieService.findById(89L);
            PokemonNPC pokemonMuk = new PokemonNPC();
            pokemonMuk.setNivel(6);
            pokemonMuk.setEspecie(muk);
            pokemonMuk.setDefensa(pokemonMuk.getNivel() * muk.getDefensaBase());
            pokemonMuk.setFuerza(pokemonMuk.getNivel() * muk.getAtaqueBase());
            pokemonMuk.setVida(pokemonMuk.getNivel() * muk.getVidaBase());
            pokemonNPCRepository.save(pokemonMuk);
            pokemonNPCListAlberto.add(pokemonMuk);
        
            Especie weezing = especieService.findById(110L);
            PokemonNPC pokemonWeezing = new PokemonNPC();
            pokemonWeezing.setNivel(6);
            pokemonWeezing.setEspecie(weezing);
            pokemonWeezing.setDefensa(pokemonWeezing.getNivel() * weezing.getDefensaBase());
            pokemonWeezing.setFuerza(pokemonWeezing.getNivel() * weezing.getAtaqueBase());
            pokemonWeezing.setVida(pokemonWeezing.getNivel() * weezing.getVidaBase());
            pokemonNPCRepository.save(pokemonWeezing);
            pokemonNPCListAlberto.add(pokemonWeezing);
                
            pokemonGastly.setEntrenadorPokemon(alberto);
            pokemonKoffing.setEntrenadorPokemon(alberto);
            pokemonMuk.setEntrenadorPokemon(alberto);
            pokemonWeezing.setEntrenadorPokemon(alberto);
    
            alberto.setNombre("Alberto");
            alberto.setPokemones(pokemonNPCListAlberto);
            NPCRepository.save(alberto);
        }
    }
    
   
    public List<PokemonNPC> findAll() {
        return pokemonNPCRepository.findAll();
    }
    public PokemonNPC findById(Long idPoke) {
        return pokemonNPCRepository.findById(idPoke).orElse(null);
    }
    public List<PokemonNPC> findByEntrenador(Long idEntrenador) {
        return pokemonNPCRepository.findByEntrenadorPokemonId(idEntrenador);
    }

    /*public void updateVida(Long idPoke, Integer nuevaVida) {
        PokemonNPC pokemon = pokemonNPCRepository.findById(idPoke).orElse(null);
        if (pokemon != null) {
            // Actualizar el valor de vida del Pokémon
            pokemon.setVidaActual(nuevaVida);
            // Guardar los cambios en la base de datos
            pokemonNPCRepository.save(pokemon);
        } else {

            // Manejar el caso en el que no se encuentre el Pokémon con el ID especificado
            // Aquí puedes lanzar una excepción, registrar un mensaje de error, etc.
        }
    }
    */
}
