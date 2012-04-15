// Creates a namespace for the app.
var httpizza = httpizza || {};

/**
* Helper module for drawing shapes onto a canvas.
*/
httpizza.CanvasHelper = function() {
	// Create a new object.
	var that = {};

	/**
	* Gets a 2D context from the canvas.
	*/
	that.getContext = function(canvas) {
		if (canvas.getContext) {
			return canvas.getContext('2d');
		} else {
			alert("Your browser doesn't support the 'canvas' api.");
			throw "Browser doesn't support canvas api.";
		}
	};

	/**
	* Clears the provided canvas element.
	*/
	that.clearCanvas = function(canvas) {
		var context = that.getContext(canvas);
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	/**
	* Draws a filled circle onto the canvas context.
	*/
	that.drawFilledCircle = function(context, xoffset, yoffset, radius, fillStyle) {
		context.fillStyle = fillStyle;
		drawCircle(context, xoffset, yoffset, radius);
		context.fill();
	};

	/**
	* Draws an empty circle onto the canvas context.
	*/
	that.drawEmptyCircle = function(context, xoffset, yoffset, radius, strokeStyle) {
		context.strokeStyle = strokeStyle;
		context.lineWidth 	= 3;
		drawCircle(context, xoffset, yoffset, radius);
		context.stroke();
	};

	/**
	* Draws a circle onto the canvas context.
	*/
	function drawCircle(context, xoffset, yoffset, radius) {
		context.beginPath();
		context.arc(xoffset, yoffset, radius, 0, Math.PI * 2, true);
		context.closePath();
	}

	return that;
};

/**
* Helper module for drawing a pizza and toppings onto a canvas. Extends CanvasHelper.
*/
httpizza.PizzaCanvasHelper = function(ingredients) {
	// Create a new CanvasHelper in order to extend its functionality.
	var that = new httpizza.CanvasHelper();

	// Offsets and radius for drawing circular shapes and patterns.
	that.xoffset = 150;
	that.yoffset = 150;
	that.radius  = 130;

	// Color brushes for pizza sauces.
	var sauceBrushes = {
		'Pizza Sauce': 'rgb(222, 0, 0)',
		'Pesto': 'rgb(127, 161, 21)',
		'BBQ Sauce': 'rgb(105, 25, 0)',
		'Hot Sauce': 'rgb(255, 0, 0)',
		'Sour Cream': 'rgb(255, 255, 255)'
	};

	/**
	* Draws a pizza's crust onto the canvas.
	*/
	that.drawCrust = function(canvas, pizza) {
		var crust = ingredients.filterByName(pizza.get('crust'))[0];
		var imageUrl = crust.get('brush_image');

		var imageObj = new Image();

		imageObj.onload = function() {
			that.crustContext = that.crustContext || that.getContext(canvas);
			that.clearCanvas(canvas);
			that.crustContext.drawImage(imageObj, 0, 0);
		};

		imageObj.src = imageUrl;
	};

	/**
	* Draws a pizza's sauce onto the canvas.
	*/
	that.drawSauce = function(canvas, pizza) {
		var sauce = pizza.get('sauce');

		that.clearCanvas(canvas);

		if (typeof sauce !== 'undefined') {
			var color = sauceBrushes[ pizza.get('sauce') ];

			that.sauceContext = that.sauceContext || that.getContext(canvas);

			that.drawFilledCircle(that.sauceContext, that.xoffset, that.yoffset, that.radius, color);			
		}
	};

	/**
	* Draws a pizza's cheeses onto a canvas.
	*/
	that.drawCheese = function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.cheeseContext = that.cheeseContext || that.getContext(canvas);

		drawPattern(that.cheeseContext, pizza.get('cheeses'));
	};

	/**
	* Draws a pizza's toppings onto a canvas.
	*/
	that.drawToppings = function(canvas, pizza) {
		that.clearCanvas(canvas);

		that.toppingsContext = that.toppingsContext || that.getContext(canvas);

		drawPattern(that.toppingsContext, pizza.get('toppings'));
	};

	/**
	* Draws ingredients using a context.
	*/
	function drawPattern(context, ingredientNames) {
		_.each(ingredientNames, function(name) {
			var ingredient = ingredients.filterByName(name)[0];
			var imageUrl = ingredient.get('brush_image');
			var imageObj = new Image();

			imageObj.onload = function() {
				var pattern = context.createPattern(imageObj, "repeat");
				that.drawFilledCircle(context, that.xoffset, that.yoffset, that.radius + 10, pattern);
			};

			imageObj.src = imageUrl;
		});
	}

	return that;
};