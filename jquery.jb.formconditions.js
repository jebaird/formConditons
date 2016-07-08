/*
    jquery form conditions
    allows you to show / hide elements on a form based on element values
    
    Copyright (c) 2010 Jesse Baird <jebaird@gmail.com>
   	http://jebaird.com/blog/formconditons-jquery-ui-widget-assists-you-create-dynamic-forms
    3/17/2011
    
    Dual licensed under the MIT (MIT-LICENSE.txt)
    and GPL (GPL-LICENSE.txt) licenses.
    
    
    happy saint pats!

*/
/*

TODO: add support in outcome and rule for callback, 

*/
(function($){
    
    //helpers
    var toLower = function( string ){
    		return String.prototype.toLowerCase.apply( string )
    },
    //stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
    escapeRegExp = function(str) {
    	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	};
    
    
    
$.widget('jb.formConditions',{
    options: {
    	//applied when the outcomes are processed, return null to skip processing
    	outcomeActionMutator: function( outcome, rulesResult ){
    		return outcome.action;
    	},
    	/*
    	 * called after the rules are checked, this, an instance
    	 * can be used to change how the outcomes are processed
    	 * like if you wanted to invert every rule with out supplying the inverse
    	 */
    	processorMutator: function( condition, rulesResult ){
    		
    		if( rulesResult == true && condition['tru'] != undefined ){
    			
    			this._processOutcomes( condition['tru'], rulesResult );
    			
    		}else if( rulesResult == false && condition['fal'] != undefined ){
            	
            	this._processOutcomes( condition['fal'], rulesResult );
            
            }
    	},
    	//run the processor on these events
    	inputEvent: 'blur',
        
        conditions: []
    },
    ruleDefaults: {
        selector:'',//relative to element that widget is run on 
        operator: '',//string equal to value or function
        value: ''
    },

    outcomeDefaults: {
        action: 'hide',//string or function
        selector: ''
    },
    /*
     * build in outcome actions
     * to add your own use this code
     * $.extend($.jb.formConditions.prototype.outcomeActions,{
     * 	'youractionname': function(){}
     * })
     */
    outcomeActions: {
    	show: function( element ){
    		element.parent().show();
    	},
    	
    	hide: function( element ){
    		element.parent().hide();
    	}
    },
    operators: {
    	//this is this widget instance
    	'equal': function( val, rule, element ){
    		return ( toLower( val ) == toLower( rule.value )  ) ? true : false;
    	},
    	'not-equal': function( val, rule, element ){
    		return !$.jb.formConditions.prototype.operators.equal.apply( this, arguments )
    	},
    	'checked': function( val, rule, element ){
    		return element.is(':checked')
    	},
    	'not-checked': function( val, rule, element ){
    		return !$.jb.formConditions.prototype.operators.checked.apply( this, arguments )
    	},
    	//TODO: add support for arrays and objects
    	'contains': function( val, rule, element ){
    		var regEx = new RegExp( '('+ rule.value +')' ,'gi');
    		return regEx.test( val );	
    	},
    	'doesnt-contain': function( val, rule, element ){
    		return !$.jb.formConditions.prototype.operators.contains.apply( this, arguments )
    	},
    	//starts with
    	'starts-with': function( val, rule, element ){
    		var regEx = new RegExp( '^('+ ( escapeRegExp( rule.value )  ) +')' ,'gi');
    		return regEx.test( val );	
    	},
    	'doesnt-start-with': function( val, rule, element ){
    		var regEx = new RegExp( '^('+ ( escapeRegExp( rule.value )  ) +')' ,'gi');
    		return !regEx.test( val );	
    	},
    	
    	'ends-with': function( val, rule, element ){
    		var regEx = new RegExp( '('+ ( escapeRegExp( rule.value )  ) +')$' ,'gi');
    		return regEx.test( val );	
    	},
    	
    	'doesnt-end-with': function( val, rule, element ){
    		var regEx = new RegExp( '('+ ( escapeRegExp( rule.value )  ) +')$' ,'gi');
    		return !regEx.test( val );	
    	},
    	
    },
    _create: function(){
        var self = this,
	        element = self.element,
	        options = self.options,
	        //#
	        conditions = options.conditions,
	        
	        cLen = conditions.length;
	        
	        //cache the last result of a rule
	        self.rulesLastResult = {};
        
        
        //#### bind on change
        //like keyup
        element.delegate(':input',(this.options.inputEvent +' ').split(' ').join('.formConditions '),function(){
            
            self._processor();
        
        })
        
       self._processor();
    },
    /*
     * this is where the magic happens
     */
    _processor: function(){
        var self = this,
	        conditions = self.options.conditions,
	        lastResults = self.rulesLastResult;
        
        for( var i = 0; i < conditions.length; i ++ ){
        	
        	var condition = conditions[ i ],
        		rulesResult = self._checkRules( conditions[ i ].rules );
            
        	this.options.processorMutator.apply( this, [ condition, rulesResult ] );
        	
           lastResults[ condition.name ] = rulesResult;
        }
    },
    
    _processOutcomes: function( outcomes, rulesResult ){
        var element = this.element;

        for( var i = 0; i < outcomes.length; i++ ){
            var outcome = outcomes[ i ],
            	target = ( outcome.selector ) ? element.find( outcome.selector ) : undefined,
            	//use the mutator
            	action = this.options.outcomeActionMutator.apply( this, [ outcome, rulesResult ] );
            	//if we return null skip the processing
            	if( action === null ){
            		continue;
            	}
        	
        	var type = typeof action;

            if( type == 'string' ){
            	this.outcomeActions[ action ].apply(this,[ target ]);
            }else if( type == 'function'){
            	action.apply(this,[ target ]);
            }
         
        }
        
    },
    _checkRules: function( rules ){

        for( var i = 0, $elem = this.element, ruleIsTrue = true; i < rules.length; i++ ){
        	var rule = rules[ i ],
        		target = $elem.find( rule.selector ),
        		operator = $.jb.formConditions.prototype.operators[ rule.operator ];
        		
        	//target isn't in the form, fail
        	if( target.length == 0 ){
        		ruleIsTrue = false;
                	break;
        	}


            if(  operator == undefined ){
            	console.error(' rule.operator is undefined ')		
            }
            
            var val = target.val(),
            	ret = operator.apply( this, [ val, rule, target ]);
            
            if( ret == false ){
                ruleIsTrue = false;
                break;
            }
        }
        return ruleIsTrue;
    },
    
    addCondition: function( c ){
        //run condition before we push it on to the stack
        this._processOutcomes( ( this._checkRules( c.rules ) ) ? c.tru : c.fal );
        
        
        this.options.conditions.push( c );
       
    },
    
    removeCondition: function( name ){
         this.options.conditions = $.map( this.options.conditions, function( condition ){
        	return ( condition.name == name && typeof condition.name != undefined ) ? null : condition;
        })
        
    },
    
    destroy: function(){
        this.element.undelegate('.formConditions')
    }    
});
    
})(jQuery);
