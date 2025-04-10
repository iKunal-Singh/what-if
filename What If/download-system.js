// Download System Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Setup download buttons
    setupDownloadSystem();
});

// Setup download system
function setupDownloadSystem() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    const downloadModal = new bootstrap.Modal(document.getElementById('downloadModal'));
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Store the download link and content type for later use
            const downloadLink = this.getAttribute('href');
            let contentType = 'beat';
            
            if (this.hasAttribute('data-beat-id')) {
                contentType = 'beat';
            } else if (this.hasAttribute('data-remix-id')) {
                contentType = 'remix';
            } else if (this.hasAttribute('data-art-id')) {
                contentType = 'cover';
            }
            
            // Store download info in session storage
            sessionStorage.setItem('pendingDownload', downloadLink);
            sessionStorage.setItem('contentType', contentType);
            
            // Update modal title based on content type
            const modalTitle = document.getElementById('downloadModalLabel');
            if (modalTitle) {
                if (contentType === 'beat') {
                    modalTitle.textContent = 'Download Beat';
                } else if (contentType === 'remix') {
                    modalTitle.textContent = 'Download Remix';
                } else if (contentType === 'cover') {
                    modalTitle.textContent = 'Download Cover Art';
                }
            }
            
            // Show the download modal
            downloadModal.show();
        });
    });
    
    // Watch Ad button functionality
    const watchAdBtn = document.getElementById('watchAdBtn');
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', function() {
            // Simulate ad viewing
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
    
    // Email form submission
    const submitEmailBtn = document.getElementById('submitEmailBtn');
    const emailInput = document.getElementById('emailInput');
    if (submitEmailBtn && emailInput) {
        submitEmailBtn.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (isValidEmail(email)) {
                // In a real implementation, this would submit the email to a server
                console.log('Email submitted:', email);
                
                // Show success message
                emailForm.innerHTML = '<div class="alert alert-success">Thanks for subscribing! Your download is starting...</div>';
                
                // Trigger download
                setTimeout(triggerDownload, 1500);
                
                // Close modal after a delay
                setTimeout(() => {
                    const downloadModal = bootstrap.Modal.getInstance(document.getElementById('downloadModal'));
                    downloadModal.hide();
                }, 3000);
                
                // Track download via email signup
                trackDownload('email');
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
            
            // Track download via ad view
            trackDownload('ad');
        }
    }, 1000);
}

// Trigger the actual download
function triggerDownload() {
    const downloadLink = sessionStorage.getItem('pendingDownload');
    const contentType = sessionStorage.getItem('contentType');
    
    if (downloadLink) {
        // In a real implementation, this would redirect to the actual file
        window.open(downloadLink, '_blank');
        
        // Clear session storage
        sessionStorage.removeItem('pendingDownload');
        sessionStorage.removeItem('contentType');
        
        // Generate DMCA disclaimer for remixes
        if (contentType === 'remix') {
            showDMCADisclaimer();
        }
    }
}

// Show DMCA disclaimer for remixes
function showDMCADisclaimer() {
    // Create a toast notification
    const toastContainer = document.createElement('div');
    toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '11';
    
    toastContainer.innerHTML = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-warning text-dark">
                <strong class="me-auto">DMCA Disclaimer</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                <p>This remix is for non-commercial use only under Fair Use. You may not monetize content using this remix.</p>
                <p>By downloading, you agree to these terms.</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(toastContainer);
    
    // Show the toast
    const toastElement = toastContainer.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement, { autohide: false });
    toast.show();
}

// Track downloads for analytics
function trackDownload(method) {
    const contentType = sessionStorage.getItem('contentType');
    
    // In a real implementation, this would send data to an analytics service
    console.log(`Download tracked: ${contentType} via ${method}`);
    
    // Increment download counter in local storage for A/B testing
    const downloadCountKey = `downloads_${method}`;
    const currentCount = parseInt(localStorage.getItem(downloadCountKey) || '0');
    localStorage.setItem(downloadCountKey, (currentCount + 1).toString());
    
    // Update A/B test results if we have enough data
    updateABTestResults();
}

// Update A/B test results
function updateABTestResults() {
    const adDownloads = parseInt(localStorage.getItem('downloads_ad') || '0');
    const emailDownloads = parseInt(localStorage.getItem('downloads_email') || '0');
    
    // Only update if we have enough data
    if (adDownloads + emailDownloads >= 10) {
        const adPercentage = (adDownloads / (adDownloads + emailDownloads) * 100).toFixed(1);
        const emailPercentage = (emailDownloads / (adDownloads + emailDownloads) * 100).toFixed(1);
        
        // Log results
        console.log(`A/B Test Results: Ad: ${adPercentage}%, Email: ${emailPercentage}%`);
        
        // In a real implementation, this would adjust the UI based on the winning option
        if (adDownloads > emailDownloads) {
            console.log('Ad option is performing better');
        } else if (emailDownloads > adDownloads) {
            console.log('Email option is performing better');
        }
    }
}

// Validate email format
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}
