<?php

	include 'db_connect.php';
	
	$results = $db->query( 'SELECT * FROM features WHERE project = "' . $_GET[ 'id' ] . '" AND step = ' . $_GET[ 'n' ] );
	$row = $results->fetchArray( SQLITE3_ASSOC );
    
	header( "Content-Type: image/gif" );
	echo $row[ 'image' ];

?>