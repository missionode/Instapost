const brandDataKey = 'instapost_brand_data';

function saveBrandData(data) {
    const semiStaticData = {
        brand: data.brand,
        hook: data.hook,
        location_details: data.location_details,
        social_handles: data.social_handles,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saveBrandData, loadBrandData };
}
