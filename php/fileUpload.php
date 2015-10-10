<?php
	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	if ( 0 < $_FILES['file']['error'] ) {
        echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        format_response(false, 'file failed to add', 'failUpload');

    }else{

    	error_log(print_r($_FILES['file']));

        move_uploaded_file($_FILES['file']['tmp_name'], '../tempUploads/' . $_FILES['file']['name']);
        format_response(true, 'file added successfully', 'fileAdded');
    }



    function getCurrentFiles(){
    	$files = scandir ('../tempUploads');
    	return $files;
    }