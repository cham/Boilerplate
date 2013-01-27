/*
	main.js file
*/
require(['lib/DependencyLoader'],
function(DependencyLoader){
	'use strict';

	new DependencyLoader({
		onLoaded: function(){

			console.log('Dependencies loaded');
			// your code here

		},
		// domready: true
		// preload: true
		// dependencies: [{symbol:$.fn.scrollTo, path:'lib/jquery-scrollTo.js'}]
	}).add({
		// symbol: $.fn.scrollTo,
		// path:'lib/jquery-scrollTo.js'
	}).load();
});