import 'plugins/ob-kb-percent/ob-kb-percent-controller';
import 'plugins/ob-kb-percent/ob-kb-percent.css';

import mainTemplate from 'plugins/ob-kb-percent/ob-kb-percent.html';
import optionsTemplate from 'plugins/ob-kb-percent/ob-kb-percent-editor.html';

import {CATEGORY} from 'ui/vis/vis_category';
import {VisFactoryProvider} from 'ui/vis/vis_factory';
import {VisTypesRegistryProvider} from 'ui/registry/vis_types';
import {VisSchemasProvider} from 'ui/vis/editors/default/schemas';

VisTypesRegistryProvider.register(PercentProvider);

function PercentProvider(Private) {
  const VisFactory = Private(VisFactoryProvider);
  const Schemas = Private(VisSchemasProvider);

  return VisFactory.createAngularVisualization({
    name: 'obPercent',
    title: 'Percent View',
    icon: 'fa-hand-lizard-o',
    description: 'Percent metric visualization.',
    category: CATEGORY.OTHER,
    
    //visualization: VisController,

    visConfig: {
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
      	namedBucket : '',
     	},
		denominatorType : 'total',
		denominator : {
			nthBucket : 1,
			namedBucket : ''
		}
      },
      template: mainTemplate,
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
      schemas: new Schemas([{
        group: 'metrics',
		name: 'tagsize',
		title: 'Value',
		min: 1,
		max: 1
		//,
		//aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality', 'std_dev'],
        //defaults: [{
        //  type: 'count',
        //  schema: 'metric'
        //}]
      }, 
      {
        group: 'buckets',
		name: 'tags',
		title: 'Aggregation',
		min: 1,
		max: 1,
		aggFilter: '!geohash_grid'
      }]),
    }
  });
}

export default PercentProvider;