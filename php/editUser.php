<?php	
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	$id = !empty($_GET['id']) ? $_GET['id'] : $_SESSION['user']['id'];

	if(!empty($_GET['email']) && !empty($_GET['username']) && !empty($_GET['firstName']) && !empty($_GET['lastName'])){
		$email = $_GET['email'];
		$username = $_GET['username'];
		$firstName = $_GET['firstName'];
		$lastName = $_GET['lastName'];

		updateUser($email, $username, $firstName, $lastName);
		
	}

	if(!empty($_GET['type'])){

		$type = $_GET['type'];

		$type = !is_array($type) ? array($type) : $type;

		deleteTableRow('roles', 'id', $id);

		addRole($id, $typeArr);
	}

	//adds user to the users table and returns the new id
	function updateUser($email, $username, $firstName, $lastName){
		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE users SET email=?, userName=?, userName=?, lastName=? WHERE username=?");
		$stmt->bind_param("sssss", $email, $username, $firstName, $lastName);
		$stmt->execute();
		$stmt->close();
	}


// gp.dev/php/addUser.php?email=tes@test.comt&username=testusername&password=testpw&firstName=firstTest&lastName=lastTest&type=tester
