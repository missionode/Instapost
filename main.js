document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const form = document.getElementById('instapost-form');
    const outputArea = document.getElementById('prompt-output');
    const aiContentToggle = document.getElementById('ai_content_mode');
    const manualContentFields = document.getElementById('manual_content_fields');
    const aiContentNote = document.getElementById('ai_content_note');
    const logoToggle = document.getElementById('enable_logo');
    const logoContainer = document.getElementById('logo_input_container');
    const downloadBtn = document.getElementById('download-db-btn');
    const uploadBtn = document.getElementById('upload-db-btn');

    // Anchor Mode Elements
    const anchorModes = document.querySelectorAll('input[name="anchor_mode"]');
    const festivePane = document.getElementById('input_festive');
    const artisanPane = document.getElementById('input_artisan');
    const aiPane = document.getElementById('input_ai');
    const subjectSelection = document.getElementById('subject_selection');
    
    const festiveInput = document.getElementById('festive_info');
    const dressInput = document.getElementById('dress_reference');
    const festiveToggle = document.getElementById('festive_mode'); // Hidden checkbox

    // Handle Anchor Mode Switching
    anchorModes.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = radio.value;
            
            // 1. Switch visibility
            festivePane.classList.add('d-none');
            artisanPane.classList.add('d-none');
            aiPane.classList.add('d-none');
            subjectSelection.classList.remove('d-none');

            // 2. Clear inactive fields to prevent collision
            if (mode === 'festive') {
                festivePane.classList.remove('d-none');
                dressInput.value = '';
                festiveToggle.checked = true;
            } else if (mode === 'artisan') {
                artisanPane.classList.remove('d-none');
                festiveInput.value = '';
                festiveToggle.checked = false;
            } else {
                aiPane.classList.remove('d-none');
                subjectSelection.classList.add('d-none'); // Hide subjects for full AI freedom
                festiveInput.value = '';
                dressInput.value = '';
                festiveToggle.checked = false;
            }
        });
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

    // Handle Download/Upload
    downloadBtn.addEventListener('click', () => {
        if (typeof exportData === 'function') exportData();
    });

    uploadBtn.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file && typeof importData === 'function') {
                importData(file, () => {
                    alert('Data imported! Reloading...');
                    window.location.reload();
                });
            }
        };
        fileInput.click();
    });

    // Initialize Tooltip
    let copyTooltip;
    if (typeof bootstrap !== 'undefined') {
        copyTooltip = new bootstrap.Tooltip(copyBtn);
    }

    // Load Persistence
    if (typeof loadBrandData === 'function') {
        const savedData = loadBrandData();
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.elements[key];
                if (field) {
                    if (field instanceof RadioNodeList) {
                        for (const radio of field) {
                            if (radio.value === savedData[key]) radio.checked = true;
                        }
                    } else if (field.type === 'checkbox') {
                        field.checked = savedData[key] === 'on' || savedData[key] === true;
                        field.dispatchEvent(new Event('change'));
                    } else {
                        field.value = savedData[key];
                    }
                }
            });
            // After loading, ensure correct anchor visibility
            const activeAnchor = document.querySelector('input[name="anchor_mode"]:checked');
            if (activeAnchor) activeAnchor.dispatchEvent(new Event('change'));
        }
    }

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // FormData only includes checked checkboxes. 
            // We need to explicitly handle unchecked ones for isGroupMode logic
            const categories = ['subject_men', 'subject_women', 'subject_kids'];
            categories.forEach(cat => {
                data[cat] = document.getElementById(cat).checked;
            });

            if (typeof saveBrandData === 'function') saveBrandData(data);
            
            generatePrompt(data);
        } else {
            form.reportValidity();
        }
    });

    copyBtn.addEventListener('click', () => {
        const text = outputArea.value;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                const originalTitle = copyBtn.getAttribute('data-bs-original-title') || 'Copy to clipboard';
                if (copyTooltip) {
                    copyBtn.setAttribute('data-bs-original-title', 'Copied!');
                    copyTooltip.show();
                    setTimeout(() => {
                        copyBtn.setAttribute('data-bs-original-title', originalTitle);
                        copyTooltip.hide();
                    }, 2000);
                }
            });
        }
    });

    function generatePrompt(data) {
        if (typeof generatePromptText === 'function') {
            outputArea.value = generatePromptText(data);
        } else {
            outputArea.value = "Error: Prompt engine not loaded.";
        }
    }
});
