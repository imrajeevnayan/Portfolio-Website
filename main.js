// Portfolio Website JavaScript
class PortfolioApp {
    constructor() {
        this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
        this.init();
    }

    init() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initParticleBackground();
        
        // Page-specific initializations
        if (this.currentPage === 'index.html' || this.currentPage === '') {
            this.initHomePage();
        } else if (this.currentPage === 'projects.html') {
            this.initProjectsPage();
        } else if (this.currentPage === 'about.html') {
            this.initAboutPage();
        } else if (this.currentPage === 'contact.html') {
            this.initContactPage();
        }
    }

    initNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    initParticleBackground() {
        // Particle system for hero background
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(20, 184, 166, ${0.1 * (1 - distance / 100)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    initHomePage() {
        this.initSkillBars();
        this.initProjectCarousel();
        this.initHeroAnimations();
    }

    initSkillBars() {
        const skills = [
            { name: 'Java', level: 90 },
            { name: 'Spring Boot', level: 85 },
            { name: 'ReactJS', level: 80 },
            { name: 'Microservices', level: 85 },
            { name: 'PostgreSQL', level: 75 },
            { name: 'Docker', level: 80 },
            { name: 'Kafka', level: 70 },
            { name: 'JWT Security', level: 85 }
        ];

        const skillsContainer = document.getElementById('skills-container');
        if (!skillsContainer) return;

        skills.forEach((skill, index) => {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-item mb-6 animate-on-scroll';
            skillBar.innerHTML = `
                <div class="flex justify-between mb-2">
                    <span class="text-slate-300 font-medium">${skill.name}</span>
                    <span class="text-amber-400">${skill.level}%</span>
                </div>
                <div class="skill-bar bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div class="skill-fill bg-gradient-to-r from-amber-400 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out" 
                         data-width="${skill.level}%" style="width: 0%"></div>
                </div>
            `;
            skillsContainer.appendChild(skillBar);
        });

        // Animate skill bars on scroll
        setTimeout(() => {
            document.querySelectorAll('.skill-fill').forEach(fill => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width;
            });
        }, 500);
    }

    initProjectCarousel() {
        const projects = [
            {
                title: 'Real-Time Chat Application',
                tech: ['Spring Boot', 'ReactJS', 'WebSocket', 'Redis'],
                description: 'Secure real-time chat platform with JWT authentication and microservices architecture',
                image: 'https://kimi-web-img.moonshot.cn/img/www.promptcloud.com/81bc884c0a950088996453a070dc1b77e229f6fa.jpg'
            },
            {
                title: 'Stock Trading Simulation',
                tech: ['Spring Boot', 'Kafka', 'ReactJS', 'PostgreSQL'],
                description: 'Event-driven stock trading simulator with real-time data updates and analytics',
                image: 'https://kimi-web-img.moonshot.cn/img/us1.discourse-cdn.com/882e94df821e208d682ce859870b381f6ec9338b.png'
            },
            {
                title: 'E-Commerce Platform',
                tech: ['Spring Boot', 'Microservices', 'Docker', 'ReactJS'],
                description: 'Scalable e-commerce platform with microservice architecture and real-time order tracking',
                image: 'https://kimi-web-img.moonshot.cn/img/miro.medium.com/f9fdc58c4ca3492b412e65a84616b1b4f22ff7c7.jpeg'
            }
        ];

        const carousel = document.getElementById('project-carousel');
        if (!carousel) return;

        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2';
            projectCard.innerHTML = `
                <div class="relative h-48 overflow-hidden">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-3">${project.title}</h3>
                    <p class="text-slate-300 mb-4 text-sm">${project.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${project.tech.map(tech => `
                            <span class="px-2 py-1 bg-amber-400 text-slate-900 text-xs rounded-full">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            `;
            carousel.appendChild(projectCard);
        });
    }

    initHeroAnimations() {
        // Animate hero text
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle) {
            anime({
                targets: heroTitle,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 500
            });
        }

        if (heroSubtitle) {
            anime({
                targets: heroSubtitle,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 800
            });
        }
    }

    initProjectsPage() {
        this.initProjectFiltering();
        this.initProjectModal();
    }

    initProjectFiltering() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-categories').split(',');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        anime({
                            targets: card,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 500,
                            easing: 'easeOutExpo'
                        });
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    initProjectModal() {
        const projectCards = document.querySelectorAll('.project-item');
        const modal = document.getElementById('project-modal');
        const closeModal = document.querySelector('.close-modal');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const projectData = {
                    title: card.querySelector('.project-title').textContent,
                    description: card.querySelector('.project-description').textContent,
                    technologies: card.getAttribute('data-tech').split(','),
                    github: card.getAttribute('data-github'),
                    demo: card.getAttribute('data-demo')
                };

                this.showProjectModal(projectData);
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.hideProjectModal();
            });
        }
    }

    showProjectModal(projectData) {
        const modal = document.getElementById('project-modal');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalTech = modal.querySelector('.modal-tech');
        const modalGithub = modal.querySelector('.modal-github');
        const modalDemo = modal.querySelector('.modal-demo');

        modalTitle.textContent = projectData.title;
        modalDescription.textContent = projectData.description;
        modalTech.innerHTML = projectData.technologies.map(tech => 
            `<span class="px-3 py-1 bg-amber-400 text-slate-900 text-sm rounded-full">${tech}</span>`
        ).join('');

        modalGithub.href = projectData.github;
        modalDemo.href = projectData.demo;

        modal.classList.remove('hidden');
        anime({
            targets: modal.querySelector('.modal-content'),
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            easing: 'easeOutExpo'
        });
    }

    hideProjectModal() {
        const modal = document.getElementById('project-modal');
        anime({
            targets: modal.querySelector('.modal-content'),
            opacity: [1, 0],
            scale: [1, 0.8],
            duration: 300,
            easing: 'easeOutExpo',
            complete: () => {
                modal.classList.add('hidden');
            }
        });
    }

    initAboutPage() {
        this.initTimeline();
        this.initSkillMatrix();
    }

    initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const details = item.querySelector('.timeline-details');
                const isExpanded = item.classList.contains('expanded');

                // Close all other items
                timelineItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('expanded');
                        const otherDetails = otherItem.querySelector('.timeline-details');
                        if (otherDetails) {
                            otherDetails.style.maxHeight = '0';
                        }
                    }
                });

                // Toggle current item
                if (isExpanded) {
                    item.classList.remove('expanded');
                    details.style.maxHeight = '0';
                } else {
                    item.classList.add('expanded');
                    details.style.maxHeight = details.scrollHeight + 'px';
                }
            });
        });
    }

    initSkillMatrix() {
        const skillMatrix = document.getElementById('skill-matrix');
        if (!skillMatrix) return;

        const skillsData = [
            { category: 'Backend', skills: ['Java', 'Spring Boot', 'Microservices', 'JWT', 'Kafka'], level: 90 },
            { category: 'Frontend', skills: ['ReactJS', 'HTML/CSS', 'JavaScript'], level: 80 },
            { category: 'Database', skills: ['PostgreSQL', 'MySQL', 'Redis', 'Oracle'], level: 85 },
            { category: 'DevOps', skills: ['Docker', 'Git', 'Maven'], level: 75 }
        ];

        skillsData.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category mb-8';
            categoryElement.innerHTML = `
                <h3 class="text-xl font-bold text-white mb-4">${category.category}</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${category.skills.map(skill => `
                        <div class="skill-tag bg-slate-800 p-3 rounded-lg text-center hover:bg-slate-700 transition-colors cursor-pointer">
                            <span class="text-slate-300">${skill}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            skillMatrix.appendChild(categoryElement);
        });
    }

    initContactPage() {
        this.initContactForm();
        this.initFormValidation();
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission
            this.showFormSuccess();
        });
    }

    initFormValidation() {
        const inputs = document.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (isValid) {
            field.classList.remove('error');
            if (errorElement) errorElement.remove();
        } else {
            field.classList.add('error');
            if (!errorElement) {
                const error = document.createElement('div');
                error.className = 'error-message text-red-400 text-sm mt-1';
                error.textContent = errorMessage;
                field.parentNode.appendChild(error);
            }
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        successMessage.textContent = 'Message sent successfully!';
        
        document.body.appendChild(successMessage);
        
        anime({
            targets: successMessage,
            opacity: [0, 1],
            translateX: [100, 0],
            duration: 300,
            easing: 'easeOutExpo'
        });

        setTimeout(() => {
            anime({
                targets: successMessage,
                opacity: [1, 0],
                translateX: [0, 100],
                duration: 300,
                easing: 'easeOutExpo',
                complete: () => {
                    successMessage.remove();
                }
            });
        }, 3000);
    }
}

// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
        this.darkIcon = document.getElementById('theme-toggle-dark-icon');
        this.lightIcon = document.getElementById('theme-toggle-light-icon');
        this.darkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
        this.lightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

        this.init();
    }

    init() {
        this.loadDarkModePreference();
        this.bindEvents();
    }

    bindEvents() {
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleDarkMode());
        }
        if (this.themeToggleMobileBtn) {
            this.themeToggleMobileBtn.addEventListener('click', () => this.toggleDarkMode());
        }
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        this.updateThemeIcons(isDarkMode);
    }

    loadDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        this.updateThemeIcons(isDarkMode);
    }

    updateThemeIcons(isDarkMode) {
        const iconsToShow = isDarkMode ? [this.darkIcon, this.darkIconMobile] : [this.lightIcon, this.lightIconMobile];
        const iconsToHide = isDarkMode ? [this.lightIcon, this.lightIconMobile] : [this.darkIcon, this.darkIconMobile];

        iconsToShow.forEach(icon => {
            if (icon) {
                icon.classList.remove('hidden');
                anime({
                    targets: icon,
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    duration: 300,
                    easing: 'easeOutExpo'
                });
            }
        });

        iconsToHide.forEach(icon => {
            if (icon) {
                anime({
                    targets: icon,
                    opacity: [1, 0],
                    scale: [1, 0.5],
                    duration: 300,
                    easing: 'easeOutExpo',
                    complete: () => {
                        icon.classList.add('hidden');
                    }
                });
            }
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    new DarkModeToggle();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize particle background on resize
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});