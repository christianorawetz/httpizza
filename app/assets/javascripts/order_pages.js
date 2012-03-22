/* A base presenter type */
var makeLinePresenter = function(model, view, validationRequired) {
	var that = {};

	// Reference to make-line-surface canvas.
	that.makeLineSurface = document.querySelector('.make-line-surface canvas');

	// Retrieve the current order and validate it if required.
	that.order = model.getCurrentOrder();
	that.order = isValidationRequired() && !isOrderValid(that.order) 
							 ? fixInvalidOrder(that.order) : that.order; 

	// Renders the current order's pizza on the make-line.
	that.renderPizzaOnMakeLine = function() {
		if (that.order != null && that.order.pizza != null) {
			view.drawPizzaLarge(that.makeLineSurface, that.order.pizza);
		} 
	};

	// If a user navigates to one of the order pages without first selecting a crust,
	// the order could be in a state that could cause some trouble (e.g. spilled pizza sauce).
	// This method returns true if the order is valid, false otherwise.
	function isOrderValid(order) {
		return that.order !== null && order.pizza !== null && order.pizza.crust !== null;
	}

	// Fixes an invalid order by merging it with a valid one.
	function fixInvalidOrder(invalidOrder) {
		// Create a new valid order and merge it with the existing order.
		var validOrder = model.createNewOrder();
		validOrder.pizza.crust = 'hand-tossed';
		var fixedOrder = $.extend({}, invalidOrder, validOrder);

		return fixedOrder;
	}

	function isValidationRequired() {
		return validationRequired !== 'undefined' && validationRequired === true;
	}

	that.renderPizzaOnMakeLine();

	return that;
};

/* Crust view's presenter */
var crustPresenter = function(model, view) {
	var that = makeLinePresenter(model, view);

	// Initializes this presenter (renders make-line tray items and assigns event handlers).
	that.initialize = function() {
		$('div.make-line-tray').each(function() {
			// Draw crust icon.
			renderCrustOption(this);

			// Assign click-event handler
			$(this).click(function() {
				onCrustClicked(this);
			});
		});
	};

	// Renders a crust option in a make-line-tray.
	function renderCrustOption(elem) {
			var canvas = $(elem).find('canvas')[0];
			var crustType = elem.getAttribute('data-crust');

			view.drawPizzaSmall(canvas, { crust: crustType });
	}

	// Crust button clicked event handler.
	function onCrustClicked(elem) {
		that.order = that.order || model.createNewOrder();
		that.order.pizza.crust = elem.getAttribute('data-crust');
		model.saveCurrentOrder(that.order);

		that.renderPizzaOnMakeLine();
	}

	return that;
};

/* Sauce view's presenter */
var saucePresenter = function(model, view) {
	var that = makeLinePresenter(model, view, true);

	that.initialize = function() {
		$('.make-line-tray').click(function() {
			onSauceClicked(this);
		});
	};

	function onSauceClicked(elem) {
		that.order.pizza.sauce = elem.getAttribute('data-sauce');
		model.saveCurrentOrder(that.order);
		that.renderPizzaOnMakeLine();
	}

	return that;
};

var cheesePresenter = function(model, view) {
	var that = makeLinePresenter(model, view, true);

	that.initialize = function() {
		$('.make-line-tray').click(function() {
			onCheeseClicked(this);
		});
	};

	function onCheeseClicked(elem) {
		var cheese = elem.getAttribute('data-cheese');

		if (typeof that.order.pizza.cheeses == 'undefined' || that.order.pizza.cheeses === null) {
			that.order.pizza.cheeses = [];
		}

		if ( $.inArray(cheese, that.order.pizza.cheeses) === -1 ) {
			that.order.pizza.cheeses.push(cheese);
			model.saveCurrentOrder(that.order);
			that.renderPizzaOnMakeLine();
		}
	}

	return that;
};