package tfg.pokemon.jai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.Tipo;

@Repository
public interface TipoRepository extends JpaRepository<Tipo, Long> {
    Tipo findByNombre(String nombre);
}
