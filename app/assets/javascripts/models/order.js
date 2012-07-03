// Creates a namespace for the app.
var httpizza = httpizza || {};

httpizza.Order = Backbone.Model.extend({ 
	urlRoot: '/orders',

	/**
	* Order validation logic. If invalid, returns an error message.
	*/
	validate: function(attributes) {
		if (typeof attributes.name === 'undefined' ||
			typeof attributes.email === 'undefined' ||
			typeof attributes.phone === 'undefined' ||
			typeof attributes.address === 'undefined') 
		{
			return "Required information missing.";
		}
	}
});