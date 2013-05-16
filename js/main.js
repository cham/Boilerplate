/*
	main.js file
*/
require([
	'ExampleBackboneView'
],
function(
	ExampleBackboneView
){
	'use strict';

	var exampleView = new ExampleBackboneView();

	$('body').append(exampleView.$el);

	exampleView.render();

});