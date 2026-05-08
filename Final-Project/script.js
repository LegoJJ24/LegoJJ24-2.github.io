// Campaign data array - easy to update or fetch from an API later
const campaigns = [
    {
        title: "Curse of Stradh",
        cover: "images/Curse of Strahd.jpg",
        youtube: "https://www.youtube.com/playlist?list=PL3oV2T3K57dEYP-o0w1qExPpmJwdXu1nV",
        github: "https://github.com/LegoJJ24/..." 
    },
    {
        
    }
];

function loadCampaigns() {
    const container = document.getElementById('campaign-list');
    
    campaigns.forEach(campaign => {
        const card = document.createElement('article');
        card.className = 'campaign-card';
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${campaign.cover}" alt="${campaign.title} Book Cover">
            </div>
            <div class="card-content">
                <h3>${campaign.title}</h3>
                <div class="card-links">
                    <a href="${campaign.youtube}" target="_blank" class="link-btn">Sessions</a>
                    <a href="${campaign.github}" target="_blank" class="link-btn">Code</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initializing the load [cite: 56]
document.addEventListener('DOMContentLoaded', loadCampaigns);
