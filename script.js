// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add click event listeners for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('#navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('#navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow when scrolled
        if (scrollTop > 10) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Form submission handling
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // TODO: Replace with actual Google Form submission URL
            // For now, show success message
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                button.textContent = 'Subscribed!';
                button.style.background = '#28a745';
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }, 1000);
        });
    }
    
    // Intersection Observer for scroll animations
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
    
    // Apply scroll animations to cards and sections
    const animatedElements = document.querySelectorAll('.about-card, .step, .impact-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // CTA button click tracking
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add subtle click animation
            this.style.transform = 'translateY(-2px) scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Skip to main content with 'Enter' key when focused on skip link
        if (e.key === 'Enter' && e.target.classList.contains('skip-link')) {
            e.preventDefault();
            document.querySelector('main').focus();
        }
    });
    
    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.style.display = 'none';
        mobileMenuBtn.style.background = 'none';
        mobileMenuBtn.style.border = 'none';
        mobileMenuBtn.style.fontSize = '1.5rem';
        mobileMenuBtn.style.color = 'var(--primary-navy)';
        mobileMenuBtn.style.cursor = 'pointer';
        
        nav.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });
        
        // Show/hide mobile menu button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                navMenu.style.display = navMenu.classList.contains('mobile-open') ? 'flex' : 'none';
            } else {
                mobileMenuBtn.style.display = 'none';
                navMenu.style.display = 'flex';
                navMenu.classList.remove('mobile-open');
            }
        };
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    };
    
    // Initialize mobile menu
    createMobileMenu();
});