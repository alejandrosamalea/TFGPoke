package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;

import tfg.pokemon.jai.service.AtaqueService;
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


    @GetMapping("/")
    public String index(
        ModelMap m
    ) {
        m.put("view","index/index");
        usuarioService.init();
        tipoService.init();
        ataqueService.init();

        return "/index/index";
    }
}