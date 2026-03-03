// ===================================
// MOBILE MENU TOGGLE
// ===================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SMOOTH SCROLLING
// ===================================

// Smooth scroll simple pour les liens d'ancre
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Si c'est juste "#", ne rien faire
        if (href === '#') return;

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// SKILL BARS ANIMATION
// ===================================
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

// Trigger animation when skills section is in view
const skillsSection = document.querySelector('.skills');
let animated = false;

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
            animateSkillBars();
            animated = true;
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);

    // Fallback: si la section est déjà visible au chargement
    const rect = skillsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !animated) {
        // Petit délai pour s'assurer que le DOM est prêt
        setTimeout(() => {
            animateSkillBars();
            animated = true;
        }, 500);
    }
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            correspondingLink?.classList.add('active');
        }
    });
});

// ===================================
// TYPING EFFECT FOR HERO ROLES
// ===================================
const initTypingEffect = () => {
    const typedElement = document.querySelector('.typed-roles');
    if (!typedElement) return;

    const roles = [
        'Product Designer',
        'Designer UX/UI',
        'Front-End Developer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Deleting characters
            typedElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typedElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // If word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typingSpeed);
    };

    // Start typing effect
    setTimeout(type, 1000);
};

// Initialize typing effect
initTypingEffect();

// ===================================
// REVEAL ANIMATIONS ON SCROLL
// ===================================
const revealElements = () => {
    const reveals = document.querySelectorAll('.education-card, .experience-item, .project-card, .skill-item, .section-title');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });
};

// Initialize reveal animations
revealElements();

// ===================================
// PROJECT CARD INTERACTIONS
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('visible')) return;
    });

    card.addEventListener('mousemove', function(e) {
        if (!this.classList.contains('visible')) return;
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ===================================
// PRELOADER (OPTIONAL)
// ===================================
const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
};

// Hide preloader when page is fully loaded
window.addEventListener('load', () => {
    hidePreloader();
});

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================
const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

const activateEasterEgg = () => {
    document.body.style.animation = 'rainbow 2s linear infinite';
    alert('🎮 Konami Code activated! You found the easter egg!');
};

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');
console.log('💡 Tip: Try the Konami Code for a surprise!');

// ===================================
// CONTACT FORM HANDLER (FORMSPREE)
// ===================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const status = document.getElementById('status');

if (contactForm) {
    async function handleSubmit(event) {
        event.preventDefault();

        // État de chargement
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const data = new FormData(event.target);

        try {
            const response = await fetch(event.target.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Succès
                status.innerHTML = '<div class="status-success"><i class="fas fa-check-circle"></i> Message envoyé avec succès ! Je vous répondrai bientôt.</div>';
                contactForm.reset();

                submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

                setTimeout(() => {
                    status.innerHTML = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }, 5000);
            } else {
                // Erreur
                const errorData = await response.json();
                if (Object.hasOwn(errorData, 'errors')) {
                    status.innerHTML = '<div class="status-error"><i class="fas fa-exclamation-circle"></i> ' + errorData['errors'].map(error => error['message']).join(', ') + '</div>';
                } else {
                    status.innerHTML = '<div class="status-error"><i class="fas fa-exclamation-circle"></i> Une erreur est survenue. Veuillez réessayer.</div>';
                }

                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        } catch (error) {
            // Erreur de réseau
            status.innerHTML = '<div class="status-error"><i class="fas fa-exclamation-circle"></i> Une erreur de réseau est survenue. Veuillez vérifier votre connexion.</div>';

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    }

    contactForm.addEventListener('submit', handleSubmit);
}

// ===================================
// HERO VIDEO SPEED CONTROL
// ===================================
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    // Vitesse de la vidéo à 0.5x
    heroVideo.playbackRate = 0.5;

    // S'assurer que la vidéo joue correctement
    heroVideo.play().catch(error => {
        console.log('Video autoplay was prevented:', error);
    });
}
