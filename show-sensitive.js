setInterval(() => {
    const target = document.querySelector('article:not([data-unblurred]) [id]:not([role="group"]) [role="button"]:not([aria-label])'); // home and single tweet
    if (! target) return;
    target.closest('article').dataset.unblurred = '';
    target.click();
}, 1000);

setInterval(() => {
    const target = document.querySelector('section [role="listitem"] [role="button"]'); // media collection page
    if (! target) return;
    target.click();
}, 100);
