/*
 * formconditions_methods
 * https://github.com/jquery/jquery-ui/blob/master/tests/unit/progressbar/progressbar_methods.js
 */
(function($){
	module("formconditions: methods",{
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
	
	test('init', function(){

		equal( typeof this.widget, 'object', true,'instance created')
	})
	
	test('_processor', function(){
		var widget = this.widget
		
		var target = widget.element.find("input[name=firstname]")
			.val('Jesse')
			
		widget._processor()
			
		equal($('#yournameisjesse').is(':visible'), true, 'changed input value, ran _processor, rule was true')
		
		target
			.val('Bob')
		widget._processor()	
		
		equal($('#yournameisjesse').is(':visible'), false, 'rule ran ran _processor, ran fal')
	})



	
	test('addCondition and remove', function(){
		this.widget.addCondition({
			name: 'newC',
			rules: [],
			tru: [],
			fal: []
		})
		
		equal( this.widget.options.conditions.length, 2 ,'condition added')
		
		this.widget.removeCondition('newC')
		
		equal( this.widget.options.conditions.length, 1 ,'condition removed')
	})
	
	
	
	test('condition test when target isnt present in the dom', function(){
		var widget = this.widget
		
		this.widget.addCondition({
			name: 'newC',
			rules: [{
				selector: 'input[name=imnotintheform]',
				operator: 'equal',
				value: 'lolz'
			}],
			tru: [],
			fal: []
		})
			
		ok(true, 'didnt error out')
		
		
	})
	
	
})( jQuery );