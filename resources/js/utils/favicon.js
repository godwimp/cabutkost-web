export const updateFavicon = (logoPath) => {
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (existingFavicon) {
        existingFavicon.href = logoPath;
    } else {
        const favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/jpeg';
        favicon.href = logoPath;
        document.head.appendChild(favicon);
    }
};