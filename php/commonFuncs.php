<?php
	session_start();
	
	//formats data to be returned to ajax call
	function format_response($success, $message=null, $data=null){

		if($data == null && $message == null){
			$response = array(
					'success' => $success
				);

		}else if($data == null){
			$response = array(
					'success' => $success,
					'message' => $message
				);

		}else{
			$response = array(
					'success' => $success,
					'data' => $data,
					'message' => $message
				);
		}
		send_response($response);
	}


	//sends the response in json format
	function send_response($response) {
		if ( !empty($_GET['callback']) ) {
			echo $_GET['callback'] . '(' . json_encode($response) . ')';
		}
		else {
			echo json_encode($response);
		}
	}



	//checks if a specified value already exists in a given field of a given table
	function checkValue($field, $value, $table, $select=null){

		$select = $select == null ? $field : $select;

		global $mysqli;
		$data = array();

		$sql = "SELECT $select FROM $table WHERE $field = '$value'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if($result->num_rows != 0){

				while($row = $result->fetch_assoc()){
					$data[] = $row[$select];
				}
				return $data;
			}

			return false;
		}
	}

	function deleteTableRow($table, $where, $value){
		global $mysqli;
		$sql = "DELETE FROM $table WHERE $where = $value";

		if(!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);

			return false;

		}

		return true;
		
	}


	//adds role to specified user
	function addRole($id, $typeArr){

		global $mysqli;
		$stmt = $mysqli->prepare("INSERT INTO roles (id, type) VALUES (?, ?)");

		foreach($typeArr as $type){
			$stmt->bind_param("is", $id, $type);
			$stmt->execute();
		}

		$stmt->close();
	}


	function loginCheck(){
		if(isset($_SESSION['user'])){
			return true;
		}else{
			format_response(false, 'loggedOut');
			die();
		}
	}

	//ecrypts the input string
	function encryptPassword($password){
		$options = array('cost' => 11);
		$encPassword = password_hash($password, PASSWORD_BCRYPT, $options);

		return $encPassword;
	}

	//gets the stored password and checks it against input password
	function checkPassword($id, $password){
		$hashedPassword = checkValue('id', $id, 'users', 'password');
		if(!$hashedPassword){
			error_log("could not find password for that user id");
			return false;

		}else{
			$correctPassword = password_verify($password, $hashedPassword[0]);
		}

		if($correctPassword){
			return true;

		}else{
			return false;
		}
	}

	function updateField($table, $updateField, $newValue, $whereField, $whereValue){
		$type1 = preparedType($newValue);
		$type2 = preparedType($whereValue);
		error_log($type1.$type2);

		global $mysqli;
		$stmt = $mysqli->prepare("UPDATE $table SET $updateField=? WHERE $whereField=?");
		$stmt->bind_param($type1.$type2, $newValue, $whereValue);
		$stmt->execute();
		if ($stmt->errno) {
			error_log("FAILURE!!! " . $stmt->error);
			$stmt->close();
			return false;
		}
		else{
			error_log("Updated {$stmt->affected_rows} rows");
			$stmt->close();
			return true;
		}
			
		
	}


	//returns the type of variable for use in prepared statement
	function preparedType($variable){
		$type = gettype($variable);

		switch ($type) {
		    case "boolean":
		    	$type = 'b';
		        break;
		    case "integer":
		    	$type = 'i';
		        break;
		    case "double":
		    	$type = 'd';
		        break;
		    case "string":
		    	$type = 's';
		        break;
		    default:
		        return false;
		}

		return $type;
	}