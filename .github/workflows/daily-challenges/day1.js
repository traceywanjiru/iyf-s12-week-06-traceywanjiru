function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Test usage:
async function runDay1() {
    await delay(2000);
    console.log("This prints after 2 seconds");
}

runDay1();