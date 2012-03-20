/* Application container */
var MYAPP = {};

MYAPP.ingredients = {
	crusts: {
		handTossed: 'hand-tossed',
		thin: 'thin-crispy',
		deepDish: 'deep-dish'
	},
	sauces: {
		marinara: 'marinara',
		pesto: 'pesto',
		sourCream: 'sour-cream'
	},
	cheeses: {
		mozarella: 'mozarella',
		parmesan: 'parmesan',
		cheddar: 'cheddar'
	},
	toppings: {
		pepperoni: 'pepperoni',
		sausage: 'sausage',
		olives: 'olives',
		mushrooms: 'mushrooms'
	}
};

/* Retrieves the current order from local storage */
MYAPP.getOrder = function() {
	var order = localStorage.getItem('order');
	return JSON.parse(order);
};

/* Persists an order to local storage */
MYAPP.saveOrder = function(order) {
	localStorage.setItem('order', JSON.stringify(order));
};

/* Clears the current order */
MYAPP.clearOrder = function() {
	localStorage.removeItem('order');
};

/* Initializes the crust page. */
function initCrustPage() {
	
	var handTossedCrustCanvas = document.querySelector('#handTossedCrust canvas');
	var thinCrustCanvas 			= document.querySelector('#thinCrust canvas');
	var deepDishCanvas 				= document.querySelector('#deepDishCrust canvas');
	var workSurfaceCanvas			= document.querySelector('.make-line-surface canvas');

	// Draw pizza icons in make-line trays
	drawPizzaSmall(handTossedCrustCanvas, { crust: MYAPP.ingredients.crusts.handTossed });
	drawPizzaSmall(thinCrustCanvas, { crust: MYAPP.ingredients.crusts.thin } );
	drawPizzaSmall(deepDishCanvas, { crust: MYAPP.ingredients.crusts.deepDish } );

	// Determine if an order already exists and render it if necessary.
	var order = MYAPP.getOrder();

	if (order != null && order.pizza != null) {
		drawPizzaLarge(workSurfaceCanvas, order.pizza);
	} 

	// Assign click events to each make-line tray button
	$('#handTossedCrust, #thinCrust, #deepDishCrust').click(function() {
		// Create a new order if one doesn't exist.
		if (order == null) {
			order = { pizza: { }, deliveryInfo: { } };
		}

		// Remove the string 'Crust' from the element's id 
		// so it can be used as a key to the crusts-hash.
		var key = this.id.replace('Crust', '');

		// Resolve the crust from the list of ingredients.
		order.pizza.crust = MYAPP.ingredients.crusts[key];

		// Save the updated order.
		MYAPP.saveOrder(order);

		drawPizzaLarge(workSurfaceCanvas, order.pizza);
	});
}

function setPizzaCrust() {

}

function initSaucePage() {
	
}

function initCheesePage() {

}


