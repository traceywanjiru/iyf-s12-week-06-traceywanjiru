async function fetchUserWithFallback(userId) {
    const defaultUser = { id: 0, name: "Default User", username: "guest" };
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                console.warn("User not found (404). Returning default user.");
                return defaultUser;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (err) {
        console.error("Network or fetch error:", err.message);
        return defaultUser;
    }
}

// Test usage:
fetchUserWithFallback(999).then(user => console.log(user));