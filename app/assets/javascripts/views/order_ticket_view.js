var httpizza = httpizza || {};

httpizza.OrderTicketView = Backbone.View.extend({
	initialize: function() {
		_.bindAll(this, "render", "createItem", "createItems", "createItemGroup", "onRemoveClicked");

		this.pizza = this.options.pizza;
		this.ingredients = this.options.ingredients;

		this.pizza.bind("change", this.render);

		this.template = _.template( $("#order_ticket_template").html() );
	},
	events: {
		"click li div a": 'onRemoveClicked'
	},
	render: function() {
		var data = { itemGroups: [] };
		var that = this;

		_.each(['crust', 'sauce', 'cheeses', 'toppings'], function(category) {
			var itemGroup = that.createItemGroup(category);

			if (typeof itemGroup !== 'undefined') {
				data.itemGroups.push(itemGroup);
			}
		});

		var items = _.pluck(data.itemGroups, 'items');
		items = _.flatten(items);
		data.total = _.reduce(items, function(sum, item) { return sum + item.price; }, 0.0);

		$(this.el).html(this.template(data));
	},
	createItemGroup: function(propertyName) {
		var itemGroup;

		if (typeof this.pizza.get(propertyName) !== 'undefined') {
			var propertyValue = this.pizza.get(propertyName);

			if ( _.isArray(propertyValue) ) {
				if (propertyValue.length > 0) {
					itemGroup = { title: propertyName, items: this.createItems(propertyValue) };
				}
			} else {
				itemGroup = { title: propertyName, items: [ this.createItem(propertyValue) ] };
			}
		}

		return itemGroup;
	},
	createItem: function(ingredientName) {
		var ingredient = this.ingredients.filterByName(ingredientName)[0];
		return { name: ingredient.get('name'), price: Number(ingredient.get('price')) };
	},
	createItems: function(ingredientNames) {
		var items = [];
		var that = this;

		_.each(ingredientNames, function(ingredientName) {
			var item = that.createItem(ingredientName);
			items.push(item);
		});

		return items;
	},
	onRemoveClicked: function(e) {
		var data = e.currentTarget.getAttribute('data-ingredient');

		var itemType = data.split(":")[0];
		var itemName = data.split(":")[1];

		if (itemType === 'crust') {
			// Navigate to crust section
			$('#crustLink').click();
		} else if (itemType === 'sauce') {
			// Remove the sauce property from the pizza.
			this.pizza.unset('sauce');
		} else {
			// Else it must be a cheese or a topping. Remove it.
			var ingredients = this.pizza.get(itemType)
			ingredients = _.without(ingredients, itemName);

			if (itemType === 'cheeses')
				this.pizza.set({ cheeses: ingredients });
			else 
				this.pizza.set({ toppings: ingredients });
		}
	}
});