// Sample beat data for the website
const beats = [
  {
    id: 1,
    title: "Midnight Vibes",
    genre: "Hip-Hop",
    bpm: 90,
    key: "C Minor",
    audioFile: "audio/beat1.mp3",
    coverArt: "images/beat1.jpg",
    description: "Smooth hip-hop beat with atmospheric pads and punchy drums.",
    tags: ["Hip-Hop", "Chill", "Atmospheric"]
  },
  {
    id: 2,
    title: "Trap Soul",
    genre: "Trap",
    bpm: 140,
    key: "G Minor",
    audioFile: "audio/beat2.mp3",
    coverArt: "images/beat2.jpg",
    description: "Hard-hitting trap beat with soulful melodies and 808s.",
    tags: ["Trap", "Dark", "808"]
  },
  {
    id: 3,
    title: "Summer Waves",
    genre: "R&B",
    bpm: 95,
    key: "F Major",
    audioFile: "audio/beat3.mp3",
    coverArt: "images/beat3.jpg",
    description: "Smooth R&B beat with warm chords and snappy percussion.",
    tags: ["R&B", "Chill", "Melodic"]
  },
  {
    id: 4,
    title: "Future Bounce",
    genre: "Pop",
    bpm: 128,
    key: "A Minor",
    audioFile: "audio/beat4.mp3",
    coverArt: "images/beat4.jpg",
    description: "Energetic pop beat with bouncy synths and catchy melodies.",
    tags: ["Pop", "Energetic", "Dance"]
  },
  {
    id: 5,
    title: "Drill Time",
    genre: "Drill",
    bpm: 140,
    key: "E Minor",
    audioFile: "audio/beat5.mp3",
    coverArt: "images/beat5.jpg",
    description: "Hard UK drill beat with sliding 808s and dark melodies.",
    tags: ["Drill", "Dark", "UK"]
  },
  {
    id: 6,
    title: "Lo-Fi Dreams",
    genre: "Lo-Fi",
    bpm: 85,
    key: "D Minor",
    audioFile: "audio/beat6.mp3",
    coverArt: "images/beat6.jpg",
    description: "Relaxing lo-fi beat with vinyl crackle and mellow piano.",
    tags: ["Lo-Fi", "Chill", "Relaxing"]
  }
];

// Sample remix data for the website
const remixes = [
  {
    id: 1,
    title: "Summer Hits Remix",
    originalArtist: "Various Artists",
    genre: "Pop",
    bpm: 110,
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverArt: "images/remix1.jpg",
    description: "A mashup of the biggest summer hits, remixed for the dance floor.",
    tags: ["Pop", "Dance", "Remix"]
  },
  {
    id: 2,
    title: "Hip-Hop Classics Remix",
    originalArtist: "Various Artists",
    genre: "Hip-Hop",
    bpm: 95,
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverArt: "images/remix2.jpg",
    description: "Classic hip-hop tracks reimagined with modern production.",
    tags: ["Hip-Hop", "Remix", "Classic"]
  },
  {
    id: 3,
    title: "EDM Festival Mix",
    originalArtist: "Various Artists",
    genre: "EDM",
    bpm: 128,
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverArt: "images/remix3.jpg",
    description: "High-energy EDM remixes perfect for festival season.",
    tags: ["EDM", "Festival", "Dance"]
  },
  {
    id: 4,
    title: "R&B Slow Jams Remix",
    originalArtist: "Various Artists",
    genre: "R&B",
    bpm: 70,
    youtubeEmbed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    coverArt: "images/remix4.jpg",
    description: "Smooth R&B slow jams remixed with a modern twist.",
    tags: ["R&B", "Slow", "Remix"]
  }
];

// Sample cover art data for the website
const coverArt = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "Your Name",
    image: "images/cover1.jpg",
    description: "Neon-themed cover art with futuristic city vibes.",
    tags: ["Neon", "Futuristic", "City"]
  },
  {
    id: 2,
    title: "Abstract Waves",
    artist: "Your Name",
    image: "images/cover2.jpg",
    description: "Abstract wave patterns with vibrant colors.",
    tags: ["Abstract", "Waves", "Colorful"]
  },
  {
    id: 3,
    title: "Minimal Beats",
    artist: "Your Name",
    image: "images/cover3.jpg",
    description: "Minimalist design with geometric shapes.",
    tags: ["Minimal", "Geometric", "Clean"]
  },
  {
    id: 4,
    title: "Urban Vibes",
    artist: "Your Name",
    image: "images/cover4.jpg",
    description: "Urban-themed cover art with graffiti elements.",
    tags: ["Urban", "Graffiti", "Street"]
  },
  {
    id: 5,
    title: "Retro Sunset",
    artist: "Your Name",
    image: "images/cover5.jpg",
    description: "Retro-style sunset with vaporwave aesthetics.",
    tags: ["Retro", "Sunset", "Vaporwave"]
  },
  {
    id: 6,
    title: "Dark Mood",
    artist: "Your Name",
    image: "images/cover6.jpg",
    description: "Dark and moody cover art with atmospheric elements.",
    tags: ["Dark", "Moody", "Atmospheric"]
  },
  {
    id: 7,
    title: "Glitch Art",
    artist: "Your Name",
    image: "images/cover7.jpg",
    description: "Glitch art style with digital distortion effects.",
    tags: ["Glitch", "Digital", "Distortion"]
  },
  {
    id: 8,
    title: "Space Journey",
    artist: "Your Name",
    image: "images/cover8.jpg",
    description: "Space-themed cover art with cosmic elements.",
    tags: ["Space", "Cosmic", "Galaxy"]
  }
];

// Function to generate DMCA disclaimer
function generateDMCADisclaimer(originalArtist) {
  return `Vocals used under Fair Use—non-profit only. Original vocals by ${originalArtist}.`;
}

// Function to generate SEO title
function generateSEOTitle(beatTitle, genre) {
  const currentYear = new Date().getFullYear();
  return `${beatTitle} | ${genre} Type Beat ${currentYear} | Free Download`;
}

// Function to generate SEO description
function generateSEODescription(beatTitle, genre, bpm, key) {
  return `Download "${beatTitle}" - a ${genre} type beat (${bpm} BPM, ${key}) for free. High-quality instrumental for your next project.`;
}

// Export the data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    beats,
    remixes,
    coverArt,
    generateDMCADisclaimer,
    generateSEOTitle,
    generateSEODescription
  };
}
