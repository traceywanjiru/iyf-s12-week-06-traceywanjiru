const getRandomDelay = () => Math.floor(Math.random() * 1000) + 500;

function taskOne() {
    return new Promise(resolve => setTimeout(() => resolve("Task 1 complete"), getRandomDelay()));
}

function taskTwo() {
    return new Promise(resolve => setTimeout(() => resolve("Task 2 complete"), getRandomDelay()));
}

function taskThree() {
    return new Promise(resolve => setTimeout(() => resolve("Task 3 complete"), getRandomDelay()));
}

async function runPromiseChain() {
    console.time("Total Execution Time");
    
    const res1 = await taskOne();
    console.log(res1);
    
    const res2 = await taskTwo();
    console.log(res2);
    
    const res3 = await taskThree();
    console.log(res3);
    
    console.timeEnd("Total Execution Time");
}

runPromiseChain();