<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	if(!empty($_GET['email']) && !empty($_GET['username']) && !empty($_GET['password']) && !empty($_GET['firstName']) && !empty($_GET['lastName']) && !empty($_GET['type'])){
		$email = $_GET['email'];
		$username = $_GET['username'];
		$password = $_GET['password'];
		$firstName = $_GET['firstName'];
		$lastName = $_GET['lastName'];
		$type = $_GET['type'];

		$foundEmail = checkValue('email', $email, 'users');
		$foundUsername = checkValue('userName', $username, 'users');

		if(!$foundUsername && !$foundEmail){

			$encPassword = encryptPassword($password);//encrypts password
			$id = addUser($email, $username, $encPassword, $firstName, $lastName); //add user to users table

			//if type not passed through as array, make it one
			if(!is_array( $type )){
				$type = array($type);
			}

			addRole($id, $type); //add user roles to roles table

			format_response(true, 'user added');

		}else{
			format_response(false, 'username or email in user');
		}
	}else{
		format_response(false, 'missing ajax param');
	}

	//adds user to the users table and returns the new id
	function addUser($email, $username, $encPassword, $firstName, $lastName){
		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO users (email, userName, password, fName, lName) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $email, $username, $encPassword, $firstName, $lastName);
		$stmt->execute();
		$id = mysqli_insert_id($mysqli);
		$stmt->close();
		return $id;
	}


// gp.dev/php/addUser.php?email=tes@test.comt&username=testusername&password=testpw&firstName=firstTest&lastName=lastTest&type=tester
