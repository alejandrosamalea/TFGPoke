package tfg.pokemon.jai.domain;

import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
//mis
@Entity
@Data
@NoArgsConstructor
public class Ataque {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int danio;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tipo tipo;

    @ManyToMany(mappedBy = "ataques", fetch = FetchType.LAZY)
    private Collection<Pokemon> pokemones;

    public Ataque(String nombre, int danio, Long idTipo) {
        this.nombre = nombre;
        this.danio = danio;
        this.tipo = new Tipo();
        this.tipo.setId(idTipo);
    }

   
}
