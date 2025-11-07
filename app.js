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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.service-item, .story-item, .stat-card, .benefit-card, .client-item, .industry-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});