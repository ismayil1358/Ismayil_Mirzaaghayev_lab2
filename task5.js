function throttle(callback, wait) {
    let lastTime = 0; 

    return function(...args) {
        const now = Date.now(); 

        if (now - lastTime >= wait) {
            lastTime = now; 
            callback.apply(this, args); 
        }
    };
}

const log = () => console.log('Function executed at:', new Date().toISOString());

const throttledLog = throttle(log, 2000);

setInterval(() => {
    throttledLog();
}, 2);
