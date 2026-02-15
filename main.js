document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const form = document.getElementById('instapost-form');
    const outputArea = document.getElementById('prompt-output');
    const festiveToggle = document.getElementById('festive_mode');
    const festiveContainer = document.getElementById('festive_input_container');
    const aiContentToggle = document.getElementById('ai_content_mode');
    const manualContentFields = document.getElementById('manual_content_fields');
    const aiContentNote = document.getElementById('ai_content_note');
    const logoToggle = document.getElementById('enable_logo');
    const logoContainer = document.getElementById('logo_input_container');
    const downloadBtn = document.getElementById('download-db-btn');
    const uploadBtn = document.getElementById('upload-db-btn');

    // Create a hidden file input for uploading
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Toggle Festive Input
    festiveToggle.addEventListener('change', () => {
        if (festiveToggle.checked) {
            festiveContainer.classList.remove('d-none');
        } else {
            festiveContainer.classList.add('d-none');
        }
    });

    // Toggle Logo Input
    logoToggle.addEventListener('change', () => {
        if (logoToggle.checked) {
            logoContainer.classList.remove('d-none');
        } else {
            logoContainer.classList.add('d-none');
        }
    });

    // Toggle AI Content Fields
    aiContentToggle.addEventListener('change', () => {
        if (aiContentToggle.checked) {
            manualContentFields.classList.add('d-none');
            aiContentNote.classList.remove('d-none');
        } else {
            manualContentFields.classList.remove('d-none');
            aiContentNote.classList.add('d-none');
        }
    });

    // Handle Download
    downloadBtn.addEventListener('click', () => {
        if (typeof exportData === 'function') {
            exportData();
        }
    });

    // Handle Upload
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && typeof importData === 'function') {
            importData(file, (data) => {
                alert('Data imported successfully! Reloading...');
                window.location.reload();
            });
        }
    });

    // Initialize Bootstrap Tooltip
    let copyTooltip;
    if (typeof bootstrap !== 'undefined') {
        copyTooltip = new bootstrap.Tooltip(copyBtn);
    }

    // Load saved brand data on initialization (functions from storage.js)
    if (typeof loadBrandData === 'function') {
        const savedData = loadBrandData();
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.elements[key];
                if (field) {
                    if (field instanceof RadioNodeList) {
                        // Handle radio buttons (creative_type)
                        for (const radio of field) {
                            if (radio.value === savedData[key]) {
                                radio.checked = true;
                            }
                        }
                    } else if (field.type === 'checkbox') {
                        field.checked = savedData[key] === 'on' || savedData[key] === true;
                        // Trigger change events to update UI visibility
                        field.dispatchEvent(new Event('change'));
                    } else {
                        // Handle text inputs and select fields
                        field.value = savedData[key];
                    }
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

    copyBtn.addEventListener('click', () => {
        const text = outputArea.value;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                // Update tooltip text temporarily
                const originalTitle = copyBtn.getAttribute('data-bs-original-title') || 'Copy to clipboard';
                
                if (copyTooltip) {
                    copyBtn.setAttribute('data-bs-original-title', 'Copied!');
                    copyTooltip.show();
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyBtn.setAttribute('data-bs-original-title', originalTitle);
                        copyTooltip.hide();
                    }, 2000);
                }
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    });

    function generatePrompt(data) {
        // Use the real prompt generation engine from engine.js
        if (typeof generatePromptText === 'function') {
            outputArea.value = generatePromptText(data);
        } else {
            // Fallback
            outputArea.value = "Error: Prompt engine not loaded.";
        }
    }
});
