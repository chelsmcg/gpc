<?php

	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	if(!empty($_GET['packageId'])){
		$packageId = $_GET['packageId'];
		$result = deleteTableRow('packages', 'id', $packageId);

		if($result){
			format_response(true, 'Package Deleted');
			
		}else{
			format_response(false, 'PackageDelete Error');
		}

	}else{
		format_response(false, 'package id was not given', 'no_id');
		die();
	}
