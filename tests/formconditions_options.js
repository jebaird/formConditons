/*
 * formconditions_options
 */
(function($){
	module("formconditions: options",{
		setup: function(){
			this.widget = $('#form')
							.formConditions({
								conditions: [
						    		{
						    			name: 'firstname test',
						    			rules: [
						    				{
						    					selector: 'input[name=firstname]',
						    					operator: 'equal',
						    					value: 'Jesse'
						    				}
						    			],
						    			tru:[
						    				{
							    				selector: '#yournameisjesse',
							    				action: 'show'
							    			}
						    			],
						    			fal:[
						    				{
							    				selector: '#yournameisjesse',
							    				action: 'hide'
							    			}
						    			]
						    		}
						    	]
							})
							.data('formConditions')
		},
		teardown: function(){
			this.widget.destroy();
		}
	});
	
	//test operators
	test('outcomeActionMutator', function(){

		var hasRun = false;
		
		this.widget.option('outcomeActionMutator', function( outcome, result ){
			hasRun = true
			return outcome.action;
		})

		this.widget._processOutcomes([{
							    		selector: '#yournameisjesse',
							    		action: 'hide'
							    	}], true);
		
		equal( hasRun, true, 'outcomeActionMutator called when outcome is processed')
		
		
		
	})
	

})( jQuery );
