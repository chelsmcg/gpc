<?php	
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	$id = !empty($_GET['id']) ? $_GET['id'] : $_SESSION['user']['id'];

	if(!empty($_GET['email']) && !empty($_GET['username']) && !empty($_GET['firstName']) && !empty($_GET['lastName'])){
		$email = $_GET['email'];
		$username = $_GET['username'];
		$firstName = $_GET['firstName'];
		$lastName = $_GET['lastName'];

		$updated = updateUser($email, $username, $firstName, $lastName);


		if($updated){

			if(empty($_GET['type']) && $_GET['type'] == ""){

				format_response(true, 'user data updated');	
			}
		}else{
			format_response(false, 'user data could not update');
		}
		
	}

	if(!empty($_GET['type']) && $_GET['type'] != ""){

		$type = $_GET['type'];

		$type = !is_array($type) ? array($type) : $type;

		deleteTableRow('roles', 'id', $id);

		$added = addRole($id, $type);

		if($added){
			if(!empty($_GET['email']) && !empty($_GET['username']) && !empty($_GET['firstName']) && !empty($_GET['lastName'])){

				format_response(true, 'user data updated');	
			}else{
				format_response(true, 'roles updated');	
			}
		}
	}

	//adds user to the users table and returns the new id
	function updateUser($email, $username, $firstName, $lastName){
		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE users SET email=?, userName=?, userName=?, lastName=? WHERE username=?");
		$stmt->bind_param("sssss", $email, $username, $firstName, $lastName);
		$stmt->execute();
		$stmt->close();

		return true;
	}


// gp.dev/php/addUser.php?email=tes@test.comt&username=testusername&password=testpw&firstName=firstTest&lastName=lastTest&type=tester
