document.addEventListener('DOMContentLoaded', () => {
    console.log("Adventurer's Guild Notice Board Initialized.");

    const campaignLinks = document.querySelectorAll('.campaign-link');

    campaignLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const campaignName = link.querySelector('h2').textContent;
            
            console.log(`Loading Guild Archives for: ${campaignName}`);
        });
    });
});
