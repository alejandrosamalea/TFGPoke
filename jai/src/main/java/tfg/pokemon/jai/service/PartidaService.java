package tfg.pokemon.jai.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.domain.Partida;
import tfg.pokemon.jai.domain.Usuario;
import tfg.pokemon.jai.repository.PartidaRepository;

@Service
public class PartidaService {
    @Autowired
    private PartidaRepository partidaRepository;
    public void save(Entrenador entrenador, Usuario usuario) {
        Partida partida = new Partida();
        partida.setEntrenador(entrenador);
        partida.setUsuario(usuario);
        partidaRepository.save(partida);
    }
    public List<Partida> findAll() {
        return partidaRepository.findAll();
    }
}
