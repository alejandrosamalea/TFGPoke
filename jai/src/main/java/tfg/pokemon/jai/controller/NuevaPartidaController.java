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
import tfg.pokemon.jai.service.EspecieService;
import tfg.pokemon.jai.service.PartidaService;
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
    EspecieService especieService;

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

    // Agregar el Entrenador al modelo para que esté disponible en la página de selección de Pokémon
    m.put("entrenador", entrenador);

    m.put("pokemones", especieService.pokemonesIniciales(3));
    m.put("view", "partida/seleccionPoke");
    return "partida/seleccionPoke";
}
}
