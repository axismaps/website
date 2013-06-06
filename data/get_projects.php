<?php

	$json = array();

	$db = new SQLite3( 'portfolio.sqlite' );
	
	$results = $db->query( 'SELECT id, IFNULL( title_short, title ) AS title, IFNULL( client_short, client) AS client, tag, featured FROM portfolio' );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		array_push( $json, $row );
	}
	
	echo json_encode( $json );
	
?>