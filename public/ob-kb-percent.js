import TemplateVisTypeTemplateVisTypeProvider from 'ui/template_vis_type/template_vis_type';
import VisSchemasProvider from 'ui/vis/schemas';

require('plugins/ob-kb-percent/percentController');
require('plugins/ob-kb-percent/ob-kb-percent.css');

// The provider function, which must return our new visualization type
function PercentProvider(Private) {
	var TemplateVisType = Private(TemplateVisTypeTemplateVisTypeProvider);
	// Include the Schemas class, which will be used to define schemas
	var Schemas = Private(VisSchemasProvider);

	// Describe our visualization
	return new TemplateVisType({
		name: 'obPercent', // The internal id of the visualization (must be unique)
		title: 'Percent View', // The title of the visualization, shown to the user
		description: 'Percent metric visualization', // The description of this vis
		icon: 'fa-hand-lizard-o', // The font awesome icon of this visualization
		template: require('plugins/ob-kb-percent/ob-kb-percent.html'), // The template, that will be rendered for this visualization
		// Define the aggregation your visualization accepts
		schemas: new Schemas([
				{
					group: 'metrics',
					name: 'tagsize',
					title: 'Value',
					min: 1,
					max: 1,
					aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev']
				},
				{
					group: 'buckets',
					name: 'tags',
					title: 'Aggregation',
					min: 1,
					max: 1,
					aggFilter: '!geohash_grid'
				}
			]),
		params: {
			editor: require('plugins/ob-kb-percent/percentEditor.html'),
			defaults: {
      			format: '0.000%',
      			ratioFontSize: 60,

      			label: 'Percent :',
      			labelFontSize: 40,
      			labelPlacement: 'top',
			displayIncrement: false,
      			numeratorType : 'total',
      			numerator : {
      				nthBucket : 1,
      				namedBucket : ''
      			},

      			denominatorType : 'total',
      			denominator : {
      				nthBucket : 1,
      				namedBucket : ''
      			}
    		}
		}
	});
}

require('ui/registry/vis_types').register(PercentProvider);
