// ============================================
// STRAWBERRY MATCHA WEBSITE - MAIN SCRIPTS
// ============================================

// Define page order for Next button navigation
const pageOrder = [
    'index.html',
    'aboutme.html',
    'social.html',
    'study.html',
    'hobby.html',
    'recommendations.html'
];

// Get current page filename
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page;
}

// Get next page in sequence
function getNextPage() {
    const currentPage = getCurrentPage();
    const currentIndex = pageOrder.indexOf(currentPage);
    
    // If we're on the last page, go back to first page
    if (currentIndex === pageOrder.length - 1) {
        return pageOrder[0];
    }
    
    // Otherwise, go to next page
    return pageOrder[currentIndex + 1];
}

// Navigate to next page
function goToNextPage() {
    const nextPage = getNextPage();
    window.location.href = nextPage;
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Scroll up function (500px)
function scrollUp() {
    window.scrollBy({ 
        top: -500, 
        behavior: 'smooth' 
    });
}

// Scroll down function (500px)
function scrollDown() {
    window.scrollBy({ 
        top: 500, 
        behavior: 'smooth' 
    });
}

// Go back to previous page
function goBack() {
    window.history.back();
}

// Navigate to specific page
function goToPage(page) {
    window.location.href = page + '.html';
}

// Remove intro overlay after animation completes
function removeIntro() {
    setTimeout(() => {
        const introOverlay = document.querySelector('.intro-overlay');
        if (introOverlay) {
            introOverlay.remove();
        }
    }, 5000); // 5 seconds (3s animation + 2s delay)
}

// Set active navigation link
function setActiveNav() {
    const currentPage = getCurrentPage();
    const navLinks = document.querySelectorAll('.top-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Remove intro overlay if it exists
    if (document.querySelector('.intro-overlay')) {
        removeIntro();
    }
    
    // Set active navigation link
    setActiveNav();
    
    // Add smooth scroll behavior to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add fade-in animation to content cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all content cards
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add sparkle effect on mouse move (optional cute effect)
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = '20px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add CSS animation for sparkle (injected into page)
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts for navigation
document.addEventListener('keydown', function(e) {
    // Home key or Ctrl+H - go to home
    if (e.key === 'Home' || (e.ctrlKey && e.key === 'h')) {
        e.preventDefault();
        window.location.href = 'index.html';
    }
    
    // Escape key - go back
    if (e.key === 'Escape') {
        goBack();
    }
    
    // Arrow Right or N - Next page
    if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        goToNextPage();
    }
    
    // Arrow Up - scroll up
    if (e.key === 'PageUp') {
        e.preventDefault();
        scrollUp();
    }
    
    // Arrow Down - scroll down
    if (e.key === 'PageDown') {
        e.preventDefault();
        scrollDown();
    }
});

// Prevent scroll arrows from appearing on mobile in landscape mode
function checkMobileOrientation() {
    const scrollArrows = document.querySelector('.scroll-arrows');
    if (scrollArrows) {
        if (window.innerWidth < 768 && window.innerHeight < 500) {
            scrollArrows.style.display = 'none';
        } else {
            scrollArrows.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', checkMobileOrientation);
window.addEventListener('orientationchange', checkMobileOrientation);

// Console message for visitors
console.log('%c✨ Welcome to Strawberry Matcha Dreams! ✨', 'font-size: 20px; color: #ff1493; font-weight: bold;');
console.log('%c🍓 Made with love and creativity 🍵', 'font-size: 14px; color: #90ee90;');