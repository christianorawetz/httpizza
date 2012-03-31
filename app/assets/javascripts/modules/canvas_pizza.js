/* A base canvas view class */
var canvasView = function() {
	var that = {};

	that.clearCanvas = function(context, canvas) {
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

var makeLineCanvasView = function() {
	var that = canvasView();
	var sauceBrushes = {
		'Pizza Sauce': 'rgb(222, 0, 0)',
		'Pesto': 'rgb(0, 200, 0)',
		'BBQ Sauce': 'rgb(200, 150, 0)',
		'Hot Sauce': 'rgb(255, 0, 0)',
		'Sour Cream': 'rgb(255, 255, 255)'
	};

	var cheeseImages = {
		'Mozzarella': '/assets/shredded-mozzarella.png',
		'Parmesan': '/assets/shredded-parmesan.png',
		'Cheddar': '/assets/shredded-cheddar.png',
		'Feta': '/assets/shredded-feta.png',
		'Gorgonzola': '/assets/shredded-gorgonzola.png'
	};

	that.drawPizzaSmall = function(canvas, pizza) {
		var xoffset = 45;
		var yoffset = 45;
		var radius	= 40;

		that.drawPizza(canvas, pizza, xoffset, yoffset, radius);
	};

	that.drawPizzaLarge = function(canvas, pizza) {
		var xoffset = 150;
		var yoffset = 150;
		var radius	= 140;

		that.drawPizza(canvas, pizza, xoffset, yoffset, radius);
	};

	/* Draws the pizza object on the provided canvas. */
	that.drawPizza = function(canvas, pizza, xoffset, yoffset, radius) {
		if (canvas.getContext) {
			var context = canvas.getContext('2d');
			that.clearCanvas(context, canvas);

			drawCrust(context, pizza, xoffset, yoffset, radius);
			drawSauce(context, pizza, xoffset, yoffset, radius - 10);
			drawCheeses(context, pizza, xoffset, yoffset, radius - 5);
		} else {
			console.log("Browser doesn't support canvas api.");
		}
	};

	/* Draws the crust of the provided pizza object. */
	that.drawCrust = function(context, pizza, xoffset, yoffset, radius) {
		var imageObj = new Image();

		imageObj.onload = function() {
			context.drawImage(imageObj, 0,0);
		};

		if (httpizza.ingredients.length > 0) {
			var crust = httpizza.ingredients.filterByName(pizza.get('crust'))[0];
			imageObj.src = crust.get('brush_image');	
		}

		

		// if (pizza.get('crust') === 'Hand Tossed') {
		// 	drawHandTossedCrust(context, pizza, xoffset, yoffset, radius);
		// } else if (pizza.get('crust') === 'Thin') {
		// 	drawThinCrust(context, pizza, xoffset, yoffset, radius);
		// } else if (pizza.get('crust') === 'Deep Dish') {
		// 	drawDeepDishCrust(context, pizza, xoffset, yoffset, radius);
		// } else if (pizza.get('crust') === 'Whole Wheat') {
		// 	drawWholeWheatCrust(context, pizza, xoffset, yoffset, radius);
		// } else {
		// 	console.error("Unknown crust.");
		// }
	};

	/* Crust rendering methods */
	function drawHandTossedCrust(context, pizza, xoffset, yoffset, radius) {
		var gradient = context.createLinearGradient(0, 0, 0, 20);
		gradient.addColorStop(0, "#ffc821");
		gradient.addColorStop(1, "#faf100");

		that.drawFilledCircle(context, xoffset, yoffset, radius, "rgb(255, 219, 112)");
		that.drawEmptyCircle(context, xoffset, yoffset, radius - 1, gradient);
	}

	function drawThinCrust(context, pizza, xoffset, yoffset, radius) {
		that.drawFilledCircle(context, xoffset, yoffset, radius, "rgb(255, 219, 112)");
	}

	function drawDeepDishCrust(context, pizza, xoffset, yoffset, radius) {
		that.drawFilledCircle(context, xoffset, yoffset, radius, "rgb(255, 219, 112)");
		that.drawEmptyCircle(context, xoffset, yoffset, radius - 1, "rgb(60, 60, 60)");

	}

	function drawWholeWheatCrust(context, pizza, xoffset, yoffset, radius) {
		that.drawFilledCircle(context, xoffset, yoffset, radius, "rgb(255, 239, 132)");
		that.drawEmptyCircle(context, xoffset, yoffset, radius - 1, "rgb(285, 234, 81)");
	}

	function drawSauce(context, pizza, xoffset, yoffset, radius) {
		var color = sauceBrushes[pizza.get('sauce')];
		that.drawFilledCircle(context, xoffset, yoffset, radius, color);
	}

	function drawCheeses(context, pizza, xoffset, yoffset, radius) {
		if ((typeof pizza.get('cheeses') != "undefined") && pizza.get('cheeses') !== null && pizza.get('cheeses').length > 0) {
			$.each(pizza.get('cheeses'), function(index, value) {
				var image = new Image();
				
				image.onload = function() {
					var pattern = context.createPattern(image, "repeat");
					that.drawFilledCircle(context, xoffset, yoffset, radius, pattern);
				};

				image.src = cheeseImages[value];
			});
		}	
	}

	return that;
};