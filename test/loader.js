(function(){
	'use strict';

	var testFiles = [
		'spec/DependencyLoader.tests.js',
		'spec/ExampleBackboneView.tests.js'
	];

	mocha.setup({
	    ui: 'bdd',
	    globals: ['jQuery']
	});
	require(testFiles, function(){
	    'use strict';
	    mocha.run();
	});

})();