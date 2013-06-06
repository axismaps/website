<?php

	$db = new SQLite3( 'portfolio.sqlite' );
	
	$results = $db->query( 'SELECT image FROM portfolio WHERE id = ' . $_GET[ 'id' ] );
	$row = $results->fetchArray();
	
	$data = $row[ 0 ];
	$im = imagecreatefromstring( $data );
    
    if( $_GET[ 'w' ] && $_GET[ 'h' ] )
    {
    	$w = $_GET[ 'w' ];
    	$h = $_GET[ 'h' ];
    	$height = imagesy( $im );
    	$width = imagesx( $im ) * ( $h / $height );
    	
	    $new = imagecreatetruecolor( $w, $h );
		imagecopyresampled( $new, $im, 0, 0, 0, 0, $w, $h, $width, $height );
		show( $new );
		imagedestroy( $new );
	}
	else
	{
		show( $im );
	}
    
    imagedestroy( $im );
    
    function show( $img )
    {
	    header( "Content-Type: image/png" );
		imagepng( $img );
	}
?>