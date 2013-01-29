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
			hasRun = true;
			if( outcome.action == 'show' ){
				return 'hide';	
			}
			return outcome.action;
		})

		this.widget._processOutcomes([{
							    		selector: '#yournameisjesse',
							    		action: 'show'
							    	}], true);
		
		equal( hasRun, true, 'outcomeActionMutator called when outcome is processed')
		
		
		
	})

	test('outcomeActionMutator - return null skip outcome', function(){

		var hasRun = false;
		
		this.widget.option('outcomeActionMutator', function( outcome, result ){
			return null;
		})

		this.widget._processOutcomes([{
							    		selector: '#yournameisjesse',
							    		action: function(){
							    			
							    			hasRun = true;
							    		}
							    	}], true);
		
		equal( hasRun, false, 'outcomeActionMutator outcome is not processed when mutator returns null')
		
		
		
	})
	
	test('outcomeActionMutator - if action if func it gets called', function(){

		var hasRun = false;

		this.widget._processOutcomes([{
							    		selector: '#yournameisjesse',
							    		action: function(){
							    			
							    			hasRun = true;
							    		}
							    	}], true);
		
		equal( hasRun, true, 'outcomeActionMutator outcome action is called')
		
		
		
	})
	

})( jQuery );
