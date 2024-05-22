package tfg.pokemon.jai.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import tfg.pokemon.jai.service.AtaqueService;
import tfg.pokemon.jai.service.EspecieService;
import tfg.pokemon.jai.service.TipoService;

@RequestMapping({"/especie"})
@Controller
public class EspecieController {
    @Autowired
    private EspecieService especieService;

    @Autowired
    private TipoService tipoService;

    @Autowired
    private AtaqueService ataqueService;


    public EspecieController() {
        
    }
    private static final String UPLOAD_DIR = "static/img/especie";

    @PostMapping("/guardarNombreTipoPokemon")
    public ResponseEntity<Void> guardarNombresPokemon(@RequestBody List<Map<String, String>> nombresPokemon) throws IOException {
        especieService.init(nombresPokemon);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/r")
    public String r(ModelMap m) {
        m.put("especies", especieService.findAll());
        m.put("view", "administrar/especie/r");
        return "_t/frame";
    }

    @GetMapping("/c")
    public String c(ModelMap m) {
        m.put("tipos", tipoService.findAll());
        m.put("ataques", ataqueService.findAll());
        m.put("view", "administrar/especie/c");
        return "_t/frame";
    }

    @PostMapping("/c")
    public String cPost(ModelMap m,
                        @RequestParam("nombrePokemon") String nombrePokemon,
                        @RequestParam("vidaBasePokemon") Integer vidaBasePokemon,
                        @RequestParam("defensaBasePokemon") Integer defensaBasePokemon,
                        @RequestParam("ataqueBasePokemon") Integer ataqueBasePokemon,
                        @RequestParam("tipo") Long idTipo,
                        @RequestParam("imagenPokemon") MultipartFile imagenPokemon) {

        if (!imagenPokemon.isEmpty()) {
            try {
                String uploadDir = new ClassPathResource(UPLOAD_DIR).getFile().getAbsolutePath();
                System.out.println(UPLOAD_DIR);
                System.out.println(uploadDir);
                System.out.println("UPLOAD_DIR");
                System.out.println("UPLOAD_DIR");

                 String fileName = imagenPokemon.getOriginalFilename();
                Path destPath = Paths.get(uploadDir, fileName);
                Files.copy(imagenPokemon.getInputStream(), destPath, StandardCopyOption.REPLACE_EXISTING);
                String nombreImagen = fileName.substring(fileName.lastIndexOf("\\") + 1, fileName.lastIndexOf("."));
                especieService.save(nombrePokemon, vidaBasePokemon, defensaBasePokemon, ataqueBasePokemon, idTipo, nombreImagen);
                return "redirect:/administrar/home";
            } catch (IOException e) {
                e.printStackTrace();
                return "Error al subir la imagen";
            }
        } else {
            return "Archivo vacío";
        }
    }

    public static File multipartToFile(MultipartFile multipart, String fileName) throws IOException {
        File file = File.createTempFile(fileName, null);
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(multipart.getBytes());
        }
        return file;
    }
}
