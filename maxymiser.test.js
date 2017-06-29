// import jsdom for mock DOM teting
var jsdom = require("jsdom-global");
// BDD styles from Chai 
var expect = require("chai").expect;
var assert = require("chai").assert;

//////////////////////////////////////////////////////////////////
// Tests for Exercise 2 -- Function to populate discount badges //
//////////////////////////////////////////////////////////////////
describe("Function that adds the same badge to multiple products", function () {
 
 	// create mock DOM
	jsdom();
	// create mock container div
	var container = document.createElement("div");
	// give it a height so we can verify adding the badges does not alter its height
	container.style._values.height = "1000px";
	// import the add badge function
	var addDiscountBadge = require("./maxymiserTwo.js");
	// "image" class to append badge
	var classToAddBadgeTo = "image";
	// discount string
	var discount = "5% OFF";
	// variable for working with children as aray
	var imagesArray;

	before(function () {
		// create 4 product divs to simulate page
		for (var i = 0; i < 4; i++) {
			var image = document.createElement("div");
			image.style.width = "200px";
			image.style.height = "100px";
			image.className = "image";
			// create and append sibling so we can test that the function adds the badge as the first child
			var sibling = document.createElement("div");
			sibling.className = "sibling";
			image.appendChild(sibling);
			container.appendChild(image);
		}
		// invoke function, passing in mock parent
		addDiscountBadge(classToAddBadgeTo, discount, container);
		// create images array from container children
		imagesArray = [].slice.call(container.children);
	})
 
  it("Adds badges with correct name", function () {
			imagesArray.forEach(function(child) {
				expect(child.firstChild.className).eql("discountBadge");
			});
	});

  it("Adds the same number of badges as there are elements of supplied className", function () {
 			// extract badges from image divs -- firstChilds
  		expect(imagesArray.length).eql(imagesArray.map(function(image) { return image.firstChild }).length);
			imagesArray.forEach(function(image) {
				expect(image.firstChild.className).eql("discountBadge");
			});
	});

  it("Adds badges with same width as parent + 0.5px of insurance", function () {
			imagesArray.forEach(function(image) {
				expect(Number(image.firstChild.style._values.width.slice(0,-2)) - 0.5).eql(Number(image.style._values.width.slice(0,-2)));
			});
	});

  it('Adds badges with height of 25px', function () {
			imagesArray.forEach(function(image) {
				expect(image.firstChild.style._values.height).eql("25px");
			});
	});

	it("Adds badges on top of images such that they do not affect the height of image or outer container", function () {
			imagesArray.forEach(function(image) {
				// check that height was not changed after badges were appended
				expect(image.style._values.height).eql("100px");
			});
			// likewise for container
			expect(container.style._values.height).eql("1000px");	
	});

	it("Adds badges whose width dynamically resizes with parent with resize event", function () {
			// 600px
			imagesArray.forEach(function(image) {
				image.style._values.width = "650px";
			});
			// simulate resize event
			var event = document.createEvent("HTMLEvents");
			event.initEvent("resize", true, false);
			document.dispatchEvent(event);
			imagesArray.forEach(function(image) {
				expect(Number(image.firstChild.style._values.width.slice(0,-2)) - 0.5).eql(Number(image.style._values.width.slice(0,-2)));
			});

			// 800px
			imagesArray.forEach(function(image) {
				image.style._values.width = "650px";
			});
			document.dispatchEvent(event);
			imagesArray.forEach(function(image) {
				expect(Number(image.firstChild.style._values.width.slice(0,-2)) - 0.5).eql(Number(image.style._values.width.slice(0,-2)));
			});

			// 1200px
			imagesArray.forEach(function(image) {
				image.style._values.width = "1200px";
			});
			document.dispatchEvent(event);
			imagesArray.forEach(function(image) {
				expect(Number(image.firstChild.style._values.width.slice(0,-2)) - 0.5).eql(Number(image.style._values.width.slice(0,-2)));
			});
	});

	it("Adds badges with supplied text", function () {
			imagesArray.forEach(function(image) {
				var textStart = image.firstChild.innerHTML.indexOf(">") + 1;
				var textEnd = image.firstChild.innerHTML.indexOf("</");
				expect(image.firstChild.innerHTML.slice(textStart, textEnd)).eql(discount);
			});
	});

	it("Adds badges as first child, placing them before any other children", function () {
			imagesArray.forEach(function(image) {
				// extra test to confirm the firstChild is NOT the sibling node
				expect(image.firstChild.className).to.not.eql("sibling");
			});
	});

});

/////////////////////////////////////////////////////
// Tests for Exercise 3 -- Reverse string function //
/////////////////////////////////////////////////////
describe("Function that reverses a string", function() {

		var string = "Maxymiser";

		// Reverse function using array
		var reverseStringArray = require("./maxymiserThree.js").reverseStringArray;

    it("Should take a string and return it reversed", function() {
    	// make a shallow copy with slice so as not to affect original string
    	var reversed = reverseStringArray(string.slice());
      assert.equal(reversed, "resimyxaM");
    });

    it("Should work for number input", function() {
    	var reversed = reverseStringArray(12345);
      assert.equal(reversed, "54321");
    });

    it("Should return 'Input is an object -- please enter a number or a string' for object input", function() {
    	var reversed = reverseStringArray({test: "test"});
      assert.equal(reversed, "Input is an object -- please enter a number or string");
    });

    it("Should return 'No input provided' if no input provided", function() {
    	var reversed = reverseStringArray();
      assert.equal(reversed, "No input provided");
    });

    // Reverse function using loop
		var reverseStringLoop = require("./maxymiserThree.js").reverseStringLoop;

    it("Should take a string and return it reversed", function() {
    	// make a shallow copy with slice so as not to affect original string
    	var reversed = reverseStringLoop(string.slice());
      assert.equal(reversed, "resimyxaM");
    });

    it("Should work for number input", function() {
    	var reversed = reverseStringLoop(12345);
      assert.equal(reversed, "54321");
    });

    it("Should return 'Input is an object -- please enter a number or a string' for object input", function() {
    	var reversed = reverseStringLoop({test: "test"});
      assert.equal(reversed, "Input is an object -- please enter a number or string");
    });

    it("Should return 'No input provided' if no input provided", function() {
    	var reversed = reverseStringLoop();
      assert.equal(reversed, "No input provided");
    });

});