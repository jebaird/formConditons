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
		
		equal( operators['doesnt-contain'].apply( this,['cookies',{value:'z'}]), true,'doesnt-contain')
		
		
		
	})
	

})( jQuery );
