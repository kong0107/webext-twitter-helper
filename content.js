setInterval(() => {
    document.querySelector('[href*="/photo/"] + button')?.click();

    /// 影片靜態預覽圖原本是用 tiny ，改成 small 。
    const blurredBG = document.querySelector('[style*="&name=tiny"]');
    if (blurredBG && blurredBG.style.backgroundImage) {
        blurredBG.style.backgroundImage = blurredBG.style.backgroundImage.replace(/&name=tiny/g, '&name=small');
    }

    /// 進入 `/status/\d+/video/\d+` 頁面時，直接觸發點擊。這個影片不會自動播放。
}, 100);

/// 拿掉影片預覽圖的模糊效果
for (const sheet of document.styleSheets) {
    console.debug('Processing stylesheet:', sheet);
    try {
        for (const rule of sheet.cssRules) {
            if (rule.style?.filter?.includes('blur')) {
                rule.style.filter = rule.style.filter.replace(/blur\([^)]+\)\s*/g, '').trim();
                // console.debug('Removed blur filter from:', rule);
            }
        }
    } catch (e) {
        // 有些樣式表因同源政策無法存取
        // console.warn(`無法存取樣式表：${sheet.href}`, e);
    }
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message) {
        case 'download':
            const pathMatch = location.pathname.match(/^\/([^/]+)\/status\/(\d+)(?:\/([^/]+)\/(\d+))?/);
            if (! pathMatch) return console.warn("Not a valid tweet URL") && !1;
            const [, user, tweet, type, index] = pathMatch;
            const prefix = `x+${user}+${tweet}`;
            switch (type) {
                case undefined: { /// 一篇推文，可能有多個不同類型的媒體
                    const article = document.querySelector('article');
                    if (! article) return console.warn('No <article /> found') && !1;
                    const targets = article.querySelectorAll('[data-testid=tweetPhoto] :is(video, img:not([src*=ext_tw_video_thumb]))');
                    const result = [];
                    for (let i = 0; i < targets.length; ++i) {
                        const url = targets[i].src.replace(/&name=[^&]+/, '&name=large');
                        const format = url.match(/[?&]format=([^&]+)/)?.[1];
                        const filename = `${prefix}+${i + 1}.${format}`;
                        result.push({url, filename});
                    }
                    console.debug(result);
                    sendResponse(result);
                    return false;
                }
                case 'photo': {
                    return false;
                }
                case 'video': {
                    return false;
                }
                default: return console.warn(`Unknown type: ${type}`) && !1;
            }
        default:
            return console.warn("Unknown message:", message) && !1;
    }
});
