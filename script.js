document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-btn");
    const typedMessage = document.getElementById("typed-message");
    const introScreen = document.getElementById("intro-screen");
    const messageScreen = document.getElementById("message-screen");

    // Mensajes para una hermana, alegres y no románticos
    const messages = [
        "Para la mejor hermana del mundo...",
        "Porque siempre estás ahí para apoyarme...",
        "¡Estas flores amarillas son para ti! 🌻💛"
    ];

    // Efecto de máquina de escribir
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typedMessage.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedMessage.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            typingSpeed = 2500; // Pausa al final de la oración
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // No hacer bucle infinito, detenerse en el último mensaje
            if (messageIndex < messages.length - 1) {
                messageIndex++;
                typingSpeed = 500; // Pausa antes de la nueva palabra
            } else {
                return; // Fin del mensaje
            }
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Interacción al hacer clic en el botón
    openBtn.addEventListener("click", () => {
        // Ocultar botón
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000);

        // Activar animaciones de CSS removiendo la clase 'container' (del codepen original)
        document.body.classList.remove("container");
        
        // Mostrar el banner de mensaje después de que las flores crezcan
        setTimeout(() => {
            messageScreen.classList.remove("hidden");
            messageScreen.classList.add("visible");
            // Iniciar texto
            setTimeout(() => {
                typeWriter();
            }, 500);
        }, 4000); // 4 segundos para dar tiempo a la animación larga original
    });
});
