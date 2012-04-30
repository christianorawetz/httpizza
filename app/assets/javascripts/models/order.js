// Creates a namespace for the app.
var httpizza = httpizza || {};

httpizza.Order = Backbone.Model.extend({ 
	urlRoot: '/orders',

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