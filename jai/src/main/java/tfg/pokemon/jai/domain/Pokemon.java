package tfg.pokemon.jai.domain;



import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
  
    @ManyToOne
    private Especie especie;

    private Integer nivel;

    private Integer experiencia;

    private Integer vidaActual;

    private Integer vida;

    private Integer fuerza;
    
    private Integer defensa;

    
    @ManyToMany
    private Collection<Ataque> ataques;

    @ManyToOne
    private Entrenador entrenadorPokemon;



}
