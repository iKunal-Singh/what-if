// SEO and Automation Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize SEO features
    initializeSEO();
    
    // Setup content automation
    setupContentAutomation();
});

// Initialize SEO features
function initializeSEO() {
    // Generate SEO metadata for the page
    generateSEOMetadata();
    
    // Add schema markup for beats
    addSchemaMarkup();
    
    // Generate SEO-friendly URLs
    generateSEOFriendlyURLs();
    
    console.log('SEO features initialized');
}

// Generate SEO metadata for the page
function generateSEOMetadata() {
    // Get the first beat for demonstration
    if (typeof beats !== 'undefined' && beats.length > 0) {
        const beat = beats[0];
        
        // Generate SEO title and description
        const seoTitle = generateSEOTitle(beat.title, beat.genre);
        const seoDescription = generateSEODescription(beat.title, beat.genre, beat.bpm, beat.key);
        
        // Update page metadata
        document.title = seoTitle;
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', seoDescription);
        
        // Add meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.setAttribute('name', 'keywords');
            document.head.appendChild(metaKeywords);
        }
        
        // Generate keywords from beat tags and genres
        const allBeats = typeof beats !== 'undefined' ? beats : [];
        const genres = [...new Set(allBeats.map(b => b.genre))];
        const tags = [...new Set(allBeats.flatMap(b => b.tags || []))];
        const keywords = [...genres, ...tags, 'free beats', 'music downloads', 'type beats', 'free instrumentals'].join(', ');
        
        metaKeywords.setAttribute('content', keywords);
        
        // Add canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', window.location.href.split('?')[0]);
        
        // Add Open Graph metadata
        addOpenGraphMetadata(seoTitle, seoDescription);
        
        // Add Twitter Card metadata
        addTwitterCardMetadata(seoTitle, seoDescription);
        
        console.log('SEO metadata generated');
    }
}

// Generate SEO title
function generateSEOTitle(beatTitle, genre) {
    const currentYear = new Date().getFullYear();
    return `${beatTitle} | ${genre} Type Beat ${currentYear} | Free Download`;
}

// Generate SEO description
function generateSEODescription(beatTitle, genre, bpm, key) {
    return `Download "${beatTitle}" - a ${genre} type beat (${bpm} BPM, ${key}) for free. High-quality instrumental for your next project. Free beats and remixes for creators.`;
}

// Add Open Graph metadata
function addOpenGraphMetadata(title, description) {
    // Add Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    
    // Add Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
    
    // Add Open Graph type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
        ogType = document.createElement('meta');
        ogType.setAttribute('property', 'og:type');
        document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');
    
    // Add Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', window.location.href.split('?')[0]);
    
    // Add Open Graph image (if available)
    if (typeof beats !== 'undefined' && beats.length > 0 && beats[0].coverArt) {
        let ogImage = document.querySelector('meta[property="og:image"]');
        if (!ogImage) {
            ogImage = document.createElement('meta');
            ogImage.setAttribute('property', 'og:image');
            document.head.appendChild(ogImage);
        }
        
        // Use absolute URL for image
        const baseUrl = window.location.href.split('?')[0].split('/').slice(0, -1).join('/');
        ogImage.setAttribute('content', `${baseUrl}/${beats[0].coverArt}`);
    }
}

// Add Twitter Card metadata
function addTwitterCardMetadata(title, description) {
    // Add Twitter card type
    let twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
        twitterCard = document.createElement('meta');
        twitterCard.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCard);
    }
    twitterCard.setAttribute('content', 'summary_large_image');
    
    // Add Twitter title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
    }
    twitterTitle.setAttribute('content', title);
    
    // Add Twitter description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
        twitterDescription = document.createElement('meta');
        twitterDescription.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescription);
    }
    twitterDescription.setAttribute('content', description);
    
    // Add Twitter image (if available)
    if (typeof beats !== 'undefined' && beats.length > 0 && beats[0].coverArt) {
        let twitterImage = document.querySelector('meta[name="twitter:image"]');
        if (!twitterImage) {
            twitterImage = document.createElement('meta');
            twitterImage.setAttribute('name', 'twitter:image');
            document.head.appendChild(twitterImage);
        }
        
        // Use absolute URL for image
        const baseUrl = window.location.href.split('?')[0].split('/').slice(0, -1).join('/');
        twitterImage.setAttribute('content', `${baseUrl}/${beats[0].coverArt}`);
    }
}

