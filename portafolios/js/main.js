// ===================================
// Navegación Móvil
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menú móvil
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===================================
    // Navegación activa al hacer scroll
    // ===================================
    const sections = document.querySelectorAll('section[id]');

    function activateNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', activateNavOnScroll);

    // ===================================
    // Scroll suave
    // ===================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Botón Scroll to Top
    // ===================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===================================
    // Animación de barras de habilidades
    // ===================================
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    function animateSkills() {
        const skillsSection = document.getElementById('habilidades');
        const skillsSectionTop = skillsSection.offsetTop;
        const skillsSectionHeight = skillsSection.offsetHeight;
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        if (scrollY + windowHeight > skillsSectionTop + 100 && !skillsAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsAnimated = true;
        }
    }

    window.addEventListener('scroll', animateSkills);

    // ===================================
    // Formulario de Contacto
    // ===================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Crear enlace mailto
            const mailtoLink = `mailto:luiscoladojimenez@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;

            // Abrir cliente de correo
            window.location.href = mailtoLink;

            // Mostrar mensaje de confirmación
            alert('¡Gracias por tu mensaje! Se abrirá tu cliente de correo electrónico.');

            // Limpiar formulario
            contactForm.reset();
        });
    }

    // ===================================
    // Animaciones al hacer scroll (Intersection Observer)
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .cert-card, .competency-item, .info-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // Efecto de escritura en el título hero
    // ===================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Iniciar efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // Contador de años de experiencia
    // ===================================
    function calculateExperience() {
        const startYear = 2009;
        const currentYear = new Date().getFullYear();
        const yearsOfExperience = currentYear - startYear;
        return yearsOfExperience;
    }

    // Agregar información de experiencia si es necesario
    const experienceYears = calculateExperience();
    console.log(`Años de experiencia: ${experienceYears}`);

    // ===================================
    // Efecto parallax suave en hero
    // ===================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // ===================================
    // Navbar background al hacer scroll
    // ===================================
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });

    // ===================================
    // Validación de formulario mejorada
    // ===================================
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'white';
        });
    });

    // ===================================
    // Animación de números (contador)
    // ===================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    // ===================================
    // Detección de modo oscuro del sistema
    // ===================================
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Modo oscuro detectado');
        // Aquí podrías agregar estilos específicos para modo oscuro si lo deseas
    }

    // ===================================
    // Console log de bienvenida
    // ===================================
    console.log('%c¡Bienvenido al portafolio de Luis Colado Jiménez!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%cTécnico Electrónico, Informático y Electricista', 'color: #0ea5e9; font-size: 14px;');
    console.log('%cContacto: luiscoladojimenez@hotmail.com', 'color: #10b981; font-size: 12px;');

});

// ===================================
// Función para copiar email al portapapeles
// ===================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('¡Email copiado al portapapeles!');
    }, function(err) {
        console.error('Error al copiar: ', err);
    });
}

// ===================================
// Prevenir comportamiento por defecto en enlaces externos
// ===================================
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('target') === '_blank') {
        // Los enlaces externos se abrirán en nueva pestaña automáticamente
    }
});
