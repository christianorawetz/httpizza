var httpizza = httpizza || {};

httpizza.PizzaView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, "render", "renderCrust", "renderSauce", "renderCheese", "renderToppings");
		
		this.pizza = this.options.pizza;
		this.ingredients = this.options.ingredients;

		this.canvasHelper = new httpizza.PizzaCanvasHelper(this.ingredients, this.options.imageCache);

		//this.pizza.bind("change", this.render);
		
		this.sauceCanvas = $("#sauce-canvas")[0];
		this.cheeseCanvas = $("#cheese-canvas")[0];

		//this.pizza.bind("change", this.render)
		this.pizza.bind("change:crust", this.renderCrust);
		this.pizza.bind("change:sauce", this.renderSauce);
		this.pizza.bind("change:cheeses", this.renderCheese);
		this.pizza.bind("change:toppings", this.renderToppings);

		this.template = _.template( $("#pizza_template").html() );
	},
	render: function() {
		$(this.el).html(this.template());

		this.renderCrust();
	},
	renderCrust: function() {
		this.crustCanvas = this.crustCanvas || $("#crust-canvas")[0];
		this.canvasHelper.clearCanvas(this.crustCanvas);
		this.canvasHelper.drawCrust(this.crustCanvas, this.pizza);		
	},
	renderSauce: function() {
		this.sauceCanvas = this.sauceCanvas || $("#sauce-canvas")[0];
		if (this.pizza.get('sauce') !== 'undefined' && this.pizza.get('sauce') !== null) {
			this.canvasHelper.clearCanvas(this.sauceCanvas);
			this.canvasHelper.drawSauce(this.sauceCanvas, this.pizza);		
		}

	},
	renderCheese: function() {
		this.cheeseCanvas = this.cheeseCanvas || $("#cheese-canvas")[0];
		this.canvasHelper.clearCanvas(this.cheeseCanvas);
		this.canvasHelper.drawCheese(this.cheeseCanvas, this.pizza);
	},
	renderToppings: function() {
		this.toppingsCanvas = this.toppingsCanvas || $("#toppings-canvas")[0];

		this.canvasHelper.clearCanvas(this.toppingsCanvas);
		this.canvasHelper.drawToppings(this.toppingsCanvas, this.pizza);
	},
});