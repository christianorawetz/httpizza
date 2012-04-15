var httpizza = httpizza || {};

/**
* Defines the behavior of the Pizza view.
*/
httpizza.PizzaView = Backbone.View.extend({
	/**
	* Invoked automatically when a new PizzaView is created.
	*/
	initialize: function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "render", "renderCrust", "renderSauce", "renderCheese", "renderToppings");

		// Create an instance of a canvas helper module.
		this.canvasHelper = new httpizza.PizzaCanvasHelper(this.options.ingredients);

		// Get a reference to the pizza from the constructor agruments (this.options)
		// and bind the pizza's individual change events to the respective event handlers.
		this.pizza = this.options.pizza;
		this.pizza.bind("change:crust", this.renderCrust);
		this.pizza.bind("change:sauce", this.renderSauce);
		this.pizza.bind("change:cheeses", this.renderCheese);
		this.pizza.bind("change:toppings", this.renderToppings);
	},

	/**
	* Default method to render the pizza view.
	*/
	render: function() {
		// Render the crust by default.
		this.renderCrust();
	},

	/**
	* Renders the pizza's crust.
	*/
	renderCrust: function() {
		this.crustCanvas = this.crustCanvas || $("#crust-canvas")[0];
		this.canvasHelper.drawCrust(this.crustCanvas, this.pizza);		
	},

	/**
	* Renders the pizza's sauce.
	*/
	renderSauce: function() {
		this.sauceCanvas = this.sauceCanvas || $("#sauce-canvas")[0];
		this.canvasHelper.drawSauce(this.sauceCanvas, this.pizza);		
	},

	/**
	* Renders the pizza's cheese.
	*/
	renderCheese: function() {
		this.cheeseCanvas = this.cheeseCanvas || $("#cheese-canvas")[0];
		this.canvasHelper.drawCheese(this.cheeseCanvas, this.pizza);
	},

	/**
	* Renders the pizza's toppings.
	*/
	renderToppings: function() {
		this.toppingsCanvas = this.toppingsCanvas || $("#toppings-canvas")[0];
		this.canvasHelper.drawToppings(this.toppingsCanvas, this.pizza);
	},
});