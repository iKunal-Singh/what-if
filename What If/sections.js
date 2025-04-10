// Beats Section Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Load the beats data
    if (typeof beats !== 'undefined') {
        populateBeatsSection(beats);
    } else {
        console.error('Beats data not found');
    }
    
    // Load the remixes data
    if (typeof remixes !== 'undefined') {
        populateRemixesSection(remixes);
    } else {
        console.error('Remixes data not found');
    }
    
    // Load the cover art data
    if (typeof coverArt !== 'undefined') {
        populateCoverArtGallery(coverArt);
    } else {
        console.error('Cover art data not found');
    }
    
    // Setup filter functionality
    setupFilters();
});

// Populate the beats section with data
function populateBeatsSection(beatsData) {
    const beatsContainer = document.querySelector('#beats .row');
    if (!beatsContainer) return;
    
    // Clear any existing content (except the first card which is our template)
    while (beatsContainer.children.length > 1) {
        beatsContainer.removeChild(beatsContainer.lastChild);
    }
    
    // Get all unique genres for filter buttons
    const genres = ['All', ...new Set(beatsData.map(beat => beat.genre))];
    updateFilterButtons(genres);
    
    // Populate beats
    beatsData.forEach(beat => {
        const beatCard = createBeatCard(beat);
        beatsContainer.appendChild(beatCard);
    });
}

// Create a beat card element
function createBeatCard(beat) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.setAttribute('data-genre', beat.genre);
    
    col.innerHTML = `
        <div class="card beat-card">
            <div class="card-body">
                <h5 class="card-title">${beat.title}</h5>
                <p class="card-text">
                    <span class="badge bg-primary">${beat.genre}</span>
                    <span class="badge bg-secondary">${beat.bpm} BPM</span>
                    <span class="badge bg-info">${beat.key}</span>
                </p>
                <div class="audio-player">
                    <audio controls>
                        <source src="${beat.audioFile}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <p class="card-text small text-muted mt-2">${beat.description}</p>
                <a href="${beat.audioFile}" class="btn btn-success mt-3 download-btn" data-beat-id="${beat.id}">Download</a>
            </div>
        </div>
    `;
    
    return col;
}

// Update filter buttons based on available genres
function updateFilterButtons(genres) {
    const filtersContainer = document.querySelector('.filters');
    if (!filtersContainer) return;
    
    filtersContainer.innerHTML = '';
    
    genres.forEach(genre => {
        const button = document.createElement('button');
        button.className = genre === 'All' ? 'btn btn-primary me-2' : 'btn btn-outline-primary me-2';
        button.textContent = genre;
        button.setAttribute('data-genre', genre);
        filtersContainer.appendChild(button);
    });
}

// Setup filter functionality
function setupFilters() {
    const filtersContainer = document.querySelector('.filters');
    if (!filtersContainer) return;
    
    filtersContainer.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            // Update active button
            document.querySelectorAll('.filters button').forEach(btn => {
                btn.className = 'btn btn-outline-primary me-2';
            });
            e.target.className = 'btn btn-primary me-2';
            
            // Filter beats
            const selectedGenre = e.target.getAttribute('data-genre');
            filterBeatsByGenre(selectedGenre);
        }
    });
}

// Filter beats by genre
function filterBeatsByGenre(genre) {
    const beatCards = document.querySelectorAll('#beats .col-md-4');
    
    beatCards.forEach(card => {
        if (genre === 'All' || card.getAttribute('data-genre') === genre) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Populate the remixes section with data
function populateRemixesSection(remixesData) {
    const remixesContainer = document.querySelector('#remixes .row');
    if (!remixesContainer) return;
    
    // Clear any existing content
    remixesContainer.innerHTML = '';
    
    // Populate remixes
    remixesData.forEach(remix => {
        const remixCard = createRemixCard(remix);
        remixesContainer.appendChild(remixCard);
    });
}

// Create a remix card element
function createRemixCard(remix) {
    const col = document.createElement('div');
    col.className = 'col-md-6 mb-4';
    
    const disclaimer = generateDMCADisclaimer(remix.originalArtist);
    
    col.innerHTML = `
        <div class="card remix-card">
            <div class="card-body">
                <h5 class="card-title">${remix.title}</h5>
                <div class="embed-responsive embed-responsive-16by9 mb-3">
                    <iframe class="embed-responsive-item" src="${remix.youtubeEmbed}" allowfullscreen></iframe>
                </div>
                <p class="card-text">
                    <span class="badge bg-primary">${remix.genre}</span>
                    <span class="badge bg-secondary">${remix.bpm} BPM</span>
                </p>
                <div class="disclaimer alert alert-warning">
                    <small>${disclaimer}</small>
                </div>
                <p class="card-text small text-muted mt-2">${remix.description}</p>
                <a href="#" class="btn btn-success mt-2 download-btn" data-remix-id="${remix.id}">Download</a>
            </div>
        </div>
    `;
    
    return col;
}

// Populate the cover art gallery with data
function populateCoverArtGallery(coverArtData) {
    const galleryContainer = document.querySelector('#cover-art .row');
    if (!galleryContainer) return;
    
    // Clear any existing content
    galleryContainer.innerHTML = '';
    
    // Populate cover art
    coverArtData.forEach(art => {
        const artCard = createCoverArtCard(art);
        galleryContainer.appendChild(artCard);
    });
}

// Create a cover art card element
function createCoverArtCard(art) {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4';
    
    col.innerHTML = `
        <div class="card cover-art-card">
            <img src="${art.image}" class="card-img-top" alt="${art.title} Cover Art">
            <div class="card-body">
                <h5 class="card-title">${art.title}</h5>
                <p class="card-text"><small>Artist: ${art.artist}</small></p>
                <p class="card-text small text-muted">${art.description}</p>
                <a href="${art.image}" class="btn btn-sm btn-success download-btn" data-art-id="${art.id}">Download</a>
            </div>
        </div>
    `;
    
    return col;
}

// Generate SEO metadata for beats
function generateSEOMetadata() {
    // Get the first beat for demonstration
    if (typeof beats !== 'undefined' && beats.length > 0) {
        const beat = beats[0];
        
        // Generate SEO title and description
        const seoTitle = generateSEOTitle(beat.title, beat.genre);
        const seoDescription = generateSEODescription(beat.title, beat.genre, beat.bpm, beat.key);
        
        // Update page metadata
        document.title = seoTitle;
        document.querySelector('meta[name="description"]').setAttribute('content', seoDescription);
        
        // Add schema markup
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.textContent = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": beat.title,
            "genre": beat.genre,
            "composer": {
                "@type": "Person",
                "name": "Your Name"
            },
            "inLanguage": "en",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
            }
        });
        
        document.head.appendChild(schemaScript);
    }
}
