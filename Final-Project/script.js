// Function to handle link clicks or interactions
document.addEventListener('DOMContentLoaded', () => {
    console.log("The Adventurer's Guild Archive Loaded.");

    const campaignLinks = document.querySelectorAll('.campaign-link');
    
    campaignLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Placeholder for future multi-page navigation [cite: 5]
            console.log(`Navigating to details for: ${link.textContent.trim()}`);
        });
    });

    // YouTube API Integration Placeholder [cite: 28]
    // To be expanded for dynamic recording updates
    async function fetchLatestRecordings() {
        try {
            // logic for YouTube Data API would go here [cite: 50]
            console.log("Fetching latest campaign sessions...");
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
        }
    }
});
