package tfg.pokemon.jai.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.Pokemon;

@Repository
public interface PokemonRepository extends JpaRepository<Pokemon, Long> {
    List<Pokemon> findByEntrenadorPokemonId(Long idEntrenador);
    List<Pokemon> findAllByEntrenadorPokemonId(Long entrenadorId);

}