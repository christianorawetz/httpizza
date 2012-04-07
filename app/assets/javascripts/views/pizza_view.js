var httpizza = httpizza || {};

httpizza.PizzaView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, "render", "renderCrust", "renderSauce", "renderCheese", "renderToppings");

		this.canvasHelper = new httpizza.PizzaCanvasHelper(this.options.ingredients);

		this.pizza = this.options.pizza;
		this.pizza.bind("change:crust", this.renderCrust);
		this.pizza.bind("change:sauce", this.renderSauce);
		this.pizza.bind("change:cheeses", this.renderCheese);
		this.pizza.bind("change:toppings", this.renderToppings);
	},
	render: function() {
		this.renderCrust();
	},
	renderCrust: function() {
		this.crustCanvas = this.crustCanvas || $("#crust-canvas")[0];
		this.canvasHelper.drawCrust(this.crustCanvas, this.pizza);		
	},
	renderSauce: function() {
		this.sauceCanvas = this.sauceCanvas || $("#sauce-canvas")[0];
		this.canvasHelper.drawSauce(this.sauceCanvas, this.pizza);		
	},
	renderCheese: function() {
		this.cheeseCanvas = this.cheeseCanvas || $("#cheese-canvas")[0];
		this.canvasHelper.drawCheese(this.cheeseCanvas, this.pizza);
	},
	renderToppings: function() {
		this.toppingsCanvas = this.toppingsCanvas || $("#toppings-canvas")[0];
		this.canvasHelper.drawToppings(this.toppingsCanvas, this.pizza);
	},
});