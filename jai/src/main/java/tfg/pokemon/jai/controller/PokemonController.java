// Source code is decompiled from a .class file using FernFlower decompiler.
package tfg.pokemon.jai.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.PokemonService;
import tfg.pokemon.jai.service.TipoService;

@RequestMapping({"/pokemon"})
@Controller
public class PokemonController {
   @Autowired
   private PokemonService pokemonService;

   @Autowired
   private TipoService tipoService;

   @Autowired
   private AtaqueService ataqueService;

   public PokemonController() {
   }


    @PostMapping("/guardarNombreTipoPokemon")
    //Este método recibe una lista de mapas de tipo String como cuerpo de la solicitud. 
    public ResponseEntity<Void> guardarNombresPokemon(@RequestBody List<Map<String, String>> nombresPokemon) {
        //Este método invoca un método init en un servicio de Pokémon y le pasa la lista de nombres y tipos de Pokémon
        pokemonService.init(nombresPokemon);

        // Después de que se haya procesado la información, el método devuelve una respuesta HTTP con un código de estado 200 (OK)  
        // y .build() construye y devuelve la respuesta vacía.
        return ResponseEntity.ok().build(); 
    }



    @GetMapping("/r")
    public String r(ModelMap m) {
        // Devolver la vista apropiada
        m.put("pokemones", pokemonService.findAll());
        m.put("view", "administrar/pokemon/r");
        return "_t/frame";
    }
    
    @GetMapping("/c")
    public String c(ModelMap m) {
        // Devolver la vista apropiada
        m.put("tipos", tipoService.findAll());
        m.put("ataques", ataqueService.findAll());
        m.put("view", "administrar/pokemon/c");
        return "_t/frame";
    }
 
    @PostMapping("/c")
    public String cPost(ModelMap m,
                        @RequestParam("nombrePokemon") String nombrePokemon,
                        @RequestParam("vidaBasePokemon") Integer vidaBasePokemon,
                        @RequestParam("defensaBasePokemon") Integer defensaBasePokemon,
                        @RequestParam("ataqueBasePokemon") Integer ataqueBasePokemon,
                        @RequestParam("tipo") Long idTipo) {
        // Suponiendo que ataquesSeleccionados es una lista de IDs de los ataques seleccionados
        // y que se trata de una lista opcional (required = false) en caso de que no se seleccionen ataques
        pokemonService.save(nombrePokemon, vidaBasePokemon, defensaBasePokemon, ataqueBasePokemon, idTipo);
        return "redirect:/pokemon/r";
    }
    
}
