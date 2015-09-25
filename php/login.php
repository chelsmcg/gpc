<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";


	// gp.dev/php/addPackage.php?vendor=checlc&appId=69&appName=funz&appVersion=3&revision=2.0
	
	$username = !empty($_POST['username']) ? $_POST['username'] : false;
	$password = !empty($_POST['password']) ? $_POST['password'] : false;

	if(!$username || !$password){
		format_response(false, 'no username or password');

	}else{
		$userData = checkLogin($username, $password);
		if(!$userData){
			format_response(false, 'incorrect username or password');
		}else{
			$_SESSION["user"] = $userData;
			format_response(true, 'user logged in', $userData);
			
		}
	}

	function checkLogin($username, $password){
		global $mysqli;
		$sql = "SELECT u.email, u.username, u.fName, u.lName, r.type FROM users u INNER JOIN roles r ON u.id = r.id WHERE username = ? AND password = ?";

		$result = $mysqli->prepare($sql);
		$result->bind_param('ss', $username, $password);
		$result->execute();

		$result->store_result();
		if($result->num_rows > 0) {
			$result->bind_result($email, $username, $fName, $lName, $type);

			while($result->fetch())
			{
			    $userData = array('email'=>$email, 'username'=>$username, 'fName'=>$fName, 'lName'=>$lName, 'type'=>$type);
			}
		}else{
			$userData = false;
		}

		$result->close();

		return $userData;
	}
	
