/*
 * js for the demo
 * 
 */

$( document ).ready(function(){
	
	$('form').formConditions({
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
    		},
    		{
    			name: 'togglespam',
	    		rules: [
	    			{
	    				selector: 'input[name=email]',
	    				operator: 'contains',
	    				value: '@'
	    			}
	    		],
	    		tru: [
	    			{
	    				selector: 'input[name=sendMeSpamToggle], #spamWrapper',
	    				action: 'show'
	    			}
	    		],
	    		fal: [
	    			{
	    				selector: 'input[name=sendMeSpamToggle], #spamWrapper',
	    				action: 'hide'
	    			}
	    		]
    		},
    		{
    			name: 'moredetails',
    			rules: [
    				{
    					selector: ':radio[name=detailsToggle][value=yes]',
    					operator: 'checked'
    				}
    			],
    			tru: [
    				{
    					selector: 'textarea[name=details]',
    					action: 'show'
    				}
    			],
    			fal: [
    				{
    					selector: 'textarea[name=details]',
    					action: 'hide'
    				}
    			]
    		},
    		// {
    			// name: 'swatch',
    			// rules: [
    				// selector: 'select[name=color]',
    				// operator: function(){
//     					
    				// }
    			// ]
    		// }
    		
    	]  
	});
     
});
