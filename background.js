browser.pageAction.onClicked.addListener(function (tab) {
    console.debug(tab);
    const match = /^https?:\/\/x\.com\/([^/]+)\/status\/(\d+)(?:\/photo\/(\d+))?/.exec(tab.url);
    if (! match) return console.warn("Not a valid X.com status URL");
    const filename = 'x+' + match[1] + '+' + match[2] + (match[3] ? `+${match[3]}` : '');
    console.debug(filename);
    browser.tabs.sendMessage(tab.id, 'getPhotos')
    .then(photos => {
        console.debug(photos);
    });
});
