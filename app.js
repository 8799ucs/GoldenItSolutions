// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
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

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 't8sSPSXnMmOevu8Va',
    SERVICE_ID: 'service_43tokkk',
    TEMPLATE_ID: 'template_wlru2fu'
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('EmailJS initialized successfully');
    } else {
        console.error('EmailJS library not loaded');
    }
})();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const statusMessage = document.getElementById('statusMessage');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Reset status message
    statusMessage.className = 'status-message';
    statusMessage.textContent = '';
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            statusMessage.className = 'status-message success';
            statusMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, function(error) {
            console.error('FAILED...', error);
            statusMessage.className = 'status-message error';
            statusMessage.textContent = '✗ Something went wrong. Please email us at info@goldenitsolutions.com';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});

// Learn More button functionality
const learnMoreButtons = document.querySelectorAll('.btn-learn-more');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Slideshow Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slideshow-dots');
let slideInterval;

// Create navigation dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function goToSlide(n) {
    clearInterval(slideInterval);
    showSlide(n);
    startSlideshow();
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Arrow controls
const leftArrow = document.querySelector('.slide-arrow-left');
const rightArrow = document.querySelector('.slide-arrow-right');

if (leftArrow) {
    leftArrow.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        startSlideshow();
    });
}

if (rightArrow) {
    rightArrow.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        startSlideshow();
    });
}

// Pause on hover
const heroSlideshow = document.querySelector('.hero-slideshow');
if (heroSlideshow) {
    heroSlideshow.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    heroSlideshow.addEventListener('mouseleave', () => {
        startSlideshow();
    });
}

// Start the slideshow
startSlideshow();

// Enhanced Scroll Animations with Intersection Observer
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger delay for service cards
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, scrollObserverOptions);

// Observe elements for scroll animations
const fadeInElements = document.querySelectorAll('.fade-in-up');
fadeInElements.forEach((element, index) => {
    scrollObserver.observe(element);
});

const slideLeftElements = document.querySelectorAll('.slide-in-left');
slideLeftElements.forEach(element => {
    scrollObserver.observe(element);
});

const slideRightElements = document.querySelectorAll('.slide-in-right');
slideRightElements.forEach(element => {
    scrollObserver.observe(element);
});

const scaleUpElements = document.querySelectorAll('.scale-up');
scaleUpElements.forEach(element => {
    scrollObserver.observe(element);
});

// Animate existing elements
const animateElements = document.querySelectorAll('.story-item, .stat-card, .benefit-card, .client-item, .industry-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, scrollObserverOptions);
    
    animObserver.observe(element);
});

// Stat Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

// Observe stat numbers for counter animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(number)) {
                entry.target.textContent = '0';
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});