package tfg.pokemon.jai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;

@RequestMapping("/equipoEntrenador")
@Controller

public class EquipoPokemonController {

    @PostMapping("crearEquipo")
    public String crearEquipo(
        ModelMap m,
        @RequestParam("idPoke") Long idPoke,
        @ModelAttribute("entrenador") Entrenador entrenador
    ) {
        
        m.put("view","partida/continuarPartida");
        return "partida/continuarPartida";
    }
    
}
