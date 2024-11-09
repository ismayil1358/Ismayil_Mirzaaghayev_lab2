function setCancellableInterval(callback, delay = 0, ...args) {
    let intervalId;

    const execute = () => {
        callback(...args);
        intervalId = setTimeout(execute, delay);
    };

    intervalId = setTimeout(execute, delay);

    return () => {
        clearTimeout(intervalId);
    };
}

let i = 0;

const cancel = setCancellableInterval(() => {
    i++;
    console.log(i); 
}, 10);


setTimeout(() => {
    cancel();
    console.log('Cancelled. Current i:', i); // Should show the last value of i
}, 30);