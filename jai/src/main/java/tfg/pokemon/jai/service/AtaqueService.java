package tfg.pokemon.jai.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.Ataque;
import tfg.pokemon.jai.repository.AtaqueRepository;

import java.util.Arrays;
import java.util.List;

@Service
public class AtaqueService {
    @Autowired
    private AtaqueRepository ataqueRepository;

    // este metodo inicia la aplicacion con 8 ataques de cada tipo (16 tipos x 8 ataques)
    public void init() {
        
        if (ataqueRepository.count() == 0) {
            
            List<Ataque> ataquesDefault = Arrays.asList(
                //tipo id 1
new Ataque("Lanzallamas", 30, 1L),
new Ataque("Infierno", 20, 1L),
new Ataque("Anillo ígneo", 10, 1L),
new Ataque("Pirotecnia", 30, 1L),
new Ataque("Giro fuego", 20, 1L),
new Ataque("Ascuas", 10, 1L),
new Ataque("Rueda fuego", 30, 1L),
new Ataque("Llamarada", 20, 1L),

                //Tipo id 2
new Ataque("Hidrobomba", 30, 2L),
new Ataque("Acua cola", 20, 2L),
new Ataque("Surf", 10, 2L),
new Ataque("Pistola agua", 30, 2L),
new Ataque("Hidrocañón", 20, 2L),
new Ataque("Rayo burbuja", 10, 2L),
new Ataque("Pulso agua", 30, 2L),
new Ataque("Hidropulso", 20, 2L),
                //Tipo 3
new Ataque("Latigazo", 30, 3L),
new Ataque("Hoja afilada", 20, 3L),
new Ataque("Fuerza G", 10, 3L),
new Ataque("Rayo solar", 30, 3L),
new Ataque("Hoja mágica", 20, 3L),
new Ataque("Látigo cepa", 10, 3L),
new Ataque("Absorber", 30, 3L),
new Ataque("Lluevehojas", 20, 3L),

// Tipo id 4
new Ataque("Rayo infinito", 30, 4L),
new Ataque("Cola dragón", 10, 4L),
new Ataque("Garra dragón", 20, 4L),
new Ataque("Colmillo dragón", 30, 4L),
new Ataque("Onda dragón", 10, 4L),
new Ataque("Pulso dragón", 20, 4L),
new Ataque("Furia dragon", 30, 4L),
new Ataque("Cometa draco", 20, 4L),

// Tipo id 5
new Ataque("Ataque aéreo", 20, 5L),
new Ataque("Tornado", 30, 5L),
new Ataque("Vendaval", 10, 5L),
new Ataque("Giro aéreo", 30, 5L),
new Ataque("Viento aciago", 20, 5L),
new Ataque("Rayo ventisca", 10, 5L),
new Ataque("Viento plata", 30, 5L),
new Ataque("Pájaro osado", 20, 5L),

// Tipo id 6
new Ataque("Picadura", 10, 6L),
new Ataque("Picotazo", 30, 6L),
new Ataque("Corte furia", 20, 6L),
new Ataque("Disparo demora", 20, 6L),
new Ataque("Doble ataque", 30, 6L),
new Ataque("Escaramuza", 10, 6L),
new Ataque("Telaraña", 20, 6L),
new Ataque("Megacuerno", 30, 6L),
// Tipo id 7
new Ataque("Placaje", 20, 7L),
new Ataque("Golpe cuerpo", 30, 7L),
new Ataque("Cabezazo", 10, 7L),
new Ataque("Hiperrayo", 20, 7L),
new Ataque("Ataque rápido", 30, 7L),
new Ataque("Furia", 10, 7L),
new Ataque("Falso tortazo", 20, 7L),
new Ataque("Golpe", 30, 7L),

// Tipo id 8
new Ataque("Ácido", 30, 8L),
new Ataque("Gas venenoso", 10, 8L),
new Ataque("Lodo", 20, 8L),
new Ataque("Polución", 30, 8L),
new Ataque("Hilo venenoso", 10, 8L),
new Ataque("Tóxico", 20, 8L),
new Ataque("Lanza mugre", 30, 8L),
new Ataque("Puya nociva", 10, 8L),

// Tipo id 9
new Ataque("Impactrueno", 20, 9L),
new Ataque("Rayo", 30, 9L),
new Ataque("Chispa", 10, 9L),
new Ataque("Trueno", 20, 9L),
new Ataque("Onda trueno", 30, 9L),
new Ataque("Carga parábola", 10, 9L),
new Ataque("Rayo carga", 20, 9L),
new Ataque("Electrocañón", 30, 9L),

// Tipo id 10
new Ataque("Fisura", 10, 10L),
new Ataque("Excavar", 20, 10L),
new Ataque("Terremoto", 30, 10L),
new Ataque("Tormenta arena", 10, 10L),
new Ataque("Terratemblor", 20, 10L),
new Ataque("Espiral arena", 30, 10L),
new Ataque("Magnitud", 10, 10L),
new Ataque("Garra de tierra", 20, 10L),
// Tipo id 11
new Ataque("Encanto", 10, 11L),
new Ataque("Beso mágico", 20, 11L),
new Ataque("Deseo", 30, 11L),
new Ataque("Beso drenaje", 10, 11L),
new Ataque("Vozarrón", 20, 11L),
new Ataque("Carantoña", 30, 11L),
new Ataque("Arrumaco sideral", 10, 11L),
new Ataque("Viento feérico", 20, 11L),

// Tipo id 12
new Ataque("Patada baja", 20, 12L),
new Ataque("Golpe karate", 30, 12L),
new Ataque("Doble patada", 10, 12L),
new Ataque("Patada salto", 20, 12L),
new Ataque("Puño dinámico", 30, 12L),
new Ataque("Patada giro", 10, 12L),
new Ataque("Patada alta", 20, 12L),
new Ataque("Tajo cruzado", 30, 12L),

// Tipo id 13
new Ataque("Confusión", 30, 13L),
new Ataque("Psicorrayo", 10, 13L),
new Ataque("Psíquico", 20, 13L),
new Ataque("Cabezazo zen", 30, 13L),
new Ataque("Onda mental", 10, 13L),
new Ataque("Hipnosis", 20, 13L),
new Ataque("Poder reserva", 30, 13L),
new Ataque("Psicocarga", 10, 13L),

// Tipo id 14
new Ataque("Terremoto", 20, 14L),
new Ataque("Avalancha", 30, 14L),
new Ataque("Golpe roca", 10, 14L),
new Ataque("Desenrollar", 20, 14L),
new Ataque("Roca afilada", 30, 14L),
new Ataque("Aplastar", 10, 14L),
new Ataque("Garra brutal", 20, 14L),
new Ataque("Antiaero", 30, 14L),

// Tipo id 15
new Ataque("Lengüetazo", 10, 15L),
new Ataque("Come sueños", 20, 15L),
new Ataque("Oscuro", 30, 15L),
new Ataque("Bola sombra", 10, 15L),
new Ataque("Pulso umbrío", 20, 15L),
new Ataque("Tajo umbrío", 30, 15L),
new Ataque("Mal de ojo", 10, 15L),
new Ataque("Pesadilla", 20, 15L),

// Tipo id 16
new Ataque("Vaho gélido", 10, 16L),
new Ataque("Rayo hielo", 20, 16L),
new Ataque("Granizo", 30, 16L),
new Ataque("Ventisca", 10, 16L),
new Ataque("Golpe frío", 20, 16L),
new Ataque("Rayo aurora", 30, 16L),
new Ataque("Escarcha", 10, 16L),
new Ataque("Viento hielo", 20, 16L)

            );
            //guarda los ataques en la base de datos
            ataqueRepository.saveAll(ataquesDefault);
        }
    }
    

    public List<Ataque> findAll() {
        return ataqueRepository.findAll();
    }
    public Ataque findById(Long idAtaque) {
        return ataqueRepository.findById(idAtaque).orElse(null);
    }

    public void update(Long idAtaque, String  nombre){ 
        Ataque ataque = ataqueRepository.findById(idAtaque).get();
        ataque.setNombre(nombre);
        ataqueRepository.save(ataque);
    }
}
