// Create a namespace for our app.
var httpizza = httpizza || {};

httpizza.IngredientsView = Backbone.View.extend({

	events: {
		'click #make-line-ingredients li': 'addIngredient',
		'click #crustLink a': 'renderCrusts',
		'click #sauceLink ': 'renderSauces',
		'click #cheesesLink a': 'renderCheeses',
		'click #toppingsLink a': 'renderToppings'
	},

	fnmap: {
		"crust": function(value) { return { "crust": value } },
		"sauce": function(value) { return { "sauce": value } },
		"cheese": function(value, pizza) { 
			var cheeses = pizza.get('cheeses');
			return { "cheeses": cheeses.concat([ value ]) };
		},
		"topping": function(value, pizza) { 
			var toppings = pizza.get('toppings');
			return { "toppings": toppings.concat([ value ]) };
		}
	},

	initialize: function() {
		_.bindAll(this, "renderCrusts", "renderSauces", "renderCheeses", "renderToppings");

		this.ingredients = this.options.ingredients;
		this.pizza = this.options.pizza;

		this.template = _.template( $("#ingredients_template").html() );
	},

	addIngredient: function(e) {
		var data = e.currentTarget.getAttribute('data-ingredient').split(':');
		var property = data[0];
		var value = data[1];

		var updateProperty = this.fnmap[property](value, this.pizza);

		this.pizza.set(updateProperty);
	},

	render: function() {
		this.renderCrusts();
	},

	renderCrusts: function() {
		var crusts = { ingredients: this.ingredients.getCrusts() };
		
		// Render the view template.
		$(this.el).html( this.template(crusts) );
	},

	renderSauces: function() {
		var sauces = { ingredients: this.ingredients.getSauces() };
		$(this.el).html( this.template(sauces) );
	},

	renderCheeses: function() {
		var cheeses = { ingredients: this.ingredients.getCheeses() };
		$(this.el).html( this.template(cheeses) );
	},

	renderToppings: function() {
		var toppings = { ingredients: this.ingredients.getToppings() };
		$(this.el).html( this.template(toppings) ); 
	}
});