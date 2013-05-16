define([
	'ExampleBackboneView'
],
function(ExampleBackboneView){
	'use strict';

	describe('ExampleBackboneView', function(){

		var view;

		beforeEach(function(){
			view = new ExampleBackboneView();
		});

		afterEach(function(){
			view = undefined;
		});

		describe('initialisation', function(){

			it('correctly extends Backbone.View', function(){
				expect(view instanceof Backbone.View).toEqual(true);
			});

		});

		describe('rendering', function(){

			beforeEach(function(){
				view.render();
			});

			it('renders the example message', function(){
				expect(view.$('p').length).toEqual(1);
				expect(view.$('p').text()).toEqual('Example Backbone View has rendered');
			});

		});

	});
});