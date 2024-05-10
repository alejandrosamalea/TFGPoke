package tfg.pokemon.jai.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Tipo;
import tfg.pokemon.jai.repository.TipoRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class TipoService {
    @Autowired
    private TipoRepository tipoRepository;

    
    public void init() {
        // Verifica si ya existen tipos en la base de datos
        if (tipoRepository.count() == 0) {
            // Si no hay tipos, crea y guarda los tipos por defecto
            List<Tipo> tiposDefault = Arrays.asList(
                new Tipo("Fuego"),
                new Tipo("Agua"),
                new Tipo("Planta"),
                new Tipo("Dragon"),
                new Tipo("Volador"),
                new Tipo("Bicho"),
                new Tipo("Normal"),
                new Tipo("Veneno"),
                new Tipo("Electrico"),
                new Tipo("Tierra"),
                new Tipo("Hada"),
                new Tipo("Lucha"),
                new Tipo("Psiquico"),
                new Tipo("Roca"),
                new Tipo("Fantasma"),
                new Tipo("Hielo")
            );
            tipoRepository.saveAll(tiposDefault);
        }
    }

    public List<Tipo> findAll() {
        return tipoRepository.findAll();
    }

    public Tipo findById(Long idTipo) {
        return tipoRepository.findById(idTipo).orElse(null);
    }
    public void update(Long idTipo, String  nombre){ 
        Tipo tipo = tipoRepository.findById(idTipo).get();
        tipo.setNombre(nombre);
        tipoRepository.save(tipo);
    }
}
