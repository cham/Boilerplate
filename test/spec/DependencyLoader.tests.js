define([
	'lib/DependencyLoader'
],
function(DependencyLoader){
	'use strict';

	describe('DependencyLoader', function(){

		var loader;

		afterEach(function(){
			loader = undefined;
		});

		describe('initialisation', function(){

			it('adds jquery and underscore to dependencies when initialised', function(){
				loader = new DependencyLoader();
				expect(loader.dependencies.length).toEqual(2);
				expect(loader.dependencies[0]).toEqual({symbol: window.$, path: 'lib/jquery-1.9.0'});
				expect(loader.dependencies[1]).toEqual({symbol: window._, path: 'lib/underscore-min-1.4.3'});
			});

			it('accepts an onLoaded option', function(){
				var testFn = function(a){return a;};

				loader = new DependencyLoader({
					onLoaded: testFn
				});

				expect(loader.onLoaded).toEqual(testFn);
			});

			it('accepts a preload option, which waits for window.load if set', function(){
				var jqLoadStub = sinon.stub(window.$.fn,'load');

				loader = new DependencyLoader({
					preload: true
				}).load();

				expect(jqLoadStub.called).toEqual(true);
				jqLoadStub.restore();
			});

			it('accepts a domready option, which waits for document.ready if set', function(){
				var jqReadySpy = sinon.stub(window.$.fn,'ready');

				loader = new DependencyLoader({
					domready: true
				}).load();

				expect(jqReadySpy.called).toEqual(true);
				jqReadySpy.restore();
			});

			it('accepts a removecsshook option, which removes the no-js class from the <html> element', function(){
				expect($('html.no-js').length).toEqual(1);

				loader = new DependencyLoader({
					removecsshook: true
				}).load();

				expect($('html.no-js').length).toEqual(0);
			});

			it('accepts a dependencies array, prepended to the list', function(){
				loader = new DependencyLoader({
					dependencies: [
						{symbol: window.someLibrary, path: 'lib/someLibrary'}
					]
				});

				expect(loader.dependencies.length).toEqual(3);
				expect(loader.dependencies[0]).toEqual({"symbol": window.someLibrary, "path": "lib/someLibrary"});
			});

			describe('dependency format', function(){

				it('dependency entries are objects with two parameters', function(){
					loader = new DependencyLoader();
					
					expect(_(loader.dependencies[0]).isObject()).toEqual(true);
					expect(_(loader.dependencies[0]).size()).toEqual(2);
				});

				it('dependency entries have a "symbol" parameter that references the global symbol', function(){
					loader = new DependencyLoader();
					
					expect(loader.dependencies[0].symbol).toBeDefined();
					expect(loader.dependencies[0].symbol).toEqual(window.$);
				});

				it('dependency entries have a "path" parameter that points to the file', function(){
					loader = new DependencyLoader();
					
					expect(loader.dependencies[0].path).toBeDefined();
					expect(loader.dependencies[0].path).toEqual('lib/jquery-1.9.0');
				});

			});

		});

		describe('add', function(){

			it('calling add() pushes to dependencies', function(){
				loader = new DependencyLoader();
				loader.add({symbol: window.someLibrary, path: 'lib/someLibrary'});

				expect(loader.dependencies.length).toEqual(3);
				expect(loader.dependencies[2]).toEqual({"symbol": window.someLibrary, "path": "lib/someLibrary"});
			});

			it('add() can be chained', function(){
				var err;

				loader = new DependencyLoader();

				try{
					loader
						.add({symbol: window.someLibrary, path: 'lib/someLibrary'})
						.add({symbol: window.someOtherLibrary, path: 'lib/someOtherLibrary'});
				}catch(e){
					err = e;
				}

				expect(err).not.toBeDefined();
				expect(loader.dependencies.length).toEqual(4);
				expect(loader.dependencies[2]).toEqual({symbol: window.someLibrary, path: "lib/someLibrary"});
				expect(loader.dependencies[3]).toEqual({symbol: window.someOtherLibrary, path: "lib/someOtherLibrary"});
			});

		});

		describe('load', function(){

			it('calling load() checks dependencies and loads any missing symbols', function(){
				var requireStub = sinon.stub(window,'require',function(){
					return false;
				});

				new DependencyLoader({
					dependencies: [{symbol: window.someLibrary, path: "lib/someLibrary"}]
				}).load();

				expect(requireStub.called).toEqual(true);
				expect(requireStub.args[0][0]).toEqual(['lib/someLibrary']);

				requireStub.restore();
			});

			it('if no dependencies need loading then onLoaded fires immediately', function(){
				var onLoadedSpy;

				loader = new DependencyLoader();
				onLoadedSpy = sinon.spy(loader,'onLoaded');

				loader.load();

				expect(onLoadedSpy.called).toEqual(true);
				onLoadedSpy.restore();
			});

		});

	});
});