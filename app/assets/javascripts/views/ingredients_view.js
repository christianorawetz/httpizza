// Create a namespace for our app.
var httpizza = httpizza || {};

httpizza.IngredientsView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, "render", "renderCrusts", "renderSauces", "renderCheeses", "renderToppings");

		this.ingredients = this.options.ingredients;
		this.pizza = this.options.pizza;

		this.template = _.template( $("#ingredients_template").html() );
	},

	events: {
		'click #make-line-ingredients li': 'addIngredient',
		'click #crustLink': 'renderCrusts',
		'click #sauceLink': 'renderSauces',
		'click #cheesesLink': 'renderCheeses',
		'click #toppingsLink': 'renderToppings',
		'click li a': 'toggleLinkStyle'
	},

	// Maps ingredient types to functions that know 
	// how to update the ingredients of a pizza model.
	fnMap: {
		"crust": function(value) { return { "crust": value } },
		"sauce": function(value) { return { "sauce": value } },
		"cheese": function(value, pizza) { 
			var cheeses = pizza.get('cheeses');
			return { "cheeses": _.union(cheeses, [ value ]) };
		},
		"topping": function(value, pizza) { 
			var toppings = pizza.get('toppings');
			return { "toppings": _.union(toppings, [ value ]) };
		}
	},

	// Adds an ingredient to a pizza
	addIngredient: function(e) {
		// Obtain the ingredient data from the element's data-* attribute
		var data = e.currentTarget.getAttribute('data-ingredient').split(':');
		var property = data[0];
		var value = data[1];

		// Obtain the new pizza property.
		var updateProperty = this.fnMap[property](value, this.pizza);

		// Update the pizza.
		this.pizza.set(updateProperty);
	},

	render: function() {
		this.renderCrusts();
	},

	// Toggles the active link style when the user clicks on a link.
	toggleLinkStyle: function(e) {
		var target = e.currentTarget;

		$("li a").removeClass('active-link');
		$("#" + e.currentTarget.id).addClass('active-link');
	},

	renderCrusts: function(e) {
		var crusts = { ingredients: this.ingredients.getCrusts() };
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