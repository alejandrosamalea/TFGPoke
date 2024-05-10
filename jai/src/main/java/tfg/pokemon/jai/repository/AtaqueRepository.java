package tfg.pokemon.jai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.Ataque;

@Repository
public interface AtaqueRepository extends JpaRepository<Ataque, Long> {
    Ataque findByNombre(String nombre);
}
