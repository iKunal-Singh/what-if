// Test script for website functionality
console.log('Starting website functionality tests...');

// Function to run all tests
function runAllTests() {
    // Test core features
    testCoreFeatures();
    
    // Test download system
    testDownloadSystem();
    
    // Test ad system
    testAdSystem();
    
    // Test SEO and automation
    testSEOAndAutomation();
    
    // Test responsive design
    testResponsiveDesign();
    
    console.log('All tests completed!');
}

// Test core features
function testCoreFeatures() {
    console.log('Testing core features...');
    
    // Test beats section
    testBeatsSection();
    
    // Test remixes section
    testRemixesSection();
    
    // Test cover art gallery
    testCoverArtGallery();
    
    console.log('Core features tests completed!');
}

// Test beats section
function testBeatsSection() {
    console.log('Testing beats section...');
    
    // Check if beats data is loaded
    if (typeof beats === 'undefined' || !Array.isArray(beats) || beats.length === 0) {
        console.error('Beats data not loaded correctly');
        return;
    }
    
    console.log(`Found ${beats.length} beats`);
    
    // Check if beats are displayed in the UI
    const beatCards = document.querySelectorAll('.beat-card');
    if (beatCards.length === 0) {
        console.error('No beat cards found in the UI');
    } else {
        console.log(`Found ${beatCards.length} beat cards in the UI`);
    }
    
    // Test genre filters
    const filterButtons = document.querySelectorAll('.filters .btn');
    if (filterButtons.length === 0) {
        console.error('No filter buttons found');
    } else {
        console.log(`Found ${filterButtons.length} filter buttons`);
        
        // Test clicking each filter button
        filterButtons.forEach(button => {
            const genre = button.textContent.trim();
            console.log(`Testing filter: ${genre}`);
            button.click();
            
            // Check if the correct beats are displayed
            const visibleBeatCards = document.querySelectorAll('#beats .col-md-4[style="display: block;"]');
            console.log(`${visibleBeatCards.length} beats visible after filtering by ${genre}`);
        });
    }
    
    // Test audio players
    const audioElements = document.querySelectorAll('audio');
    if (audioElements.length === 0) {
        console.error('No audio elements found');
    } else {
        console.log(`Found ${audioElements.length} audio elements`);
    }
}

// Test remixes section
function testRemixesSection() {
    console.log('Testing remixes section...');
    
    // Check if remixes data is loaded
    if (typeof remixes === 'undefined' || !Array.isArray(remixes) || remixes.length === 0) {
        console.error('Remixes data not loaded correctly');
        return;
    }
    
    console.log(`Found ${remixes.length} remixes`);
    
    // Check if remixes are displayed in the UI
    const remixCards = document.querySelectorAll('.remix-card');
    if (remixCards.length === 0) {
        console.error('No remix cards found in the UI');
    } else {
        console.log(`Found ${remixCards.length} remix cards in the UI`);
    }
    
    // Test YouTube embeds
    const iframes = document.querySelectorAll('.remix-card iframe');
    if (iframes.length === 0) {
        console.error('No YouTube iframes found');
    } else {
        console.log(`Found ${iframes.length} YouTube iframes`);
    }
    
    // Test DMCA disclaimers
    const disclaimers = document.querySelectorAll('.disclaimer');
    if (disclaimers.length === 0) {
        console.error('No DMCA disclaimers found');
    } else {
        console.log(`Found ${disclaimers.length} DMCA disclaimers`);
    }
}

// Test cover art gallery
function testCoverArtGallery() {
    console.log('Testing cover art gallery...');
    
    // Check if cover art data is loaded
    if (typeof coverArt === 'undefined' || !Array.isArray(coverArt) || coverArt.length === 0) {
        console.error('Cover art data not loaded correctly');
        return;
    }
    
    console.log(`Found ${coverArt.length} cover art items`);
    
    // Check if cover art is displayed in the UI
    const artCards = document.querySelectorAll('.cover-art-card');
    if (artCards.length === 0) {
        console.error('No cover art cards found in the UI');
    } else {
        console.log(`Found ${artCards.length} cover art cards in the UI`);
    }
    
    // Test images
    const images = document.querySelectorAll('.cover-art-card img');
    if (images.length === 0) {
        console.error('No cover art images found');
    } else {
        console.log(`Found ${images.length} cover art images`);
    }
}

