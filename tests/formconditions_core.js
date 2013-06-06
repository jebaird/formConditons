/*
 * formconditions_core
 */
(function($){
	module("formconditions: core");
	
	//test operators
	test('bulitin operators', function(){
		
		var operators = $.jb.formConditions.prototype.operators;
		
		//equal
		equal( operators['equal'].apply( this,[1,{value:'1'}]), true,'equal string')
		equal( operators['equal'].apply( this,[1,{value:'2'}]), false,'equal string')
		
		//not-equal
		equal( operators['not-equal'].apply( this,[1,{value:'1'}]), false,'not-equal string')
		equal( operators['not-equal'].apply( this,[1,{value:'2'}]), true,'not-equal string')
		
		
		//checked
		equal( operators['checked'].apply( this,[1,{value:'1'},$('<input type="checkbox">').attr('checked','checked')]), true,'checked')
		
		equal( operators['not-checked'].apply( this,[1,{value:'1'},$('<input type="checkbox">')]), true,'not-checked')
		
		
		//contains
		equal( operators['contains'].apply( this,['cookies',{value:'o'}]), true,'contains')
		
		//equal( operators['contains'].apply( this,['cookies',{value:[2]}]), true,'contains array')
		
		equal( operators['doesnt-contain'].apply( this,['cookies',{value:'z'}]), true,'doesnt-contain'),
		
		
		//starts with
		equal( operators['starts-with'].apply( this,['cookies',{value:'cook'}]), true,'starts-with - exp true')
		equal( operators['starts-with'].apply( this,['free cookies',{value:'cook'}]), false,'starts-with - exp false')
		
		//doesnt start with
		equal( operators['doesnt-start-with'].apply( this,['cookies',{value:'cook'}]), false,'doesnt-start-with - exp false')
		equal( operators['doesnt-start-with'].apply( this,['free cookies',{value:'cook$'}]), true,'doesnt-start-with - exp true')
		
		//ends-with
		equal( operators['ends-with'].apply( this,['cookies',{value:'ies'}]), true,'ends-with - exp true')
		equal( operators['ends-with'].apply( this,['free cookies',{value:'cook.['}]), false,'ends-with - exp false')
		
		
		//dosent-end-with
		equal( operators['doesnt-end-with'].apply( this,['cookies',{value:'ie$'}]), true,'doesnt-end-with')
		
		
		
		
	})
	

})( jQuery );
