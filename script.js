/* ===================================
   LIVE CLOCK
   Updates every second to show current time in Asia/Kolkata timezone
   =================================== */
function updateClock() {
    const now = new Date();
    const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    const timeString = now.toLocaleTimeString('en-US', options);
    document.getElementById('liveClock').textContent = timeString;
}

// Initialize clock and update every second
updateClock();
setInterval(updateClock, 1000);


/* ===================================
   COUNTDOWN TIMER
   Counts down to event date: 22 January 2026, 11:00 AM IST
   =================================== */
function updateCountdown() {
    // Set event date in IST timezone
    const eventDate = new Date('2026-01-22T11:00:00+05:30').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Check if event has started
    if (distance < 0) {
        document.getElementById('countdownTimer').innerHTML = 
            '<div class="time-unit"><span class="time-value" style="font-size: 2rem;">Event Started! 🎉</span></div>';
        return;
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements with padded values
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown and update every second
updateCountdown();
setInterval(updateCountdown, 1000);


/* ===================================
   DARK MODE TOGGLE
   Toggles between light and dark themes
   Saves user preference to localStorage
   =================================== */
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️ Light';
}

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️ Light';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeToggle.textContent = '🌙 Dark';
        localStorage.setItem('darkMode', 'disabled');
    }
});


/* ===================================
   REGISTRATION MODAL
   Handles modal popup for event registration form
   =================================== */
const modal = document.getElementById('registrationModal');
const registerBtn = document.getElementById('registerBtn');
const cancelBtn = document.getElementById('cancelBtn');
const registrationForm = document.getElementById('registrationForm');
const formContainer = document.getElementById('formContainer');
const successContainer = document.getElementById('successContainer');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

// Open modal when register button is clicked
registerBtn.addEventListener('click', () => {
    modal.classList.add('active');
    formContainer.style.display = 'block';
    successContainer.style.display = 'none';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal when cancel button is clicked
cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    registrationForm.reset();
    document.body.style.overflow = 'auto';
});

// Close modal and reset form when success close button is clicked
closeSuccessBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    registrationForm.reset();
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        registrationForm.reset();
        document.body.style.overflow = 'auto';
    }
});

// Handle form submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const organization = document.getElementById('organization').value;
    
    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Log registration data (in real app, send to backend)
    console.log('Registration Data:', {
        name: name,
        email: email,
        organization: organization,
        timestamp: new Date().toISOString()
    });
    
    // Show success message
    formContainer.style.display = 'none';
    successContainer.style.display = 'block';
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        registrationForm.reset();
        document.body.style.overflow = 'auto';
    }
});


/* ===================================
   SMOOTH SCROLL FOR NAVIGATION
   Enables smooth scrolling to sections when clicking nav links
   =================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Calculate offset for sticky navbar
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});


/* ===================================
   SCROLL ANIMATIONS (BONUS)
   Adds fade-in animation to elements when they come into view
   =================================== */
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

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});


/* ===================================
   NAVBAR SCROLL EFFECT (BONUS)
   Adds shadow to navbar when scrolling
   =================================== */
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px var(--shadow-light)';
    } else {
        navbar.style.boxShadow = '0 2px 8px var(--shadow-light)';
    }
});


/* ===================================
   FORM VALIDATION HELPERS
   Additional validation for better UX
   =================================== */
// Real-time email validation
document.getElementById('email')?.addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailPattern.test(this.value)) {
        this.style.borderColor = 'var(--primary-red)';
    } else {
        this.style.borderColor = 'var(--border-light)';
    }
});

// Remove error styling on focus
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-blue)';
    });
});


/* ===================================
   CONSOLE WELCOME MESSAGE
   Fun message for developers
   =================================== */
console.log('%c🎉 Welcome to GDG DevFest 2026! 🎉', 
    'color: #4285f4; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ for the GDG Community', 
    'color: #34a853; font-size: 14px;');
console.log('%cEvent Date: 22 January 2026 | SAGE University Indore', 
    'color: #5f6368; font-size: 12px;');