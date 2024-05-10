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
public class Ataque {
   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int danio;

    @ManyToOne
    private Tipo tipo;

    public Ataque(String nombre, int danio, Long idTipo) {
        this.nombre = nombre;
        this.danio = danio;
        this.tipo = new Tipo();
        this.tipo.setId(idTipo);
    }

   
}
