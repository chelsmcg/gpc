<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	// $id = !empty($_GET['id']) ? $_GET['id'] : $_SESSION['user']['id'];

	// if(!empty($_GET['password']) && !empty($_GET['newPassword'])){
		
	// 	$password = $_GET['password'];
	// 	$newPassword = $_GET['newPassword'];

	// 	$correctPassword = checkPassword($id, $password); //check password ic correct

	// 	if($correctPassword){
	// 		$encPassword = encryptPassword($newPassword); //encrypts new password

	// 		$updated = updateField('users', 'password', $encPassword, 'id', $id); //adds new password to users table

	// 		if($updated){
	// 			format_response(true, 'password changed');

	// 		}else{
	// 			format_response(false, 'could not change password');
	// 		}

	// 	}else{
	// 		format_response(false, 'incorrect password');
	// 	}

	// }else{
	// 	format_response(false, 'missing ajax param');
	// }


	//used for force password change
	if(!empty($_GET['password']) && !empty($_GET['userId'])){
		$userId = $_GET['userId'];
		$password = $_GET['password'];

		//check given user ID matches logged in user ID
		if($userId == $_SESSION['user']['id']){

			$encPassword = encryptPassword($password); //encrypts new password
			$updated = updateField('users', 'password', $encPassword, 'id', $userId); //adds new password to users table

			//if password updated in DB successfully
			if($updated){
				$hasLoggedIn = updateField('users', 'hasLoggedIn', 1, 'id', $userId); //updates hasLoggedIn field after forced pw change complete

				if($hasLoggedIn){
					//update session data
					updateSession('hasLoggedIn', 1);
				}
				format_response(true, 'password changed');

			// if password update failed to save in DB
			}else{
				format_response(false, 'could not change password');
			}
		}else{
			// invalid request
			format_response(false, 'Invalid user identification');
		}
	}
