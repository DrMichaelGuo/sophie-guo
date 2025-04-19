document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                // Clone navigation links
                const clonedLinks = navLinks.cloneNode(true);
                mobileNav.appendChild(clonedLinks);
                
                // Append to body
                document.body.appendChild(mobileNav);
            }
            
            // Toggle mobile navigation
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.classList.toggle('active');
            
            // Prevent body scrolling when mobile nav is open
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile navigation if open
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
                hamburger.classList.remove('active');
            }
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section');
    
    function revealOnScroll() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            }
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Call reveal function on page load
    revealOnScroll();
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        let current = '';
        
        revealElements.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Add CSS for mobile navigation that was created via JS
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.98);
            z-index: 9;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
        }
        
        .mobile-nav.active {
            opacity: 1;
            pointer-events: all;
        }
        
        .mobile-nav .nav-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        
        .mobile-nav .nav-links a {
            font-size: 24px;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(10px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-10px) rotate(-45deg);
        }
        
        .no-scroll {
            overflow: hidden;
        }
        
        .section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .section.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-links a.active:after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
