package tfg.pokemon.jai.controller;



import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.PokemonService;

@RequestMapping({"/pokemon"})
@Controller
public class PokemonController {
    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private EntrenadorService entrenadorService;

    @GetMapping("curarPokemones")
        public String curarPokemones(ModelMap m,@RequestParam("idEntrenador") Long idEntrenador) {
            List<Pokemon> pokemones = pokemonService.findPartidasByEntrenadorId(idEntrenador);
            System.out.println("SISISISI");
            Entrenador entrenador = entrenadorService.findById(idEntrenador);
            pokemonService.curarPokemones(pokemones);
            m.put("entrenador", entrenador);
          
            m.put("view","partida/vistaCasa3");
            return "partida/vistaCasa3";
    }

   
  

   

  

    
}
