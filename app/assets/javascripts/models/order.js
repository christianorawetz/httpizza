// Create a namespace for our app.
var httpizza = httpizza || {};

httpizza.Pizza = Backbone.Model.extend({
	defaults: {
		crust: 'Hand Tossed',
		cheeses: [],
		toppings: []
	}
});

httpizza.Order = Backbone.Model.extend({
	defaults: {
		price: 0.0,
		customer: {}
	}
});
