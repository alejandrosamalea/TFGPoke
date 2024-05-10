// Source code is decompiled from a .class file using FernFlower decompiler.
package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import tfg.pokemon.jai.service.TipoService;

@RequestMapping({ "/tipo" })
@Controller
public class TipoController {
   @Autowired
   private TipoService tipoService;

   public TipoController() {
   }

   @GetMapping({ "r" })
   public String r(ModelMap m) {
      m.put("tipos", this.tipoService.findAll());
      m.put("view", "administrar/tipo/r");
      return "_t/frame";
   }

   @GetMapping({ "update" })
   public String update(ModelMap m, @RequestParam("id") Long idTipo) {
      m.put("idTipo", this.tipoService.findById(idTipo));
      m.put("view", "administrar/tipo/editarTipo");
      return "administrar/tipo/editarTipo";
   }

   @PostMapping({ "update" })
   public ResponseEntity<String> updatePost(@RequestParam("idTipo") Long idTipo,
         @RequestParam("nombre") String nombre) {
      this.tipoService.update(idTipo, nombre);
      return ResponseEntity.ok("Operaci\u00f3n exitosa");
   }
}
