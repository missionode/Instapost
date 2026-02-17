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

    // Initialize Tooltips
    let copyTooltip;
    if (typeof bootstrap !== 'undefined' && copyBtn) {
        copyTooltip = new bootstrap.Tooltip(copyBtn);
    }

    // Anchor Mode Elements
    const anchorModes = document.querySelectorAll('input[name="anchor_mode"]');
    const festivePane = document.getElementById('input_festive');
    const artisanPane = document.getElementById('input_artisan');
    const aiPane = document.getElementById('input_ai');
    
    const festiveToggle = document.getElementById('festive_mode'); // Hidden checkbox
    const artisanContainer = document.getElementById('artisan-collection-container');
    const addArtisanBtn = document.getElementById('add-artisan-row');
    const targetSubjectsContainer = document.getElementById('target_subjects_container');

    const festiveCategories = ['subject_men', 'subject_women', 'subject_kids'];

    // --- Core Functions ---
    const getCollectedData = () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Explicitly handle all checkboxes to ensure 'false' states are saved
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            if (cb.name) data[cb.name] = cb.checked;
        });

        // Handle Festive Checkboxes (redundant due to loop above but kept for clarity)
        festiveCategories.forEach(cat => {
            const el = document.getElementById(cat);
            if (el) data[cat] = el.checked;
        });

        // Handle Artisan Collection Data
        const activeAnchorEl = document.querySelector('input[name="anchor_mode"]:checked');
        const activeAnchor = activeAnchorEl ? activeAnchorEl.value : 'festive';
        const directUpload = document.getElementById('artisan_direct_upload').checked;

        if (activeAnchor === 'artisan') {
            const rows = artisanContainer.querySelectorAll('.artisan-row');
            const collection = Array.from(rows).map((row, index) => {
                const urlVal = row.querySelector('.artisan-url').value.trim();
                const subjectVal = row.querySelector('.artisan-subject').value;
                const effectiveUrl = (urlVal === '' && directUpload) ? `dress_ref_${index + 1}` : urlVal;
                return { url: effectiveUrl, subject: subjectVal };
            }).filter(item => item.url !== '');
            
            data.artisan_collection = collection;
            if (collection.length > 0) {
                data.dress_reference = collection.map(c => c.url).join(', ');
            } else if (directUpload) {
                data.dress_reference = "primary_dress_upload";
            }
        }

        // Handle Logo placeholders
        if (data.enable_logo) {
            const lightLogo = document.getElementById('logo_light').value.trim();
            const darkLogo = document.getElementById('logo_dark').value.trim();
            const logoDirectUpload = document.getElementById('logo_direct_upload').checked;
            
            if (lightLogo === '' && logoDirectUpload) data.logo_light = 'light_logo_upload.png';
            if (darkLogo === '' && logoDirectUpload) data.logo_dark = 'dark_logo_upload.png';
        }

        // Handle AI Copy Logic explicitly
        const aiCopyEnabled = document.getElementById('ai_content_mode').checked;
        data.ai_content_mode = aiCopyEnabled ? 'on' : 'off';

        return data;
    };

    const autoSave = () => {
        const data = getCollectedData();
        if (typeof saveBrandData === 'function') saveBrandData(data);
    };

    const syncLogoUI = () => {
        const isLogoEnabled = logoToggle.checked;
        const logoDirectUpload = document.getElementById('logo_direct_upload');
        const lightLogoInput = document.getElementById('logo_light');
        const darkLogoInput = document.getElementById('logo_dark');

        if (!isLogoEnabled) {
            logoContainer.classList.add('diminished');
            lightLogoInput.disabled = true;
            darkLogoInput.disabled = true;
            logoDirectUpload.disabled = true;
        } else {
            logoContainer.classList.remove('diminished');
            logoDirectUpload.disabled = false;

            if (logoDirectUpload.checked) {
                lightLogoInput.disabled = true;
                darkLogoInput.disabled = true;
                lightLogoInput.parentElement.classList.add('diminished');
                darkLogoInput.parentElement.classList.add('diminished');
            } else {
                lightLogoInput.disabled = false;
                darkLogoInput.disabled = false;
                lightLogoInput.parentElement.classList.remove('diminished');
                darkLogoInput.parentElement.classList.remove('diminished');
            }
        }
    };

    const syncArtisanUI = () => {
        const isDirectUpload = document.getElementById('artisan_direct_upload').checked;
        const rows = artisanContainer.querySelectorAll('.artisan-row');
        
        rows.forEach((row, index) => {
            const urlInput = row.querySelector('.artisan-url');
            if (isDirectUpload) {
                urlInput.placeholder = `dress_ref_${index + 1}`;
                // Optional: Dim if empty? No, keep it clear
            } else {
                urlInput.placeholder = "Paste dress image URL";
            }
        });
    };

    const syncAIContentUI = () => {
        if (aiContentToggle.checked) {
            manualContentFields.classList.add('d-none');
            aiContentNote.classList.remove('d-none');
        } else {
            manualContentFields.classList.remove('d-none');
            aiContentNote.classList.add('d-none');
        }
    };

    // --- Artisan Collection Builder Logic ---
    const createArtisanRow = (url = '', subject = 'Women') => {
        const row = document.createElement('div');
        row.className = 'artisan-row row g-2 mb-3 align-items-center';
        
        // Check current checkbox state for initial placeholder
        const isDirectUpload = document.getElementById('artisan_direct_upload').checked;
        const rowCount = artisanContainer.querySelectorAll('.artisan-row').length;
        const placeholder = isDirectUpload ? `dress_ref_${rowCount + 1}` : "Paste dress image URL";

        row.innerHTML = `
            <div class="col-md-7">
                <input type="text" class="form-control border-0 bg-light artisan-url" placeholder="${placeholder}" value="${url}">
            </div>
            <div class="col-md-4">
                <select class="form-select border-0 bg-light artisan-subject">
                    <option value="Women" ${subject === 'Women' ? 'selected' : ''}>Women's Wear</option>
                    <option value="Men" ${subject === 'Men' ? 'selected' : ''}>Men's Wear</option>
                    <option value="Kids" ${subject === 'Kids' ? 'selected' : ''}>Kids' Wear</option>
                </select>
            </div>
            <div class="col-md-1 text-end">
                <button type="button" class="btn btn-link text-danger p-0 remove-artisan-row" title="Remove model">
                    <i class="bi bi-x-circle-fill fs-5"></i>
                </button>
            </div>
        `;
        
        row.querySelector('.remove-artisan-row').addEventListener('click', () => {
            row.remove();
            updateRemoveButtons();
            syncArtisanUI(); // Recalculate placeholders on removal
        });
        
        // Add autoSave listener to the new input
        row.querySelector('.artisan-url').addEventListener('input', autoSave);
        
        return row;
    };

    const updateRemoveButtons = () => {
        const rows = artisanContainer.querySelectorAll('.artisan-row');
        rows.forEach(row => {
            const btn = row.querySelector('.remove-artisan-row');
            if (rows.length === 1) btn.classList.add('d-none');
            else btn.classList.remove('d-none');
        });
    };

    addArtisanBtn.addEventListener('click', () => {
        artisanContainer.appendChild(createArtisanRow());
        updateRemoveButtons();
        syncArtisanUI(); // Ensure new row gets correct placeholder
    });

    const resetArtisanRows = () => {
        artisanContainer.innerHTML = '';
        artisanContainer.appendChild(createArtisanRow());
        updateRemoveButtons();
        syncArtisanUI();
    };

    // --- Mode Switching ---
    anchorModes.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = radio.value;
            festivePane.classList.add('d-none');
            artisanPane.classList.add('d-none');
            aiPane.classList.add('d-none');

            if (mode === 'festive') {
                festivePane.classList.remove('d-none');
                targetSubjectsContainer.classList.remove('d-none');
                resetArtisanRows();
                festiveToggle.checked = true;
            } else if (mode === 'artisan') {
                artisanPane.classList.remove('d-none');
                targetSubjectsContainer.classList.add('d-none');
                document.getElementById('festive_info').value = '';
                festiveToggle.checked = false;
            } else {
                aiPane.classList.remove('d-none');
                targetSubjectsContainer.classList.remove('d-none');
                resetArtisanRows();
                document.getElementById('festive_info').value = '';
                festiveToggle.checked = false;
            }
            autoSave();
        });
    });

    // Toggle Logo Input
    logoToggle.addEventListener('change', () => {
        syncLogoUI();
        autoSave();
    });

    // Add listeners for direct upload checkboxes
    document.getElementById('logo_direct_upload').addEventListener('change', () => {
        syncLogoUI();
        autoSave();
    });
    
    document.getElementById('artisan_direct_upload').addEventListener('change', () => {
        syncArtisanUI();
        autoSave();
    });
    
    // Add listeners for Target Subject checkboxes
    festiveCategories.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', autoSave);
    });

    // Toggle AI Content Fields
    aiContentToggle.addEventListener('change', () => {
        syncAIContentUI();
        autoSave();
    });

    // Auto-save for text inputs
    const autoSaveFields = ['brand', 'location_details', 'social_handles', 'phone', 'whatsapp', 'email', 'hook', 'event_offer', 'festive_info', 'artisan_custom_instructions', 'logo_light', 'logo_dark'];
    autoSaveFields.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', autoSave);
    });

    // Persistence & Persistence Loading
    if (typeof loadBrandData === 'function') {
        const savedData = loadBrandData();
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                let field = form.elements[key] || document.getElementById(key);
                if (field) {
                    if (field instanceof RadioNodeList) {
                        for (const radio of field) if (radio.value === savedData[key]) radio.checked = true;
                    } else if (field.type === 'checkbox') {
                        field.checked = savedData[key] === true || savedData[key] === 'on';
                    } else {
                        field.value = savedData[key];
                    }
                }
            });
        }
    }

    // Final UI Sync after initialization
    syncLogoUI();
    syncArtisanUI();
    syncAIContentUI();
    const activeAnchor = document.querySelector('input[name="anchor_mode"]:checked');
    if (activeAnchor) activeAnchor.dispatchEvent(new Event('change'));

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            // Validation Logic
            const activeAnchorEl = document.querySelector('input[name="anchor_mode"]:checked');
            const activeAnchor = activeAnchorEl ? activeAnchorEl.value : 'festive';
            const artisanDirectUpload = document.getElementById('artisan_direct_upload').checked;

            if (activeAnchor === 'artisan') {
                const rows = artisanContainer.querySelectorAll('.artisan-row');
                let missingUrl = false;
                rows.forEach(row => {
                    if (row.querySelector('.artisan-url').value.trim() === '') missingUrl = true;
                });

                if (missingUrl && !artisanDirectUpload) {
                    alert('One or more image URLs are missing. Please check the "If link fails..." box below to ensure error-free upload in the chat.');
                    return;
                }
            }

            const enableLogo = document.getElementById('enable_logo').checked;
            const logoDirectUpload = document.getElementById('logo_direct_upload').checked;
            if (enableLogo) {
                const lightLogo = document.getElementById('logo_light').value.trim();
                const darkLogo = document.getElementById('logo_dark').value.trim();
                if (!lightLogo && !darkLogo && !logoDirectUpload) {
                    alert('Please provide at least one Logo URL or check the "If link fails..." box for the logo.');
                    return;
                }
            }

            const data = getCollectedData();

            if (typeof saveBrandData === 'function') saveBrandData(data);
            generatePrompt(data);

            // Artisan Reset UX
            if (activeAnchor === 'artisan') resetArtisanRows();
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
        }
    }

    // Export/Import
    downloadBtn.addEventListener('click', () => { if (typeof exportData === 'function') exportData(); });
    uploadBtn.addEventListener('click', () => {
        const fi = document.createElement('input');
        fi.type = 'file'; fi.accept = '.json';
        fi.onchange = (e) => {
            const file = e.target.files[0];
            if (file && typeof importData === 'function') {
                importData(file, () => { alert('Data imported!'); window.location.reload(); });
            }
        };
        fi.click();
    });
});
