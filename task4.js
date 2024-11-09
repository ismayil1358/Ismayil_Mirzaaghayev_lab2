function debounce(callback, wait) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}

let i = 0;

function increment() {
    i++;
}

const debouncedIncrement = debounce(increment, 100);

debouncedIncrement(); 

setTimeout(() => {
    debouncedIncrement(); 
}, 50);

setTimeout(() => {
    debouncedIncrement(); 
}, 100);

setTimeout(() => {
    debouncedIncrement();
}, 150);

setTimeout(() => {
    console.log(i); 
}, 200);
