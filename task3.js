function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function greeting() {
    console.log('Hello!');
    await sleep(2000);
    console.log('Bye.'); 
}

greeting();