var counter = 1;
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
	$.getJSON( "php/get_portfolio.php?l=short", function( json )
	{
		var count = 0;
		for( var i = 0; count < Math.min( 10, json.length ); i++ )
		{
			if( json[ i ].featured )
			{
				$( "#mini_portfolio" ).append(
					$( document.createElement( 'div' ) )
						.addClass( "mini_portfolio" )
						.attr( "id", i )
						.html( "<p><b>" + json[ i ].title + "</b> - " + json[ i ].client + "<br /><i>" + json[ i ].tag + "</i></p>" )
						.prepend(
							$( document.createElement( 'div' ) )
								.addClass( "mini_image" )
								.css( "background-image", "url( php/get_image.php?id=" + json[ i ].id + "&w=70&h=70 )" )
						)
				);
				count++;
			}
		}
		$( "#mini_portfolio" ).append(
				$( document.createElement( 'div' ) ).css( "clear", "both" )
		);
		
		build_slideshow( json );
	});
}

function build_slideshow( p )
{
	for( var i = 0; i < p.length; i++ )
	{
		$( "#slides" )
			.append(
				$( document.createElement( 'div' ) )
					.attr( "id", p[ i ].id )
					.addClass( "slide" )
					.append(
						$( document.createElement( 'img' ) ).attr( "src", "php/get_image.php?id=" + p[ i ].id )
					)
					.append(
						$( document.createElement( 'div' ) )
							.addClass( "title" )
							.html( p[ i ].title )
					)
			)
	}
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
	$.getJSON( "php/get_portfolio.php", function( json )
	{
		for( var i = 0; i < json.length; i++ )
		{
			if( json[ i ].featured )
			{
				$( "#featured" ).append(
					$( document.createElement( 'div' ) )
						.addClass( "featured" )
						.attr( "id", i )
						.html( "<p><b>" + json[ i ].title + "</b><br /><i>" + json[ i ].client + "</i></p>" )
						.prepend(
							$( document.createElement( 'div' ) )
								.addClass( "big_image" )
								.css( "background-image", "url( php/get_image.php?id=" + json[ i ].id + "&w=265&h=185 )" )
						)
				);
			}
			else
			{
				$( "#all" ).append(
					$( document.createElement( 'div' ) )
						.addClass( "all" )
						.attr( "id", i )
						.html( "<p><b>" + json[ i ].title + "</b> - <i>" + json[ i ].client + "</i><br /><br />" + json[ i ].intro + "</p>" )
						.prepend(
							$( document.createElement( 'img' ) ).attr( "src", "php/get_image.php?id=" + json[ i ].id + "&w=815&h=255" )
						)
				);
			}
		}
		
		$( "#more_button" ).click( function()
		{
			$( "#more_button .expand" ).fadeOut();
			$( "#all" ).slideDown();
		})
	});
}

function build_project( id )
{
	$.getJSON( "php/get_project.php?id=" + id, function( json )
	{
		$( "#features" ).after( "<br /><h2>" + json.tag + "</h2><p>" + json.intro + "</p><div style='clear:both'></div>" );
		$( ".ribbon span" ).first().html( json.title );
		
		for( var i = 0; i < json.features.length; i++ )
		{
			$( "#features" ).append(
				$( document.createElement( 'div' ) )
					.addClass( "feature" )
					.append(
						$( document.createElement( 'img' ) ).attr( "src", "php/get_feature_image.php?id=" + id + "&n=" + i )
					)
					.append( "<p><b>" + json.features[ i ].title + "</b> - " + json.features[ i ].text + "</p>" )
			);
		}
		$( ".feature" ).first().addClass( "shown" );
		$( ".menu li + li" ).first().addClass( "current" );
	});
}