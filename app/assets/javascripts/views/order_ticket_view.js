// Create a namespace for our app.
var httpizza = httpizza || {};

/**
* Defines the behavior of the OrderTicket view
*/
httpizza.OrderTicketView = Backbone.View.extend({

	/**
	* Event bindings - associate UI events with event handler methods.
	*/
	events: {
		"click li div a": 'onRemoveClicked'
	},

	/**
	* Invoked automatically when a new OrderTicketView object is created.
	*/
	initialize: function() {
		// Ensure all methods have a reference to this 'this'.
		_.bindAll(this, "render", "createItem", "createItems", "createItemGroup", "onRemoveClicked");

		// Get the ingredients and the pizza from the constructor arguments (this.options).
		this.ingredients = this.options.ingredients;
		this.pizza = this.options.pizza;

		// Bind the render method to the pizza's change event. 
		// A change of any of the pizza's properties will cause the render method to be executed.
		this.pizza.bind("change", this.render);

		// Compile the view template.
		this.template = _.template( $("#order_ticket_template").html() );
	},

	/**
	* Renders the ticket.
	*/
	render: function() {
		// Create an object that will store the data to be rendered in the view.
		var data = { itemGroups: [] };

		// Needed so that the following _.each method's function parameter has a reference to this OrderTicketView object.
		var that = this;

		// For each ingredient type, create a group of all the items that were added to the pizza
		// so that they can be rendered to the view.
		_.each(['crust', 'sauce', 'cheeses', 'toppings'], function(category) {
			var itemGroup = that.createItemGroup(category);

			if (typeof itemGroup !== 'undefined') {
				data.itemGroups.push(itemGroup);
			}
		});

		// Get an array of all the items added to the pizza.
		var items = _.pluck(data.itemGroups, 'items');
		items = _.flatten(items);

		// Calculate the total cost of the pizza by summing the price of all items.
		data.total = _.reduce(items, function(sum, item) { return sum + item.price; }, 0.0);

		// Render the template.
		$(this.el).html(this.template(data));
	},

	/**
	* Returns an object that associates a pizza's property with all of its values.
	* (e.g. { title: 'cheeses', items: [{ name: 'Mozzarella', price: 1.99 }, { name: 'Cheddar', price: 1.99 }] })
	*/
	createItemGroup: function(propertyName) {
		var itemGroup;

		if (typeof this.pizza.get(propertyName) !== 'undefined') {
			var propertyValue = this.pizza.get(propertyName);

			if ( !_.isArray(propertyValue) ) {
				itemGroup = { title: propertyName, items: [ this.createItem(propertyValue) ] };
			} else if (propertyValue.length > 0) {
				itemGroup = { title: propertyName, items: this.createItems(propertyValue) };
			}
		}

		return itemGroup;
	},

	/**
	* Returns an object containing the name and price of an ingredient.
	*/
	createItem: function(ingredientName) {
		var ingredient = this.ingredients.filterByName(ingredientName)[0];
		return { name: ingredient.get('name'), price: Number(ingredient.get('price')) };
	},

	/**
	* Returns an array of objects containing the name and price of an ingredients.
	*/
	createItems: function(ingredientNames) {
		var items = [];
		var that = this;

		_.each(ingredientNames, function(ingredientName) {
			var item = that.createItem(ingredientName);
			items.push(item);
		});

		return items;
	},

	/**
	* Removes an item from the pizza.
	*/
	onRemoveClicked: function(e) {
		// Obtain the ingredient type and name from the element's data-* attribute.
		var data = e.currentTarget.getAttribute('data-ingredient').split(':');

		var itemType = data[0];
		var itemName = data[1];

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