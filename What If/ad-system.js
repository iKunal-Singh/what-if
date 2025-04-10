// Ad Monetization System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ad system
    initializeAdSystem();
    
    // Setup header/footer banner ads
    setupBannerAds();
    
    // Setup in-content ads
    setupInContentAds();
    
    // Setup exit intent popup ads
    setupExitIntentAds();
    
    // Setup ad performance tracking
    setupAdTracking();
});

// Initialize ad system with configuration
function initializeAdSystem() {
    // Create a global ad configuration object
    window.adConfig = {
        enabled: true,
        adsensePublisherId: 'ca-pub-1234567890123456', // Replace with actual publisher ID
        adsenseChannelId: '7654321', // Replace with actual channel ID
        adThreshold: 3, // Show an ad after every 3 downloads
        downloadCount: 0,
        exitIntentShown: false,
        lastAdTime: 0,
        adCooldown: 60000, // 1 minute cooldown between ads
        mobileAds: true,
        desktopAds: true,
        regionSettings: {
            eu: {
                requireConsent: true,
                adTypes: ['banner', 'in-content']
            },
            nonEu: {
                requireConsent: false,
                adTypes: ['banner', 'in-content', 'popup']
            }
        }
    };
    
    // Detect user region (simplified version)
    detectUserRegion();
    
    // Check if ads should be enabled based on user preferences
    checkAdPreferences();
    
    // Load Google AdSense script if ads are enabled
    if (window.adConfig.enabled) {
        loadAdSenseScript();
    }
}

// Detect user region (simplified version)
function detectUserRegion() {
    // In a real implementation, this would use a geolocation service
    // For this demo, we'll randomly assign EU or non-EU
    const isEU = Math.random() > 0.5;
    window.adConfig.region = isEU ? 'eu' : 'nonEu';
    
    console.log(`User region detected: ${window.adConfig.region}`);
}

// Check if ads should be enabled based on user preferences
function checkAdPreferences() {
    // Check if user has opted out of ads
    const adPreference = localStorage.getItem('adPreference');
    
    if (adPreference === 'opted-out') {
        window.adConfig.enabled = false;
        console.log('User has opted out of ads');
    }
    
    // Check if user is in EU and has given consent
    if (window.adConfig.region === 'eu') {
        const hasConsent = localStorage.getItem('cookieConsent') === 'accepted';
        
        if (!hasConsent) {
            // Limit ad types for EU users without consent
            window.adConfig.enabled = false;
            console.log('EU user without consent - limiting ad functionality');
        }
    }
    
    // Check device type
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && !window.adConfig.mobileAds) {
        window.adConfig.enabled = false;
        console.log('Ads disabled on mobile devices');
    }
    
    if (!isMobile && !window.adConfig.desktopAds) {
        window.adConfig.enabled = false;
        console.log('Ads disabled on desktop devices');
    }
}

