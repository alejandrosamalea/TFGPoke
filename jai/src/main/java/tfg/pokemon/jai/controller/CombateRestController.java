package tfg.pokemon.jai.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tfg.pokemon.jai.domain.Ataque;
import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Especie;
import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.EntrenadorService;
import tfg.pokemon.jai.service.EspecieService;
import tfg.pokemon.jai.service.PokemonService;

@RestController
@RequestMapping("/combateRest")
public class CombateRestController {
    
    @Autowired
    EspecieService especieService;

    @Autowired
    AtaqueService ataqueService;
    
    @Autowired
    EntrenadorService entrenadorService;

    @Autowired
    PokemonService pokemonService;

    @GetMapping("/ataqueAleatorio")
    public Ataque obtenerAtaqueAleatorio(@RequestParam("idTipoPokeSalvaje") Long idTipoPokeSalvaje) {
        return ataqueService.obtenerAtaqueAleatorio(idTipoPokeSalvaje);
    }

    @PostMapping("/info")
    public ResponseEntity<?> obtenerInfoEspecie(@RequestParam("idPokeSalvaje") Long idEspecie) {
        try {
            Especie especie = especieService.findById(idEspecie);
            int vida = especie.getVidaBase();
            return ResponseEntity.ok(vida);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/atacar")
    public ResponseEntity<?> ejecutarAtaque(@RequestBody Map<String, String> request) {
        try {
            String nombreAtaque = request.get("nombreAtaque");
            Ataque ataque = ataqueService.findByNombre(nombreAtaque);
            return ResponseEntity.ok(ataque);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al ejecutar el ataque.");
        }
    }
    @PostMapping("capturarPokemon")
    public void capturarPokemon(@RequestBody Map<String, Object> datos) {
        Long idEntrenador = Long.parseLong(datos.get("idEntrenador").toString());
        Long idEspecie = Long.parseLong(datos.get("idEspecie").toString());
        Integer lvPokeSalvaje = Integer.parseInt(datos.get("lvPokeSalvaje").toString());
        Entrenador entrenador = entrenadorService.findById(idEntrenador);
        pokemonService.captura(idEspecie, entrenador, lvPokeSalvaje);
    }

}
