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
    
    const festiveToggle = document.getElementById('festive_mode'); // Hidden checkbox
    const artisanContainer = document.getElementById('artisan-collection-container');
    const addArtisanBtn = document.getElementById('add-artisan-row');

    const festiveCategories = ['festive_subject_men', 'festive_subject_women', 'festive_subject_kids'];

    // --- Artisan Collection Builder Logic ---
    const createArtisanRow = (url = '', subject = 'Women') => {
        const row = document.createElement('div');
        row.className = 'artisan-row row g-2 mb-3 align-items-center';
        row.innerHTML = `
            <div class="col-md-7">
                <input type="text" class="form-control border-0 bg-light artisan-url" placeholder="Paste dress image URL" value="${url}">
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
        });
        
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
    });

    const resetArtisanRows = () => {
        artisanContainer.innerHTML = '';
        artisanContainer.appendChild(createArtisanRow());
        updateRemoveButtons();
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
                resetArtisanRows();
                festiveToggle.checked = true;
            } else if (mode === 'artisan') {
                artisanPane.classList.remove('d-none');
                document.getElementById('festive_info').value = '';
                festiveToggle.checked = false;
            } else {
                aiPane.classList.remove('d-none');
                resetArtisanRows();
                document.getElementById('festive_info').value = '';
                festiveToggle.checked = false;
            }
        });
    });

    // Toggle Logo Input
    logoToggle.addEventListener('change', () => {
        if (logoToggle.checked) logoContainer.classList.remove('d-none');
        else logoContainer.classList.add('d-none');
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

    // Persistence & Persistence Loading
    if (typeof loadBrandData === 'function') {
        const savedData = loadBrandData();
        if (savedData) {
            Object.keys(savedData).forEach(key => {
                const field = form.elements[key];
                if (field) {
                    if (field instanceof RadioNodeList) {
                        for (const radio of field) if (radio.value === savedData[key]) radio.checked = true;
                    } else if (field.type === 'checkbox') {
                        field.checked = savedData[key] === 'on' || savedData[key] === true;
                        field.dispatchEvent(new Event('change'));
                    } else {
                        field.value = savedData[key];
                    }
                }
            });
            const activeAnchor = document.querySelector('input[name="anchor_mode"]:checked');
            if (activeAnchor) activeAnchor.dispatchEvent(new Event('change'));
        }
    }

    generateBtn.addEventListener('click', () => {
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Handle Festive Checkboxes
            festiveCategories.forEach(cat => {
                data[cat] = document.getElementById(cat).checked;
            });

            // Handle Artisan Collection Data
            const activeAnchor = document.querySelector('input[name="anchor_mode"]:checked').value;
            if (activeAnchor === 'artisan') {
                const rows = artisanContainer.querySelectorAll('.artisan-row');
                const collection = Array.from(rows).map(row => ({
                    url: row.querySelector('.artisan-url').value,
                    subject: row.querySelector('.artisan-subject').value
                })).filter(item => item.url.trim() !== '');
                
                data.artisan_collection = collection;
                // For engine compatibility, set dress_reference to comma-separated URLs
                data.dress_reference = collection.map(c => c.url).join(', ');
            }

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
