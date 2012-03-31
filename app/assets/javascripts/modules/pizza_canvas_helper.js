var httpizza = httpizza || {};

httpizza.CanvasHelper = function() {
	var that = {};

	that.getContext = function(canvas) {
		if (canvas.getContext) {
			return canvas.getContext('2d');
		} else {
			alert("Your browser doesn't support the 'canvas' api.");
			throw "Browser doesn't support canvas api.";
		}
	};

	that.clearCanvas = function(canvas) {
		var context = that.getContext(canvas);
		context.clearRect(0, 0, canvas.width, canvas.height);
	};

	that.drawFilledCircle = function(context, xoffset, yoffset, radius, fillStyle) {
		context.fillStyle = fillStyle;
		drawCircle(context, xoffset, yoffset, radius);
		context.fill();
	};

	that.drawEmptyCircle = function(context, xoffset, yoffset, radius, strokeStyle) {
		context.strokeStyle = strokeStyle;
		context.lineWidth 	= 3;
		drawCircle(context, xoffset, yoffset, radius);
		context.stroke();
	};

	function drawCircle(context, xoffset, yoffset, radius) {
		context.beginPath();
		context.arc(xoffset, yoffset, radius, 0, Math.PI * 2, true);
		context.closePath();
	}

	return that;
};

httpizza.PizzaCanvasHelper = function(ingredients, imageCache) {
	var that = new httpizza.CanvasHelper();

	var sauceBrushes = {
		'Pizza Sauce': 'rgb(222, 0, 0)',
		'Pesto': 'rgb(0, 200, 0)',
		'BBQ Sauce': 'rgb(200, 150, 0)',
		'Hot Sauce': 'rgb(255, 0, 0)',
		'Sour Cream': 'rgb(255, 255, 255)'
	};

	that.drawCrust = function(canvas, pizza) {
		that.crustContext = that.crustContext || that.getContext(canvas);

		var crust = ingredients.filterByName(pizza.get('crust'))[0];
		var image_url = crust.get('brush_image');	
		var imageObj = imageCache[image_url];
		that.crustContext.drawImage(imageObj, 0, 0);
	};

	that.drawSauce = function(canvas, pizza) {
		that.sauceContext = that.sauceContext || that.getContext(canvas);

		//that.clearCanvas(canvas);

		var color = sauceBrushes[ pizza.get('sauce') ];
		var xoffset = 150;
		var yoffset = 150;
		var radius	= 130;

		that.drawFilledCircle(that.sauceContext, xoffset, yoffset, radius, color);
	};

	that.drawCheese = function(canvas, pizza) {
		that.cheeseContext = that.cheeseContext || that.getContext(canvas);
		drawPattern(that.cheeseContext, pizza.get('cheeses'));
	};

	that.drawToppings = function(canvas, pizza) {
		that.toppingsContext = that.toppingsContext || that.getContext(canvas);
		drawPattern(that.toppingsContext, pizza.get('toppings'));
	};

	function drawPattern(context, ingredientNames) {
		var xoffset = 150;
		var yoffset = 150;
		var radius	= 140;

		_.each(ingredientNames, function(name) {
			var ingredient = ingredients.filterByName(name)[0];
			var url = ingredient.get('brush_image');
			var imageObj = imageCache[url];

			var pattern = context.createPattern(imageObj, "repeat");
			that.drawFilledCircle(context, xoffset, yoffset, radius, pattern);
		});
	}

	return that;
};