var NAME_DIV = 0;

function Module( title, showTitle )
{
	this.title = title;
	this.name = title.toLowerCase().replace(/ /g, '');
	
	this.showTitle = typeof showTitle !== 'undefined' ? showTitle : true;
	this.questions = [];
	
	this.isdep = false;
}

Module.prototype = {

	constructor: Module,
	
	addQuestion: function ( q )
	{
		if ( q instanceof Module ) q.setDependent( true );
		this.questions.push ( q );
	},
	
	setDependent: function ( a )
	{
		this.isdep = a;
	},
	
	attachListeners: function()
	{
		$.each( this.questions, function (i, j) {
			j.attachListeners();
		});
		
		if ( this.showTitle )
		{
			var id = "#" + this.name;
			
			var titleChild = $( id ).children( ":first" );
			var contentChild = $( id ).children( ".content" );
			
			titleChild.click( function()
			{		
				if( contentChild.is( ":visible") )
				{
					titleChild.children( "i" ).removeClass( "fa-minus-square" ).addClass( "fa-plus-square" );
					contentChild.slideUp();
				}
				else
				{
					titleChild.children( "i" ).removeClass( "fa-plus-square" ).addClass( "fa-minus-square" );
					contentChild.slideDown();
				}
					
			} );
			
			contentChild.hide();
		}
	},
	
	generateReport: function()
	{
		var x = "";
		
		$.each( this.questions, function (i, j) {
			var k = "";
			k = j.generateReport();
			
			if ( k.length > 0 )
				x += k + " ";

		});
		
		return x;
	},
	
	generateDiv: function()
	{
		var x = "<div id=\"" + this.name + "\" class=\"module";
		
		x += ( this.isdep ? " dependent" : "" ) + "\">";
		
		if ( this.showTitle )
			x += "<div class=\"title\"><i class=\"fa fa-plus-square\"></i><span>" + this.title + "</span></div>";

		x += "<div class=\"content\">";
			
		$.each( this.questions, function (i, j) {
			x += j.generateDiv();
		});

		x += "</div></div>";
		return x;
	}
}

function Question( header, choices, type )
{
	this.header = header;
	this.type = typeof type !== 'undefined' ? type : "checkbox";
	
	if ( typeof choices == "string" )
	{
		this.report = choices;
		
		if ( this.type == "text" )
			this.choices = [ { val: "", text: "" } ];
	}
	else
		this.choices = choices;
	
	this.dependents = [];
	this.isdep = false;
	
	this.name = "Q" + NAME_DIV;
	this.div = "D" + NAME_DIV;
	NAME_DIV++;
}

