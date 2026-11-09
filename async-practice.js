// Task 11.1 : Understanding async
// Synchronous vs Asynchronous
console.log("Start");                    // Synchronous

setTimeout(() => {
    console.log("Timeout A");            // Asynchronous
}, 500);

console.log("Middle");                   // Synchronous

setTimeout(() => {
    console.log("Timeout B");            // Asynchronous
}, 0);

console.log("End");                      // Synchronous


// Callback pattern
function loadUser(userId, callback) {
    console.log(`Fetching record for user ID ${userId}...`);
    setTimeout(() => {
        const user = {
            id: userId,
            username: "code_learner",
            course: "Frontend Web Development",
            status: "Active"
        };
        
        callback(user);
    }, 1500);
}

loadUser(42, function(userData) {
    console.log("Data received successfully:", userData);
    console.log(`Welcome back, ${userData.username}!`);
});

// Task 11.2: Callback Hell & Introduction to Promises
// 1. Refactored getUserPosts returning a Promise
function getUserPosts(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([
                    { id: 1, title: "Post 1" },
                    { id: 2, title: "Post 2" }
                ]);
            } else {
                reject("Invalid user ID");
            }
        }, 1000);
    });
}

// 2. Refactored getPostComments returning a Promise
function getPostComments(postId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (postId > 0) {
                resolve([
                    { id: 1, text: "Great post!" },
                    { id: 2, text: "Thanks for sharing" }
                ]);
            } else {
                reject("Invalid post ID");
            }
        }, 1000);
    });
}


// Task 11.3: Promise Chaining 
// Chain promises
getUserData(1)
    .then(user => {
        console.log("User:", user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostComments(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.log("An error occurred:", error);
    });


// Promise.all
const fetchProductDetails = new Promise((resolve) => {
    setTimeout(() => resolve({ id: 101, name: "Wireless Mouse", price: 29.99 }), 800);
});

const fetchStockStatus = new Promise((resolve) => {
    setTimeout(() => resolve({ productId: 101, inStock: true, quantity: 42 }), 500);
});

const fetchReviews = new Promise((resolve) => {
    setTimeout(() => resolve([{ user: "Alice", rating: 5 }, { user: "Bob", rating: 4 }]), 1000);
});

Promise.all([fetchProductDetails, fetchStockStatus, fetchReviews])
    .then(([product, stock, reviews]) => {
        console.log("--- E-Commerce Dashboard Loaded ---");
        console.log("Product:", product);
        console.log("Stock Info:", stock);
        console.log("Reviews:", reviews);
    })
    .catch((error) => {
        console.error("Failed to load dashboard data:", error);
    });

    
// Promise.race
const primaryServer = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ server: "Primary API", temp: "24°C", condition: "Sunny" });
    }, 450); 
});

const backupServer = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ server: "Backup API", temp: "24°C", condition: "Sunny" });
    }, 200); 
});

Promise.race([primaryServer, backupServer])
    .then((fastestResponse) => {
        console.log(`Weather loaded instantly from ${fastestResponse.server}!`);
        console.log(`Current Temperature: ${fastestResponse.temp}, ${fastestResponse.condition}`);
    })
    .catch((error) => {
        console.error("All weather servers failed:", error);
    });


// Build : Fetch Data for 3 Users Simultaneously
const user1Promise = getUserData(1);
const user2Promise = getUserData(2);
const user3Promise = getUserData(3);

Promise.all([user1Promise, user2Promise, user3Promise])
    .then((usersArray) => {
        console.log("=== All 3 Users Fetched Successfully ===");
        
        usersArray.forEach((user, index) => {
            console.log(`User [${index + 1}] -> ID: ${user.id}, Name: ${user.name}`);
        });
    })
    .catch((error) => {
        console.error("Error fetching user batch:", error);
    });


// Task 11.4: Async/Await
// Converting to Async/Await
function fetchUserProfile(userId) {
    return getUserData(userId)
        .then(user => {
            return user.name;
        });
}

async function fetchUserProfileAsync(userId) {
    const user = await getUserData(userId);
    return user.name;
}

fetchUserProfileAsync(1).then(name => console.log(name));

// Error Handling with Try/Catch
async function safeUserFetch(userId) {
    try {
        console.log("Attempting to fetch user...");
        const user = await getUserData(userId);
        console.log("Success:", user);
        return user;
    } catch (error) {
        console.error("Caught an error during fetch:", error);
        return null; 
    }
}

safeUserFetch(-5); 

// Parallel with Async/Await
async function getMultipleUsersParallel() {
    const [user1, user2, user3] = await Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ]);
    
    return [user1, user2, user3];
}

getMultipleUsersParallel().then(users => console.log("All fetched in parallel:", users));


// Build: Rewrite the callback hell example using async/await.
async function displayCompleteUserData(userId) {
    try {
        console.log("Starting async data flow...");

        const user = await getUserData(userId);
        console.log("User retrieved:", user);

        const posts = await getUserPosts(user.id);
        console.log("Posts retrieved:", posts);

        const comments = await getPostComments(posts[0].id);
        console.log("Comments retrieved:", comments);

        console.log("--- Full Data Workflow Completed Successfully ---");
        return { user, posts, comments };

    } catch (error) {
        console.error("Workflow failed due to an error:", error);
    }
}

displayCompleteUserData(1);



