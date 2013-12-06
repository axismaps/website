<?php

	include 'db_connect.php';
	include 'images.php';
	
	$results = $db->query( 'SELECT * FROM features WHERE project = "' . $_GET[ 'id' ] . '" AND step = ' . $_GET[ 'n' ] );
	$row = $results->fetchArray( SQLITE3_ASSOC );
	
	$data = $row[ 'image' ];
    
    if( $_GET[ 'w' ] && $_GET[ 'h' ] )
    {
    	resample( $data, $_GET[ 'w' ], $_GET[ 'h' ] );
	}
	else
	{
		$im = imagecreatefromstring( $data );
		show( $im );
		imagedestroy( $im );
	} 

?>