/*
    jquery form conditions
    allows you to show / hide elements on a form based on element values
    
    Jesse Baird <jebaird@gmail.com>
    jebaird.com
    3/17/2011
    
    Dual licensed under the MIT (MIT-LICENSE.txt)
    and GPL (GPL-LICENSE.txt) licenses.
    
    
    happy saint pats!

*/
/*

// add support in outcome and rule for callback, this is for devs to use

    
    function processOutCome(){}
    // TODO add deferreds

*/
(function($){
    
$.widget('jb.formConditons',{
    defaults: {
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
        
        //#### bind on change, add option to change this event lister
        //like keup
        element.delegate(':input','change',function(){
            self._processor();
        
        })
        .find( ":input" )
        .trigger('change');
    },
    
    _processor: function(){
        var self = this,
        conditions = self.options.conditions,
        ccLen = conditions.length;
        
       // console.log((conditions), ccLen)
        while( ccLen-- ){
            if( self._checkRules( conditions[ ccLen ].rules ) ){
                self._processOutcomes( conditions[ ccLen ].outcomes )
            }
            
            
        }
    },
    
    _processOutcomes: function( outcomes ){
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
            //todo cache selector
            target = $elem.find( rule.selector ),
            val = target.val(),
            
            ret = true;
            
            switch(rule.operator){
                case 'equal':
                    ret = ( val == rule.value ) ? true : false;
                    break;
                case 'not-equal':
                    ret = ( val != rule.value ) ? true : false;
                    break;
                case 'checked':
                    ret = target.is(':checked');
                    break;
                case 'contains':
                    break;
                case 'doesnt-contain':
                    break;
                case 'starts-with':
                    break;
                case 'ends-with':
                    break;
                 
            }
            if(!ret){
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
                console.log((i))
                this.options.conditions = conditions.slice( i,1 );
            }
        }
    },
    
    destory: function(){
        
    }    
});
    
})(jQuery);