<?php

	$xml = simplexml_load_file( "http://store.axismaps.com/products.rss" );
	
	$json = array();
	
	$img = ( string ) $xml->channel->item[ 0 ]->description[ 0 ];
	$img = preg_replace( "/<p>.*/ui", "", $img );
	
	$json[ "title" ] = $img;
	$json[ "url" ] =  ( string ) $xml->channel->item[ 0 ]->link[ 0 ];
	
	echo json_encode( $json );
	
 ?>