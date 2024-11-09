function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn(...args, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value); 
                }
            });
        });
    };
}

function asyncFunction(param, callback) {
    setTimeout(() => {
        if (param) {
            callback(null, `Value is: ${param}`);
        } else {
            callback(new Error('No value provided!'));
        }
    }, 1000);
}

const promisifiedAsyncFunction = promisify(asyncFunction);

async function exampleUsage() {
    try {
        const result = await promisifiedAsyncFunction('Test');
        console.log(result); 
    } catch (error) {
        console.error('Error:', error.message);
    }

    try {
        const result = await promisifiedAsyncFunction(); 
        console.log(result);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

exampleUsage();
