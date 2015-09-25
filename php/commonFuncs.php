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
	function checkValue($field, $value, $table){
		global $mysqli;
		$data = array();

		$sql = "SELECT $field FROM $table WHERE $field = '$value'";

		if (!$result = $mysqli->query($sql)) {

			printf("Errormessage 1 : %s\n", $mysqli->error);
			return false;

		} else {
			if($result->num_rows != 0){

				while($row = $result->fetch_assoc()){
					$data[$field][] = $row;
				}
				return $data;
			}

			return false;
		}
	}

	function loginCheck(){
		if(isset($_SESSION['user'])){
			return true;
		}else{
			format_response(false, 'loggedOut');
			die();
		}
	}