package tfg.pokemon.jai.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class PokemonNPC {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @ManyToOne
    private Especie especie;

    private Integer nivel;

    private Integer vida;

    private Integer fuerza;
    
    private Integer defensa;

    @ManyToOne
    private NPC entrenadorPokemon;



}
