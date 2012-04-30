var httpizza = httpizza || {};

/**
* Initializes the application.
*/
httpizza.AppRouter = Backbone.Router.extend({
	/**
	* Map routes (URIs) to methods.
	*/
	routes: {
		"": "index"
	},

	/**
	* Invoked automatically when a new AppRouter is created.
	*/
	initialize: function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "index", "loadViews");

		// Create a new Pizza and Ingredients collection.
		this.pizza = new httpizza.Pizza();
		this.ingredients = new httpizza.Ingredients();
	},

	/**
	* Invoked when the user navigates to the default (root) URI.
	*/
	index: function() {
		// Call service to populate the collection.
		// On successful response, invoke loadViews. Else, display an error message.
		this.ingredients.fetch({ 
			success: this.loadViews, 
			error: function() { alert("Failed to call service."); }
		});		
	},

	/**
	* Creates and renders all views. 
	*/
	loadViews: function() {
		// Create the IngredientsView
		new httpizza.IngredientsView({ 
			el: $("#ingredients-view"), 
			ingredients: this.ingredients,
			pizza: this.pizza
		}).render();

		// Create the PizzaView
		new httpizza.PizzaView({ 
			el: $("#pizza-view"),
			ingredients: this.ingredients,
			pizza: this.pizza
		}).render();

		// Create the OrderTicketView
		new httpizza.OrderTicketView({
			el: $("#order-ticket-view"),
			ingredients: this.ingredients,
			pizza: this.pizza
		}).render();
	},
});



