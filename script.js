document.addEventListener('DOMContentLoaded', () => {
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

    // Scroll Airplane Animation
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Total scrollable height
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        
        // Ensure scroll percentage is between 0 and 1
        const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        const plane = document.getElementById('scrollPlane');
        if(plane) {
            // Screen dimensions
            const w = window.innerWidth;
            const h = window.innerHeight;
            
            // X goes from left (-50px) to right (w + 50px)
            const x = (scrollPercent * (w + 100)) - 50;
            
            // Y uses a slight sine wave to look like flying, starting from top quarter down to middle
            const y = (h * 0.2) + Math.sin(scrollPercent * Math.PI) * (h * 0.4);
            
            // Rotation tilts the plane as it moves up and down
            const slope = Math.cos(scrollPercent * Math.PI);
            const rotation = 45 + (slope * 20); // base 45 degrees, tilts up to +/- 20 degrees
            
            plane.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        }
    });
});

