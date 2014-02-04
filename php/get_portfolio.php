<?php

	include 'db_connect.php';
	
	if( $_GET[ 'l' ] == "short" )
	{
		$query = 'SELECT id, IFNULL( title_short, title ) AS title, IFNULL( client_short, client) AS client, tag, featured FROM projects';
	}
	else
	{
		$query = 'SELECT id, title, client, tag, featured FROM projects';
	}
	
	$query .= ' ORDER BY featured DESC, DATE DESC';
	
	$results = $db->query( $query );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		array_push( $json, $row );
	}
	
	echo json_encode( $json );
	
?>