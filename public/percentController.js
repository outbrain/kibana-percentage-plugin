// Create an Angular module for this plugin
var module = require('ui/modules').get('ob-kb-percent');
var numeral = require('numeral');

module.controller('PercentController', function($scope, Private) {

    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    $scope.getValueFromAggs = function (resp, tableGroups, type, params) {
    	if (type === 'total') {
    		return resp.hits.total;
    	}
    	if (type === 'namedBucket') {
    		for (var i = 0; i < tableGroups.tables.length; i++) {
    			const table = tableGroups.tables[i];
    			for (var j = 0; j < table.rows.length; j++) {
    				const row = table.rows[j];		
	        		const bucketName = row[0];
	    	    	const bucketValue = row[1];
		        	if (bucketName.toString() === params.namedBucket) {
	        			return bucketValue;
		        	}
    			}
    		}
	      return 0.0;
    	}
    	if (type === 'nthBucket') {
    		const table = tableGroups.tables[0];
    		const bucket = table.rows[params.nthBucket - 1]; // one based.
    		return bucket[1];
    	}
    	return 0;
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        var tabified = tabifyAggResponse($scope.vis, resp);
        console.log(tabified);

		var numeratorType = $scope.vis.params.numeratorType;
		var numeratorParams = $scope.vis.params.numerator;
		var numerator = $scope.getValueFromAggs(resp, tabified, numeratorType, numeratorParams);

		var denominatorType = $scope.vis.params.denominatorType;
		var denominatorParams = $scope.vis.params.denominator;
		var denominator = $scope.getValueFromAggs(resp, tabified, denominatorType, denominatorParams);

		var ratio = numerator / denominator;
		if ($scope.vis.params.displayIncrement == true) { ratio = ratio - 1 };
	        console.log("numerator = ", numerator);
		console.log("denominator = ", denominator);
		$scope.ratio = numeral(ratio).format($scope.vis.params.format);
      }
    });
  });
