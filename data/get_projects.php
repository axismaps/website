<?php

	$json = array();
	$db = new SQLite3( 'portfolio.sqlite' );
	
	if( $_GET[ 'l' ] == "short" )
	{
		$query = 'SELECT id, IFNULL( title_short, title ) AS title, IFNULL( client_short, client) AS client, tag, featured FROM portfolio';
	}
	else
	{
		$query = 'SELECT id, title, client, tag, featured FROM portfolio';
	}
	
	$results = $db->query( $query );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		array_push( $json, $row );
	}
	
	echo json_encode( $json );
	
?>