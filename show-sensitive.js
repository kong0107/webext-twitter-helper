console.log('Twitter Helper');

setInterval(() => {
    document.querySelectorAll('article [id]:not([role="group"]) [role="link"] + [role="button"]').forEach(btn => btn.click());
}, 1000);

setInterval(() => {
    document.querySelectorAll('section [role="listitem"] [role="link"] + [role="button"]').forEach(btn => btn.click());
}, 1000);
