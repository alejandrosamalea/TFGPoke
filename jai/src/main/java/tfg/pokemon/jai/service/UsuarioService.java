package tfg.pokemon.jai.service;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import tfg.pokemon.jai.domain.Partida;
import tfg.pokemon.jai.domain.Usuario;
import tfg.pokemon.jai.repository.UsuarioRepository;

@Service
public class UsuarioService  {

    @Autowired
    private UsuarioRepository usuarioRepository;



    
    public void init()  {
        // Crear usuario admin si no existe
        if (usuarioRepository.findByNombreUsuario("admin") == null) {
            Usuario admin = new Usuario();
            admin.setNombreUsuario("admin");
            String password = "1234";
            admin.setContrasenia(Usuario.hashPassword(password)); // Se encripta la contraseña
            admin.setRol(true);
            usuarioRepository.save(admin);
        }
    }

    @Transactional
    public Collection<Partida> obtenerPartidasDeUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        if (usuario != null) {
            // Inicializar explícitamente la colección de partidas
            usuario.getPartidas().size();
            return usuario.getPartidas();
        } else {
            return Collections.emptyList();
        }
    }
    public Usuario findById(Long idUsuario) {
        return usuarioRepository.findById(idUsuario).orElse(null);
    }

    public Usuario save(String nombre, String password, boolean rol) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(nombre);
        usuario.setContrasenia(Usuario.hashPassword(password));
        usuario.setRol(rol);

        usuarioRepository.save(usuario);
        return usuario;
    }


}
