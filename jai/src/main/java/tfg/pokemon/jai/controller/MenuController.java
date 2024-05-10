package tfg.pokemon.jai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/menu")
@Controller

public class MenuController {

    @GetMapping("menu")
    public String menu(
        ModelMap m
    ) {
        m.put("view","menu/menu");
        return "/menu/menu";
    }

    

	
}
