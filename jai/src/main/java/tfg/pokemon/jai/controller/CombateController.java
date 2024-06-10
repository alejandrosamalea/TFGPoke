package tfg.pokemon.jai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Especie;
import tfg.pokemon.jai.domain.NPC;
import tfg.pokemon.jai.domain.Partida;
import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.domain.PokemonNPC;
import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.EspecieService;
import tfg.pokemon.jai.service.NPCService;
import tfg.pokemon.jai.service.PartidaService;
import tfg.pokemon.jai.service.PokemonNPCService;
import tfg.pokemon.jai.service.PokemonService;


@RequestMapping("/combate")
@Controller
public class CombateController {
    // @Autowired
    // private CombateService combateService;
    @Autowired
    AtaqueService ataqueService;

    @Autowired
    private EspecieService especieService;

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private PokemonNPCService pokemonNPCService;

    @Autowired
    private EntrenadorService entrenadorService;

    @Autowired
    private NPCService npcService;

    @Autowired
    private PartidaService partidaService;

    @PostMapping("combatePokeRandom")
    public String combatePokeRandom(
        ModelMap m,
        @RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        List<Pokemon> pokemones = pokemonService.findByEntrenador(idEntrenador);
        Especie pokeSalvaje = especieService.pokemonSalvajeAleatorio(1);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("pokeSalvaje", pokeSalvaje);
        m.put("entrenador", entrenador);
        m.put("pokemon", pokemones.get(0));
        m.put("view","combate/combatePokeSalvaje");
        return "combate/combatePokeSalvaje";
    }


    @GetMapping("combateNPC")
    public String combateNPC(
        ModelMap m,
        @RequestParam("idEntrenador") Long idEntrenador,@RequestParam("idNPC") Long idNPC,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        List<Pokemon> pokemones = pokemonService.findByEntrenador(idEntrenador);
        NPC npc = npcService.findById(idNPC);
        List<PokemonNPC> pokemonesNPC = pokemonNPCService.findByEntrenador(idNPC);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("pokemonesNPC", pokemonesNPC);
        m.put("npc", npc);
        m.put("entrenador", entrenador);
        m.put("pokemones", pokemones);
        m.put("view","combate/combateNPC");
        return "combate/combateNPC";
    }

    @GetMapping("cargarMapa")
    public String cargarMapa(ModelMap m, @RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY, @RequestParam("vidaPokemon") Integer vidaPokeEntrenador,@RequestParam("idPokemon") Long idPokemon) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        Partida partida = partidaService.findByIdEntrenador(idEntrenador);
        pokemonService.updateVida(idPokemon, vidaPokeEntrenador);
        m.put("partida", partida);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/continuarPartida");
        return "partida/continuarPartida";

    }

    @GetMapping("/verPokemones")
    public String verPokemones(ModelMap m, 
        @RequestParam("idEntrenador") Long idEntrenador, 
        @RequestParam("vidaActualEntrenador") Integer vidaPokeEntrenador, 
        @RequestParam("idPokeEntrenador") Long idPokeEntrenador,
        @RequestParam("posicionX") Integer posicionX,
        @RequestParam("posicionY") Integer posicionY,
        @RequestParam("idPokeSalvaje") Long idPokemonSalvaje,
        @RequestParam("vidaActualPokeSalvaje") String vidaActualPokeSalvaje) {
    
        pokemonService.updateVida(idPokeEntrenador, vidaPokeEntrenador);
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        List<Pokemon> pokemones = pokemonService.findByEntrenador(idEntrenador);
        
        m.put("idPokeCombateActual", idPokeEntrenador);
        m.put("entrenador", entrenador);
        m.put("pokemones", pokemones);
        m.put("idPokeSalvaje", idPokemonSalvaje);
        m.put("vidaActualPokeSalvaje", vidaActualPokeSalvaje);
        m.put("posicionX", posicionX);
        m.put("posicionY", posicionY);
        m.put("view","combate/verPokemones");
        return "combate/verPokemones";
    
    }
    @PostMapping("/volverCombate")
    public String volverCombate(ModelMap m, 
        @RequestParam("idPokeEntrenador") Long idPokeEntrenador,
        @RequestParam("idPokeSalvaje") Long idPokeSalvaje,
        @RequestParam("vidaActualPokeSalvaje") String vidaActualPokeSalvaje,
        @RequestParam("posicionX") String posicionX,
        @RequestParam("posicionY") String posicionY,
        @RequestParam("idEntrenador") Long idEntrenador)
    {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        Especie pokeSalvaje = especieService.findById(idPokeSalvaje);
        Pokemon pokeEntrenador = pokemonService.findById(idPokeEntrenador);
        m.put("posicion", posicionX);
        m.put("posicionY", posicionY);
        m.put("pokeSalvaje", pokeSalvaje);
        m.put("entrenador", entrenador);
        m.put("pokemon", pokeEntrenador);
        m.put("view","combate/combatePokeSalvaje");
        return "combate/combatePokeSalvaje";
    }

    @GetMapping("/saliCombateNPC")
    public String saliCombateNPC(ModelMap m, @RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY, @RequestParam("vidaPokemon") Integer vidaPokeEntrenador,@RequestParam("idPokemon") Long idPokemon) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        Partida partida = partidaService.findByIdEntrenador(idEntrenador);
        pokemonService.updateVida(idPokemon, vidaPokeEntrenador);
        m.put("partida", partida);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/vistaCasa2");
        return "partida/vistaCasa2";

    }
}
