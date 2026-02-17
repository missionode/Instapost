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

    // Hidden Festive Toggle for engine compatibility
    const festiveInput = document.getElementById('festive_mode');

    // Create a hidden file input for uploading
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Tab Syncing: Set festive_mode checkbox based on active tab
    const syncFestiveMode = () => {
        const activeTabId = document.querySelector('#aestheticTab .nav-link.active').id;
        festiveInput.checked = (activeTabId === 'festive-tab');
    };

    // Listen for tab changes
    document.querySelectorAll('#aestheticTab button').forEach(tabEl => {
        tabEl.addEventListener('shown.bs.tab', () => {
            syncFestiveMode();
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
                        for (const radio of field) {
                            if (radio.value === savedData[key]) {
                                radio.checked = true;
                            }
                        }
                    } else if (field.type === 'checkbox') {
                        field.checked = savedData[key] === 'on' || savedData[key] === true;
                        field.dispatchEvent(new Event('change'));
                    } else {
                        field.value = savedData[key];
                    }
                }
            });
        }
    }

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            syncFestiveMode(); // Ensure festive mode is correct before gathering data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Save semi-static fields
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
                const originalTitle = copyBtn.getAttribute('data-bs-original-title') || 'Copy to clipboard';
                if (copyTooltip) {
                    copyBtn.setAttribute('data-bs-original-title', 'Copied!');
                    copyTooltip.show();
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
        if (typeof generatePromptText === 'function') {
            // Prioritize Active Tab Data for the prompt engine (Mutual Exclusivity)
            const activeTabId = document.querySelector('#aestheticTab .nav-link.active').id;
            
            if (activeTabId === 'festive-tab') {
                // Anchor 1: Festive Special
                data.dress_reference = ''; // Force hide URL from engine
                data.festive_mode = 'on';
            } else if (activeTabId === 'url-tab') {
                // Anchor 2: Artisan Spotlight
                data.festive_info = ''; // Force hide Festival from engine
                data.festive_mode = '';
            } else {
                // Anchor 3: AI Full Auto
                data.festive_info = '';
                data.festive_mode = '';
                data.dress_reference = '';
            }

            // Marketing Content (data.hook, data.event_offer) are persistent and always sent.

            outputArea.value = generatePromptText(data);
        } else {
            outputArea.value = "Error: Prompt engine not loaded.";
        }
    }
});
