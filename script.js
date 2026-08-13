// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon('dark');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    });
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Testimonials Carousel
let currentTestimonial = 0;
const testimonialItems = document.querySelectorAll('.testimonial-item');
const totalTestimonials = testimonialItems.length;

function showTestimonial(index) {
    if (totalTestimonials === 0) return;

    testimonialItems.forEach(item => item.classList.remove('active'));
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));

    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    testimonialItems[currentTestimonial].classList.add('active');
    if (dots[currentTestimonial]) {
        dots[currentTestimonial].classList.add('active');
    }
}

function nextTestimonial() {
    showTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
    showTestimonial(currentTestimonial - 1);
}

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Dot navigation for testimonials
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    }
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        if (lightbox) {
            const title = item.querySelector('h3')?.textContent || 'Gallery Item';
            const description = item.querySelector('p')?.textContent || '';
            lightboxContent.innerHTML = `
                <h2>${title}</h2>
                <p>${description}</p>
                <p style="margin-top: 20px; color: #666;">Click close or outside to dismiss</p>
            `;
            lightbox.classList.add('active');
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

// Smooth scroll to section
function scrollToSection() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showMessage('Thank you for your message! We will get back to you soon.', 'success');
    
    // Clear form
    form.reset();
    
    // Clear message after 5 seconds
    setTimeout(() => {
        const messageDiv = document.getElementById('form-message');
        if (messageDiv) {
            messageDiv.style.display = 'none';
        }
    }, 5000);
}

// Display form message
function showMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
}

// Update active navigation link
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNav();
    addScrollEffects();
    setupInteractiveElements();
    initializeTheme();
    showTestimonial(0);
});

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Add scroll effects to elements
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all feature cards, service items, and blog posts
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .service-item, .blog-post, .faq-item'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // Add ripple effect to service items
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary-color)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '#ddd';
        });
    });
}

// Initialize theme on page load
function initializeTheme() {
    updateThemeIcon(localStorage.getItem('theme') || 'light');
}

// Add smooth scroll behavior for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'H' to go home
    if ((e.key === 'h' || e.key === 'H') && e.ctrlKey) {
        e.preventDefault();
        window.location.href = 'index.html';
    }
    
    // Press 'Escape' to close lightbox
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    }
});

// Page analytics logging
console.log('Website loaded successfully at:', new Date().toLocaleString());
console.log('Theme:', localStorage.getItem('theme') || 'light');

