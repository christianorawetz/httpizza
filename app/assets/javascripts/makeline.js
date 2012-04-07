var httpizza = httpizza || {};

httpizza.AppRouter = Backbone.Router.extend({
	initialize: function() {
		_.bindAll(this, "loadViews");

		// Hash to store images.
		this.imageCache = {};

		// Create a new Pizza and Ingredients collection.
		this.pizza = new httpizza.Pizza();
		this.ingredients = new httpizza.Ingredients();

		// Call service to populate the collection.
		this.ingredients.fetch({ 
			success: this.loadViews, 
			error: function() { alert("Failed to call service."); }
		});
	},

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

$(function() {
	_.templateSettings = {
	    interpolate: /\<\?\=(.+?)\?\>/g,
	    evaluate: /\<\?(.+?)\?\>/g
	};

	var app = new httpizza.AppRouter();
	Backbone.history.start();
});



