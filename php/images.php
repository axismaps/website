<?php

	function resample( $data, $dest_w, $dest_h, $x = null, $y = null )
	{
		$im = imagecreatefromstring( $data );
		$h = imagesy( $im ) - 5;
    	$w = imagesx( $im ) - 5;
    	$x = $x ? $x : $w / 2;
    	$y = $y ? $y : $h / 2;
    	
    	$factor = min( 2, $h / $dest_h, $w / $dest_w );
    	
    	$source_w = $dest_w * $factor;
    	$source_h = $dest_h * $factor;
    	$source_x = max( $x + ( $source_w / 2 ) > $w ? $w - $source_w : $x - ( $source_w / 2 ), 0 );
    	$source_y = max( $y + ( $source_h / 2 ) > $h ? $h - $source_h : $y - ( $source_h / 2 ), 0 );
    	
	    $new = imagecreatetruecolor( $dest_w, $dest_h );
		imagecopyresampled(
			$new,
			$im,
			0,
			0,
			$source_x,
			$source_y,
			$dest_w,
			$dest_h,
			$source_w,
			$source_h
		);
		show( $new );
		imagedestroy( $new );
	}
	
	function show( $img )
	{
		header( "Content-Type: image/png" );
		imagepng( $img );
	}

?>