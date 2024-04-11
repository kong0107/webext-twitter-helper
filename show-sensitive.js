setInterval(() => {
    const target = document.querySelector('article:not([data-unblurred]) [id]:not([role="group"]) [role="button"]');
    if (! target) return;
    target.closest('article').dataset.unblurred = '';
    target.click();
}, 1000);
