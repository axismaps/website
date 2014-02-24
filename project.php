<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Axis Maps LLC Project - Cartography. Visualization. Design.</title>
	<meta name="description" content="Axis Maps Data Design Code">
	<?php include('include/meta.php'); ?>
</head>
<body>
<div id='wrapper'>
<?php include('include/header.php'); ?>
<?php include('include/nav.php'); ?>
	<section id='project-featured'>
		<h2 class='ribbon'><!-- <span id="next">Next &#62;</span><span id='prev'>&#60; Prev</span> --></h2>
		<div id='project-summary'>
			<h3></h3>
			<p></p>
		</div>
		<div id="project-slideshow">
			<ul id="slides"></ul>
		</div>
	</section>
	<section id="trio">
		<h2 class='ribbon'>How this project came together ...</h2>
		<article class="data project">
			<h3 class='data' name='data'>Data</h3>
			<p></p>
		</article>
		<article class='design project'>
			<h3 class='design' name='design'>Design</h3>
			<p></p>
		</article>
		<article class='code project'>
			<h3 class='code' name='code'>Code</h3>
			<p></p>
		</article>

	</section>
<?php include('include/footer.php'); ?>
</div><!-- end wrapper -->
<script src="js/jquery.js"></script>
<script src="js/main.js"></script>
<script>
	$(document).ready(function() {
		build_project( window.location.hash.replace( "#", "" ) );
	});
</script>
</body>
</html>