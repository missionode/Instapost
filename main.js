document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const form = document.getElementById('instapost-form');
    const outputArea = document.getElementById('prompt-output');

    // Load saved brand data on initialization (functions from storage.js)
    if (typeof loadBrandData === 'function') {
        const savedData = loadBrandData();
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.elements[key];
                if (field) {
                    field.value = savedData[key];
                }
            });
        }
    }

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Save semi-static fields (function from storage.js)
            if (typeof saveBrandData === 'function') {
                saveBrandData(data);
            }
            
            generatePrompt(data);
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

    function generatePrompt(data) {
        // Use the real prompt generation engine from engine.js
        if (typeof generatePromptText === 'function') {
            outputArea.value = generatePromptText(data);
        } else {
            // Fallback placeholder
            const placeholderPrompt = `DESIGN TYPE: ${data.design_type}
BRAND: ${data.brand}
HOOK: ${data.hook}
OFFER: ${data.event_offer}
LOCATION: ${data.location_details}
PHONE: ${data.phone || 'N/A'}
WHATSAPP: ${data.whatsapp || 'N/A'}
EMAIL: ${data.email || 'N/A'}
SOCIAL: ${data.social_handles}

[Engine not loaded correctly]`;
            outputArea.value = placeholderPrompt;
        }
    }
});
