    // --- VALIDACIONES CONTACTO Y ACCESO (ETAPA 2) ---

    const validarEmail = (input) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(input.value)) {
            mostrarError(input, "Ingresa un correo electrónico válido.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const confirmarEmail = (input, original) => {
        if (input.value !== original.value || input.value === "") {
            mostrarError(input, "Los correos no coinciden.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const validarPassword = (input) => {
        const valor = input.value;
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(valor)) {
            mostrarError(input, "Mín. 8 caracteres, 1 mayúscula, 1 número y 1 especial (!@#$%^&*).");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const confirmarPassword = (input, original) => {
        if (input.value !== original.value || input.value === "") {
            mostrarError(input, "Las contraseñas no coinciden.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const validarTelefono = (input) => {
        const regex = /^[0-9+\-\s]{8,}$/;
        if (!regex.test(input.value)) {
            mostrarError(input, "Mínimo 8 dígitos (solo números, +, -, espacios).");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // --- VALIDACIONES DIRECCIÓN (ETAPA 2) ---

    const validarCiudad = (input) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
        if (!regex.test(input.value)) {
            mostrarError(input, "Mínimo 2 caracteres (solo letras).");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const validarCalle = (input) => {
        if (input.value.trim().length < 5) {
            mostrarError(input, "Mínimo 5 caracteres.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    const validarCP = (input) => {
        const regex = /^[a-zA-Z0-9]{4,10}$/;
        if (!regex.test(input.value)) {
            mostrarError(input, "Alfanumérico, entre 4 y 10 caracteres.");
            return false;
        }
        mostrarOk(input);
        return true;
    };

    // --- FUNCIONALIDADES ADICIONALES ---

    // Contador de caracteres para textarea
    const textarea = document.getElementById("referencias");
    const labelReferencias = textarea.previousElementSibling;
    const contador = document.createElement("span");
    contador.style.fontSize = "0.8rem";
    contador.style.float = "right";
    contador.textContent = "0 / 200";
    labelReferencias.appendChild(contador);

    textarea.addEventListener("input", () => {
        const longitud = textarea.value.length;
        contador.textContent = `${longitud} / 200`;
        if (longitud > 200) {
            textarea.classList.add("campo-error");
        } else {
            textarea.classList.remove("campo-error");
        }
    });

    // --- EVENTOS (ETAPA 2) ---

    // Contacto
    form.email.addEventListener("blur", () => validarEmail(form.email));
    form["email-confirm"].addEventListener("blur", () => confirmarEmail(form["email-confirm"], form.email));
    form.password.addEventListener("blur", () => validarPassword(form.password));
    form["password-confirm"].addEventListener("blur", () => confirmarPassword(form["password-confirm"], form.password));
    form.telefono.addEventListener("blur", () => validarTelefono(form.telefono));

    // Dirección
    form["pais-entrega"].addEventListener("blur", () => validarSelect(form["pais-entrega"]));
    form.provincia.addEventListener("blur", () => validarSelect(form.provincia)); // Se asume no vacío
    form.ciudad.addEventListener("blur", () => validarCiudad(form.ciudad));
    form.calle.addEventListener("blur", () => validarCalle(form.calle));
    form["codigo-postal"].addEventListener("blur", () => validarCP(form["codigo-postal"]));

    // Interceptar envío (Submit) actualizado
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Ejecutar todas las validaciones
        const validations = [
            validarNombre(form.nombre),
            validarFecha(form.fecha_nacimiento),
            validarRut(form.rut),
            validarSelect(form.genero),
            validarSelect(form.nacionalidad),
            validarEmail(form.email),
            confirmarEmail(form["email-confirm"], form.email),
            validarPassword(form.password),
            confirmarPassword(form["password-confirm"], form.password),
            validarTelefono(form.telefono),
            validarSelect(form["pais-entrega"]),
            validarCalle(form.provincia), // Solo que no esté vacío
            validarCiudad(form.ciudad),
            validarCalle(form.calle),
            validarCP(form["codigo-postal"])
        ];

        if (validations.every(v => v === true)) {
            const nombreUsuario = form.nombre.value;
            mostrarMensajeExito(nombreUsuario);
        } else {
            // Hacer scroll al primer error
            const primerError = document.querySelector(".campo-error");
            if (primerError) primerError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });

    function mostrarMensajeExito(nombre) {
        const main = document.querySelector("main");
        main.innerHTML = `
            <div style="text-align: center; background: white; padding: 3rem; border-radius: 1.5rem; box-shadow: var(--shadow); border: 1px solid var(--border);">
                <h1 style="color: var(--primary);">¡Registro Exitoso!</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Bienvenido/a, <strong>${nombre}</strong>. Tu cuenta en GlobalImport S.A. ha sido creada correctamente.</p>
                <a href="index.html" style="display: inline-block; background: var(--primary); color: white; padding: 1rem 2rem; border-radius: 999px; font-weight: 700; text-decoration: none;">Volver al Inicio</a>
            </div>
        `;
        window.scrollTo(0, 0);
    }
});
