package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.EspecieService;
import tfg.pokemon.jai.service.PokemonNPCService;
import tfg.pokemon.jai.service.TipoService;
import tfg.pokemon.jai.service.UsuarioService;

@Controller
public class IndexController {
    @Autowired
    UsuarioService  usuarioService;
    @Autowired
    private TipoService tipoService;

    @Autowired
    private AtaqueService ataqueService;

     @Autowired
   private EspecieService pokemonService;

   @Autowired
   private PokemonNPCService pokemonNPCService;

    @GetMapping("/")
    public String pantallaCarga(
        ModelMap m
    ) {
        m.put("view","index/pantallaCarga");
        m.put("pokemones", pokemonService.findAll());
        usuarioService.init();
        tipoService.init();
        ataqueService.init();
        return "/index/pantallaCarga";
    }

    @GetMapping("/index")
    public String index(
        ModelMap m
    ) {
        pokemonNPCService.init();

        m.put("view","index/index");
        return "/index/index";
    }
}