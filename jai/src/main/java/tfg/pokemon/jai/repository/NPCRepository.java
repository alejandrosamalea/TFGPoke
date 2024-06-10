package tfg.pokemon.jai.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import tfg.pokemon.jai.domain.NPC;

@Repository
public interface NPCRepository extends JpaRepository<NPC, Long> {
    NPC findByNombre(String nombre);
}
