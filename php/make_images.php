#!/usr/bin/php

<?php

	include_once 'db_connect.php';
	include_once 'images.php';
	
	$featured = array();
	$results = $db->query( "SELECT id, featured FROM projects" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		$id = $row[ 'id' ];
		unset( $row[ 'id' ] );
		$featured[ $id ] = $row;
	}
	
	if( file_exists( '../media' ) )
	{
		rm_folder( '../media' );
	}
	mkdir( '../media', 0777, true );
	mkdir( '../media/slideshow', 0777, true );
	
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
		file_put_contents( "../media/slideshow/" . $id . ".png" , $row[ 'image' ] );
	}
	
	mkdir( '../media/icon', 0777, true );
	mkdir( '../media/portfolio', 0777, true );
	
	foreach( $featured as $id => $el )
	{
		if( isset( $el[ 'image' ] ) )
		{
			if( $el[ 'featured' ] == 1 )
			{
				imagepng( resample( $el[ 'image' ], 70, 70, $el[ 'x' ], $el[ 'y' ], false ), "../media/icon/" . $id . ".png" );
				imagepng( resample( $el[ 'image' ], 265, 185, $el[ 'x' ], $el[ 'y' ], false ), "../media/portfolio/" . $id . ".png" );
			}
			else
			{
				imagepng( resample( $el[ 'image' ], 815, 255, $el[ 'x' ], $el[ 'y' ], false ), "../media/portfolio/" . $id . ".png" );
			}
		}
	}
	
	mkdir( '../media/features', 0777, true );
	$results = $db->query( "SELECT project, step, image FROM features" );
	while( $row = $results->fetchArray( SQLITE3_ASSOC ) )
	{
		if( !file_exists( '../media/features/' . $row[ 'project' ] ) )
		{
			mkdir( '../media/features/' . $row[ 'project' ], 0777, true );
		}
		imagepng( resample( $row[ 'image' ], 640, 520, null, null, false ), '../media/features/' . $row[ 'project' ] . "/" . $row[ 'step' ] . ".png" );
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