package tfg.pokemon.jai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.Partida;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {
    Partida findByEntrenadorId(Long idEntrenador);
}
