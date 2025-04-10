// Audio Player JavaScript for the music website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize audio players
    initAudioPlayers();
});

// Initialize custom audio players
function initAudioPlayers() {
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach(audio => {
        // Create custom player container if it doesn't exist
        let playerContainer = audio.parentElement;
        if (!playerContainer.classList.contains('custom-audio-player')) {
            // Wrap the audio element in a custom player container
            playerContainer = document.createElement('div');
            playerContainer.className = 'custom-audio-player';
            audio.parentNode.insertBefore(playerContainer, audio);
            playerContainer.appendChild(audio);
            
            // Create player controls
            createPlayerControls(playerContainer, audio);
        }
        
        // Setup event listeners for this audio element
        setupAudioEventListeners(audio);
    });
}

// Create custom player controls
function createPlayerControls(container, audio) {
    // Create player UI
    const playerUI = document.createElement('div');
    playerUI.className = 'player-ui';
    playerUI.innerHTML = `
        <div class="player-controls">
            <button class="play-pause-btn">
                <i class="fas fa-play"></i>
            </button>
            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-indicator"></div>
                </div>
                <div class="time-display">
                    <span class="current-time">0:00</span>
                    <span class="duration">0:00</span>
                </div>
            </div>
            <div class="volume-container">
                <button class="volume-btn">
                    <i class="fas fa-volume-up"></i>
                </button>
                <div class="volume-slider">
                    <div class="volume-progress">
                        <div class="volume-indicator"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="waveform-container">
            <div class="waveform"></div>
        </div>
    `;
    
    // Insert player UI before the audio element
    container.insertBefore(playerUI, audio);
    
    // Hide the default audio controls
    audio.removeAttribute('controls');
    
    // Add Font Awesome if not already included
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }
    
    // Add custom player styles if not already included
    if (!document.querySelector('style#custom-audio-player-styles')) {
        const styles = document.createElement('style');
        styles.id = 'custom-audio-player-styles';
        styles.textContent = `
            .custom-audio-player {
                width: 100%;
                margin: 15px 0;
                background: rgba(30, 30, 30, 0.6);
                border-radius: 30px;
                padding: 10px 15px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            
            .player-ui {
                display: flex;
                flex-direction: column;
                width: 100%;
            }
            
            .player-controls {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .play-pause-btn {
                background: var(--primary-color, #8c52ff);
                color: white;
                border: none;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                margin-right: 15px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }
            
            .play-pause-btn:hover {
                transform: scale(1.1);
                background: var(--secondary-color, #5e17eb);
            }
            
            .progress-container {
                flex: 1;
                margin-right: 15px;
            }
            
            .progress-bar {
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .progress-indicator {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-color, #8c52ff), var(--accent-color, #00d9ff));
                width: 0%;
                border-radius: 3px;
                position: absolute;
                top: 0;
                left: 0;
                transition: width 0.1s linear;
            }
            
            .time-display {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 5px;
            }
            
            .volume-container {
                display: flex;
                align-items: center;
                position: relative;
            }
            
            .volume-btn {
                background: transparent;
                color: rgba(255, 255, 255, 0.7);
                border: none;
                cursor: pointer;
                padding: 5px;
                transition: color 0.2s ease;
            }
            
            .volume-btn:hover {
                color: white;
            }
            
            .volume-slider {
                width: 0;
                overflow: hidden;
                transition: width 0.3s ease;
                height: 20px;
                display: flex;
                align-items: center;
            }
            
            .volume-container:hover .volume-slider {
                width: 60px;
            }
            
            .volume-progress {
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                width: 50px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
            }
            
            .volume-indicator {
                height: 100%;
                background: rgba(255, 255, 255, 0.5);
                width: 100%;
                border-radius: 2px;
                position: absolute;
                top: 0;
                left: 0;
            }
            
            .waveform-container {
                height: 40px;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .waveform {
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .waveform::before {
                content: '';
                display: block;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                    rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 10%, 
                    rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.1) 30%,
                    rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.1) 50%,
                    rgba(255,255,255,0.2) 60%, rgba(255,255,255,0.1) 70%,
                    rgba(255,255,255,0.3) 80%, rgba(255,255,255,0.1) 90%,
                    rgba(255,255,255,0.05) 100%);
                mask: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,15 Q5,5 10,15 T20,15 T30,15 T40,15 T50,15 T60,15 T70,15 T80,15 T90,15 T100,15' stroke='white' fill='none' stroke-width='2'/%3E%3C/svg%3E");
                -webkit-mask: url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,15 Q5,5 10,15 T20,15 T30,15 T40,15 T50,15 T60,15 T70,15 T80,15 T90,15 T100,15' stroke='white' fill='none' stroke-width='2'/%3E%3C/svg%3E");
                mask-size: 100% 100%;
                -webkit-mask-size: 100% 100%;
            }
            
            /* Playing animation */
            @keyframes waveform-animation {
                0% { 
                    mask-position: 0% center;
                    -webkit-mask-position: 0% center;
                }
                100% { 
                    mask-position: 100% center; 
                    -webkit-mask-position: 100% center;
                }
            }
            
            .playing .waveform::before {
                animation: waveform-animation 8s linear infinite;
            }
        `;
        document.head.appendChild(styles);
    }
}

