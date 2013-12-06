<?php

	include 'db_connect.php';
	include 'images.php';
	
	$results = $db->query( 'SELECT * FROM images WHERE id = "' . $_GET[ 'id' ] . '"' );
	$row = $results->fetchArray( SQLITE3_ASSOC );
	
	$data = $row[ 'image' ];
    
    if( $_GET[ 'w' ] && $_GET[ 'h' ] )
    {
    	resample( $data, $_GET[ 'w' ], $_GET[ 'h' ], $row[ 'x' ], $row[ 'y' ] );
	}
	else
	{
		$im = imagecreatefromstring( $data );
		show( $im );
		imagedestroy( $im );
	} 
?>