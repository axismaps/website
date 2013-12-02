<?php

	include 'db_connect.php';
	
	$results = $db->query( 'SELECT * FROM images WHERE id = "' . $_GET[ 'id' ] . '"' );
	$row = $results->fetchArray( SQLITE3_ASSOC );
	
	$data = $row[ 'image' ];
	$im = imagecreatefromstring( $data );
    
    if( $_GET[ 'w' ] && $_GET[ 'h' ] )
    {
    	$h = imagesy( $im );
    	$w = imagesx( $im );
    	$dest_w = $_GET[ 'w' ];
    	$dest_h = $_GET[ 'h' ];
    	
    	$factor = min( 2, $h / $dest_h, $w / $dest_w );
    	
    	$source_w = $dest_w * $factor;
    	$source_h = $dest_h * $factor;
    	$source_x = max( $row[ 'x' ] + ( $source_w / 2 ) > $w ? $w - $source_w : $row[ 'x' ] - ( $source_w / 2 ), 0 );
    	$source_y = max( $row[ 'y' ] + ( $source_h / 2 ) > $h ? $h - $source_h : $row[ 'y' ] - ( $source_h / 2 ), 0 );
    	
	    $new = imagecreatetruecolor( $dest_w, $dest_h );
		imagecopyresampled(
			$new,
			$im,
			0,
			0,
			$source_x,
			$source_y,
			$dest_w,
			$dest_h,
			$source_w,
			$source_h
		);
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