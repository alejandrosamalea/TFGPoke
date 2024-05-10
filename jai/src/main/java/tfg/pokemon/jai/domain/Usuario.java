package tfg.pokemon.jai.domain;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String nombreUsuario;
    private String contrasenia;
    private Boolean rol;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.EAGER)
    private Collection<Partida> partidas;


    public static String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());

            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    public static boolean verifyPassword(String inputPassword, String hashedPassword) {
        // Calcula el hash de la contraseña proporcionada
        String hashedInputPassword = hashPassword(inputPassword);
        // Compara el hash calculado con el hash almacenado en la base de datos
        return hashedInputPassword.equals(hashedPassword);
    }
}
