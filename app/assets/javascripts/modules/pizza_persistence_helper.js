// Creates a namespace for the app.
var httpizza = httpizza || {};

/**
* Base module providing support for session and local storage.
*/
httpizza.PersistenceHelper = function() {
	var that = {};

	/**
	* Persists an object to session storage (objects persist only in the current browser session). 
	*/
	that.setSessionStorage = function(key, obj) {
		if ( !Modernizr.sessionstorage ) {
			alertNotSupported('sessionStorage');
		} else {
			sessionStorage.setItem(key, obj);
		}
	};

	/**
	* Retrieves an object from session storage by key.
	*/
	that.getSessionStorage = function(key) {
		if ( !Modernizr.sessionstorage ) {
			alertNotSupported('sessionStorage');
		} else {
			return sessionStorage.getItem(key);
		}
	};

	/**
	* Persists an object to local storage (objects persist across multiple browser sessions).
	*/
	that.setLocalStorage = function(key, obj) {
		if ( !Modernizr.localstorage ) {
			alertNotSupported('localStorage');
		} else {
			localStorage.setItem(key, obj);
		}
	};

	/**
	* Retrieves an object from local storage by key.
	*/
	that.getLocalStorage = function(key) {
		if ( !Modernizr.localstorage ) {
			alertNotSupported('localStorage');
		} else {
			return localStorage.getItem(key);
		}
	};

	/**
	* Displays an alert message.
	*/
	function alertNotSupported(apiName) {
		alert("Your browser doesn't support '" + apiName + "'");
	}

	return that;
};

httpizza.OrderPersistenceHelper = function() {
	var that = new httpizza.PersistenceHelper();

	that.saveOrderSession = function(order) {
		// Serialize the order object to a JSON string.
		var json = JSON.stringify( order.toJSON() );

		// Persist the JSON string to sessionStorage.
		that.setSessionStorage('order', json);
	};

	that.getOrderSession = function() {
		// Retrieve the order JSON string from sessionStorage.
		var json = that.getSessionStorage('order');

		// Deserialize the JSON string to an Order model object.
		return new httpizza.Order( JSON.parse(json) );
	};

	that.saveOrder = function(order) {

	};

	that.getOrder = function() {

	};

	return that;
};