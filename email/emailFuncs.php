<?php

	require_once 'phpMailer/PHPMailerAutoload.php';


	function email($body, $toEmailAddress, $toName, $subject){
		date_default_timezone_set('Etc/UTC');

		//Create a new PHPMailer instance
		$mail = new PHPMailer;

		//Tell PHPMailer to use SMTP
		$mail->isSMTP();

		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;

		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';

		//Set the hostname of the mail server
		$mail->Host = HOST;

		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 465;

		//Set the encryption system to use - ssl (deprecated) or tls
		$mail->SMTPSecure = 'ssl';

		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;

		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = USERNAME;

		//Password to use for SMTP authentication
		$mail->Password = PASSWORD;

		//Set who the message is to be sent from
		$mail->setFrom(SENT_FROM_EMAIL, SENT_FROM_NAME);

		//Set an alternative reply-to address
		//$mail->addReplyTo('test183183@gmail.com', 'Firs1t Last');

		//Set who the message is to be sent to
		$mail->addAddress($toEmailAddress, $toName);

		//Set the subject line
		$mail->Subject = $subject;

		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->msgHTML($body);

		//Replace the plain text body with one created manually
		$mail->AltBody = 'This is a plain-text message body';

		//Attach an image file
		//$mail->addAttachment('images/phpmailer_mini.png');

		//send the message, check for errors
		if (!$mail->send()) {
		    error_log("Mailer Error: " . $mail->ErrorInfo);
		} else {
		    return "Message sent!";
		}
	}