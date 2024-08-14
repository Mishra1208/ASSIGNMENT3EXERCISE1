const express = require('express'); // Import the express module
const path = require('path'); // Import the path module for handling and transforming file paths

const app = express(); // Create an instance of an Express application

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send the index.html file when the root URL is accessed
});

// Function: findSummation
// Calculates the summation of numbers from 1 to n
function findSummation(n = 1) {
    if (typeof n !== 'number' || n <= 0) return false; // Validate input
    return (n * (n + 1)) / 2; // Return the summation formula result
}

// Handle GET request for finding summation
app.get('/findSummation', (req, res) => {
    let n = parseInt(req.query.number, 10); // Parse the number from query parameters
    let result = findSummation(n); // Calculate summation
    res.send(`Summation of entered number (${n}) is: ${result}`); // Send result to client
});

// Function: uppercaseFirstandLast
// Converts the first and last letter of each word in the string to uppercase
function uppercaseFirstandLast(str) {
    return str.split(' ').map(word => {
        if (word.length > 1) {
            // Uppercase the first and last character for words longer than one character
            return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
        }
        return word.toUpperCase(); // Uppercase the entire word if it has only one character
    }).join(' ');
}

// Handle GET request for uppercasing first and last letters
app.get('/uppercaseFirstandLast', (req, res) => {
    let str = req.query.string; // Get the string from query parameters
    let result = uppercaseFirstandLast(str); // Modify the string
    res.send(`The modified String is: ${result}`); // Send result to client
});

// Function: findAverageAndMedian
// Finds the average and median of a given array of numbers
function findAverageAndMedian(arr) {
    if (!Array.isArray(arr) || arr.some(isNaN)) return false; // Validate input

    let sum = arr.reduce((a, b) => a + b, 0); // Calculate the sum of array elements
    let avg = sum / arr.length; // Calculate the average

    arr.sort((a, b) => a - b); // Sort the array for median calculation
    let median = (arr.length % 2 === 0) ?
        (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 : // If even, average the two middle elements
        arr[Math.floor(arr.length / 2)]; // If odd, take the middle element

    return { average: avg, median: median }; // Return the average and median
}

// Handle GET request for finding average and median
app.get('/findAverageAndMedian', (req, res) => {
    let arr = JSON.parse(req.query.array); // Parse the array from query parameters
    let result = findAverageAndMedian(arr); // Calculate average and median
    res.send(`The average is : ${result.average}, The median is : ${result.median}`); // Send result to client
});

// Function: find4Digits
// Finds the first occurrence of a 4-digit number in a string
function find4Digits(str) {
    let match = str.match(/\b\d{4}\b/); // Use regex to find a 4-digit number
    return match ? match[0] : false; // Return the matched 4-digit number or false if none found
}

// Handle GET request for finding 4-digit number
app.get('/find4Digits', (req, res) => {
    let str = req.query.string; // Get the string from query parameters
    let result = find4Digits(str); // Find the 4-digit number
    res.send(`First 4-digit number is: ${result}`); // Send result to client
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Exercise 1 server is running on port 3000'); // Log a message indicating the server is running
});
