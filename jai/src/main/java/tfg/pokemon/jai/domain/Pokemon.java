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
public class Pokemon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
  
    @ManyToOne
    private Tipo tipo;



    private Integer vidaBase;

    private Integer defensaBase;


    private Integer ataqueBase;


    public Pokemon(String nombre, Integer vidaBase, Integer defensaBase, Integer ataqueBase) {
        this.nombre = nombre;
        this.vidaBase = vidaBase;
        this.defensaBase = defensaBase;
        this.ataqueBase = ataqueBase;
    }

}
