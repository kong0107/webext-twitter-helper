setInterval(() => document.querySelector('[href*="/photo/"] + button')?.click(), 100);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
        case 'getPhotos':
            const photos = [];
            // document.querySelectorAll('[href*="/photo/"]').forEach(a => {
            //     const img = a.querySelector('img');
            //     if (img) {
            //         const src = img.src.replace(/\/\d+$/, '');
            //         photos.push(src);
            //     }
            // });
            sendResponse(photos);
            break;
        default:
            console.warn("Unknown message:", message);
    }
});

