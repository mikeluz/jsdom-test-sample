// Please note I stuck with ES5 for these exercises //

///////////////////////////
// Maxymiser Exercise #2 //
///////////////////////////

// This function can be tested by navigating to: http://shop.maxymised.com/index.php?route=product/category&path=18
// Copy the below function as well as its invocation (lines 13 - 79), paste in the console and hit return
// OR: run npm install to install test dependencies, enter npm test and run the included test!
// test dependencies: mocha, chai, jsdom, jsdom-global

// helper function to get parent width
function getParentWidth(child) {
	// the ternary is for testing -- if a mock DOM element, use the predefined width
	// note  I'm adding 0.5 to ensure badge spans the width of the image (some products were off by 0.5 in Chrome on my machine)
	var width = child.style._values ? (Number(child.style._values.width.slice(0, -2)) + 0.5) : (child.getBoundingClientRect().width + 0.5);
	return width + "px";
}

// Write a function to add a discount badge to each product in a grid of products -- third arg is optional and is used for Testing
function addDiscountBadge(productClassName, discountText, parent) {
	// if a parent arg has been passed, get its children; else use getElementsByClassName to get all elements with the passed in class name
	// this check is important for the test, where in order to get jsdom to work we need to pass in the explicitly defined parent
	var products = parent ? parent.children : document.getElementsByClassName(productClassName);
	// cast array-like object to actual array so we can iterate through it
	var productArray = [].slice.call(products);
	
	// get width of badge parent
	// var parentWidth = products[0].offsetWidth;
	var parentWidth = getParentWidth(productArray[0]);

	// create and append badge to all products
	productArray.forEach(function(product) {
		// create discount badge wrapper div
		var discountBadge = document.createElement("div");
		// create p text node to append to badge
		var text = document.createElement("p");
		// set text of text node to passed-in text
		text.innerHTML = discountText;
		// set CSS for badge wrapper div -- absolute positioning overlays it on the image
		discountBadge.style.cssText = "display: table; background-color: black; height: 25px; color: white; text-align: center; position: absolute; font-size: 14pt; padding: auto; margin: 0px";
		/// set badge width using parent width
		discountBadge.style.width = parentWidth;
		// give badge wrapper div a class so we can resize on window resize (see below)
		discountBadge.className = "discountBadge";
		// set CSS for p text node
		text.style.cssText = "display: table-cell; vertical-align: middle; padding-top: 1px; padding-bottom: 1px; margin: auto; height: 100%";

		// append text to badge

		discountBadge.appendChild(text);
		// append badge to product
		product.appendChild(discountBadge);
		// move badge to first child position so it appears at the top of the thumbnail frame
		product.insertBefore(discountBadge, product.firstChild);
	})

	// Resize Listener -- resizes the badge as its parent responsively changes size with window resize or zoom
	window.onresize = function() {
		// get parent width again after resize
		// parentWidth = products[0].getBoundingClientRect().width;
		parentWidth = getParentWidth(productArray[0]);

		// get all badges to resize -- parent -> child -> child (badge)
		var badges = parent ? [].slice.call(parent.children).map(function(child) { return child.firstChild }) : document.getElementsByClassName("discountBadge");
		// cast array-like object to array as above
		var badgeArray = [].slice.call(badges);

		// resize each badge
		badgeArray.forEach(function(badge) {
			// check if testing (if testing, styles must be accessed through jsdom's mock element "_values" property)
			if (badge.style._values) {
				badge.style._values.width = parentWidth;
			} else {
				badge.style.width = parentWidth;
			}
		});
	}
	
}

// declare variables to pass to function
// class to append badge
var classToAddBadge = "image";
// discount string
var discount = "5% OFF";

// invoke function -- uncomment line 91 to test in REPL
// addDiscountBadge(classToAddBadge, discount);

////////////////////////
// EXPORT FOR TESTING //
////////////////////////
module.exports = addDiscountBadge;
