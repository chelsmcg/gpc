<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	$id = !empty($_GET['id']) ? $_GET['id'] : $_SESSION['user']['id'];

	if(!empty($_GET['password']) && !empty($_GET['newPassword'])){
		
		$password = $_GET['password'];
		$newPassword = $_GET['newPassword'];

		$correctPassword = checkPassword($id, $password); //check password ic correct

		if($correctPassword){
			$encPassword = encryptPassword($newPassword); //encrypts new password

			$updated = updateField('users', 'password', $encPassword, 'id', $id); //adds new password to users table

			if($updated){
				format_response(true, 'password changed');

			}else{
				format_response(false, 'could not change password');
			}

		}else{
			format_response(false, 'incorrect password');
		}

	}else{
		format_response(false, 'missing ajax param');
	}