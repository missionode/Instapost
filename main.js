document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const form = document.getElementById('instapost-form');
    const outputArea = document.getElementById('prompt-output');

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            generatePrompt();
        } else {
            form.reportValidity();
        }
    });

    window.copyPrompt = function() {
        const text = outputArea.value;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Prompt copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    function generatePrompt() {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Placeholder for the actual prompt generation logic (to be implemented in Phase 2)
        const placeholderPrompt = `DESIGN TYPE: ${data.design_type}
BRAND: ${data.brand}
HOOK: ${data.hook}
OFFER: ${data.event_offer}
LOCATION: ${data.location_details}
PHONE: ${data.phone || 'N/A'}
WHATSAPP: ${data.whatsapp || 'N/A'}
EMAIL: ${data.email || 'N/A'}
SOCIAL: ${data.social_handles}

[Full prompt generation engine is coming in Phase 2]`;
        
        outputArea.value = placeholderPrompt;
    }
});
