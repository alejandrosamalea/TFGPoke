package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.TipoService;

@RequestMapping("/ataque")
@Controller

public class AtaqueController {
    
    @Autowired
    private TipoService tipoService;

    @Autowired
    private AtaqueService ataqueService;
    
   

    @GetMapping("r")
    public String r(ModelMap m) {
        m.put("tipos", tipoService.findAll());
        m.put("ataques", ataqueService.findAll());
        m.put("view", "administrar/ataque/r");
        return "_t/frame";
    }
    @GetMapping({"update"})
    public String update(ModelMap m, @RequestParam("id") Long idAtaque) {
       m.put("idAtaque", this.ataqueService.findById(idAtaque));
       m.put("view", "administrar/ataque/u");
       return "administrar/ataque/u";
    }
 
    @PostMapping({"update"})
    public ResponseEntity<String> updatePost(@RequestParam("idAtaque") Long idAtaque, @RequestParam("nombre") String nombre) {
       this.ataqueService.update(idAtaque, nombre);
       return ResponseEntity.ok("Operaci\u00f3n exitosa");
    }


}