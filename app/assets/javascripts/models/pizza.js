// Creates a namespace for the app.
var httpizza = httpizza || {};

/**
* The Pizza model maintains several properties, including crust, sauce, cheeses, and toppings.
*/
httpizza.Pizza = Backbone.Model.extend({
	/**
	* The default values of a new pizza.
	*/
	defaults: {
		crust: 'Hand Tossed',
		cheeses: [],
		toppings: []
	},

	/**
	* Invoked automatically when a new pizza is created.
	*/
	initialize: function() {
		// Assign an even handler to the 'error' event.
		this.bind("error", function(model, error) {
			alert(error);
		});
	},

	/**
	* Validation method for this model. 
	* Returns a value if validation fails.
	* Returns no value if validation passes.
	*/
	validate: function(attributes) {
		// Prevent a pizza from having more than 3 kinds of cheese.
		if (attributes.cheeses.length > 3) {
			return "You can't have more than three cheeses!";
		}
	}
});