// Load Google AdSense script
function loadAdSenseScript() {
    if (document.getElementById('adsense-script')) {
        return; // Script already loaded
    }
    
    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${window.adConfig.adsensePublisherId}`;
    script.crossOrigin = 'anonymous';
    
    document.head.appendChild(script);
    
    console.log('AdSense script loaded');
}

// Setup header/footer banner ads
function setupBannerAds() {
    if (!window.adConfig.enabled) return;
    
    // Create header ad container
    const headerAdContainer = document.createElement('div');
    headerAdContainer.className = 'ad-container header-ad';
    headerAdContainer.innerHTML = `
        <div class="ad-label">Advertisement</div>
        <div class="ad-slot">
            <!-- In a real implementation, this would be an actual AdSense ad unit -->
            <div class="simulated-ad" style="width: 100%; height: 90px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 10px 0;">
                <span>Header Banner Ad (728x90)</span>
            </div>
        </div>
    `;
    
    // Create footer ad container
    const footerAdContainer = document.createElement('div');
    footerAdContainer.className = 'ad-container footer-ad';
    footerAdContainer.innerHTML = `
        <div class="ad-label">Advertisement</div>
        <div class="ad-slot">
            <!-- In a real implementation, this would be an actual AdSense ad unit -->
            <div class="simulated-ad" style="width: 100%; height: 90px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; border-radius: 5px; margin: 10px 0;">
                <span>Footer Banner Ad (728x90)</span>
            </div>
        </div>
    `;
    
    // Add header ad before the first section
    const firstSection = document.querySelector('section');
    if (firstSection && firstSection.parentNode) {
        firstSection.parentNode.insertBefore(headerAdContainer, firstSection);
    }
    
    // Add footer ad after the last section but before the footer
    const lastSection = document.querySelector('section:last-of-type');
    const footer = document.querySelector('footer');
    if (lastSection && footer && footer.parentNode) {
        footer.parentNode.insertBefore(footerAdContainer, footer);
    }
    
    // Add styles for ad containers
    addAdStyles();
    
    console.log('Banner ads setup complete');
}

// Setup in-content ads
function setupInContentAds() {
    if (!window.adConfig.enabled) return;
    
    // Find all beat, remix, and cover art cards
    const cards = document.querySelectorAll('.beat-card, .remix-card, .cover-art-card');
    
    // Insert an ad after every 3 cards
    for (let i = 0; i < cards.length; i++) {
        if ((i + 1) % 3 === 0) {
            const card = cards[i];
            const cardParent = card.closest('.col-md-3, .col-md-4, .col-md-6');
            
            if (cardParent && cardParent.parentNode) {
                const adContainer = document.createElement('div');
                adContainer.className = 'col-md-12 mb-4';
                adContainer.innerHTML = `
                    <div class="ad-container in-content-ad">
                        <div class="ad-label">Advertisement</div>
                        <div class="ad-slot">
                            <!-- In a real implementation, this would be an actual AdSense ad unit -->
                            <div class="simulated-ad" style="width: 100%; height: 250px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; border-radius: 5px;">
                                <span>In-Content Ad (728x250)</span>
                            </div>
                        </div>
                    </div>
                `;
                
                const nextElement = cardParent.nextElementSibling;
                if (nextElement) {
                    cardParent.parentNode.insertBefore(adContainer, nextElement);
                } else {
                    cardParent.parentNode.appendChild(adContainer);
                }
            }
        }
    }
    
    console.log('In-content ads setup complete');
}

// Setup exit intent popup ads
function setupExitIntentAds() {
    if (!window.adConfig.enabled) return;
    
    // Only show exit intent ads for non-EU users or EU users with consent
    if (window.adConfig.region === 'eu' && !localStorage.getItem('cookieConsent')) {
        return;
    }
    
    // Create exit intent modal
    const exitIntentModal = document.createElement('div');
    exitIntentModal.className = 'modal fade';
    exitIntentModal.id = 'exitIntentModal';
    exitIntentModal.tabIndex = '-1';
    exitIntentModal.setAttribute('aria-labelledby', 'exitIntentModalLabel');
    exitIntentModal.setAttribute('aria-hidden', 'true');
    
    exitIntentModal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exitIntentModalLabel">Before You Go!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="ad-container popup-ad">
                        <div class="ad-label">Advertisement</div>
                        <div class="ad-slot">
                            <!-- In a real implementation, this would be an actual AdSense ad unit -->
                            <div class="simulated-ad" style="width: 100%; height: 250px; background: rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; border-radius: 5px;">
                                <span>Exit Intent Popup Ad</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 text-center">
                        <p>Don't miss out on our latest beats and remixes!</p>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Stay on Page</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(exitIntentModal);
    
    // Setup exit intent detection
    document.addEventListener('mouseleave', function(e) {
        // Only trigger if mouse leaves through the top of the page
        if (e.clientY < 0 && !window.adConfig.exitIntentShown) {
            // Check cooldown period
            const now = Date.now();
            if (now - window.adConfig.lastAdTime < window.adConfig.adCooldown) {
                return;
            }
            
            // Show exit intent modal
            const modal = new bootstrap.Modal(document.getElementById('exitIntentModal'));
            modal.show();
            
            // Update tracking
            window.adConfig.exitIntentShown = true;
            window.adConfig.lastAdTime = now;
            
            // Reset after 30 minutes
            setTimeout(() => {
                window.adConfig.exitIntentShown = false;
            }, 30 * 60 * 1000);
            
            // Track impression
            trackAdImpression('exit-intent');
        }
    });
    
    console.log('Exit intent ads setup complete');
}

// Setup ad performance tracking
function setupAdTracking() {
    if (!window.adConfig.enabled) return;
    
    // Track ad impressions
    const adSlots = document.querySelectorAll('.ad-slot');
    
    // Use Intersection Observer to track when ads are viewed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const adContainer = entry.target.closest('.ad-container');
                if (adContainer) {
                    const adType = getAdType(adContainer);
                    trackAdImpression(adType);
                    
                    // Unobserve after tracking
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all ad slots
    adSlots.forEach(slot => {
        observer.observe(slot);
    });
    
    // Track ad clicks
    document.addEventListener('click', function(e) {
        const adSlot = e.target.closest('.ad-slot');
        if (adSlot) {
            const adContainer = adSlot.closest('.ad-container');
            if (adContainer) {
                const adType = getAdType(adContainer);
                trackAdClick(adType);
            }
        }
    });
    
    console.log('Ad tracking setup complete');
}

// Get ad type from container
function getAdType(adContainer) {
    if (adContainer.classList.contains('header-ad')) {
        return 'header';
    } else if (adContainer.classList.contains('footer-ad')) {
        return 'footer';
    } else if (adContainer.classList.contains('in-content-ad')) {
        return 'in-content';
    } else if (adContainer.classList.contains('popup-ad')) {
        return 'popup';
    } else {
        return 'unknown';
    }
}

// Track ad impression
function trackAdImpression(adType) {
    // In a real implementation, this would send data to an analytics service
    console.log(`Ad impression tracked: ${adType}`);
    
    // Increment impression counter in local storage
    const impressionKey = `ad_impressions_${adType}`;
    const currentCount = parseInt(localStorage.getItem(impressionKey) || '0');
    localStorage.setItem(impressionKey, (currentCount + 1).toString());
}

// Track ad click
function trackAdClick(adType) {
    // In a real implementation, this would send data to an analytics service
    console.log(`Ad click tracked: ${adType}`);
    
    // Increment click counter in local storage
    const clickKey = `ad_clicks_${adType}`;
    const currentCount = parseInt(localStorage.getItem(clickKey) || '0');
    localStorage.setItem(clickKey, (currentCount + 1).toString());
    
    // Calculate CTR
    const impressionKey = `ad_impressions_${adType}`;
    const impressions = parseInt(localStorage.getItem(impressionKey) || '0');
    const clicks = currentCount + 1;
    
    if (impressions > 0) {
        const ctr = (clicks / impressions * 100).toFixed(2);
        console.log(`Ad CTR for ${adType}: ${ctr}%`);
    }
}

// Add styles for ad containers
function addAdStyles() {
    if (document.getElementById('ad-styles')) {
        return; // Styles already added
    }
    
    const styles = document.createElement('style');
    styles.id = 'ad-styles';
    styles.textContent = `
        .ad-container {
            margin: 20px 0;
            padding: 10px;
            border-radius: 5px;
            background-color: rgba(0, 0, 0, 0.05);
            text-align: center;
        }
        
        .ad-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .header-ad, .footer-ad {
            max-width: 728px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .in-content-ad {
            margin: 30px 0;
        }
        
        .simulated-ad {
            color: rgba(255, 255, 255, 0.7);
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .simulated-ad:hover {
            background: rgba(0, 0, 0, 0.2) !important;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(styles);
}
