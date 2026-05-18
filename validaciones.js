document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    // Función para mostrar errores
    const mostrarError = (input, mensaje) => {
        const grupo = input.parentElement;
        let error = grupo.querySelector(".error-message");
        
        if (!error) {
            error = document.createElement("span");
            error.className = "error-message";
            grupo.appendChild(error);
        }
        
        error.textContent = mensaje;
        input.classList.add("campo-error");
        input.classList.remove("campo-ok");
    };

    // Función para mostrar éxito
    const mostrarOk = (input) => {
        const grupo = input.parentElement;
        const error = grupo.querySelector(".error-message");
        if (error) {
            error.remove();
        }
        input.classList.remove("campo-error");
        input.classList.add("campo-ok");
    };

    // --- VALIDACIONES DATOS PERSONALES (ETAPA 1) ---

    // Validar Nombre
    const validarNombre = (input) => {
        const valor = input.value.trim();
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (valor === "") {
            mostrarError(input, "El nombre no puede quedar vacío.");
            return false;
        } else if (valor.length < 3 || valor.length > 60) {
            mostrarError(input, "Debe tener entre 3 y 60 caracteres.");
            return false;
        } else if (!regex.test(valor)) {
            mostrarError(input, "Solo se permiten letras y espacios.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // Validar Fecha de Nacimiento (Mayor de 18 años)
    const validarFecha = (input) => {
        const fechaNac = new Date(input.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const m = hoy.getMonth() - fechaNac.getMonth();
        if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        if (isNaN(edad) || edad < 18) {
            mostrarError(input, "Debes ser mayor de 18 años.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // Validar Rut Chileno (Básico: Solo números 7-8 dígitos)
    const validarRut = (input) => {
        const valor = input.value.trim();
        const regex = /^[0-9]{7,8}$/;
        if (!regex.test(valor)) {
            mostrarError(input, "Debe ser un número de 7 u 8 dígitos.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // Validar Selects (Género y Nacionalidad)
    const validarSelect = (input) => {
        if (input.value === "") {
            mostrarError(input, "Debes seleccionar una opción.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // --- EVENTOS (ETAPA 1) ---

    // Eventos Blur para validación individual
    form.nombre.addEventListener("blur", () => validarNombre(form.nombre));
    form.fecha_nacimiento.addEventListener("blur", () => validarFecha(form.fecha_nacimiento));
    form.rut.addEventListener("blur", () => validarRut(form.rut));
    form.genero.addEventListener("blur", () => validarSelect(form.genero));
    form.nacionalidad.addEventListener("blur", () => validarSelect(form.nacionalidad));

    // Eventos Input para limpiar errores mientras escribe
    form.nombre.addEventListener("input", () => { if(form.nombre.classList.contains("campo-error")) validarNombre(form.nombre); });
    form.rut.addEventListener("input", () => { if(form.rut.classList.contains("campo-error")) validarRut(form.rut); });

    // Interceptar envío (Submit)
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const isNombreValido = validarNombre(form.nombre);
        const isFechaValida = validarFecha(form.fecha_nacimiento);
        const isRutValido = validarRut(form.rut);
        const isGeneroValido = validarSelect(form.genero);
        const isNacionalidadValida = validarSelect(form.nacionalidad);

        if (isNombreValido && isFechaValida && isRutValido && isGeneroValido && isNacionalidadValida) {
            console.log("Datos personales válidos. (Pendiente Etapa 2 para el resto)");
            alert("Etapa 1 completada: Datos personales validados.");
        }
    });
});
