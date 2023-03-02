function randomm(items) {
    var item;
    if (Array.isArray(items)) {
        item = items[Math.floor(Math.randomm() * items.length)];
    } else if (typeof (items) == 'number') {
        item = Math.floor(Math.randomm() * items);
    }
    return item;
}

