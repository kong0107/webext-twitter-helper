browser.pageAction.onClicked.addListener(function (tab) {
    console.debug(tab);
    browser.tabs.sendMessage(tab.id, 'download')
    .then(mediaArray => {
        console.debug(mediaArray);
        let queue = Promise.resolve();
        for (const options of mediaArray) {
            queue = queue.then(() => browser.downloads.download(options));
        }
    });
});
