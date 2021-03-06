<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>Axis Maps Portfolio - Cartography. Visualization. Design.</title>
		<meta name="description" content="Axis Maps Data Design Code">
		<?php include('include/meta.php'); ?>
	</head>
	<body>
		<?php include('include/ga.php'); ?>
		<div id='wrapper'>
			<?php include('include/header.php'); ?>
			<?php include('include/nav.php'); ?>
			<section id='featured'>
				<h2 class='ribbon'>Featured Maps | <span class="soft">See our previous projects and how they were made:</span></h2>
				<ul></ul>
			</section>
			<section id="all">
				<h2 class='ribbon'>Additional projects</h2>
			</section>
			<?php include('include/footer.php'); ?>
		</div><!-- end wrapper -->
		<script src="js/jquery.js"></script>
		<script src="js/main.js"></script>
		<script>
			$(document).ready(function() {
				
				 build_portfolio();
			});
		</script>
	</body>
</html>