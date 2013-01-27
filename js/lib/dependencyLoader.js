/*
	dependencyLoader
	options
		preload		boolean		wait for window load event, preloading all images and sources
		domready	boolean		wait for domready
*/
define(function(){
	'use strict';

	var paths = {
		jquery: 'lib/jquery-1.8.3',
		underscore: 'lib/underscore-min-1.4.3'
	};

	/*
	 * provides CDN fallback for jquery and underscore
	 */
	return function dependencyLoader(onloaded,opt){
		var deps = [],
			options = opt || {};

		function doLoad(){
			if(options.preload){
				$(window).load(function(){ onloaded(); });
			}else if(options.domready){
				$(document).ready(function(){ onloaded(); });
			}else{
				onloaded();
			}
		}

		window.$ = window.jQuery;
		if(!window.$){
			deps.push(paths.jquery);
		}
		if(!window._){
			deps.push(paths.underscore);
		}

		if(!deps.length){
			doLoad();
			return;
		}

		require(deps,function(){
			doLoad();
		});
	};
});