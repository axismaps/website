<?php

	$xml = simplexml_load_file( "http://feeds2.feedburner.com/AxisMapsBlog" );
	
	$json = array();
	
	foreach( $xml->channel->item as $item )
	{
		$arr = array();
		$arr[ "title" ] = mb_convert_encoding( $item->title[ 0 ], "HTML-ENTITIES", "UTF-8" );
		$arr[ "url" ] =  ( string ) $item->link[ 0 ];
		array_push( $json, $arr );
	}
	
	echo json_encode( $json );
	
 ?>