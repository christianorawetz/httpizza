// Creates a namespace for the app.
var httpizza = httpizza || {};

httpizza.Pizza = Backbone.Model.extend({
	defaults: {
		crust: 'Hand Tossed',
		cheeses: [],
		toppings: []
	},
	initialize: function() {
		this.bind("error", function(model, error) {
			alert(error);
		});
	},
	validate: function(attributes) {
		if (attributes.cheeses.length > 3) {
			return "You can't have more than three cheeses!";
		}
	}
});

httpizza.Order = Backbone.Model.extend({
	defaults: {
		price: 0.0,
		customer: {}
	}
});
