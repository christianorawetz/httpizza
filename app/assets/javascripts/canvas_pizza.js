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
		'pizza-sauce': 'rgb(222, 0, 0)',
		'pesto': 'rgb(0, 200, 0)',
		'bbq-sauce': 'rgb(200, 150, 0)',
		'hot-sauce': 'rgb(255, 0, 0)',
		'sour-cream': 'rgb(255, 255, 255)'
	};

	var cheeseImages = {
		'mozzarella': '/assets/shredded-mozzarella.png',
		'parmesan': '/assets/shredded-parmesan.png',
		'cheddar': '/assets/shredded-cheddar.png',
		'feta': '/assets/shredded-feta.png',
		'gorgonzola': '/assets/shredded-gorgonzola.png'
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
	function drawCrust(context, pizza, xoffset, yoffset, radius) {
		if (pizza.crust === 'hand-tossed') {
			drawHandTossedCrust(context, pizza, xoffset, yoffset, radius);
		} else if (pizza.crust === 'thin') {
			drawThinCrust(context, pizza, xoffset, yoffset, radius);
		} else if (pizza.crust === 'deep-dish') {
			drawDeepDishCrust(context, pizza, xoffset, yoffset, radius);
		} else if (pizza.crust === 'whole-wheat') {
			drawWholeWheatCrust(context, pizza, xoffset, yoffset, radius);
		} else {
			console.error("Unknown crust.");
		}
	}

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
		var color = sauceBrushes[pizza.sauce];
		that.drawFilledCircle(context, xoffset, yoffset, radius, color);
	}

	function drawCheeses(context, pizza, xoffset, yoffset, radius) {
		if ((typeof pizza.cheeses != "undefined") && pizza.cheeses !== null && pizza.cheeses.length > 0) {
			$.each(pizza.cheeses, function(index, value) {
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