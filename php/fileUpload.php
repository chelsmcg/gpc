<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	if ( 0 < $_FILES['file']['error'] ) {
		echo 'Error: ' . $_FILES['file']['error'] . '<br>';
		format_response(false, 'file failed to add', 'failUpload');

	}else{

		// error_log($_GET['newName']);
		// error_log($_FILES['file']['type']);
		$fileType = $_FILES['file']['type'];
		$extension = createExtension($fileType);
		$newName = $_GET['newName'] . '.' . $extension;
		$field = $_GET['field'];

		if($field == 'doc'){

			// move_uploaded_file($_FILES['file']['tmp_name'], '../tempUploads/' . $_FILES['file']['name']);
			move_uploaded_file($_FILES['file']['tmp_name'], '../docUploads/' . $newName);
			format_response(true, 'file added successfully', 'fileAdded');

		}else if($field == 'source'){
			move_uploaded_file($_FILES['file']['tmp_name'], '../tempUploads/' . $newName);

			uploadToRemote('ftp2.success-systems.com.au', 'data3', 'dAtA3', $newName);
		}
	}


	function uploadToRemote($ftp_server, $ftp_username, $ftp_userpass, $fileName){
		

		$file = '../tempUploads/' . $fileName;
		$remote_file = '/Source/' . $fileName;

		// set up basic connection
		$conn_id = ftp_connect($ftp_server);

		// login with username and password
		$login_result = ftp_login($conn_id, $ftp_username, $ftp_userpass);

		// upload a file
		if (ftp_put($conn_id, $remote_file, $file, FTP_BINARY)) {
		 echo "successfully uploaded $file\n";

		} else {
		 echo "There was a problem while uploading $file\n";
		}

		// close the connection
		ftp_close($conn_id);


	}



	function getCurrentFiles(){
		$files = scandir ('../tempUploads');
		return $files;
	}

	function createExtension($fileType){
		if($fileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
			$extension = 'docx';

		}else if($fileType == 'application/msword'){
			$extension = 'doc';

		}else if($fileType == 'application/x-zip-compressed'){
			$extension = 'zip';
		}

		return $extension;
	}