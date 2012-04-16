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
    var toLower = function(  ){
    		return String.prototype.toLowerCase.apply( string )
    	}
    
    
    
$.widget('jb.formConditions',{
    defaults: {
        conditions: []
    },
    ruleDefaults: {
        selector:'',//relative to element that widget is run on 
        operator: '',//string equal to value or function
        value: ''
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
    	'contains': function( val, rule, element ){
    		var regEx = new RegExp( '('+ rule.value +')' ,'gi');
    		return regEx.test( val );	
    	},
    	'doesnt-contain': function( val, rule, element ){
    		return !$.jb.formConditions.prototype.operators.contains.apply( this, arguments )
    	}
    },
    
    outcomeDefaults: {
        action: 'hide',//string or function
        selector: ''
    },
    /*
     * build in outcome actions
     * to add your own use this code
     * $.extend($.jb.formConditons.prototype.outcomeActions,{
     * 	'youractionname': function(){}
     * })
     */
    outcomeActions: {
    	show: function( form, element ){
    		element.parent().show();
    	},
    	
    	hide: function( form, element ){
    		element.parent().hide();
    	}
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
        
        
        //#### bind on change, add option to change this event lister
        //like keup
        element.delegate(':input','change.formConditions',function(){
            
            self._processor();
        
        })
        
       self._processor();
    },
    /*
     * this is where the magic happends
     */
    _processor: function(){
        var self = this,
	        conditions = self.options.conditions,
	        ccLen = conditions.length,
	        lastResults = self.rulesLastResult;
        
       // console.log((conditions), ccLen)
        while( ccLen-- ){
        	
        	var condition = conditions[ ccLen ],
        	
        		rulesResult = self._checkRules( conditions[ ccLen ].rules );
            //TODO: track last result for this rule, if the last result is the same as rulesResult don't run the outcomes
            
            if( lastResults[ condition.name ] != rulesResult ){
            	
            	//console.log(condition.name, ' is different than last result, running outcomes');
            		
            	if( rulesResult && condition['tru'] != undefined ){
	            	self._processOutcomes( condition['tru'] );
	            		
	            }else if( rulesResult == false && condition['fal'] != undefined ){
	            	self._processOutcomes( condition['fal'] );
	            }
            }

            
           lastResults[ condition.name ] = rulesResult;
        }
    },
    
    _processOutcomes: function( outcomes, rulesResult ){
        var i = outcomes.length
        	element = this.element;
        
        while( i-- ){
            var outcome = outcomes[ i ],
            	type = typeof outcome.action;
            //console.log('type',type)
            
            
            var target = ( outcome.selector ) ? element.find(outcome.selector) : undefined;
        	
        	//TODO: clean this up, kina sloppy
        	
            if( type == 'string' ){
            	this.outcomeActions[ outcome.action ].apply(this,[ element, target ]);
            }else if( type == 'function'){
            	outcome.action.apply(this,[ element, target ]);
            }
         
        }
        
    },
    _checkRules: function( rules ){
    	var i = rules.length,
        	$elem = this.element,
        	ruleIsTrue = true;
        while( i-- ){
        	var rule = rules[ i ],
        		target = $elem.find( rule.selector ),
        		operator = $.jb.formConditions.prototype.operators[ rule.operator ];
        		
        	//target isnt in the form	
        	if( target.length == 0 ){
        		continue;
        	}


            if(  operator == undefined ){
            	cosnole.error(rule.operator, ' is undefined ')		
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
        if( this._checkRules( c.rules )){
            this._processOutcomes( c.outcomes );
        }
        
        this.options.conditions.push( c );
       
    },
    removeCondition: function( name ){
        var conditions = this.options.conditions,
        	i = conditions.length;
        
        while( i-- ){
            //  console.log(conditions[ i ])
            if( conditions[ i ].name == name && typeof conditions[ i ].name != undefined){
                //console.log((i))
                this.options.conditions = conditions.slice( i,1 );
            }
        }
    },
    
    destroy: function(){
        this.element.undelegate('change.formConditions')
    }    
});
    
})(jQuery);