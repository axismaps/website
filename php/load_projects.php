<?php

	include_once 'db_connect.php';
	include_once 'Parsedown.php';
	
	//adding feature text
	$files = scandir( '../data/text/highlighted/' );
	foreach( $files as $f )
	{
		if( preg_match( "/\\.md$/u", $f ) )
		{
			$text = file_get_contents( "../data/text/highlighted/$f" );
			$result = Parsedown::instance()->parse( $text );
		
			$matches = array();
			preg_match_all( "/(?<=<\/h2>\\n<p>).*?(?=<\\/p>)/uis", $result, $matches );
			
			$id = preg_replace( "/\\.md$/u", "", $f );
			
			$query = "INSERT OR REPLACE INTO content ( id, intro, data, design, code ) VALUES( '" . $id . "', '" . SQLite3::escapeString( $matches[ 0 ][ 0 ] ) . "', '" . SQLite3::escapeString( $matches[ 0 ][ 1 ] ) . "', '" . SQLite3::escapeString( $matches[ 0 ][ 2 ] ) . "', '" . SQLite3::escapeString( $matches[ 0 ][ 3 ] ) . "' )";
			
			$db->query( $query );
		}
	}

?>