define(function(){
	'use strict';

	function DependencyLoader(opt){
		this.onLoaded = opt.onLoaded;
		this.dependencies = opt.dependencies || [];
		this.options = opt;

		this.add({
			symbol: window.$,
			path: 'lib/jquery-1.9.0'
		});
		this.add({
			symbol: window._,
			path: 'lib/underscore-min-1.4.3'
		});
	};

	// add({symbol:jQuery,path:'path/to/jquery.min.js'})
	DependencyLoader.prototype.add = function(depInfo){
		this.dependencies.push(depInfo);
		return this;
	};

	DependencyLoader.prototype.load = function(){
		var deps = [],
			self = this;

		function doLoad(){
			if(self.options.preload){
				$(window).load(function(){ self.onLoaded(); });
			}else if(self.options.domready){
				$(document).ready(function(){ self.onLoaded(); });
			}else{
				self.onLoaded();
			}
		}

		for(var i in this.dependencies){
			if(this.dependencies[i].path && !this.dependencies[i].symbol){
				deps.push(this.dependencies[i].path);
			}
		}

		if(!deps.length){
			doLoad();
			return;
		}

		require(deps,function(){
			doLoad();
		});

		return this;
	};

	return DependencyLoader;
});