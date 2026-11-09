async function fetchParallelEndpoints() {
    const endpoints = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2",
        "https://jsonplaceholder.typicode.com/invalid-url-to-test-failure" // Will fail gracefully
    ];

    // Map each URL to a fetch promise
    const promises = endpoints.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
    });

    // Wait for all promises to settle (fulfill or reject)
    const results = await Promise.allSettled(promises);

    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            console.log(`Request ${index + 1} succeeded:`, result.value);
        } else {
            console.log(`Request ${index + 1} failed:`, result.reason.message);
        }
    });
}

fetchParallelEndpoints();