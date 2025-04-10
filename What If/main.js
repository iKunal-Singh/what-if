// Main JavaScript file for the music website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GDPR Cookie Consent
    initCookieConsent();
    
    // Initialize audio players
    initAudioPlayers();
    
    // Setup download buttons
    setupDownloadButtons();
    
    // Setup filter buttons
    setupFilterButtons();
    
    // Setup email subscription form
    setupEmailForm();
    
    // Add animation effects
    addAnimationEffects();
});

// Initialize GDPR Cookie Consent
function initCookieConsent() {
    window.cookieconsent.initialise({
        palette: {
            popup: {
                background: "#1e1e1e",
                text: "#e0e0e0"
            },
            button: {
                background: "#8c52ff",
                text: "#ffffff"
            }
        },
        theme: "classic",
        position: "bottom-right",
        content: {
            message: "This website uses cookies to ensure you get the best experience and to enable ad features.",
            dismiss: "Got it!",
            link: "Learn more",
            href: "#"
        }
    });
}

// Setup download buttons to trigger the download modal
function setupDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadModal = new bootstrap.Modal(document.getElementById('downloadModal'));
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Store the download link for later use
            const downloadLink = this.getAttribute('href');
            sessionStorage.setItem('pendingDownload', downloadLink);
            downloadModal.show();
        });
    });
    
    // Watch Ad button functionality
    const watchAdBtn = document.getElementById('watchAdBtn');
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', function() {
            // Simulate ad viewing (in real implementation, this would show an actual ad)
            simulateAdView();
        });
    }
    
    // Subscribe button functionality
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailForm = document.getElementById('emailForm');
    if (subscribeBtn && emailForm) {
        subscribeBtn.addEventListener('click', function() {
            // Show email subscription form
            emailForm.classList.remove('d-none');
            subscribeBtn.classList.add('d-none');
        });
    }
}

// Simulate ad view and then trigger download
function simulateAdView() {
    const adContainer = document.createElement('div');
    adContainer.className = 'ad-container p-3 text-center';
    adContainer.innerHTML = `
        <h5>Simulated Advertisement</h5>
        <p>This is where a real ad would appear.</p>
        <div class="progress mb-3">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style="width: 0%"></div>
        </div>
        <p class="countdown">Ad will close in 5 seconds...</p>
    `;
    
    // Replace modal content with ad
    const modalBody = document.querySelector('.modal-body');
    const originalContent = modalBody.innerHTML;
    modalBody.innerHTML = '';
    modalBody.appendChild(adContainer);
    
    // Simulate ad progress
    let seconds = 5;
    const progressBar = adContainer.querySelector('.progress-bar');
    const countdown = adContainer.querySelector('.countdown');
    
    const adTimer = setInterval(() => {
        seconds--;
        const progress = (5 - seconds) * 20;
        progressBar.style.width = `${progress}%`;
        countdown.textContent = `Ad will close in ${seconds} seconds...`;
        
        if (seconds <= 0) {
            clearInterval(adTimer);
            // Restore original content
            modalBody.innerHTML = originalContent;
            // Trigger download
            triggerDownload();
            // Close modal
            const downloadModal = bootstrap.Modal.getInstance(document.getElementById('downloadModal'));
            downloadModal.hide();
        }
    }, 1000);
}

// Trigger the actual download
function triggerDownload() {
    const downloadLink = sessionStorage.getItem('pendingDownload');
    if (downloadLink) {
        // In a real implementation, this would redirect to the actual file
        window.open(downloadLink, '_blank');
        sessionStorage.removeItem('pendingDownload');
    }
}

// Setup email subscription form
function setupEmailForm() {
    const submitEmailBtn = document.getElementById('submitEmailBtn');
    const emailInput = document.getElementById('emailInput');
    
    if (submitEmailBtn && emailInput) {
        submitEmailBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (isValidEmail(email)) {
                // In a real implementation, this would submit the email to a server
                console.log('Email submitted:', email);
                // Show success message
                const emailForm = document.getElementById('emailForm');
                emailForm.innerHTML = '<div class="alert alert-success">Thanks for subscribing! Your download is starting...</div>';
                // Trigger download
                setTimeout(triggerDownload, 1500);
                // Close modal after a delay
                setTimeout(() => {
                    const downloadModal = bootstrap.Modal.getInstance(document.getElementById('downloadModal'));
                    downloadModal.hide();
                }, 3000);
            } else {
                // Show error message
                emailInput.classList.add('is-invalid');
                if (!document.querySelector('.invalid-feedback')) {
                    const feedback = document.createElement('div');
                    feedback.className = 'invalid-feedback';
                    feedback.textContent = 'Please enter a valid email address';
                    emailInput.parentNode.appendChild(feedback);
                }
            }
        });
        
        // Remove error state when typing
        emailInput.addEventListener('input', function() {
            this.classList.remove('is-invalid');
        });
    }
}

// Validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Setup filter buttons for beats section
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filters .btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('btn-primary', 'active'));
            filterButtons.forEach(btn => btn.classList.add('btn-outline-primary'));
            
            // Add active class to clicked button
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary', 'active');
            
            // In a real implementation, this would filter the beats based on genre
            const genre = this.textContent.trim();
            console.log('Filtering by genre:', genre);
            
            // Simulate filtering (in a real implementation, this would show/hide elements)
            const beatCards = document.querySelectorAll('.beat-card');
            beatCards.forEach(card => {
                if (genre === 'All' || card.querySelector('.badge').textContent.includes(genre)) {
                    card.closest('.col-md-4').style.display = 'block';
                } else {
                    card.closest('.col-md-4').style.display = 'none';
                }
            });
        });
    });
}

// Add animation effects to elements
function addAnimationEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add scroll reveal animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        section.style.transform = 'translateY(20px)';
        observer.observe(section);
    });
    
    // Add fade-in class for animation
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
}
