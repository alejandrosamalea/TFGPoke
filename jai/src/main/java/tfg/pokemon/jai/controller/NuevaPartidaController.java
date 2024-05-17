package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Usuario;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.PartidaService;
import tfg.pokemon.jai.service.PokemonService;
import tfg.pokemon.jai.service.UsuarioService;

@RequestMapping("/nuevaPartida")
@Controller

public class NuevaPartidaController {

    @Autowired
    EntrenadorService entrenadorService;

    @Autowired
    PartidaService partidaService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    PokemonService pokemonService;

    @GetMapping("nuevaPartida")
    public String registro(
        ModelMap m
    ) {
        m.put("view","partida/nuevaPartida");
        return "partida/nuevaPartida";
    }
    @GetMapping("inicioPost")
    public String inicioPartida (
        ModelMap m, 
        @RequestParam(name="nombre") String nickname,
        @RequestParam(name="genero") boolean genero,
        @RequestParam(name = "id_usuario") Long idUsuario
    ){
        entrenadorService.save(nickname, genero);
        Entrenador entrenador = entrenadorService.findByNick(nickname);
        Usuario usuario = usuarioService.findById(idUsuario);
        partidaService.save(entrenador, usuario);
        m.put("pokemones", pokemonService.pokemonesIniciales(3));
        m.put("entrenador", entrenador);
        m.addAttribute("entrenador", entrenador);
        m.put("view", "partida/seleccionPoke");
        return "partida/seleccionPoke";
    }
}
