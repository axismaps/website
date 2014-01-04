var counter = 1;
var skip = false;

setup_sidebar();
init_events();
nav_current();
mini_portfolio();

// $( window ).resize( resize_home );
// resize_home();

function setup_sidebar()
{
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

function init_events()
{	
	$("#explanations").children("article").hide();

	$( ".more" ).click( function()
	{	
		var targetName = $(this).attr("name"),
			targetTrioArticle = $("#trio > ." + targetName),
			targetExplanation = $("#explanations > ."+ targetName);

		if(targetTrioArticle.hasClass("open")) {
			targetExplanation.slideUp();
			targetTrioArticle.removeClass("open");
			$("#trio article").removeClass("closed");
		} else {
			if(targetTrioArticle.siblings('article').hasClass("open")) {
				targetTrioArticle.siblings('article').removeClass("open");
				targetTrioArticle.siblings('article').addClass("closed");
				targetExplanation.siblings('article').fadeOut();
				targetTrioArticle.removeClass('closed');
				targetTrioArticle.addClass('open');
				targetExplanation.fadeIn();
			} else {
				targetExplanation.slideDown();
				targetTrioArticle.siblings('article').addClass("closed");
				targetTrioArticle.addClass("open");
			}
		}
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
function nav_current() {

	var filename = window.location.href.split('/').pop();
	if(filename.indexOf('#') != 0) {
		filename = filename.split('#').shift();
	}
	if(filename == 'index.php') {
		$("nav a[href='index.php']").parent().addClass('current');
	}
	if(filename == 'portfolio.php' || filename == 'project.php') {
		$("nav a[href='portfolio.php']").parent().addClass('current')
	}
	if(filename == 'company.php') {
		$("nav a[href='company.php']").parent().addClass('current');
	}

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
				$( "#mini-portfolio" ).append(
					$( document.createElement( 'div' ) )
						.addClass( "mini-portfolio" )
						.attr( "id", 'mini-port-'+i )
						.html( "<p><strong>" + json[ i ].title + "</strong> - " + json[ i ].client + "<br /><em>" + json[ i ].tag + "</em></p>" )
						.prepend(
							$( document.createElement( 'div' ) )
								.addClass( "mini-image" )
								.css( "background-image", "url( php/get_image.php?id=" + json[ i ].id + "&w=70&h=70 )" )
						)
				);
				count++;
			}
		}
		$( "#mini-portfolio" ).append(
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
		if( $( this ).hasClass( "disabled" ) ) { return false; }
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
				$( "#featured ul" )
					// .addClass( "featured" )
					.append(
						$( document.createElement( 'li' ) )
						.html( "<p><a href='project.php#"+json[i].id+"'><b>" + json[ i ].title + "</b><br /><i>" + json[ i ].client + "</i></a></p>" )
						.prepend( $( document.createElement( 'a' ) )
							.attr('href', 'project.php#'+json[i].id)
							.append( $( document.createElement( 'img' )
						)
							.attr('alt', json[i].title)
							.attr('width','265px')
							.attr('height', '185px')
							.attr('src', "php/get_image.php?id=" + json[ i ].id + "&w=265&h=185 )" ))
							)		
				);
			}
			else
			{

				$( "#all" ).append(
					$( document.createElement( 'div' ) )
						.addClass( "all" )
						.html( "<p><b>" + json[ i ].title + "</b> - <i>" + json[ i ].client + "</i><br /><br />" + json[ i ].intro + "</p>" )
						.prepend(
							$( document.createElement( 'img' ) ).attr( "src", "php/get_image.php?id=" + json[ i ].id + "&w=815&h=255" )
						)
				);
			}
		}
		
		$( "#more-work a" ).click( function(e)
		{
			e.preventDefault();
			$( "#more-work a" ).fadeOut('fast', function() {
				$( "#all" ).slideDown();
			});
	
			
		})
	});
}

function build_project( id )
{

	$.getJSON( "php/get_project.php?id=" + id, function( json )
	{
		$("#project-featured h2").prepend(json['title']);
		$("#project-summary h3").html(json['tag']);
		$("#project-summary p").html(json['intro']);

		// var i = 0;
		// $("#project-slideshow").append( $(document.createElement('img')).attr('src','php/get_feature_image.php?id='+id+'&n=' + i + '&w=642&h=520'));
		// $("#project-image-summary").append('<p><strong>'+json.features[i]['title']+'</strong> '+json.features[i]['text']+'</p>');
		// build slideshow structure
		for( var i = 0; i < json.features.length; i++ ) {
			$("#project-slideshow").append( $(document.createElement('div'))
				.append( $(document.createElement('img')).attr('src','php/get_feature_image.php?id='+id+'&n=' + i + '&w=642&h=520'))
				.append( $(document.createElement('div')).addClass('project-image-summary')
				.append('<p><strong>'+json.features[i]['title']+'</strong> '+json.features[i]['text']+'</p>'))
			);

		}
		$('#project-slideshow > div:not(:first-child)').hide();
		// for( var i = 0; i < json.features.length; i++ )
		// {
		// 	$("#project-slideshow").append(
		// 				$( document.createElement( 'img' ) ).attr( "src", "php/get_feature_image.php?id=" + id + "&n=" + i )
					
		// 			// .append( "<p><b>" + json.features[ i ].title + "</b> - " + json.features[ i ].text + "</p>" )
		// 	);
		// }
		// $( ".feature" ).first().addClass( "shown" );
		// $( ".menu li + li" ).first().addClass( "current" );
		$("#trio article").height('100%').css({'position':'relative', 'bottom': '0'});
		$("#trio .data p").html(json['data']);
		$("#trio .design p").html(json['design']);
		$("#trio .code p").html(json['code']);
	});
}



function get_rss()
{
	$.ajax({
		url : "php/get_blog.php",
		dataType : "json",
		success : function( json )
		{
			for( var i = 0; i < Math.min( json.length, 3 ); i++ )
			{
				$( "ul#blog" ).append( 
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
		url : "php/get_store.php",
		dataType : "json",
		success : function( json )
		{
			$( "#store" ).html(
				$( document.createElement( 'a' ) )
					.html( json.title )
					.attr( "href", json.url )
			);
		}
	})
}

function webform_submit(){
	var valid = true;
	if( !$("#email").val().match(/(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})/) ){
		valid = false;
		$("#email").css("border", "2px solid red");
	}
	if( $("#name").val() == "" ){
		valid = false;
		$("#name").css("border", "2px solid red");
	}
	if( $("#body").val() == "" ){
		valid = false;
		$("#body").css("border", "2px solid red");
		$("#body").css("margin-bottom", "13px");
	}
	if(valid){
	
		var dataString = "body=" + $("#body").val() + "&email=" + $("#email").val() + "&name=" + $("#name").val();
	
		$.ajax({
			type:	"POST",
			url:	"php/email.php",
			data:	dataString,
			success:	function(result){
				$("#web_form").css("height", "230px");
				if(result == "success"){
					$("#contact form").html("<h3>Thank you for contacting Axis Maps!</h3><h3>We will return your enquiry as soon as possible</h3>");
				} else {
					$("#contact form").html("<h3>There appears to be a problem with our web form.</h3><h3>Please email your request to info@axismaps.com.</h3><h3>We are sorry for the inconvenience.</h3>");
				}
			}
		});
	}
	return false;
}
