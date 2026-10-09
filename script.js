document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const title = heroTitle.textContent.trim();
        const mobileBreakIndex = title.indexOf('BEYOND') + 'BEYOND'.length;
        heroTitle.setAttribute('aria-label', title);
        const titleNodes = Array.from(title, (character, index) => {
            if (index === mobileBreakIndex && character === ' ') {
                const lineBreak = document.createElement('br');
                lineBreak.className = 'mobile-title-break';
                lineBreak.setAttribute('aria-hidden', 'true');
                return [lineBreak];
            }

            const letter = document.createElement('span');
            letter.className = 'hero-letter';
            letter.setAttribute('aria-hidden', 'true');
            letter.textContent = character;
            letter.style.setProperty('--letter-index', index);
            letter.style.setProperty('--letter-direction', index % 2 === 0 ? '-1' : '1');
            return [letter];
        }).flat();
        heroTitle.replaceChildren(...titleNodes);
    }

    // Set default date to tomorrow
    const dateInput = document.getElementById('travelDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    dateInput.value = `${yyyy}-${mm}-${dd}`;

    const flightForm = document.getElementById('flightForm');
    
    // REPLACE THIS WITH YOUR ACTUAL WHATSAPP NUMBER (including country code, e.g., 91 for India)
    // Do not include +, spaces, or dashes. Just the numbers.
    const whatsappNumber = "919645391161"; 

    flightForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const from = document.getElementById('fromLocation').value;
        const to = document.getElementById('toLocation').value;
        const date = document.getElementById('travelDate').value;
        const passengers = document.getElementById('passengers').value;

        // Construct the custom message
        const message = `Hello HR Tourism! ✈️\n\nI would like to get a price quote for a flight:\n\n🛫 *From:* ${from}\n🛬 *To:* ${to}\n📅 *Date:* ${date}\n👥 *Passengers:* ${passengers}\n\nPlease let me know the best available options and prices. Thank you!`;

        // Encode the message for the URL
        const encodedMessage = encodeURIComponent(message);

        // Create the WhatsApp link
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
    });

    // Optional: Swap button logic
    const swapIcon = document.querySelector('.swap-icon i');
    if (swapIcon) {
        swapIcon.addEventListener('click', () => {
            const fromInput = document.getElementById('fromLocation');
            const toInput = document.getElementById('toLocation');
            
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        });
    }

    // Scroll travel animations
    const updateTravelAnimations = () => {
        const scrollY = window.scrollY;
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
        const width = window.innerWidth;
        const height = window.innerHeight;

        const plane = document.getElementById('scrollPlane');
        if (plane) {
            const x = (scrollPercent * (width + 100)) - 50;
            const y = (height * 0.2) + Math.sin(scrollPercent * Math.PI) * (height * 0.4);
            const slope = Math.cos(scrollPercent * Math.PI);
            const rotation = 45 + (slope * 20);
            plane.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }

        const train = document.getElementById('scrollTrain');
        if (train) {
            const trainStart = 0.28;
            const trainEnd = 0.58;
            const trainProgress = Math.min(1, Math.max(0, (scrollPercent - trainStart) / (trainEnd - trainStart)));
            const trainX = (trainProgress * (width + 160)) - 80;
            const trainY = height * 0.78;

            train.style.transform = `translate(${trainX}px, ${trainY}px)`;
            train.style.opacity = String(Math.sin(trainProgress * Math.PI) * 0.72);
        }
    };

    window.addEventListener('scroll', updateTravelAnimations, { passive: true });
    window.addEventListener('resize', updateTravelAnimations);
    updateTravelAnimations();
});

