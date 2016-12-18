<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";
	require_once '../email/emailConfig.php';
	require_once '../email/emailFuncs.php';


	if(!empty($_GET['email'])){
		$email = $_GET['email'];
		forgotPassword($email);
		
	}else{
		format_response(false, 'Missing Params');
	}


	function forgotPassword($email){
		// get ID via email
		$id = checkValue('email', $email, 'users', 'id');

		if($id){
			// generate new password
			$newPW = randomString();

			//encryot new password for DB
			$encPassword = encryptPassword($newPW); //encrypts new password

			// add encrypted pw to DB
			$updated = updateField('users', 'password', $encPassword, 'id', $id[0]);

			if($updated){
				// set has logged in to false
				$updated = updateField('users', 'hasLoggedIn', 0, 'id', $id[0]);
				createPWEmail($newPW, $email);

				format_response(true, 'An email has been sent');

			}else{
				format_response(false, 'Issues updating password');
			}

		}else{
			format_response(false, 'Email does not exist.');
		}
	}


	function randomString($length = 6) {
		$str = "";
		$characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
		$max = count($characters) - 1;
		for ($i = 0; $i < $length; $i++) {
			$rand = mt_rand(0, $max);
			$str .= $characters[$rand];
		}
		return $str;
	}



	function createPWEmail($password, $email){
		$body = "<p>Hi, </p>".
				"<p>your password for Global Packaging Center has been reset and is now: </p>".
				"<p><b>$password</b></p> ".
				"<p>For security purposes, you will be prompted to update this password on your next login.</p>".
				"</br><p>Kind Regards,</p>".
				"<p>Global Packaging Center Team</p>";


		// email($body, 'chelsea@alperecreative.com.au', 'Mark', 'Forgot Passord');//send to package.request@success-sytsems.com.au
		email($body, 'mwganser@gmail.com', 'Mark', 'Forgot Passord');//send to package.request@success-sytsems.com.au

	}














