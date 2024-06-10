package tfg.pokemon.jai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.PokemonNPC;

@Repository
public interface PokemonNPCRepository extends JpaRepository<PokemonNPC, Long> {
    List<PokemonNPC> findByEntrenadorPokemonId(Long idEntrenador);
}