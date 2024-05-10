package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import tfg.pokemon.jai.domain.Usuario;
import tfg.pokemon.jai.repository.UsuarioRepository;


@RequestMapping("/administrar")
@Controller
public class AdministrarController {


    @Autowired
    private UsuarioRepository usuarioRepository;



    @GetMapping("/home")
    public String index(ModelMap m) {
        m.put("view", "/administrar/home");
        return "_t/frame";
    //    m.put("view", "/administrar/login");
    //     return "administrar/login";
    }

    @PostMapping("/iniciarSesion")
    public String iniciarSesion(@RequestParam("nombre") String nombre, @RequestParam("contraseña") String contraseña,ModelMap m) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombre);
        if (usuario != null && Usuario.verifyPassword(contraseña, usuario.getContrasenia()) && usuario.getRol()) {
            m.put("view", "/administrar/home");
            return "_t/frame";
        } else {
            // usar toast de boostrap para mensaje error de que el login incorrecto
            return "administrar/login"; // Redirige de nuevo a la página de inicio de sesión
        }
}
}