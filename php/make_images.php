#!/usr/bin/php

<?php

	include_once 'db_connect.php';
	include_once 'images.php';
	
	echo( "Loading project details...\n\n" );
	$featured = array();
	$results = $db->query( "SELECT id, featured FROM projects" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		$id = $row[ 'id' ];
		unset( $row[ 'id' ] );
		$featured[ $id ] = $row;
	}
	
	echo( "Building media directories...\n\n" );
	if( file_exists( dirname(__FILE__) . '/../media' ) )
	{
		rm_folder( dirname(__FILE__) . '/../media' );
	}
	mkdir( dirname(__FILE__) . '/../media', 0777, true );
	mkdir( dirname(__FILE__) . '/../media/slideshow', 0777, true );
	
	echo( "Creating slideshow images:\n" );
	$results = $db->query( "SELECT * FROM images" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		$id = $row[ 'id' ];
		unset( $row[ 'id' ] );
		if( isset( $featured[ $id ] ) )
		{
			$f = $featured[ $id ][ 'featured' ];
			$featured[ $id ] = $row;
			$featured[ $id ][ 'featured' ] = $f;
		}
		file_put_contents( dirname(__FILE__) . "/../media/slideshow/" . $id . ".png" , $row[ 'image' ] );
		echo( "   $id.png\n" );
	}
	echo( "\n" );
	
	mkdir( dirname(__FILE__) . '/../media/icon', 0777, true );
	mkdir( dirname(__FILE__) . '/../media/portfolio', 0777, true );
	
	echo( "Creating portfolio images:\n" );
	foreach( $featured as $id => $el )
	{
		if( isset( $el[ 'image' ] ) )
		{
			if( $el[ 'featured' ] == 1 )
			{
				echo( "   icon/$id.png\n" );
				imagepng( resample( $el[ 'image' ], 70, 70, $el[ 'x' ], $el[ 'y' ], false ), dirname(__FILE__) . "/../media/icon/" . $id . ".png" );
				echo( "   portfolio/$id.png\n" );
				imagepng( resample( $el[ 'image' ], 265, 185, $el[ 'x' ], $el[ 'y' ], false ), dirname(__FILE__) . "/../media/portfolio/" . $id . ".png" );
			}
			else
			{
				echo( "   portfolio/$id.png\n" );
				imagepng( resample( $el[ 'image' ], 815, 255, $el[ 'x' ], $el[ 'y' ], false ), dirname(__FILE__) . "/../media/portfolio/" . $id . ".png" );
			}
		}
	}
	echo( "\n" );
	
	echo( "Creating feature images:\n" );
	mkdir( dirname(__FILE__) . '/../media/features', 0777, true );
	$results = $db->query( "SELECT project, step, image FROM features" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		if( !file_exists( dirname(__FILE__) . '/../media/features/' . $row[ 'project' ] ) )
		{
			mkdir( dirname(__FILE__) . '/../media/features/' . $row[ 'project' ], 0777, true );
		}
		echo( '   features/' . $row[ 'project' ] . "/" . $row[ 'step' ] . ".png\n" );
		imagepng( resample( $row[ 'image' ], 640, 520, null, null, false ), dirname(__FILE__) . '/../media/features/' . $row[ 'project' ] . "/" . $row[ 'step' ] . ".png" );
	}
	
	function rm_folder( $dir )
	{
    	foreach( scandir( $dir ) as $file )
    	{
        	if( '.' === $file || '..' === $file ) continue;
			if( is_dir( "$dir/$file" ) ) rm_folder( "$dir/$file" );
			else unlink( "$dir/$file" );
		}
		rmdir( $dir );
		return true;
	}

?>