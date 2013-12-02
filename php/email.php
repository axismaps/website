<?php
	
	require_once "Mail.php";
	
	$Name = Trim(stripslashes($_POST['name']));
	$Content = Trim(stripslashes($_POST['body']));
	
	if($Name == "" || $Content == ""){
		die("fail");
	}
	
	$from = "Robo Bieber <robot@axismaps.com>";
	$to = "Axis Maps <info@axismaps.com>";
	$subject = "Website Enquiry - " . $Name;
	$email = $_POST['email'];
	
	$body = $Content . "\n\n" . $Name . "\n" . $email . "\n";
	
	$host = "ssl://smtp.gmail.com";
	$port = "465";
	$username = "robot@axismaps.com";
	$password = "checkIt7";
	
	$headers = array (
		'From' => $from,
  		'To' => $to,
  		'Subject' => $subject,
  		'Reply-To' => $email );
  		
	$smtp = Mail::factory('smtp',
  		array (
  			'host' => $host,
		    'port' => $port,
    		'auth' => true,
			'username' => $username,
    		'password' => $password));

	$mail = $smtp->send($to, $headers, $body);
	
	if( PEAR::isError( $mail ) ) {
	  echo("<p>" . $mail->getMessage() . "</p>");
	} else{
	  print "success";
	}
?>