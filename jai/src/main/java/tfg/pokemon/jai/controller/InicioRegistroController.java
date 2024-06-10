package tfg.pokemon.jai.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;
import tfg.pokemon.jai.domain.Usuario;
import tfg.pokemon.jai.repository.UsuarioRepository;
import tfg.pokemon.jai.service.UsuarioService;

@RequestMapping("/inicioRegistro")
@Controller
public class InicioRegistroController {
    @Autowired
    UsuarioRepository usuarioRepository;
    @Autowired
    UsuarioService usuarioService;
    @GetMapping("main")
    public String main(
        ModelMap m
    ) {
        m.put("view","partida/inicioSesion");
        return "administrar/inicioSesion";
    }

    @GetMapping("registro")
    public String registro(ModelMap m) {
        m.put("view","partida/registar");
        return "administrar/registar";
    }

    @PostMapping("registroPost")
    public String registroPost(
            @RequestParam("usuario") String nombre, @RequestParam("password") String password, HttpSession sesion, ModelMap m) throws Exception {
                
                Usuario usuario = usuarioService.save(nombre, password, false);
                // Sesion de usuario
                sesion.setAttribute("usuario", usuario);
                m.put("view", "/menu/menu");
            return "redirect:/menu/menu";
    }
    @PostMapping("inicioPost")
    public String inicioPost(@RequestParam("usuarioLog") String nombre, @RequestParam("passwordLog") String password, HttpSession sesion ,ModelMap m) { 
        Usuario usuario = usuarioRepository.findByNombreUsuario(nombre);
        if (usuario != null && Usuario.verifyPassword(password, usuario.getContrasenia())) {
            sesion.setAttribute("usuario", usuario);
            m.put("view", "/menu/menu");
            return "redirect:/menu/menu";
        }
        else {
            // usar toast de boostrap para mensaje error de que el login incorrecto
            return "administrar/inicioSesion"; // Redirige de nuevo a la página de inicio de sesión
        }
    } 


    @GetMapping("/logout")
	public String logout(
		HttpSession s
	) {
		s.invalidate();
		return "redirect:/index";
	}

    @GetMapping("/vueltaMenu")
    public String vueltaMenu(
        ModelMap m,
        @RequestParam("idUsuario") Long idUsuario,
        HttpSession sesion
    ) {
        Usuario usuario = usuarioRepository.findById(idUsuario).orElse(null);
        sesion.setAttribute("usuario", usuario);
        m.put("view", "/menu/menu");
        return "redirect:/menu/menu";
    }
	
}
