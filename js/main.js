/*
	main.js file
*/
require(['lib/DependencyLoader'],
function(DependencyLoader){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){

			// your code here

		},
		removecsshook: true // remove .no-js hook on <html>
		// shimconsole: true // shims console.* methods
		// domready: true // wait for domready
		// preload: true // wait for window.load
	}).load();
});