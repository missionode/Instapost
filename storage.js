const brandDataKey = 'instapost_brand_data';

function saveBrandData(data) {
    const semiStaticData = {
        brand: data.brand,
        location_details: data.location_details,
        social_handles: data.social_handles,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        design_type: data.design_type,
        creative_type: data.creative_type
    };
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(brandDataKey, JSON.stringify(semiStaticData));
    }
}

function loadBrandData() {
    if (typeof localStorage !== 'undefined') {
        const data = localStorage.getItem(brandDataKey);
        return data ? JSON.parse(data) : null;
    }
    return null;
}

function exportData() {
    const data = loadBrandData();
    if (!data) {
        alert('No data found to export.');
        return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `instapost_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(brandDataKey, JSON.stringify(data));
                if (callback) callback(data);
            }
        } catch (err) {
            alert('Invalid JSON file.');
            console.error(err);
        }
    };
    reader.readAsText(file);
}

// Make functions globally available for main.js
window.saveBrandData = saveBrandData;
window.loadBrandData = loadBrandData;
window.exportData = exportData;
window.importData = importData;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saveBrandData, loadBrandData, exportData, importData };
}
