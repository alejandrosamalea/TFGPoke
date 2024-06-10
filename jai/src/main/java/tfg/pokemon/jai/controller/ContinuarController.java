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

@RequestMapping("/continuarPartida")
@Controller
public class ContinuarController {


    @Autowired
    private UsuarioRepository usuarioRepository;



    @GetMapping("/continuar")
    public String index(ModelMap m) {
       m.put("view", "/partida/continuarPartida");
        return "partida/continuarPartida";
    }

    @PostMapping("/iniciarSesion")
    public String iniciarSesion(@RequestParam("nombre") String nombre, @RequestParam("contraseña") String contraseña,ModelMap m) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombre);
        if (usuario != null && Usuario.verifyPassword(contraseña, usuario.getContrasenia())) {
            m.put("view", "/partida/continuarPartida");
            return "/partida/continuarPartida";
        } else {
            // La contraseña no coincide o el usuario no existe
            // Manejar el error aquí, por ejemplo, mostrando un mensaje de error al usuario
            return "administrar/loginContinuar"; // Redirige de nuevo a la página de inicio de sesión
        }
    }
}