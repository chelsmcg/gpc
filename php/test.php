<?php


	include_once "db/dbConnect.php";
	include_once "commonFuncs.php";

	$password = 'password';

	echo encryptPassword($password);