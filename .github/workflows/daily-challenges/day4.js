async function getUserDataAndPosts(userId) {
    try {
        // Step 1: Fetch user profile
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user");
        const user = await userResponse.json();

        // Step 2: Fetch user's posts using their ID
        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postsResponse.ok) throw new Error("Failed to fetch posts");
        const posts = await postsResponse.json();

        return { user, postsCount: posts.length };
    } catch (error) {
        console.error("Error in async workflow:", error.message);
    }
}

// Test usage:
getUserDataAndPosts(1).then(data => console.log(data));