package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.PokemonService;

@RequestMapping("/empezarJuego")
@Controller

public class EmpezarJuegoController {

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private EntrenadorService entrenadorService;

    @PostMapping("crearPoke")
    public String crearPoke(
        ModelMap m,
        @RequestParam("idPoke") Long idPoke,
        @RequestParam("idEntrenador") Long idEntrenador
    ) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        pokemonService.save(idPoke, entrenador);
        m.put("view","partida/continuarPartida2");
        return "partida/continuarPartida2";
    }
    
}
