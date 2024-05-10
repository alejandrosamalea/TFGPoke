package tfg.pokemon.jai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Entrenador;
import tfg.pokemon.jai.repository.EntrenadorRepository;

@Service
public class EntrenadorService {
    @Autowired
    EntrenadorRepository entrenadorRepository;
    public void save(String nickname, boolean genero) {
        Entrenador entrenador = new Entrenador();
        entrenador.setNickname(nickname);
        entrenador.setGenero(genero);
        entrenadorRepository.save(entrenador);
    }

    public Entrenador findByNick(String entrenador) {
        return entrenadorRepository.findByNickname(entrenador);
    }
}
