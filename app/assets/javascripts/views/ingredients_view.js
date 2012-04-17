// Create a namespace for our app.
var httpizza = httpizza || {};

/**
* Defines the behavior of the Ingredients view.
*/
httpizza.IngredientsView = Backbone.View.extend({

	/**
	* Event bindings - associate UI events with event handler methods.
	* (e.g. a click on the #crustLink element invokes the renderCrusts method)
	*/
	events: {
		'click #make-line-ingredients li': 'addIngredient',
		'click #crustLink': 'renderCrusts',
		'click #sauceLink': 'renderSauces',
		'click #cheesesLink': 'renderCheeses',
		'click #toppingsLink': 'renderToppings',
		'click li a': 'toggleLinkStyle'
	},

	/**
	* Maps ingredient types to functions that know how to update the ingredients of a pizza.
	*/
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

	/**
	* Invoked automatically when a new IngredientsView object is created.
	*/
	initialize: function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "render", "renderCrusts", "renderSauces", "renderCheeses", "renderToppings");

		// Get the ingredients and the pizza from the constructor arguments (this.options).
		this.ingredients = this.options.ingredients;
		this.pizza = this.options.pizza;

		// Compile the view template.
		this.template = _.template( $("#ingredients_template").html() );
	},

	/**
	* Adds an ingredient to a pizza.
	*/
	addIngredient: function(e) {
		// Obtain the ingredient data from the element's data-* attribute.
		var data = e.currentTarget.getAttribute('data-ingredient').split(':');
		var property = data[0];
		var value = data[1];

		// Obtain an update function from the fnMap hash and invoke it to obtain an updated pizza property.
		var updatedProperty = this.fnMap[property](value, this.pizza);

		// Update the pizza model.
		this.pizza.set(updatedProperty);
	},

	/**
	* Renders the default ingredients view.
	*/
	render: function() {
		// Render crusts by default.
		this.renderCrusts();
	},

	/**
	* Toggles the active link style when the user clicks on a link.
	*/
	toggleLinkStyle: function(e) {
		var target = e.currentTarget;

		$("li a").removeClass('active-link');
		$("#" + e.currentTarget.id).addClass('active-link');
	},

	/**
	* Renders the crusts.
	*/
	renderCrusts: function(e) {
		var crusts = { ingredients: this.ingredients.getCrusts() };
		$(this.el).html( this.template(crusts) );
	},

	/**
	* Renders the sauces.
	*/
	renderSauces: function() {
		var sauces = { ingredients: this.ingredients.getSauces() };
		$(this.el).html( this.template(sauces) );
	},

	/**
	* Renders the cheeses.
	*/
	renderCheeses: function() {
		var cheeses = { ingredients: this.ingredients.getCheeses() };
		$(this.el).html( this.template(cheeses) );
	},

	/**
	* Renders the toppings.
	*/
	renderToppings: function() {
		var toppings = { ingredients: this.ingredients.getToppings() };
		$(this.el).html( this.template(toppings) ); 
	}
});