define(function(){
	'use strict';

	var paths = {
		jquery: 'lib/jquery-1.8.3',
		underscore: 'lib/underscore-min-1.4.3'
	};

	/*
	 * provides CDN fallback for jquery and underscore
	 */
	return function dependencyLoader(onloaded){
		var deps = [];

		window.$ = window.jQuery;
		if(!window.$){
			deps.push(paths.jquery);
		}
		if(!window._){
			deps.push(paths.underscore);
		}

		if(!deps.length){
			onloaded();
			return;
		}

		require(deps,function(){
			onloaded();
		});
	};
});