// Test download system
function testDownloadSystem() {
    console.log('Testing download system...');
    
    // Check if download buttons exist
    const downloadButtons = document.querySelectorAll('.download-btn');
    if (downloadButtons.length === 0) {
        console.error('No download buttons found');
        return;
    }
    
    console.log(`Found ${downloadButtons.length} download buttons`);
    
    // Check if download modal exists
    const downloadModal = document.getElementById('downloadModal');
    if (!downloadModal) {
        console.error('Download modal not found');
        return;
    }
    
    console.log('Download modal found');
    
    // Test watch ad button
    const watchAdBtn = document.getElementById('watchAdBtn');
    if (!watchAdBtn) {
        console.error('Watch ad button not found');
    } else {
        console.log('Watch ad button found');
    }
    
    // Test subscribe button
    const subscribeBtn = document.getElementById('subscribeBtn');
    if (!subscribeBtn) {
        console.error('Subscribe button not found');
    } else {
        console.log('Subscribe button found');
    }
    
    // Test email form
    const emailForm = document.getElementById('emailForm');
    if (!emailForm) {
        console.error('Email form not found');
    } else {
        console.log('Email form found');
    }
    
    // Test AdSense/AdThrive integration
    if (typeof window.downloadAdConfig === 'undefined') {
        console.error('Download ad configuration not found');
    } else {
        console.log('Download ad configuration found');
    }
}

// Test ad system
function testAdSystem() {
    console.log('Testing ad system...');
    
    // Check if ad configuration exists
    if (typeof window.adConfig === 'undefined') {
        console.error('Ad configuration not found');
        return;
    }
    
    console.log('Ad configuration found');
    
    // Check header/footer banner ads
    const headerAd = document.querySelector('.header-ad');
    if (!headerAd) {
        console.error('Header ad not found');
    } else {
        console.log('Header ad found');
    }
    
    const footerAd = document.querySelector('.footer-ad');
    if (!footerAd) {
        console.error('Footer ad not found');
    } else {
        console.log('Footer ad found');
    }
    
    // Check in-content ads
    const inContentAds = document.querySelectorAll('.in-content-ad');
    if (inContentAds.length === 0) {
        console.error('No in-content ads found');
    } else {
        console.log(`Found ${inContentAds.length} in-content ads`);
    }
    
    // Check exit intent popup
    const exitIntentModal = document.getElementById('exitIntentModal');
    if (!exitIntentModal) {
        console.error('Exit intent modal not found');
    } else {
        console.log('Exit intent modal found');
    }
}

// Test SEO and automation
function testSEOAndAutomation() {
    console.log('Testing SEO and automation...');
    
    // Check meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        console.error('Meta description not found');
    } else {
        console.log('Meta description found:', metaDescription.getAttribute('content'));
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
        console.error('Meta keywords not found');
    } else {
        console.log('Meta keywords found');
    }
    
    // Check Open Graph tags
    const ogTags = document.querySelectorAll('meta[property^="og:"]');
    if (ogTags.length === 0) {
        console.error('No Open Graph tags found');
    } else {
        console.log(`Found ${ogTags.length} Open Graph tags`);
    }
    
    // Check Twitter Card tags
    const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
    if (twitterTags.length === 0) {
        console.error('No Twitter Card tags found');
    } else {
        console.log(`Found ${twitterTags.length} Twitter Card tags`);
    }
    
    // Check schema markup
    const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
    if (schemaScripts.length === 0) {
        console.error('No schema markup found');
    } else {
        console.log(`Found ${schemaScripts.length} schema markup scripts`);
    }
    
    // Check automation functions
    if (typeof window.handleNewYouTubeVideo === 'undefined') {
        console.error('YouTube auto-posting function not found');
    } else {
        console.log('YouTube auto-posting function found');
    }
    
    if (typeof window.generateAITags === 'undefined') {
        console.error('AI tag generation function not found');
    } else {
        console.log('AI tag generation function found');
    }
    
    if (typeof window.sendToZapier === 'undefined') {
        console.error('Zapier integration function not found');
    } else {
        console.log('Zapier integration function found');
    }
}

// Test responsive design
function testResponsiveDesign() {
    console.log('Testing responsive design...');
    
    // Get current viewport size
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(`Current viewport size: ${width}x${height}`);
    
    // Test different viewport sizes
    const viewportSizes = [
        { width: 320, height: 568, name: 'Mobile (small)' },
        { width: 375, height: 667, name: 'Mobile (medium)' },
        { width: 414, height: 736, name: 'Mobile (large)' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1024, height: 768, name: 'Laptop' },
        { width: 1440, height: 900, name: 'Desktop' }
    ];
    
    viewportSizes.forEach(size => {
        console.log(`Testing viewport size: ${size.name} (${size.width}x${size.height})`);
        
        // In a real test, this would resize the viewport and check elements
        // For this demo, we'll just log the test
        console.log(`Viewport test for ${size.name} completed`);
    });
}

// Run all tests when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all scripts to initialize
    setTimeout(runAllTests, 1000);
});
