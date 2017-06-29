// Please note I stuck with ES5 for these exercises //

///////////////////////////
// Maxymiser Exercise #3 //
///////////////////////////

// These functions can be tested by copying lines 12-52 into a JavaScript REPL environment hitting Run
// OR: run npm install to install test dependencies, enter npm test and run the included test!
// test dependencies: mocha, chai, jsdom, jsdom-global

// Write a function that will reverse the word 'Maxymiser' and briefly explain your thought process while creating it.
var string = "Maxymiser";

// Using JavaScript we can easily reverse this string by splitting it into an array, reversing the array, joining again, and returning the reversed string
function reverseStringArray(str) {
	if ((str && str.length < 1) || str === undefined) {
		return "No input provided";
	}
	if (typeof str !== "string") {
		if (typeof str === "object") {
			return "Input is an object -- please enter a number or string"
		} else {
			str = str.toString();
		}
	}
	return str.split('').reverse().join('');
}

reverseStringArray(string); // returns "resimyxaM"

// we can also use a more basic loop -- begin at the last index of the string and decrement on each iteration, adding the character to a new string
// we lastly return the reversed string
function reverseStringLoop(str) {
	var reversed = "";
	if ((str && str.length < 1) || str === undefined) {
		return "No input provided";
	}
	if (typeof str !== "string") {
		if (typeof str === "object") {
			return "Input is an object -- please enter a number or string"
		} else {
			str = str.toString();
		}
	}
	// loop through and push each letter into the empty reversed string declared above beginning with the last character
	for (var i = str.length - 1; i >= 0; i--) {
		reversed += str[i];
	}
	return reversed;
}

reverseStringLoop(string); // returns "resimyxaM"

////////////////////////
// EXPORT FOR TESTING //
////////////////////////
module.exports = {
	reverseStringArray: reverseStringArray,
	reverseStringLoop: reverseStringLoop
};