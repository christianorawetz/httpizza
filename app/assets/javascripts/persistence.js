var orderModel = function() {
	var that = {};

	/* Retrieves the current order from local storage */
	that.getCurrentOrder = function() {
		var order = localStorage.getItem('order');
		return JSON.parse(order);
	};

	/* Persists an order to local storage */
	that.saveCurrentOrder = function(order) {
		localStorage.setItem('order', JSON.stringify(order));
	};

	/* Clears the current order */
	that.deleteCurrentOrder = function() {
		localStorage.removeItem('order');
	};

	return that;
};