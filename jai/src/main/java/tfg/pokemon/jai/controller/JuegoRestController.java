package tfg.pokemon.jai.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tfg.pokemon.jai.domain.Pokemon;
import tfg.pokemon.jai.service.PokemonService;

@RestController
@RequestMapping("/juegoRest")
public class JuegoRestController {
    @Autowired
    private PokemonService pokemonService;

    @GetMapping("/recuperarPokemonesEntrenador")
    public List<Pokemon> recuperarPokemonesEntrenador(@RequestParam("idEntrenador") Long idEntrenador) {
        return pokemonService.findByEntrenador(idEntrenador);
    }
}
