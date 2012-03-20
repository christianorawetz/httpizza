function clearCanvas(ctx, canvas) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPizzaSmall(canvas, pizza) {
	var xoffset = 45;
	var yoffset = 45;
	var radius	= 40;

	drawPizza(canvas, pizza, xoffset, yoffset, radius);
}

function drawPizzaLarge(canvas, pizza) {
	var xoffset = 150;
	var yoffset = 150;
	var radius	= 140;

	drawPizza(canvas, pizza, xoffset, yoffset, radius);
}

/* Draws the pizza object on the provided canvas. */
function drawPizza(canvas, pizza, xoffset, yoffset, radius) {
	if (pizza != null) {
		if (canvas.getContext) {
			var ctx = canvas.getContext('2d');
			clearCanvas(ctx, canvas);
			drawCrust(ctx, pizza, xoffset, yoffset, radius);
		}
	}
}

/* Draws the crust of the provided pizza object. */
function drawCrust(ctx, pizza, xoffset, yoffset, radius) {
	if (pizza.crust == MYAPP.ingredients.crusts.handTossed) {
		drawHandTossedCrust(ctx, pizza, xoffset, yoffset, radius);
	} else if (pizza.crust == MYAPP.ingredients.crusts.thin) {
		drawThinCrust(ctx, pizza, xoffset, yoffset, radius);
	} else if (pizza.crust == MYAPP.ingredients.crusts.deepDish) {
		drawDeepDishCrust(ctx, pizza, xoffset, yoffset, radius);
	} else {
		alert("Unknown crust.");
	}
}

function drawHandTossedCrust(ctx, pizza, xoffset, yoffset, radius) {
	drawFilledCircle(ctx, xoffset, yoffset, radius, "rgb(255, 219, 112)");
	drawEmptyCircle(ctx, xoffset, yoffset, radius - 1, "rgb(285, 204, 51)");
}

function drawThinCrust(ctx, pizza, xoffset, yoffset, radius) {
	drawFilledCircle(ctx, xoffset, yoffset, radius, "rgb(255, 219, 112)");
}

function drawDeepDishCrust(ctx, pizza, xoffset, yoffset, radius) {
	drawFilledCircle(ctx, xoffset, yoffset, radius, "rgb(255, 219, 112)");
	drawEmptyCircle(ctx, xoffset, yoffset, radius - 1, "rgb(60, 60, 60)");

}

function drawCircle(ctx, xoffset, yoffset, radius) {
	ctx.beginPath();
	ctx.arc(xoffset, yoffset, radius, 0, Math.PI * 2, true);
	ctx.closePath();
}

function drawFilledCircle(ctx, xoffset, yoffset, radius, fillStyle) {
	ctx.fillStyle = fillStyle;
	drawCircle(ctx, xoffset, yoffset, radius);
	ctx.fill();
}

function drawEmptyCircle(ctx, xoffset, yoffset, radius, strokeStyle) {
	ctx.strokeStyle = strokeStyle;
	ctx.lineWidth 	= 3;
	drawCircle(ctx, xoffset, yoffset, radius);
	ctx.stroke();
}