// Setup event listeners for audio elements
function setupAudioEventListeners(audio) {
    const container = audio.closest('.custom-audio-player');
    const playPauseBtn = container.querySelector('.play-pause-btn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressBar = container.querySelector('.progress-bar');
    const progressIndicator = container.querySelector('.progress-indicator');
    const currentTimeDisplay = container.querySelector('.current-time');
    const durationDisplay = container.querySelector('.duration');
    const volumeBtn = container.querySelector('.volume-btn');
    const volumeIcon = volumeBtn.querySelector('i');
    const volumeProgress = container.querySelector('.volume-progress');
    const volumeIndicator = container.querySelector('.volume-indicator');
    const waveformContainer = container.querySelector('.waveform-container');
    
    // Play/Pause button click
    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            // Pause all other audio elements first
            document.querySelectorAll('audio').forEach(a => {
                if (a !== audio && !a.paused) {
                    a.pause();
                    const otherContainer = a.closest('.custom-audio-player');
                    const otherPlayPauseIcon = otherContainer.querySelector('.play-pause-btn i');
                    otherPlayPauseIcon.className = 'fas fa-play';
                    otherContainer.querySelector('.waveform-container').classList.remove('playing');
                }
            });
            
            // Play this audio
            audio.play();
            playPauseIcon.className = 'fas fa-pause';
            waveformContainer.classList.add('playing');
        } else {
            audio.pause();
            playPauseIcon.className = 'fas fa-play';
            waveformContainer.classList.remove('playing');
        }
    });
    
    // Progress bar click
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });
    
    // Volume button click
    volumeBtn.addEventListener('click', function() {
        if (audio.volume > 0) {
            audio.dataset.prevVolume = audio.volume;
            audio.volume = 0;
            volumeIcon.className = 'fas fa-volume-mute';
            volumeIndicator.style.width = '0%';
        } else {
            audio.volume = audio.dataset.prevVolume || 1;
            updateVolumeIcon(audio.volume);
            volumeIndicator.style.width = (audio.volume * 100) + '%';
        }
    });
    
    // Volume slider click
    volumeProgress.addEventListener('click', function(e) {
        const rect = volumeProgress.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.volume = Math.max(0, Math.min(1, pos));
        volumeIndicator.style.width = (audio.volume * 100) + '%';
        updateVolumeIcon(audio.volume);
    });
    
    // Update volume icon based on volume level
    function updateVolumeIcon(volume) {
        if (volume > 0.5) {
            volumeIcon.className = 'fas fa-volume-up';
        } else if (volume > 0) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-mute';
        }
    }
    
    // Time update event
    audio.addEventListener('timeupdate', function() {
        const currentTime = formatTime(audio.currentTime);
        const duration = formatTime(audio.duration);
        
        currentTimeDisplay.textContent = currentTime;
        if (!isNaN(audio.duration)) {
            durationDisplay.textContent = duration;
        }
        
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressIndicator.style.width = progressPercent + '%';
    });
    
    // Loaded metadata event
    audio.addEventListener('loadedmetadata', function() {
        durationDisplay.textContent = formatTime(audio.duration);
    });
    
    // Ended event
    audio.addEventListener('ended', function() {
        playPauseIcon.className = 'fas fa-play';
        waveformContainer.classList.remove('playing');
        progressIndicator.style.width = '0%';
        audio.currentTime = 0;
    });
    
    // Format time in MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    }
}

// Generate a simulated waveform for a beat
function generateWaveform(container, peaks = 50) {
    const waveform = container.querySelector('.waveform');
    waveform.innerHTML = '';
    
    for (let i = 0; i < peaks; i++) {
        const height = Math.random() * 80 + 20; // Random height between 20% and 100%
        const bar = document.createElement('div');
        bar.className = 'waveform-bar';
        bar.style.height = height + '%';
        waveform.appendChild(bar);
    }
}

// Add BPM and key detection functionality (simulated)
function detectBpmAndKey(audioElement) {
    // In a real implementation, this would analyze the audio file
    // For this demo, we'll return random values
    const bpmValues = [80, 85, 90, 95, 100, 110, 120, 128, 140];
    const keyValues = ['C Major', 'A Minor', 'G Major', 'E Minor', 'F Major', 'D Minor'];
    
    const bpm = bpmValues[Math.floor(Math.random() * bpmValues.length)];
    const key = keyValues[Math.floor(Math.random() * keyValues.length)];
    
    return { bpm, key };
}

// Generate beat tags based on audio characteristics (simulated)
function generateBeatTags(audioElement) {
    // In a real implementation, this would analyze the audio file
    // For this demo, we'll return random values
    const genres = ['Hip-Hop', 'Trap', 'R&B', 'Pop', 'Lo-Fi', 'Drill'];
    const moods = ['Dark', 'Chill', 'Energetic', 'Emotional', 'Aggressive'];
    
    const selectedGenres = [];
    const selectedMoods = [];
    
    // Select 1-2 random genres
    const genreCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < genreCount; i++) {
        const genre = genres[Math.floor(Math.random() * genres.length)];
        if (!selectedGenres.includes(genre)) {
            selectedGenres.push(genre);
        }
    }
    
    // Select 1 random mood
    const mood = moods[Math.floor(Math.random() * moods.length)];
    selectedMoods.push(mood);
 
(Content truncated due to size limit. Use line ranges to read in chunks)