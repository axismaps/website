<?php

	$db = new SQLite3( 'portfolio.sqlite' );
	
	$features = array();	
	$results = $db->query( "SELECT title, text FROM features WHERE project = '" . $_GET[ 'id' ] . "' ORDER BY step" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		array_push( $features, $row );
	}
	
	$results = $db->query( "SELECT id, title, tag, url, intro, data, design, code FROM projects NATURAL JOIN content WHERE id = '" . $_GET[ 'id' ] . "'" );
	$json = $results->fetchArray( SQLITE3_ASSOC );
	$json[ 'features' ] = $features;
	
	echo json_encode( $json );
	
?>