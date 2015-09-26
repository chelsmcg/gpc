<?php
	include_once "commonFuncs.php";

	// remove all session variables
	session_unset(); 

	// destroy the session 
	session_destroy(); 

	format_response(true, 'logged out successful');