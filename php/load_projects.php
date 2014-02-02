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
			
			$id = preg_replace( "/-.*\\.png$/u", "", $f );
			
			$query = $db->prepare( "INSERT OR REPLACE INTO images ( id, image, x, y ) VALUES( ?, ?, ?, ? )" );
			$query->bindValue( 1, $id, SQLITE3_TEXT );
			$query->bindValue( 2, $image, SQLITE3_BLOB );
			$query->bindValue( 3, $matches[ 0 ][ 0 ], SQLITE3_INTEGER );
			$query->bindValue( 4, $matches[ 0 ][ 1 ], SQLITE3_INTEGER );
			$query->execute();
			
			echo( "   $id\n" );
		}
	}
	
	//adding feature slideshow
	echo( "\nLoading features slideshow:\n" );
	$files = scandir( '../data/media/features/' );
	foreach( $files as $f )
	{
		if( is_dir( "../data/media/features/$f" ) && preg_match( "/[a-z].*/u", $f ) )
		{
			
			$text = file_get_contents( "../data/text/features/$f.md" );
			$title = array();
			$caption = array();
			
			preg_match_all( "/(?<=### ).*/u", $text, $title );
			preg_match_all( "/^[^#\\n].*/um", $text, $caption );
			
			$db->query( "DELETE FROM features WHERE project = '$f'" );
			
			echo( "   $f - " );
			
			$sub = scandir( "../data/media/features/$f" );
			foreach( $sub as $s )
			{
				if( preg_match( "/\\.png$/u", $s ) )
				{
					$image = file_get_contents( "../data/media/features/$f/$s" );
					$id = intval( preg_replace( "/-.*\\.png$/u", "", $s ) );
					$query = $db->prepare( "INSERT INTO features ( project, step, title, text, image ) VALUES( ?, ?, ?, ?, ? )" );
					$query->bindValue( 1, $f, SQLITE3_TEXT );
					$query->bindValue( 2, $id, SQLITE3_INTEGER );
					$query->bindValue( 3, $title[ 0 ][ $id ], SQLITE3_TEXT );
					$query->bindValue( 4, $caption[ 0 ][ $id ], SQLITE3_TEXT );
					$query->bindValue( 5, $image, SQLITE3_BLOB );
					$query->execute();
					
					echo( " $id" );
				}
			}
			echo( "\n" );
		}
	}
?>