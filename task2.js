function setCancellableTimeout(callback, delay = 0, ...args) {
    const timeoutId = setTimeout(() => {
        callback(...args);
    }, delay);

    return () => {
        clearTimeout(timeoutId);
    };
}

let i = 0;

const cancel = setCancellableTimeout(() => {
    i++;
    console.log('Executed:', i);
}, 100);

setTimeout(() => {
    cancel();
    console.log('Cancelled. Current i:', i);
}, 350);
