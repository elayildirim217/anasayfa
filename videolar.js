// Video Data Structure
// You can add more videos to these lists.
// Just add a new line: { title: "Video Title", id: "YOUTUBE_VIDEO_ID" },
const videoCategories = {
    english: [
        { title: "Alphabet Song", id: "CCRRbXbcj78" },
        { title: "Colors Song", id: "z0HZNaM7gTg" },
        { title: "Numbers 1-10", id: "DR-cfDsHCGA" }
    ],
    sports: [
        { title: "Short Track Finali", id: "542312323" },
        { title: "Milli Sporcumuz", id: "878765432" }
    ],
    series: [
        { title: "Cartoons Episode 1", id: "1234567890" }, // Placeholder
        { title: "Cartoons Episode 2", id: "0987654321" }  // Placeholder
    ],
    movies: [
        { title: "Funny Movie Clip", id: "abcdefghij" },    // Placeholder
        { title: "Action Scene", id: "jklmnopqrs" }         // Placeholder
    ],
    turkish: [
        { title: "Çocuk Şarkıları", id: "7654321098" },     // Placeholder
        { title: "Masal Dinle", id: "5432167890" }          // Placeholder
    ]
};

const categoryTitles = {
    english: "🇬🇧 İngilizce Videolarım",
    sports: "⛸️ Spor Videoları",
    series: "📺 Sevdiğimiz Diziler",
    movies: "🍿 Sevdiğimiz Filmler",
    turkish: "🇹🇷 Türkçe Videolarım"
};

// Function to handle shelf clicks (Accordion Style)
function toggleShelf(categoryKey) {
    const containerId = `videos-${categoryKey}`;
    const selectedContainer = document.getElementById(containerId);

    // Find all shelves and video containers
    const allContainers = document.querySelectorAll('.shelf-videos');
    const allShelves = document.querySelectorAll('.shelf');

    // Check if the clicked shelf is already open
    const isAlreadyOpen = selectedContainer.classList.contains('active');

    // Close ALL shelves first
    allContainers.forEach(container => {
        container.classList.remove('active');
        container.innerHTML = ''; // Clear content to stop videos/save memory
    });

    allShelves.forEach(shelf => {
        shelf.classList.remove('active-shelf');
    });

    // If it wasn't already open, open it now
    if (!isAlreadyOpen) {
        selectedContainer.classList.add('active');

        // Find the shelf element that was clicked (approximate way by matching onclick or index)
        // A better way is to pass 'this' but we used categoryKey. 
        // We can just rely on the onclick adding a class if we changed HTML, 
        // but let's iterate to find the one matching the category for visual styling.
        // Actually, let's just find it by index or logic. 
        // Simpler: iterate shelves and check if their onclick attribute contains the key.
        // Or updated HTML to include IDs on shelves. 

        // Let's assume the user clicked the shelf that corresponds to this container.
        // We can use event.currentTarget if we passed 'event' but we didn't.
        // Let's add IDs to shelves in HTML on next pass if needed, but for now:
        // We will just find the shelf that corresponds to this category.
        // Since we didn't add IDs to shelves, let's skip the 'active-shelf' visual style on the shelf div itself for a micro-second 
        // OR add IDs to shelves. 
        // Actually, we can use the 'onclick' attribute to find the shelf.
        const targetShelf = Array.from(allShelves).find(s => s.getAttribute('onclick').includes(`'${categoryKey}'`));
        if (targetShelf) targetShelf.classList.add('active-shelf');

        renderVideos(categoryKey, selectedContainer);
    }
}

function renderVideos(category, container) {
    const videos = videoCategories[category];

    if (!videos || videos.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:10px;">Bu rafta henüz video yok.</p>';
        return;
    }

    const grid = document.createElement('div');
    grid.className = 'video-grid';

    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.onclick = () => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');

        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';
        thumbnail.style.backgroundImage = `url('https://img.youtube.com/vi/${video.id}/mqdefault.jpg')`;

        const playIcon = document.createElement('div');
        playIcon.className = 'play-icon';
        playIcon.textContent = '▶';

        const title = document.createElement('div');
        title.className = 'video-title';
        title.textContent = video.title;

        thumbnail.appendChild(playIcon);
        card.appendChild(thumbnail);
        card.appendChild(title);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}