Question.prototype = {

	constructor: Question,
	
	addDependent: function ( dependentQuestion, dependentValue )
	{
		dependentQuestion.setDependent( true );	
		var groupIndex = -1;
		
		$.each ( this.dependents, function ( i, j )
		{
			if ( j.group == dependentValue )
				groupIndex = i;
		});
		
		if ( groupIndex > -1 )
			this.dependents[groupIndex].questions.push( dependentQuestion );
		else
			this.dependents.push( { group: dependentValue, questions: [ dependentQuestion ] } );
			
	},
	
	setDependent: function ( a )
	{
		this.isdep = a;
	},
	
	isDependent: function()
	{
		return this.isdep;
	},
	
	hasDependents: function()
	{
		return this.dependents.length > 0;
	},
	
	setType: function ( type )
	{
		this.type = type;
	},
	
	getType: function ()
	{
		return this.type;
	},
	
	getName: function ()
	{
		return this.name;
	},
	
	generateHTML: function()
	{
		var x;
		
		if ( this.getType() == "text" )
		{
			var y = this;
			var z = "<span style=\"color:yellow; font-family:monospace; font-weight:bold\">DESCRIPTION</span>";
			
			if ( this.choices.length > 1 )
			{
				for ( i = 0; i < this.choices.length; i++ )
					this.choices[i].tooltip = this.choices[i].report.replace( "^", z );
				this.small = true;
			}
			else if ( typeof y.report == "string" && y.report.length > 0)
				y.tooltip = y.report.replace( "^", z );
			x = ich.makeText( y, true );
		}
		else
			x = ich.makeQuestion( this, true );
		
		return x;
	},
	
	generateDiv: function()
	{
		var x = "<div id=\"" + this.div + "\" class=\"dependent\">";
		
		x += this.generateHTML();
		
		if ( this.hasDependents() )
		{
			var GROUPDIV = "G" + this.div + "_";
			$.each( this.dependents, function ( i, j )
			{
				x += "<div id=\"" + GROUPDIV + j.group + "\">";
				
				$.each( j.questions, function ( k, l )
				{
					x += l.generateDiv();
				});
				
				x += "</div>";
			});
		}
		
		x += "</div>";
		return x;
	},
	
	attachListeners: function()
	{
		if ( !this.hasDependents() ) return;
		
		var dependents = this.dependents;
		var GROUPDIV = "G" + this.div + "_";
		
		var inputName = "input[name=" + this.name + "]";
		
		$( inputName ).change( function()
		{
			var y = $( inputName + ":checked" );
			
			selectedOptions = new Array();
			
			for ( i = 0; i < y.length; i++ )
				selectedOptions.push( $(y[i]).val() );
							
			
			$.each( dependents, function( a, b )
			{
				var divid = "#" + GROUPDIV + b.group;
			
				if ( $.inArray( b.group, selectedOptions ) > -1 )
				{
					$( divid ).slideDown();
				}
				else
				{
					$( divid ).hide();
					$( divid + " input").removeAttr('checked');
					$( divid + " input[type=text]").val("");
				}
			});
		});
		
		$.each( dependents, function( a, b )
		{
			$.each( b.questions, function ( c, d )
				{
					d.attachListeners();
				});
		});
		
		$( inputName ).trigger( "change" );
	},
	
	generateReport: function()
	{
		var x = "";
		var y;
		
		if ( this.type == "radio" || this.type == "checkbox" )
		{
			y = $("input[name=" + this.name + "]:checked");
			
			selectedOptions = new Array();
			for ( i = 0; i < y.length; i++ )
				selectedOptions.push( $(y[i]).val() );
				
			if ( typeof this.choices !== "undefined" )
			{
				$.each( this.choices, function( a, b )
				{
					var j = $.inArray( b.val, selectedOptions );
							
					if ( j > -1 && ("report" in b) )
						x += b.report;
				});
			}
			else if ( typeof this.report == "string" )
			{
				if ( selectedOptions.length > 1 )
					x += this.report + "bilaterally.";
				else if ( selectedOptions.length == 1 && selectedOptions[0] == "R" )
					x += this.report + "on the right.";
				else if ( selectedOptions.length == 1 && selectedOptions[0] == "L" )
					x += this.report + "on the left.";
			}
		}
		else if ( this.type == "text" )
		{
			var elem = $("input[name='" + this.name + "[]']");
			var fragment = "";
						
			if ( elem.length == 1 )
			{
				fragment = elem.val();

				if ( typeof this.report == "string" && this.report.length > 0 && elem.is(':visible') )
					fragment = this.report.replace( "^", fragment );
			}
			else
			{
				var textSelections = new Array();
							
				for ( i = 0; i < elem.length; i++ )
				{
					if ( elem[i].value != "" )
						textSelections.push( { value: elem[i].value, text: this.choices[i].text } );
				}
							
				if ( textSelections.length == 1 )
				{
					for ( i = 0; i < this.choices.length; i++ )
					{
						if ( textSelections[0].text == this.choices[i].text )
							fragment = this.choices[i].report.replace( "^", textSelections[0].value );
					}
				}
				else if ( textSelections.length > 1 )
				{
					fragment = this.report;
								
					for ( i = 0; i < textSelections.length; i++ )
					{
						fragment = fragment.replace( "^" + textSelections[i].text, textSelections[i].value );
					}
				}
			}
							
			x += fragment;
		}
		
		if ( this.hasDependents() )
		{
			$.each( this.dependents, function ( i, j )
			{
				$.each( j.questions, function ( k, l )
				{
					var m = "";
					m = l.generateReport();
					
					if ( m.length > 0 )
					{
						if ( x.length > 0 )
							x += " ";
						x += m;
					}
				});
				
			});
		}

		return x;
	}
}


function generateReport()
{
	var x = "";
	
	$.each( modules, function (i,j) {
		var k = "";
		k = j.generateReport();
					
		if ( k.length > 0 )
			x += k + "\n\n";
	});
	
	x = filterReport( x );
	
	//$( "#report" ).val( x );
	$( "#report" ).text( x );
}