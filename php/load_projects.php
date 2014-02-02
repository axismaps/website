#!/usr/bin/php

<?php

	include_once 'db_connect.php';
	include_once 'Parsedown.php';
	
	//adding feature text
	echo( "\nLoading feature text:\n" );
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
			
			echo( "   $id\n" );
		}
	}
	
	//adding big images
	echo( "\nLoading slideshow images:\n" );
	$files = scandir( '../data/media/slideshow/' );
	foreach( $files as $f )
	{
		if( preg_match( "/\\.png$/u", $f ) )
		{
			$image = file_get_contents( "../data/media/slideshow/$f" );
			$matches = array();
			
			preg_match_all( "/(?<=-)[0-9]*/u", $f, $matches );
			
			$id = preg_replace("/-.*\\.png$/u", "", $f);
			
			$query = "INSERT OR REPLACE INTO images ( id, image, x, y ) VALUES( '" . $id . "', '" . $image . "', " . $matches[ 0 ][ 0 ] . ", " . $matches[ 0 ][ 1 ] . " )";
			
			$query = $db->prepare( "INSERT OR REPLACE INTO images ( id, image, x, y ) VALUES( ?, ?, ?, ? )" );
			$query->bindValue( 1, $id, SQLITE3_TEXT );
			$query->bindValue( 2, $image, SQLITE3_BLOB );
			$query->bindValue( 3, $matches[ 0 ][ 0 ], SQLITE3_INTEGER );
			$query->bindValue( 4, $matches[ 0 ][ 1 ], SQLITE3_INTEGER );
			$query->execute();
			
			echo( "   $id\n" );
		}
	}
			
?>