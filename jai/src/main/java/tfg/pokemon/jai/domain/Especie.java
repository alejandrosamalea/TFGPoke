package tfg.pokemon.jai.domain;



import java.io.File;
import java.util.Collection;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Especie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
  
    @ManyToOne
    private Tipo tipo;

    @OneToMany(mappedBy = "especie")
    private Collection<Pokemon> contiene;

    private Integer vidaBase;

    private Integer defensaBase;


    private Integer ataqueBase;

    private String imagen;

    public Especie(String nombre, Integer vidaBase, Integer defensaBase, Integer ataqueBase) {
        this.nombre = nombre;
        this.vidaBase = vidaBase;
        this.defensaBase = defensaBase;
        this.ataqueBase = ataqueBase;
    }

}
