package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Partida;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.PartidaService;
import tfg.pokemon.jai.service.PokemonService;

@RequestMapping("/empezarJuego")
@Controller

public class EmpezarJuegoController {

    @Autowired
    private PokemonService pokemonService;

    @Autowired
    private EntrenadorService entrenadorService;

    @Autowired
    private PartidaService partidaService;

    @PostMapping("crearPoke")
    public String crearPoke(ModelMap m, @RequestParam("idPoke") Long idPoke, @RequestParam("idEntrenador") Long idEntrenador) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        pokemonService.save(idPoke, entrenador);
        m.put("idEntrenador", idEntrenador);
        // Boolean genero = entrenador.isGenero();
        // m.put("genero", genero);
        
        // Redirigir a otro controlador con parámetros
        return "redirect:/empezarJuego/otroControlador?idEntrenador=" + idEntrenador;
    }
    

    @GetMapping("/otroControlador")
    public String otroControlador(@RequestParam("idEntrenador") Long idEntrenador, ModelMap m) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        Partida partida = partidaService.findByIdEntrenador(idEntrenador);
        // Lógica para manejar la solicitud
        m.put("entrenador", entrenador);
        m.put("partida", partida);
        // Otras operaciones...
        return "partida/continuarPartida";
    }
    @GetMapping("/salirCasa")
    public String salirCasa(@RequestParam("idEntrenador") Long idEntrenador, @RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY,ModelMap m) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        Partida partida = partidaService.findByIdEntrenador(idEntrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        // Lógica para manejar la solicitud
        m.put("entrenador", entrenador);
        m.put("partida", partida);
        // Otras operaciones...
        return "partida/continuarPartida";
    }
    


    @PostMapping("cargarCasa1")
    public String cargarCasa1(ModelMap m,@RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/vistaCasa1");
        return "partida/vistaCasa1";
    }
    @PostMapping("cargarCasa2")
    public String cargarCasa2(ModelMap m,@RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/vistaCasa2");
        return "partida/vistaCasa2";
    }
    @PostMapping("cargarCasa3")
    public String cargarCasa3(ModelMap m,@RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/vistaCasa3");
        return "partida/vistaCasa3";
    }
  
  
    @PostMapping("cargarCasa4")
    public String cargarCasa4(ModelMap m,@RequestParam("idEntrenador") Long idEntrenador,@RequestParam("posicion") String posicion,@RequestParam("posicionY") String posicionY) {
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        m.put("entrenador", entrenador);
        m.put("posicion", posicion);
        m.put("posicionY", posicionY);
        m.put("view","partida/vistaCasa4");
        return "partida/vistaCasa4";
    }
}