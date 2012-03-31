// Create a namespace for our app.
var httpizza = httpizza || {};

httpizza.Ingredient = Backbone.Model.extend({});

httpizza.Ingredients = Backbone.Collection.extend({
	model: httpizza.Ingredient,
	url: '/ingredients.json',
	getSauces: function() {
		return this.filterIngredients('toppings');
	},
	getCheeses: function() {
		return this.filterIngredients('cheese');
	},
	getSauces: function() {
		return this.filterIngredients('sauce');
	},
	getCrusts: function() {
		return this.filterIngredients('crust');
	},
	getToppings: function() {
		return this.filterIngredients('topping');
	},
	filterIngredients: function(ingredient_type) {
		return this.filter(function(ingredient) {
			return ingredient.get('ingredient_type') === ingredient_type;
		});
	},
	filterByName: function(name) {
		return this.filter(function(ingredient) {
			return ingredient.get('name') === name;
		});
	}
});