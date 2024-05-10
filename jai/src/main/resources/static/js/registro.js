function validarFormulario () { 
    console.log("estamos")
    console.log(document.getElementById("usuario").value)
    var nombre = document.getElementById("usuario").value
    var pass = document.getElementById("password").value
    var passConfirm = document.getElementById("passwordConfirm").value
    var expReg = /^[a-zA-Z0-9]{8,}$/
    if (nombre == "" || pass == "" || passConfirm == "") {
            alert("Complete todos los campos")
            return false
    }
    if (nombre.length < 3) {
        alert ("El nombre debe tener al menos 3 letras")
        return false
    }
    
    if (!expReg.test(pass)) {
        alert("La contraseña debe tener minimo 8 caracteres, letras y numeros")
        return false
    }
    if (pass != passConfirm) {
        console.log(pass + " " + passConfirm)
        alert("Las contraseñas no coinciden")
        return false
    }
    return true;
}