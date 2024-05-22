package tfg.pokemon.jai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.Especie;

@Repository
public interface EspecieRepository extends JpaRepository<Especie, Long> {
    Especie findByNombre(String nombre);
}
