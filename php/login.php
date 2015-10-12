<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";


	// gp.dev/php/addPackage.php?vendor=checlc&appId=69&appName=funz&appVersion=3&revision=2.0
	
	$username = !empty($_POST['username']) ? $_POST['username'] : false;
	$password = !empty($_POST['password']) ? $_POST['password'] : false;
	$hash = !empty($_GET['hash']) ? $_GET['hash'] : false;
	

	if(!$username || !$password){
		if($hash){
			$options = array('cost' => 11);
			echo password_hash($hash, PASSWORD_BCRYPT, $options);
		}else{
			format_response(false, 'no username or password');
		}

	}else{
		$userData = checkLogin($username, $password);
		if(!$userData){
			format_response(false, 'incorrect username or password');
		}else{
			$_SESSION["user"] = $userData;
			format_response(true, 'user logged in', $userData);
			
		}
	}



	// See the password_hash() example to see where this came from.
	// $hash = '$2y$07$BCryptRequires22Chrcte/VlQH0piJtjXl.0t1XkA8pw9dMXTpOq';

	// if (password_verify('rasmuslerdorf', $hash)) {
	//     echo 'Password is valid!';
	// } else {
	//     echo 'Invalid password.';
	// }



	function checkLogin($username, $password){
		global $mysqli;
		$sql = "SELECT u.id, u.email, u.username, u.fName, u.lName, u.password, r.type FROM users u INNER JOIN roles r ON u.id = r.id WHERE username = ?";

		$result = $mysqli->prepare($sql);
		$result->bind_param('s', $username);
		$result->execute();

		$result->store_result();
		if($result->num_rows > 0) {
			$result->bind_result($id, $email, $username, $fName, $lName, $hash, $type);

			while($result->fetch())
			{	
				if (password_verify($password, $hash)) {
			    	$userData = array('id'=>$id, 'email'=>$email, 'username'=>$username, 'fName'=>$fName, 'lName'=>$lName, 'type'=>$type);

				} else {
				    $userData = false;
				}
			}
		}else{
			$userData = false;
		}

		$result->close();

		return $userData;
	}
	
