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
			$encPassword = encryptPassword($password);
			$id = addUser($email, $username, $encPassword, $firstName, $lastName);
			addRole($id, $type);

		}else{
			format_response(false, 'username or email in user');
		}
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

	//adds role to specified user
	function addRole($id, $type){
		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO roles (id, type) VALUES (?, ?)");
		$stmt->bind_param("is", $id, $type);
		$stmt->execute();
		$stmt->close();
	}


// gp.dev/php/addUser.php?email=tes@test.comt&username=testusername&password=testpw&firstName=firstTest&lastName=lastTest&type=tester
