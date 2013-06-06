var counter = 1;
var loc = "media/images/";
var skip = false;

function init_events()
{	
	$( ".more" ).click( function()
	{
		var id = $( this ).attr( "name" );
		var div = $( "#" + id );
		$( ".horizontal" ).removeClass( "open" );
		$( ".text" ).removeClass( "before" );
		if( div.is( ":visible" ) )
		{
			div.slideUp();
			$( ".horizontal" ).removeClass( "closed" );
			return false;
		}
		if( $( this ).parents( ".horizontal" ).siblings( ".hidden:visible" ).length > 0 )
		{
			$( this ).parents( ".horizontal" ).siblings( ".hidden:visible" ).fadeOut( "fast", function()
			{
				div.fadeIn();
			});
		}
		else
		{
			div.slideDown();
		}
		$( this ).parents( ".horizontal" ).addClass( "open" ).removeClass( "closed" );
		$( this ).parents( ".horizontal" ).prev().children().addClass( "before" );
		$( ".horizontal:not( .open )" ).addClass( "closed" );
	});
	
	$( "#build, #cancel_contact" ).click( function()
	{
		if( $( "#contact" ).is( ":visible" ) )
		{
			$( "#contact" ).slideUp();
		}
		else
		{
			$( "#contact" ).slideDown();
		}
	});
	
	$( "#contact form" ).submit( webform_submit );
}

function resize_home()
{
	$( "body, #vignette" ).width( $( window ).width() < 1005 ? 760 : 975 );
	$( "#home" ).attr( "class", $( window ).width() < 1005 ? null : "right-shadow" );
	$( "#home" ).width( $( window ).width() < 1005 ? 760 : 755 );
	$( "#sidebar > div" ).css( "margin-left", $( window ).width() < 1005 ? "20px" : 0 );
}

function mini_portfolio()
{
	$.getJSON( "data/portfolio.json", function( json )
	{
		var items = json.featured;
		var count = 0;
		for( var i in items )
		{
			items[ i ].title = items[ i ].title_short ? items[ i ].title_short : items[ i ].title;
			items[ i ].client = items[ i ].client_short ? items[ i ].client_short : items[ i ].client;
			$( "#mini_portfolio" ).append(
				$( document.createElement( 'div' ) )
					.addClass( "mini_portfolio" )
					.attr( "id", i )
					.html( "<p><b>" + items[ i ].title + "</b> - " + items[ i ].client + "<br /><i>" + items[ i ].tag + "</i></p>" )
					.prepend(
						$( document.createElement( 'div' ) )
							.addClass( "mini_image" )
							.css( "background-image", "url(" + loc + items[ i ].image + ")" )
					)
			);
			count++;
			if( count >= 10 ) break;
		}
		$( "#mini_portfolio" ).append(
				$( document.createElement( 'div' ) ).css( "clear", "both" )
		);
		
		build_slideshow( $.extend( items, json.all ) );
	});
}

function build_slideshow( portfolio )
{
	$.each( portfolio, function( key, value )
	{
		$( "#slides" )
			.append(
				$( document.createElement( 'div' ) )
					.attr( "id", key )
					.addClass( "slide" )
					.append(
						$( document.createElement( 'img' ) ).attr( "src", loc + value.image )
					)
					.append(
						$( document.createElement( 'div' ) )
							.addClass( "title" )
							.html( value.title )
					)
			)
	});
	$( "#slideshow" )
		.mouseenter( function()
		{
			$( "#slideshow" ).addClass( "hover" );
			$( ".slide.current .title, #slideshow #controls" ).fadeIn();
		})
		.mouseleave( function()
		{
			$( "#slideshow" ).removeClass( "hover" );
			$( ".slide .title, #slideshow #controls" ).fadeOut();
			skip = true;
		});
		
	$( "#controls .after" ).click( function()
	{
		if( $( this ).hasClass( "disabled" ) ) return false;
		$( ".slide.current .title" ).fadeOut( "slow" );
		$( ".slide.current" ).removeClass( "current" ).next().addClass( "shown current" );
		$( ".slide.current .title" ).show();
		if( $( ".slide.shown" ).length == 1 )
		{
			$( "#controls .before" ).addClass( "disabled" );
		}
		else
		{
			$( "#controls .before" ).removeClass( "disabled" );
		}
		if( $( ".slide.shown" ).length == $( ".slide" ).length )
		{
			$( "#controls .after" ).addClass( "disabled" );
		}
		else
		{
			$( "#controls .after" ).removeClass( "disabled" );
		}
		skip = true;
	})
	
	$( "#controls .before" ).click( function()
	{
		if( $( this ).hasClass( "disabled" ) ) return false;
		$( ".slide.current .title" ).fadeOut( "slow" );
		$( ".slide.current" ).removeClass( "shown current" );
		$( ".slide.shown" ).last().addClass( "current" );
		$( ".slide.current .title" ).show();
		if( $( ".slide.shown" ).length == 1 )
		{
			$( "#controls .before" ).addClass( "disabled" );
		}
		else
		{
			$( "#controls .before" ).removeClass( "disabled" );
		}
		if( $( ".slide.shown" ).length == $( ".slide" ).length )
		{
			$( "#controls .after" ).addClass( "disabled" );
		}
		else
		{
			$( "#controls .after" ).removeClass( "disabled" );
		}
		skip = true;
	})
		
	var advance = window.setInterval( advance_slide, 5000 );
}

function advance_slide()
{
	if( $( "#slideshow" ).hasClass( "hover" ) || skip )
	{
		skip = false;
		return skip;
	}
	var div = $( ".slide.current" ).length == 0 ? $( ".slide" ).first() : $( ".slide.current" ).next();
	var img = div.children( "img" ).first();
	if( img.length == 0 )
	{
		var interval = window.setInterval( function()
		{
			$( "#slideshow" ).addClass( "hover" );
			if( $( ".slide.shown" ).length <= 1 )
			{
				$( ".slide" ).first().addClass( "current" );
				$( "#slideshow" ).removeClass( "hover" );
				clearInterval( interval );
				skip = true;
			}
			else
			{
				$( ".slide.shown" ).last().removeClass( "shown" );
			}
		}, 100 );
	}
	else if( img[ 0 ].complete )
	{
		$( ".slide.current" ).removeClass( "current" );
		div.addClass( "shown current" );
	}
}

function build_portfolio()
{
	$.getJSON( "data/portfolio.json", function( json )
	{
		var items = json.featured;
		for( var i in items )
		{
			$( "#featured" ).append(
				$( document.createElement( 'div' ) )
					.addClass( "featured" )
					.attr( "id", i )
					.html( "<p><b>" + items[ i ].title + "</b><br /><i>" + items[ i ].client + "</i></p>" )
					.prepend(
						$( document.createElement( 'div' ) )
							.addClass( "big_image" )
							.css( "background-image", "url(" + loc + items[ i ].image + ")" )
					)
			);
		}
		
		items = json.all;
		for( var i in items )
		{
			$( "#all" ).append(
				$( document.createElement( 'div' ) )
					.addClass( "all" )
					.attr( "id", i )
					.html( "<p><b>" + items[ i ].title + "</b> - <i>" + items[ i ].client + "</i><br /><br />" + items[ i ].intro + "</p>" )
					.prepend(
						$( document.createElement( 'img' ) ).attr( "src", loc + items[ i ].image )
					)
			);
		}
		
		$( "#more_button" ).click( function()
		{
			$( "#more_button .expand" ).fadeOut();
			$( "#all" ).slideDown();
		})
	});
}