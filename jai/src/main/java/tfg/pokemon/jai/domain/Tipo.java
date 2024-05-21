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
public class Tipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    
    @OneToMany(mappedBy = "tipo")
    private Collection<Especie> contiene;

    @OneToMany(mappedBy = "tipo")
    private Collection<Ataque> ataques;

    
    public Tipo(String nombre) {
        this.nombre = nombre;
    }

}
