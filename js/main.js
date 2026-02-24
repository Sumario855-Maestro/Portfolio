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

// Smooth scroll pour les liens
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - 70;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);

                const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * easeInOutCubic);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
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
    threshold: 0.3
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
