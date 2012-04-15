// Creates a namespace for the app.
var httpizza = httpizza || {};

/**
* The Ingredient model maintains several properties, including name, type and price.
*/
httpizza.Ingredient = Backbone.Model.extend({});

/**
* Represents a collection of Ingredient models.
*/
httpizza.Ingredients = Backbone.Collection.extend({
	model: httpizza.Ingredient,
	url: '/httpizza/ingredients.json',

	/**
	* Returns a list of all cheeses.
	*/
	getCheeses: function() {
		return this.filterByType('cheese');
	},

	/**
	* Returns a list of all sauces.
	*/
	getSauces: function() {
		return this.filterByType('sauce');
	},

	/**
	* Returns a list of all crusts.
	*/
	getCrusts: function() {
		return this.filterByType('crust');
	},

	/**
	* Returns a list of all toppings.
	*/
	getToppings: function() {
		return this.filterByType('topping');
	},

	/**
	* Filters the collection by ingredient type (e.g. 'cheese').
	*/
	filterByType: function(ingredientType) {
		return this.filter(function(ingredient) {
			return ingredient.get('ingredient_type') === ingredientType;
		});
	},

	/**
	* Filters the collection by ingredient name (e.g. 'Mozzarella').
	*/
	filterByName: function(ingredientName) {
		return this.filter(function(ingredient) {
			return ingredient.get('name') === ingredientName;
		});
	}
});