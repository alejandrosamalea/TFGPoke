package tfg.pokemon.jai.domain;

import java.util.Collection;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Entrenador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nickname;
    private boolean genero;

    @OneToMany(mappedBy = "entrenadorPokemon")
    private Collection<Pokemon> pokemones;
    
}
