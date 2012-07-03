var httpizza = httpizza || {};

/**
* Defines the behavior of the checkout view.
*/
httpizza.CheckoutView = Backbone.View.extend({
	events: {
		"change #nameField": "onNameChanged",
		"change #emailField": "onEmailChanged",
		"change #phoneField": "onPhoneChanged",
		"change #addressField": "onAddressChanged",
		"click #geolocButton": "onLocateClicked",
		"click #placeOrderButton": "onPlaceOrderClicked"
	},

	initialize: function() {
		_.bindAll(this, "geocodeAddress");

		// Create a persistence helper
		this.persistenceHelper = new httpizza.PizzaPersistenceHelper();

		// Retrieve the order from session storage
		var pizza = this.persistenceHelper.getPizzaSession();

		// Redirect the user to the makeline page if the order doesn't have a pizza.
		if (typeof pizza === 'undefined') {
			window.location = "/orders/makeline";
		}

		this.order = new httpizza.Order({ pizza: pizza });

		// Compile the view template
		this.template = _.template( $("#checkout_template").html() );
	},

	/**
	* Renders the checkout view.
	*/
	render: function() {
		var data = { order: this.order };

		$(this.el).html( this.template(data) );
	},

	/**
	* Renders the map element.
	*/
	renderMap: function(position) {
		var latlng = new google.maps.LatLng(position.coords.latitude,
											position.coords.longitude);

		var options = {
			zoom : 15,
			center : latlng,
			mapTypeControl : false,
			mapTypeId : google.maps.MapTypeId.ROADMAP,
			navigationControlOptions : {
				style : google.maps.NavigationControlStyle.SMALL
			}
		};		

		var map = new google.maps.Map(document.getElementById("map-canvas"),
									  options);	

		var marker = new google.maps.Marker({
			position : latlng,
			map : map,
			title : "You are here!"
		});									  	
	},

	/**
	* Updates the order's name property.
	*/
	onNameChanged: function(e) {
		this.order.set({ name: e.currentTarget.value }, {silent: true});
	},

	/**
	* Updates the order's email property.
	*/
	onEmailChanged: function(e) {
		this.order.set({ email: e.currentTarget.value }, {silent: true});
	},

	/**
	* Updates the order's phone property.
	*/
	onPhoneChanged: function(e) {
		this.order.set({ phone: e.currentTarget.value }, {silent: true});
	},

	/**
	* Updates the order's address property.
	*/
	onAddressChanged: function(e) {
		this.order.set({ address: e.currentTarget.value }, {silent: true});
	},

	/**
	* Attempts to resolve the client's location.
	*/
	onLocateClicked: function(e) {
		// Ensure the geolocation API is supported
		if (Modernizr.geolocation) {
			navigator.geolocation.getCurrentPosition(
				this.geocodeAddress,
				this.geolocationFailed,
				{ timeout: 5000 }
			);
		} else {
			alert("Your browser doesn't support the geolocation API.");
		}
	},

	/**
	* Handles any geolocation failures.
	*/
	geolocationFailed: function(error) {
		var message;

		switch (error.code) {
			case 0: message = "Geolocation call failed.";
				break;
			case 1: message = "Geolocation request denied.";
				break;
			case 2: message = "Position unavailable.";
				break;
			case 3: message = "Geolocation request timed out. Please try again.";
				break;
		}

		alert(message); 
	},

	/**
	* Resolves the user's address using Google's geocoding API.
	*/
	geocodeAddress: function(position) {
		var that = this;

		var geocoder = new google.maps.Geocoder();
		var latLong = new google.maps.LatLng(position.coords.latitude,
											 position.coords.longitude);

		geocoder.geocode({ latLng: latLong }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK && results[0]) {
				var address = results[0].formatted_address;

				// Perform a little formatting (replace commas with newlines)
				address = address.replace(/,/g, "\n");

				// Update the order's address
				that.order.set({ address: address }, {silent: true});
				
				// Render the view
				that.render();

				// Render the map
				that.renderMap(position);
			}
		});
	},

	/**
	* Persists the order model.
	*/
	onPlaceOrderClicked: function(e) {
		// order.save POSTs the order to the /orders resource provided by Rails.
		this.order.save(null, { 
			success: function(model, response) { window.location = "/orders/confirmation"; },
			error: function(model, response) { alert("Failed to save order. Message: " + response); }
		});
	},
});