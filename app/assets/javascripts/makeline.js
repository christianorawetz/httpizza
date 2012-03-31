var httpizza = httpizza || {};

httpizza.AppRouter = Backbone.Router.extend({
	routes: {
		"": "index",
	},
	initialize: function() {
		_.bindAll(this, "index", "loadCollection", "loadImages", "loadViews", "onResponse");

		// Hash to store images.
		this.imageCache = {};

		// Create a new Pizza and Ingredients collection.
		this.pizza = new httpizza.Pizza();
		this.ingredients = new httpizza.Ingredients();
	},

	index: function() {
		this.loadCollection();
	},

	loadCollection: function() {
		// Call service to populate the collection.
		this.ingredients.fetch({ 
			success: this.onResponse, 
			error: function() { alert("Failed to call service."); }
		});
	},

	onResponse: function() {
		this.loadImages(this.loadViews); 
	},

	loadImages: function(callback) {
		var icons = this.ingredients.pluck('icon_image');
		var brushes = this.ingredients.pluck('brush_image');

		var imageUrls = _.union(icons, brushes);
		var imageCount = 0;

		for (var i in imageUrls) {
			var url = imageUrls[i];
			this.imageCache[url] = new Image();
			this.imageCache[url].onload = (function() {
				if (++imageCount >= imageUrls.length) {
					callback();
				}
			})();

			this.imageCache[url].src = url;
		}
	},

	loadViews: function() {
		// Create the IngredientsView
		new httpizza.IngredientsView({ 
			el: $("#ingredients-view"), 
			ingredients: this.ingredients,
			pizza: this.pizza,
			imageCache: this.imageCache
		}).render();

		// Create the PizzaView
		new httpizza.PizzaView({ 
			el: $("#pizza-view"),
			ingredients: this.ingredients,
			pizza: this.pizza,
			imageCache: this.imageCache
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



