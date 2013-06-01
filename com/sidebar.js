function setup_sidebar()
{
	get_tweets();
	get_rss();
	
	$( "#newsletter input" ).first()
		.focusin( function()
		{
			if( $( this ).val() == "Email address..." ) $( this ).val( "" );
		})
		.focusout( function()
		{
			if( $( this ).val() == "" ) $( this ).val( "Email address..." );
		});
}

function get_tweets()
{
	$( "#twitter div" ).tweet(
	{
		username: "axismaps",
		count: 2,
		fetch: 10,
		filter: function( t ){ return ! /^@\w+/.test( t.tweet_raw_text ); },
		template: "{text}",
		loading_text: "loading tweets..."
	});
}

function get_rss()
{
	$.ajax({
		url : "data/get_blog.php",
		dataType : "json",
		success : function( json )
		{
			for( var i = 0; i < Math.min( json.length, 3 ); i++ )
			{
				$( "#blog ul" ).append( 
					$( document.createElement( 'li' ) )
						.html(
							$( document.createElement( 'a' ) )
								.html( json[ i ].title )
								.attr( "href", json[ i ].url )
						)
				);
			}
		}
	});
	
	$.ajax({
		url : "data/get_store.php",
		dataType : "json",
		success : function( json )
		{
			$( "#store div" ).html(
				$( document.createElement( 'a' ) )
					.html( json.title )
					.attr( "href", json.url )
			);
		}
	})
}