// Add schema markup for beats
function addSchemaMarkup() {
    // Remove any existing schema markup
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (existingSchema) {
        existingSchema.remove();
    }
    
    // Create schema markup for the website
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Music Channel - Free Beats, Remixes & Cover Art",
        "url": window.location.href.split('?')[0],
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${window.location.href.split('?')[0]}?search={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
    
    // Add website schema
    const websiteSchemaScript = document.createElement('script');
    websiteSchemaScript.type = 'application/ld+json';
    websiteSchemaScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(websiteSchemaScript);
    
    // Create schema markup for beats
    if (typeof beats !== 'undefined' && beats.length > 0) {
        const beatsSchema = [];
        
        beats.forEach(beat => {
            const beatSchema = {
                "@context": "https://schema.org",
                "@type": "MusicComposition",
                "name": beat.title,
                "composer": {
                    "@type": "Person",
                    "name": "Your Name"
                },
                "genre": beat.genre,
                "inLanguage": "en",
                "datePublished": new Date().toISOString().split('T')[0],
                "offers": {
                    "@type": "Offer",
                    "price": "0.00",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                },
                "additionalProperty": [
                    {
                        "@type": "PropertyValue",
                        "name": "BPM",
                        "value": beat.bpm.toString()
                    },
                    {
                        "@type": "PropertyValue",
                        "name": "Key",
                        "value": beat.key
                    }
                ]
            };
            
            beatsSchema.push(beatSchema);
        });
        
        // Add beats schema
        const beatsSchemaScript = document.createElement('script');
        beatsSchemaScript.type = 'application/ld+json';
        beatsSchemaScript.textContent = JSON.stringify(beatsSchema);
        document.head.appendChild(beatsSchemaScript);
    }
    
    console.log('Schema markup added');
}

// Generate SEO-friendly URLs
function generateSEOFriendlyURLs() {
    // In a real implementation, this would generate SEO-friendly URLs for each beat, remix, and cover art
    // For this demo, we'll just log the URLs that would be generated
    
    if (typeof beats !== 'undefined') {
        beats.forEach(beat => {
            const seoUrl = generateSEOFriendlyURL(beat.title, 'beat', beat.id);
            console.log(`SEO URL for ${beat.title}: ${seoUrl}`);
        });
    }
    
    if (typeof remixes !== 'undefined') {
        remixes.forEach(remix => {
            const seoUrl = generateSEOFriendlyURL(remix.title, 'remix', remix.id);
            console.log(`SEO URL for ${remix.title}: ${seoUrl}`);
        });
    }
    
    if (typeof coverArt !== 'undefined') {
        coverArt.forEach(art => {
            const seoUrl = generateSEOFriendlyURL(art.title, 'cover', art.id);
            console.log(`SEO URL for ${art.title}: ${seoUrl}`);
        });
    }
}

// Generate SEO-friendly URL
function generateSEOFriendlyURL(title, type, id) {
    // Convert title to lowercase and replace spaces with hyphens
    const slug = title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    // Generate URL
    return `${window.location.href.split('?')[0]}${type}/${slug}-${id}.html`;
}

// Setup content automation
function setupContentAutomation() {
    // Setup YouTube to website auto-posting
    setupYouTubeAutoPosting();
    
    // Setup AI-generated tags and descriptions
    setupAIContentGeneration();
    
    // Setup Zapier/API integrations
    setupZapierIntegration();
    
    console.log('Content automation setup complete');
}

// Setup YouTube to website auto-posting
function setupYouTubeAutoPosting() {
    // In a real implementation, this would set up a webhook or API endpoint to receive YouTube video data
    // For this demo, we'll create a simulated function to handle new YouTube videos
    
    window.handleNewYouTubeVideo = function(videoData) {
        console.log('New YouTube video received:', videoData);
        
        // Generate beat data from video
        const beat = generateBeatFromYouTubeVideo(videoData);
        
        // Add beat to the website
        if (typeof beats !== 'undefined') {
            beats.push(beat);
            
            // Refresh beats section
            if (typeof populateBeatsSection === 'function') {
                populateBeatsSection(beats);
            }
            
            console.log('New beat added from YouTube video');
        }
    };
    
    // Simulate receiving a new YouTube video (for demonstration)
    setTimeout(() => {
        const simulatedVideoData = {
            id: 'dQw4w9WgXcQ',
            title: 'Travis Scott Type Beat - "Utopia" Vibes',
            description: 'New Travis Scott type beat with dark trap vibes. Free download available on my website.',
            publishedAt: new Date().toISOString(),
            thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        };
        
        console.log('Simulating new YouTube video...');
        // Uncomment to test the auto-posting functionality
        // window.handleNewYouTubeVideo(simulatedVideoData);
    }, 5000);
}

// Generate beat data from YouTube video
function generateBeatFromYouTubeVideo(videoData) {
    // Extract information from video title
    const titleParts = videoData.title.split('-');
    const artistType = titleParts[0].trim();
    const beatTitle = titleParts[1] ? titleParts[1].trim().replace(/"/g, '') : 'Untitled Beat';
    
    // Extract genre from title or description
    let genre = 'Hip-Hop';
    if (videoData.title.toLowerCase().includes('trap')) {
        genre = 'Trap';
    } else if (videoData.title.toLowerCase().includes('r&b')) {
        genre = 'R&B';
    } else if (videoData.title.toLowerCase().includes('pop')) {
        genre = 'Pop';
    }
    
    // Generate random BPM and key
    const bpm = Math.floor(Math.random() * 40) + 80; // Random BPM between 80 and 120
    const keys = ['C Major', 'A Minor', 'G Major', 'E Minor', 'F Major', 'D Minor'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    
    // Generate tags from title and description
    const tags = [];
    
    if (artistType.includes('Travis Scott')) {
        tags.push('Travis Scott', 'Dark Trap');
    } else if (artistType.includes('Drake')) {
        tags.push('Drake', 'Emotional');
    } else {
        tags.push('Hip-Hop', 'Type Beat');
    }
    
    if (videoData.title.toLowerCase().includes('utopia')) {
        tags.push('Utopia', 'Atmospheric');
    }
    
    // Generate unique ID
    const id = typeof beats !== 'undefined' ? beats.length + 1 : 1;
    
    // Create beat object
    return {
        id: id,
        title: beatTitle,
        genre: genre,
        bpm: bpm,
        key: key,
        audioFile: 'audio/beat' + id + '.mp3',
        coverArt: videoData.thumbnailUrl ? 'images/beat' + id + '.jpg' : 'images/beat1.jpg',
        description: videoData.description || `${genre} type beat with ${tags.join(' and ')} vibes.`,
        tags: tags,
        youtubeId: videoData.id
    };
}

// Setup AI-generated tags and descriptions
function setupAIContentGeneration() {
    // In a real implementation, this would integrate with an AI service
    // For this demo, we'll create simulated functions to generate content
    
    window.generateAITags = function(beatTitle, genre, bpm) {
        console.log('Generating AI tags for:', beatTitle);
        
        // Simulate AI-generated tags
        const baseTags = [genre, `${bpm} BPM`, 'Free Beat', 'Type Beat'];
        
        // Add artist-inspired tags based on title
        if (beatTitle.toLowerCase().includes('dark')) {
            baseTags.push('Dark', 'Moody', 'Night');
        } else if (beatTitle.toLowerCase().includes('summer')) {
            baseTags.push('Summer', 'Bright', 'Upbeat');
        } else if (beatTitle.toLowerCase().includes('trap'
(Content truncated due to size limit. Use line ranges to read in chunks)