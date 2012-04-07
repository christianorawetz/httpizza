// Creates a namespace for the app.
var httpizza = httpizza || {};

httpizza.Ingredient = Backbone.Model.extend({});

httpizza.Ingredients = Backbone.Collection.extend({
	model: httpizza.Ingredient,
	url: '/ingredients.json',

	getSauces: function() {
		return this.filterByType('toppings');
	},

	getCheeses: function() {
		return this.filterByType('cheese');
	},

	getSauces: function() {
		return this.filterByType('sauce');
	},

	getCrusts: function() {
		return this.filterByType('crust');
	},

	getToppings: function() {
		return this.filterByType('topping');
	},

	filterByType: function(ingredientType) {
		return this.filter(function(ingredient) {
			return ingredient.get('ingredient_type') === ingredientType;
		});
	},

	filterByName: function(ingredientName) {
		return this.filter(function(ingredient) {
			return ingredient.get('name') === ingredientName;
		});
	}
});