document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show an alert
            console.log({ name, email, subject, message });
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Initialize radar chart for skills
    const radarChartCanvas = document.getElementById('radarChart');
    
    if (radarChartCanvas) {
        const radarChart = new Chart(radarChartCanvas, {
            type: 'radar',
            data: {
                labels: ['Problem Solving', 'Teamwork', 'Creativity', 'Communication', 'Time Management', 'Adaptability'],
                datasets: [{
                    label: 'Professional Skills',
                    data: [85, 90, 80, 75, 85, 90],
                    backgroundColor: 'rgba(108, 99, 255, 0.2)',
                    borderColor: 'rgba(108, 99, 255, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20,
                            backdropColor: 'transparent'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        pointLabels: {
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                elements: {
                    line: {
                        tension: 0.1
                    }
                }
            }
        });
    }

    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.skill-item, .project-item, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.skill-item, .project-item, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Theme Switcher Functionality
const themeSwitcher = document.getElementById('themeSwitcher');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the saved theme
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
} else if (currentTheme === 'night') {
    body.classList.add('night-theme');
    themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme switching logic
themeSwitcher.addEventListener('click', () => {
    if (body.classList.contains('night-theme')) {
        // Switch to light theme
        body.classList.remove('night-theme');
        localStorage.setItem('theme', 'light');
        themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (body.classList.contains('dark-theme')) {
        // Switch to night theme
        body.classList.remove('dark-theme');
        body.classList.add('night-theme');
        localStorage.setItem('theme', 'night');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // Switch to dark theme
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-theme', 'night-theme');
            themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
});









function addGlitterParticles(container) {
    const glitterCount = 20;
    const containerEl = document.querySelector(container);
    
    for (let i = 0; i < glitterCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'glitter-particle';
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        particle.style.animation = `glitterParticle ${duration}s infinite`;
        
        // Random delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        containerEl.appendChild(particle);
    }
}

// Call this function on your containers
document.addEventListener('DOMContentLoaded', () => {
    addGlitterParticles('.hero-image');
    addGlitterParticles('.hexagon-container');
});