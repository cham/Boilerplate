/*
	main.js file
*/
require(['lib/dependencyLoader'],
function(dependencyLoader){
	'use strict';

	dependencyLoader(function(){
		console.log('Dependencies loaded');

		// code here
		
	},{ // dependencyLoader options
		// domready: true
		// preload: true
	});
});