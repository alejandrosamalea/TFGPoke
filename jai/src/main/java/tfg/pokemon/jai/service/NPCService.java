package tfg.pokemon.jai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tfg.pokemon.jai.domain.NPC;
import tfg.pokemon.jai.repository.NPCRepository;

@Service
public class NPCService {
    @Autowired
    NPCRepository npcRepository;

    
   

    public NPC findById(Long idNPC){
        return npcRepository.findById(idNPC).orElse(null);
    }

    public NPC findByNombe(String entrenador) {
        return npcRepository.findByNombre(entrenador);
    }
}
